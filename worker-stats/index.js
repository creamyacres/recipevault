/**
 * CooCheena — Daily Stats Worker
 *
 * Runs daily at 14:00 UTC (9am ET / 10am EDT), queries Supabase for user
 * counts and household stats, and posts a summary to a Discord webhook.
 *
 * Manual run (for testing): fetch the worker URL with header
 *   `Authorization: Bearer <SUPABASE_SERVICE_ROLE_KEY>`
 * — bypasses cron and triggers an immediate post.
 *
 * Deploy:  wrangler deploy
 * Secrets:
 *   wrangler secret put SUPABASE_URL
 *   wrangler secret put SUPABASE_SERVICE_ROLE_KEY
 *   wrangler secret put DISCORD_WEBHOOK_URL
 */

export default {
  // Cron trigger entry point (fires on the schedule defined in wrangler.toml)
  async scheduled(_event, env, ctx) {
    ctx.waitUntil(runDailyReport(env));
  },

  // HTTP entry point for manual triggering (gated by the service-role key)
  async fetch(request, env) {
    const auth = request.headers.get("Authorization") || "";
    if (auth !== `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`) {
      return new Response("Unauthorized", { status: 401 });
    }
    const result = await runDailyReport(env);
    return new Response(JSON.stringify(result, null, 2), {
      headers: { "Content-Type": "application/json" },
    });
  },
};

async function runDailyReport(env) {
  const stats = await fetchStats(env);
  await postToDiscord(env.DISCORD_WEBHOOK_URL, stats);
  return stats;
}

async function fetchStats(env) {
  // Query the public RPC `stats_summary()` which runs as security-definer in
  // Postgres and returns a single jsonb row. See migration 003.
  const url = `${env.SUPABASE_URL}/rest/v1/rpc/stats_summary`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": env.SUPABASE_SERVICE_ROLE_KEY,
      "Authorization": `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
    },
    body: "{}",
  });
  if (!res.ok) {
    throw new Error(`Supabase RPC failed: ${res.status} ${await res.text()}`);
  }
  return await res.json();
}

async function postToDiscord(webhookUrl, stats) {
  const total = stats.total_users ?? 0;
  const signedIn = stats.users_who_signed_in ?? 0;
  const new7 = stats.new_in_last_7_days ?? 0;
  const new30 = stats.new_in_last_30_days ?? 0;
  const new1 = stats.new_in_last_1_day ?? 0;
  const linkedHouseholds = stats.linked_households ?? 0;
  const usersWithRecipes = stats.users_with_recipes ?? 0;

  const embed = {
    title: "🍳 CooCheena daily stats",
    color: 0xE8421A,
    fields: [
      { name: "Total users", value: `**${total}**`, inline: true },
      { name: "Signed in ≥1x", value: `${signedIn}`, inline: true },
      { name: "With recipes", value: `${usersWithRecipes}`, inline: true },
      { name: "New yesterday", value: `${new1}`, inline: true },
      { name: "New last 7 days", value: `${new7}`, inline: true },
      { name: "New last 30 days", value: `${new30}`, inline: true },
      { name: "Linked households", value: `${linkedHouseholds}`, inline: false },
    ],
    timestamp: new Date().toISOString(),
  };

  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ embeds: [embed] }),
  });
  if (!res.ok) {
    throw new Error(`Discord webhook failed: ${res.status} ${await res.text()}`);
  }
}
