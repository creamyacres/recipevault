# Query: How many users are in CooCheena?

Instructions for Claude (via Chrome connector) to read the current user count from the live CooCheena Supabase database.

Supabase project: `pmkfrzpyqcgkfujpdkdf` at https://pmkfrzpyqcgkfujpdkdf.supabase.co.

---

## Steps (Chrome connector)

### 1. Open the Supabase SQL editor

Navigate to **https://supabase.com/dashboard/project/pmkfrzpyqcgkfujpdkdf/sql/new**.

### 2. Paste this query and run it

```sql
SELECT
  COUNT(*)                                                              AS total_users,
  COUNT(*) FILTER (WHERE last_sign_in_at IS NOT NULL)                   AS users_who_signed_in,
  COUNT(*) FILTER (WHERE created_at > now() - interval '7 days')        AS new_in_last_7_days,
  COUNT(*) FILTER (WHERE created_at > now() - interval '30 days')       AS new_in_last_30_days
FROM auth.users;
```

Click **Run** (or press Cmd+Enter).

### 3. Report the result back to the user

Report the four numbers as a short summary, e.g.:

> 42 total users (37 have signed in at least once). 5 new in the last 7 days, 12 in the last 30.

### 4. Optional follow-ups

If the user asks for more detail, these are the typical next queries — only run if explicitly requested:

**Linked households (couples sharing):**

```sql
SELECT COUNT(*) AS linked_households
FROM households h
WHERE (SELECT COUNT(*) FROM household_members WHERE household_id = h.id) > 1;
```

**Users with at least one saved recipe:**

```sql
SELECT COUNT(DISTINCT user_id) AS users_with_recipes FROM recipes;
```

**Daily signups for the last 14 days:**

```sql
SELECT date_trunc('day', created_at)::date AS day, COUNT(*) AS signups
FROM auth.users
WHERE created_at > now() - interval '14 days'
GROUP BY 1 ORDER BY 1;
```
