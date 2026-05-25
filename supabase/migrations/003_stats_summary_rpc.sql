-- ─────────────────────────────────────────────────────────────
-- 003_stats_summary_rpc.sql
-- Read-only stats RPC for the coocheena-stats Cloudflare Worker.
--
-- Returns a single jsonb row of high-level user/household counts.
-- Marked SECURITY DEFINER so it can read auth.users; only callable
-- by the service-role key (the function does not grant access to
-- the anon/authenticated roles below).
--
-- Safe to re-run.
-- ─────────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION stats_summary()
RETURNS jsonb
LANGUAGE sql STABLE SECURITY DEFINER AS $$
  SELECT jsonb_build_object(
    'total_users',          (SELECT COUNT(*) FROM auth.users),
    'users_who_signed_in',  (SELECT COUNT(*) FROM auth.users WHERE last_sign_in_at IS NOT NULL),
    'new_in_last_1_day',    (SELECT COUNT(*) FROM auth.users WHERE created_at > now() - interval '1 day'),
    'new_in_last_7_days',   (SELECT COUNT(*) FROM auth.users WHERE created_at > now() - interval '7 days'),
    'new_in_last_30_days',  (SELECT COUNT(*) FROM auth.users WHERE created_at > now() - interval '30 days'),
    'linked_households',    (SELECT COUNT(*) FROM households h
                              WHERE (SELECT COUNT(*) FROM household_members WHERE household_id = h.id) > 1),
    'users_with_recipes',   (SELECT COUNT(DISTINCT user_id) FROM recipes)
  );
$$;

-- Only the service_role can call this (it queries auth.users).
-- Do NOT grant to anon/authenticated.
REVOKE EXECUTE ON FUNCTION stats_summary() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION stats_summary() FROM anon, authenticated;
GRANT  EXECUTE ON FUNCTION stats_summary() TO service_role;
