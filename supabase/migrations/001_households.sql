-- ─────────────────────────────────────────────────────────────
-- 001_households.sql
-- Couple / household sharing for CooCheena
--
-- Run this entire file in the Supabase SQL editor.
-- It is safe to run on a live database — all ALTER TABLE statements
-- add nullable columns so existing rows are unaffected.
-- ─────────────────────────────────────────────────────────────


-- ── 1. New tables ─────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS households (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at  timestamptz NOT NULL DEFAULT now(),
  invite_code text UNIQUE NOT NULL DEFAULT substring(replace(gen_random_uuid()::text, '-', ''), 1, 8),
  invite_used boolean NOT NULL DEFAULT false
);

CREATE TABLE IF NOT EXISTS household_members (
  household_id uuid NOT NULL REFERENCES households(id) ON DELETE CASCADE,
  user_id      uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role         text NOT NULL DEFAULT 'owner',
  joined_at    timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (household_id, user_id)
);
-- One user can only belong to one household at a time
CREATE UNIQUE INDEX IF NOT EXISTS household_members_user_idx ON household_members(user_id);


-- ── 2. Add household_id to shared tables ──────────────────────

ALTER TABLE recipes       ADD COLUMN IF NOT EXISTS household_id uuid REFERENCES households(id);
ALTER TABLE meal_plans    ADD COLUMN IF NOT EXISTS household_id uuid REFERENCES households(id);
ALTER TABLE grocery_lists ADD COLUMN IF NOT EXISTS household_id uuid REFERENCES households(id);
ALTER TABLE recipe_books  ADD COLUMN IF NOT EXISTS household_id uuid REFERENCES households(id);

-- Partial unique indexes so upserts can use (household_id, week_of) as the conflict target
CREATE UNIQUE INDEX IF NOT EXISTS meal_plans_hh_week_idx
  ON meal_plans(household_id, week_of) WHERE household_id IS NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS grocery_lists_hh_week_idx
  ON grocery_lists(household_id, week_of) WHERE household_id IS NOT NULL;


-- ── 3. Helper function ────────────────────────────────────────
-- Returns the calling user's household_id.
-- SECURITY DEFINER so RLS policies can call it without recursion.

CREATE OR REPLACE FUNCTION my_household_id()
RETURNS uuid
LANGUAGE sql STABLE SECURITY DEFINER AS $$
  SELECT household_id FROM household_members WHERE user_id = auth.uid() LIMIT 1;
$$;


-- ── 4. RPC: join_household ────────────────────────────────────
-- Atomically merges caller's data into the target household and
-- updates membership. Called from the app when User B enters
-- User A's invite code.

CREATE OR REPLACE FUNCTION join_household(code text)
RETURNS jsonb
LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  target_hh uuid;
  old_hh    uuid;
BEGIN
  SELECT id INTO target_hh
  FROM households
  WHERE invite_code = lower(code) AND invite_used = false;

  IF target_hh IS NULL THEN
    RETURN jsonb_build_object('error', 'Invalid or already-used invite code');
  END IF;

  SELECT household_id INTO old_hh
  FROM household_members WHERE user_id = auth.uid();

  IF old_hh = target_hh THEN
    RETURN jsonb_build_object('error', 'You are already in this household');
  END IF;

  -- Merge caller's data into the target household
  UPDATE recipes       SET household_id = target_hh WHERE household_id = old_hh;
  UPDATE meal_plans    SET household_id = target_hh WHERE household_id = old_hh;
  UPDATE grocery_lists SET household_id = target_hh WHERE household_id = old_hh;
  UPDATE recipe_books  SET household_id = target_hh WHERE household_id = old_hh;

  -- Move membership (remove from old, add to new)
  DELETE FROM household_members WHERE user_id = auth.uid();

  -- Delete the old solo household if now empty
  DELETE FROM households
  WHERE id = old_hh
    AND NOT EXISTS (SELECT 1 FROM household_members WHERE household_id = old_hh);

  INSERT INTO household_members(household_id, user_id, role)
  VALUES (target_hh, auth.uid(), 'member');

  -- Mark invite as used (one-time link)
  UPDATE households SET invite_used = true WHERE id = target_hh;

  RETURN jsonb_build_object('household_id', target_hh);
