# How to Apply: 003_stats_summary_rpc.sql

Instructions for Claude (via Chrome connector) to apply the `stats_summary()` RPC used by the daily Discord stats worker.

Supabase project: `pmkfrzpyqcgkfujpdkdf` at https://pmkfrzpyqcgkfujpdkdf.supabase.co.

---

## Steps (Chrome connector)

### 1. Open the Supabase SQL editor

Navigate to **https://supabase.com/dashboard/project/pmkfrzpyqcgkfujpdkdf/sql/new**.

### 2. Paste and run

Read the contents of `supabase/migrations/003_stats_summary_rpc.sql` and paste into the editor. Click **Run** (Cmd+Enter).

Expected: "Success. No rows returned."

### 3. Verify the function exists and the grants are correct

```sql
SELECT
  routine_name,
  has_function_privilege('service_role',  oid, 'EXECUTE') AS service_role_can_run,
  has_function_privilege('authenticated', oid, 'EXECUTE') AS authenticated_can_run,
  has_function_privilege('anon',          oid, 'EXECUTE') AS anon_can_run
FROM pg_proc
WHERE proname = 'stats_summary';
```

Expected: `service_role_can_run = true`, the other two `false`.

### 4. Smoke test (returns JSON)

```sql
SELECT stats_summary();
```

Expected: a single jsonb row like
```json
{"total_users": 42, "users_who_signed_in": 37, "new_in_last_1_day": 2, "new_in_last_7_days": 5, "new_in_last_30_days": 12, "linked_households": 3, "users_with_recipes": 28}
```

Report those numbers back to the user as a quick sanity check, then they're set — the worker will start pinging Discord on its cron schedule once they finish the `wrangler` deploy step in `worker-stats/SETUP.md`.
