# How to Apply: 001_households.sql

This file tells Claude how to apply the household sharing migration to the CooCheena Supabase project.

---

## Context

The migration adds couple/household sharing to CooCheena. It must be run against the live Supabase database before the app code changes go live. The SQL file is at `supabase/migrations/001_households.sql`.

The Supabase project is at `https://pmkfrzpyqcgkfujpdkdf.supabase.co`.

---

## Steps

### 1. Open the Supabase SQL editor

Navigate to: **https://supabase.com/dashboard/project/pmkfrzpyqcgkfujpdkdf/sql/new**

### 2. Paste and run the migration

Read the full contents of `supabase/migrations/001_households.sql` and paste it into the SQL editor, then click **Run**.

### 3. Verify the tables were created

Run this query and confirm it returns two rows (`households`, `household_members`):

```sql
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name IN ('households', 'household_members')
ORDER BY table_name;
```

### 4. Verify household_id columns were added

Run this query and confirm `household_id` appears on all four tables:

```sql
SELECT table_name, column_name
FROM information_schema.columns
WHERE table_schema = 'public'
AND column_name = 'household_id'
AND table_name IN ('recipes', 'meal_plans', 'grocery_lists', 'recipe_books')
ORDER BY table_name;
```

Expected: 4 rows.

### 5. Verify the backfill ran — no NULLs on existing rows

```sql
SELECT 'recipes' AS tbl, COUNT(*) AS null_household_id FROM recipes WHERE household_id IS NULL
UNION ALL
SELECT 'meal_plans',    COUNT(*) FROM meal_plans    WHERE household_id IS NULL
UNION ALL
SELECT 'grocery_lists', COUNT(*) FROM grocery_lists WHERE household_id IS NULL
UNION ALL
SELECT 'recipe_books',  COUNT(*) FROM recipe_books  WHERE household_id IS NULL;
```

Expected: all counts are `0`. If any are non-zero, run the backfill block from the migration again.

### 6. Verify RLS policies were updated

```sql
SELECT tablename, policyname
FROM pg_policies
WHERE tablename IN ('recipes', 'meal_plans', 'grocery_lists', 'recipe_books', 'households', 'household_members')
ORDER BY tablename, policyname;
```

Each of the four shared tables should have four policies: `_select`, `_insert`, `_update`, `_delete`. The two new tables should each have a `_select` policy.

### 7. Verify the new-user trigger exists

```sql
SELECT trigger_name FROM information_schema.triggers
WHERE trigger_name = 'on_auth_user_created';
```

Expected: 1 row.

### 8. Verify the RPC functions exist

```sql
SELECT routine_name FROM information_schema.routines
WHERE routine_schema = 'public'
AND routine_name IN ('my_household_id', 'join_household', 'leave_household', 'handle_new_user')
ORDER BY routine_name;
```

Expected: 4 rows.

### 9. Smoke test with a real user

```sql
-- Pick any existing user_id from your auth.users table
-- and confirm they have a household:
SELECT u.email, hm.household_id, h.invite_code, h.invite_used
FROM auth.users u
JOIN household_members hm ON hm.user_id = u.id
JOIN households h ON h.id = hm.household_id
LIMIT 5;
```

Expected: each user has a unique `household_id` and an 8-character `invite_code`.

---

## If Something Goes Wrong

- The migration is additive — it only adds columns and tables, never drops anything. It is safe to re-run.
- If a step fails partway through, paste only the failing section into a new SQL editor tab and run it in isolation.
- If the backfill missed rows (Step 5 shows non-zero counts), re-run just the `DO $$ ... $$` block from the migration file.
- If RLS policies conflict (duplicate name error), the `DROP POLICY IF EXISTS` lines at the top of section 8 handle this — check that those ran first.

---

## Done

Once all checks pass, merge the `fix/meal-plan-persistence` branch on GitHub. Cloudflare Pages will auto-deploy within ~2 minutes and the app will be live with household sharing enabled.