END;
$$;


-- ── 5. RPC: leave_household ───────────────────────────────────
-- Moves caller to a fresh solo household.
-- Recipes + recipe_books they created follow them.
-- Meal plans + grocery lists stay with the partner.

CREATE OR REPLACE FUNCTION leave_household()
RETURNS jsonb
LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  cur_hh uuid;
  new_hh uuid;
BEGIN
  SELECT household_id INTO cur_hh
  FROM household_members WHERE user_id = auth.uid();

  IF cur_hh IS NULL THEN
    RETURN jsonb_build_object('error', 'Not in a household');
  END IF;

  -- Create a fresh solo household for this user
  INSERT INTO households DEFAULT VALUES RETURNING id INTO new_hh;

  -- Move only this user's authored content
  UPDATE recipes      SET household_id = new_hh WHERE household_id = cur_hh AND user_id = auth.uid();
  UPDATE recipe_books SET household_id = new_hh WHERE household_id = cur_hh AND user_id = auth.uid();
  -- meal_plans and grocery_lists stay with the remaining partner

  -- Move membership
  UPDATE household_members SET household_id = new_hh WHERE user_id = auth.uid();

  -- Clean up old household if now empty
  DELETE FROM households
  WHERE id = cur_hh
    AND NOT EXISTS (SELECT 1 FROM household_members WHERE household_id = cur_hh);

  -- Re-open the invite slot on the old household for the remaining partner
  UPDATE households SET invite_used = false WHERE id = cur_hh;

  RETURN jsonb_build_object('household_id', new_hh);
END;
$$;


-- ── 6. Trigger: auto-create household for new sign-ups ────────

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE new_hh uuid;
BEGIN
  INSERT INTO households DEFAULT VALUES RETURNING id INTO new_hh;
  INSERT INTO household_members(household_id, user_id, role)
  VALUES (new_hh, NEW.id, 'owner');
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();


-- ── 7. One-time backfill for existing users ───────────────────
-- Creates a solo household for every user who doesn't have one,
-- and stamps household_id onto all their existing rows.
-- Safe to re-run (guarded by household_id IS NULL checks).

DO $$
DECLARE
  rec    RECORD;
  new_hh uuid;
BEGIN
  FOR rec IN
    SELECT u.id AS user_id
    FROM auth.users u
    WHERE NOT EXISTS (
      SELECT 1 FROM household_members hm WHERE hm.user_id = u.id
    )
  LOOP
    INSERT INTO households DEFAULT VALUES RETURNING id INTO new_hh;
    INSERT INTO household_members(household_id, user_id, role)
    VALUES (new_hh, rec.user_id, 'owner');

    UPDATE recipes       SET household_id = new_hh WHERE user_id = rec.user_id AND household_id IS NULL;
    UPDATE meal_plans    SET household_id = new_hh WHERE user_id = rec.user_id AND household_id IS NULL;
    UPDATE grocery_lists SET household_id = new_hh WHERE user_id = rec.user_id AND household_id IS NULL;
    UPDATE recipe_books  SET household_id = new_hh WHERE user_id = rec.user_id AND household_id IS NULL;
  END LOOP;
END;
$$;


-- ── 8. RLS policies ───────────────────────────────────────────

-- households
ALTER TABLE households ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "households_select" ON households;
CREATE POLICY "households_select" ON households
  FOR SELECT USING (
    id IN (SELECT household_id FROM household_members WHERE user_id = auth.uid())
  );

-- household_members
ALTER TABLE household_members ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "members_select" ON household_members;
CREATE POLICY "members_select" ON household_members
  FOR SELECT USING (household_id = my_household_id());

-- recipes — drop old policies, add household-scoped ones
DROP POLICY IF EXISTS "Users can view own recipes"   ON recipes;
DROP POLICY IF EXISTS "Users can insert own recipes" ON recipes;
DROP POLICY IF EXISTS "Users can update own recipes" ON recipes;
DROP POLICY IF EXISTS "Users can delete own recipes" ON recipes;
DROP POLICY IF EXISTS "recipes_select" ON recipes;
DROP POLICY IF EXISTS "recipes_insert" ON recipes;
DROP POLICY IF EXISTS "recipes_update" ON recipes;
DROP POLICY IF EXISTS "recipes_delete" ON recipes;

