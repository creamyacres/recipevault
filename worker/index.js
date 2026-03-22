/**
 * CooCheena — Anthropic API Proxy Worker
 *
 * Proxies requests from the Cloudflare Pages frontend to the Anthropic API,
 * keeping the API key safe server-side as a Worker secret.
 *
 * Deploy:  wrangler deploy
 * Secret:  wrangler secret put ANTHROPIC_API_KEY
 */

const ALLOWED_ORIGINS = [
  "https://coocheena.com",
  "https://www.coocheena.com",
  "https://recipevault-86p.pages.dev",
  "http://localhost:5173",
  "http://localhost:4173",
];

function corsHeaders(origin) {
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
  };
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";

    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    // Only allow POST
    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    // Validate API key is configured
    if (!env.ANTHROPIC_API_KEY) {
      return new Response(
        JSON.stringify({ error: "ANTHROPIC_API_KEY secret not set on Worker" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders(origin) } }
      );
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return new Response(
        JSON.stringify({ error: "Invalid JSON body" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders(origin) } }
      );
    }

    // If a fetchUrl is provided, fetch the page content via Jina Reader
    // and inject it into the Claude prompt instead of just passing the URL string.
    if (body.fetchUrl) {
      const jinaRes = await fetch(`https://r.jina.ai/${body.fetchUrl}`, {
        headers: { "Accept": "text/plain" },
      });
      if (!jinaRes.ok) {
        return new Response(
          JSON.stringify({ error: "Failed to fetch recipe URL" }),
          { status: 502, headers: { "Content-Type": "application/json", ...corsHeaders(origin) } }
        );
      }
      const pageText = await jinaRes.text();
      // Swap fetchUrl for a real messages array with the page content
      body = {
        model: body.model,
        max_tokens: body.max_tokens,
        system: body.system,
        messages: [{ role: "user", content: `Parse the recipe from this page content:\n\n${pageText.slice(0, 20000)}` }],
      };
    }

    // Forward to Anthropic
    const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify(body),
    });

    const data = await anthropicRes.json();

    return new Response(JSON.stringify(data), {
      status: anthropicRes.status,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders(origin),
      },
    });
  },
};
