-- ─────────────────────────────────────────────────────────────
-- 002_fix_join_household_case.sql
-- Fixes case-mismatch bug in join_household RPC.
--
-- Bug: gen_random_uuid()::text returns lowercase hex, so invite_code
-- is stored lowercase. The frontend uppercases user input before
-- calling the RPC. The original join_household used `upper(code)`
-- in its WHERE clause, so the uppercased input never matched the
-- lowercase stored value and every join attempt returned
-- "Invalid or already-used invite code".
--
-- Fix: compare against lower(code) instead, so any-cased input
-- normalizes to the lowercase stored value.
--
-- Safe to re-run (CREATE OR REPLACE). No data migration needed.
-- ─────────────────────────────────────────────────────────────

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

  -- Move membership
  DELETE FROM household_members WHERE user_id = auth.uid();

  DELETE FROM households
  WHERE id = old_hh
    AND NOT EXISTS (SELECT 1 FROM household_members WHERE household_id = old_hh);

  INSERT INTO household_members(household_id, user_id, role)
  VALUES (target_hh, auth.uid(), 'member');

  UPDATE households SET invite_used = true WHERE id = target_hh;

  RETURN jsonb_build_object('household_id', target_hh);
END;
$$;