CREATE POLICY "recipes_select" ON recipes FOR SELECT USING (household_id = my_household_id());
CREATE POLICY "recipes_insert" ON recipes FOR INSERT WITH CHECK (household_id = my_household_id());
CREATE POLICY "recipes_update" ON recipes FOR UPDATE USING (household_id = my_household_id());
CREATE POLICY "recipes_delete" ON recipes FOR DELETE USING (household_id = my_household_id());

-- meal_plans
DROP POLICY IF EXISTS "Users can view own meal_plans"   ON meal_plans;
DROP POLICY IF EXISTS "Users can insert own meal_plans" ON meal_plans;
DROP POLICY IF EXISTS "Users can update own meal_plans" ON meal_plans;
DROP POLICY IF EXISTS "Users can delete own meal_plans" ON meal_plans;
DROP POLICY IF EXISTS "meal_plans_select" ON meal_plans;
DROP POLICY IF EXISTS "meal_plans_insert" ON meal_plans;
DROP POLICY IF EXISTS "meal_plans_update" ON meal_plans;
DROP POLICY IF EXISTS "meal_plans_delete" ON meal_plans;

CREATE POLICY "meal_plans_select" ON meal_plans FOR SELECT USING (household_id = my_household_id());
CREATE POLICY "meal_plans_insert" ON meal_plans FOR INSERT WITH CHECK (household_id = my_household_id());
CREATE POLICY "meal_plans_update" ON meal_plans FOR UPDATE USING (household_id = my_household_id());
CREATE POLICY "meal_plans_delete" ON meal_plans FOR DELETE USING (household_id = my_household_id());

-- grocery_lists
DROP POLICY IF EXISTS "Users can view own grocery_lists"   ON grocery_lists;
DROP POLICY IF EXISTS "Users can insert own grocery_lists" ON grocery_lists;
DROP POLICY IF EXISTS "Users can update own grocery_lists" ON grocery_lists;
DROP POLICY IF EXISTS "Users can delete own grocery_lists" ON grocery_lists;
DROP POLICY IF EXISTS "grocery_lists_select" ON grocery_lists;
DROP POLICY IF EXISTS "grocery_lists_insert" ON grocery_lists;
DROP POLICY IF EXISTS "grocery_lists_update" ON grocery_lists;
DROP POLICY IF EXISTS "grocery_lists_delete" ON grocery_lists;

CREATE POLICY "grocery_lists_select" ON grocery_lists FOR SELECT USING (household_id = my_household_id());
CREATE POLICY "grocery_lists_insert" ON grocery_lists FOR INSERT WITH CHECK (household_id = my_household_id());
CREATE POLICY "grocery_lists_update" ON grocery_lists FOR UPDATE USING (household_id = my_household_id());
CREATE POLICY "grocery_lists_delete" ON grocery_lists FOR DELETE USING (household_id = my_household_id());

-- recipe_books
DROP POLICY IF EXISTS "Users can view own recipe_books"   ON recipe_books;
DROP POLICY IF EXISTS "Users can insert own recipe_books" ON recipe_books;
DROP POLICY IF EXISTS "Users can update own recipe_books" ON recipe_books;
DROP POLICY IF EXISTS "Users can delete own recipe_books" ON recipe_books;
DROP POLICY IF EXISTS "recipe_books_select" ON recipe_books;
DROP POLICY IF EXISTS "recipe_books_insert" ON recipe_books;
DROP POLICY IF EXISTS "recipe_books_update" ON recipe_books;
DROP POLICY IF EXISTS "recipe_books_delete" ON recipe_books;

CREATE POLICY "recipe_books_select" ON recipe_books FOR SELECT USING (household_id = my_household_id());
CREATE POLICY "recipe_books_insert" ON recipe_books FOR INSERT WITH CHECK (household_id = my_household_id());
CREATE POLICY "recipe_books_update" ON recipe_books FOR UPDATE USING (household_id = my_household_id());
CREATE POLICY "recipe_books_delete" ON recipe_books FOR DELETE USING (household_id = my_household_id());
