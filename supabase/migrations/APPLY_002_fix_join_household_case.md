# How to Apply: 002_fix_join_household_case.sql

Instructions for Claude (via Chrome connector) to apply the join_household RPC fix to the live CooCheena Supabase database.

---

## Context

The original `join_household` RPC had a case-mismatch bug. Invite codes are stored lowercase (from `gen_random_uuid()`), but the RPC's WHERE clause did `= upper(code)` against uppercased frontend input — so every join attempt returned "Invalid or already-used invite code". The fix changes the comparison to `= lower(code)`.

Supabase project: `pmkfrzpyqcgkfujpdkdf` at `https://pmkfrzpyqcgkfujpdkdf.supabase.co`.

The SQL to run lives at `supabase/migrations/002_fix_join_household_case.sql`.

---

## Steps (Chrome connector)

### 1. Open the Supabase SQL editor

Use the Chrome connector to navigate to:
**https://supabase.com/dashboard/project/pmkfrzpyqcgkfujpdkdf/sql/new**

### 2. Paste and run the migration

Read the full contents of `supabase/migrations/002_fix_join_household_case.sql` and paste it into the SQL editor. Click **Run** (or press Cmd+Enter).

Expected result: "Success. No rows returned." — the `CREATE OR REPLACE FUNCTION` statement runs silently.

### 3. Verify the function was updated

Run this query and confirm the function definition now uses `lower(code)`:

```sql
SELECT pg_get_functiondef(oid)
FROM pg_proc
WHERE proname = 'join_household';
```

Look for `WHERE invite_code = lower(code)` in the output. If you see `upper(code)`, the migration didn't apply — try Step 2 again.

### 4. Smoke test with a real invite code

```sql
-- Step 4a: Get a real, unused invite code from the DB
SELECT invite_code FROM households WHERE invite_used = false LIMIT 1;
```

Copy the returned code (e.g. `a1b2c3d4`).

```sql
-- Step 4b: Call the RPC with an UPPERCASED version of that code.
-- This simulates exactly what the frontend sends.
-- Replace A1B2C3D4 with the uppercased version of the code from 4a.
SELECT join_household('A1B2C3D4');
```

**Expected:** Returns `{"household_id": "<some-uuid>"}` (or `{"error": "You are already in this household"}` if the test user is already a member — also fine, it proves the lookup matched).

**Failure mode:** If it returns `{"error": "Invalid or already-used invite code"}`, the function wasn't updated. Re-run Step 2.

> **Note:** The smoke test in Step 4b will actually link the calling auth user to that household if successful. Only run it if that's OK, or run it as a dry test with a code from a household no one cares about.

---

## Done

Once Step 4 shows a success or "already in this household" response, the live database is patched. Users can now successfully link partner accounts via the in-app flow.

No app redeploy is needed — only the database function changed.
