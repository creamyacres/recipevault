# Setting up the daily Discord stats ping

End-to-end setup for the `coocheena-stats` Cloudflare Worker — fires every day at 9am ET, queries Supabase, and posts a summary embed to a Discord channel.

---

## 1. Create the Discord webhook

In Discord:

1. Open the server and pick (or create) the channel you want the stats to land in — e.g. `#coocheena-metrics`.
2. Click the **⚙ gear** next to the channel name → **Integrations** → **Webhooks** → **New Webhook**.
3. Name it something like "CooCheena Stats", set the avatar if you want, and pick the channel.
4. Click **Copy Webhook URL**. It looks like `https://discord.com/api/webhooks/123.../abc...`.
5. Keep that URL handy — you'll paste it in step 3.

If you don't see Integrations, you need the "Manage Webhooks" permission on the channel (server owner has this by default).

---

## 2. Apply the Supabase RPC

A small `stats_summary()` SQL function returns all the counts in one call. Apply it via the Chrome connector flow you've been using:

> "Follow the steps in `supabase/migrations/APPLY_003_stats_summary.md`" — or paste the contents of `supabase/migrations/003_stats_summary_rpc.sql` into https://supabase.com/dashboard/project/pmkfrzpyqcgkfujpdkdf/sql/new and click Run.

Verify with:

```sql
SELECT stats_summary();
```

You should get a single jsonb row with `total_users`, `new_in_last_7_days`, etc.

---

## 3. Get the Supabase service-role key

1. Open https://supabase.com/dashboard/project/pmkfrzpyqcgkfujpdkdf/settings/api
2. Under "Project API keys" copy the **`service_role`** secret (NOT the publishable / anon key).
3. Treat it like a password — full DB write access. Don't paste it into chat, code, or Slack.

---

## 4. Deploy the worker

```bash
cd /Users/ellie/projects/recipevault/worker-stats
wrangler deploy
```

First deploy will create the `coocheena-stats` worker. The cron trigger (`0 14 * * *` = 14:00 UTC = 9am ET / 10am EDT) is wired automatically from `wrangler.toml`.

---

## 5. Set the three secrets

```bash
cd /Users/ellie/projects/recipevault/worker-stats

wrangler secret put SUPABASE_URL
# paste: https://pmkfrzpyqcgkfujpdkdf.supabase.co

wrangler secret put SUPABASE_SERVICE_ROLE_KEY
# paste the service_role key from step 3

wrangler secret put DISCORD_WEBHOOK_URL
# paste the Discord webhook URL from step 1
```

---

## 6. Test it without waiting until tomorrow

The worker has a manual trigger gated by the service-role key. From any terminal:

```bash
SERVICE_KEY='<paste service-role key here>'
curl -X GET https://coocheena-stats.<your-cf-subdomain>.workers.dev \
  -H "Authorization: Bearer $SERVICE_KEY"
```

You should see the stats JSON in the response, and a fresh embed should appear in your Discord channel within a second or two.

Your worker URL is shown at the end of `wrangler deploy` output. It's of the form `https://coocheena-stats.<account-subdomain>.workers.dev`.

---

## What you'll see in Discord

A small embed each morning:

> 🍳 **CooCheena daily stats**
>
> Total users: **42**   ·   Signed in ≥1x: 37   ·   With recipes: 28
> New yesterday: 2   ·   New last 7 days: 5   ·   New last 30 days: 12
> Linked households: 3

---

## Schedule tweaks

The cron lives in [worker-stats/wrangler.toml](worker-stats/wrangler.toml):

| Change | Cron |
|---|---|
| Daily 9am ET (current) | `0 14 * * *` |
| Weekly Monday 9am ET | `0 14 * * 1` |
| Twice daily (9am + 5pm ET) | `0 14,22 * * *` |

After changing, re-run `wrangler deploy`. Note that Cloudflare cron times are always UTC.
