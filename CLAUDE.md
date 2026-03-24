# CooCheena — Claude Code Context

## Project Overview
CooCheena is an AI-powered recipe and meal planning web app. Users can generate recipes from ideas or URLs, organize them into Recipe Books, plan weekly meals on a calendar, and generate grocery lists. Built by Zac, hosted at **coocheena.com**.

## Tech Stack
| Layer | Tool |
|---|---|
| Frontend | React + Vite (single-file SPA) |
| Auth + Database | Supabase |
| AI | Anthropic Claude (`claude-sonnet-4-20250514`) via Cloudflare Worker proxy |
| Hosting | Cloudflare Pages (auto-deploy on push to `main`) |
| API Proxy | Cloudflare Worker (`coocheena-ai-proxy.ztsantore.workers.dev`) |
| Repo | `github.com/creamyacres/recipevault` |
| Domain | `coocheena.com` (DNS on Cloudflare) |

## Key Files
```
src/App.jsx          # Entire frontend — single file, all components + logic
worker/index.js      # Cloudflare Worker: CORS proxy to Anthropic API + Jina URL fetching
worker/wrangler.toml # Worker config (name: coocheena-ai-proxy)
public/favicon.svg   # Frying pan favicon in CooCheena colors
CLAUDE.md            # This file
```

## Architecture Notes
- **Single-file frontend**: All React components, styles, and logic live in `src/App.jsx`. Do not split into separate files unless explicitly asked.
- **AI calls**: Never call the Anthropic API directly from the frontend. All AI requests go through the Cloudflare Worker at `AI_PROXY_URL`. The worker holds the API key as a secret.
- **URL parsing**: The worker fetches page content via `r.jina.ai/{url}` then passes it to Claude. Use `callClaudeWithUrl()` for URL-based recipe parsing.
- **No client-side API keys**: Supabase publishable key is safe to expose. Anthropic key lives in the Worker only.

## Design System
| Token | Value |
|---|---|
| Background (Cream) | `#FFF5E6` |
| Ink (primary text) | `#1A0A00` |
| Red (primary action) | `#E8421A` |
| Yellow (accent) | `#FFD166` |
| Muted text | `#7A5A3A` |
| Border | `3px solid #1A0A00` |
| Display font | `Bebas Neue` (headers, labels, logo) |
| Body font | `Nunito` (body text, inputs, buttons) |

**CSS conventions**: All custom classes are prefixed (`pm-`, `cc-`, `cal-`, `rb-`, `fb-`). Styles live in the `STYLES` template literal at the top of App.jsx, injected via `<style>`. Mobile breakpoint is `768px`.

**Logo**: `<span style={{ color:"#1A0A00" }}>Coo</span><span style={{ color:"#E8421A" }}>Cheena</span>` — always split this way.

## Supabase Schema
```sql
recipes          -- user recipes (user_id, title, description, prep_time, cook_time,
                 --   servings, category, ingredients jsonb, steps jsonb, tags jsonb, website)
meal_plans       -- weekly meal plans (user_id, week_of, days jsonb, easy_mode_nights jsonb)
grocery_lists    -- grocery items (user_id, week_of, items jsonb)
recipe_books     -- recipe collections (user_id, name, emoji, recipe_ids jsonb)
```
All tables have RLS enabled. Users can only read/write their own rows.

## Features Built
- **Add Recipe tab**: Generate from text idea or parse from URL. Preview before saving.
- **Library tab**: Recipe grid with category filter. Book shelf at top for collection filtering.
- **Recipe Books**: Scrollable shelf view, create/delete books with emoji picker, add/remove recipes from books via the detail modal. Books stored in Supabase `recipe_books` table.
- **Meal Plan tab**: 7-day calendar grid. Drag recipes from library. AI "Plan My Week" with Easy Mode (flags nights for quick recipes ≤30 min).
- **Grocery List tab**: AI-generated from meal plan, categorized by store section, shareable via URL.
- **Auth**: Email/password + Google OAuth via Supabase. Site URL configured to `coocheena.com`.
- **Mobile nav**: Bottom tab bar (4 main tabs) + hamburger slide-out (Sign Out). Responsive breakpoint at 768px.
- **Feedback widget**: Floating red button bottom-right. EmailJS sends to `gubgub.prod@gmail.com`. Three types: Bug, Feature, General. Pre-fills logged-in user's email.
- **Ticker**: Animated marquee in the header bar.

## Seed Logic (New Users)
On first login, if a user has no recipe books:
- Claude generates a Classic Spaghetti Carbonara recipe
- Saves it to Supabase `recipes`
- Creates a ⭐ "Getting Started" `recipe_books` row with that recipe ID
- Guards with localStorage key `rv2_seeded_{userId}` to prevent repeat runs

**Pending**: Replace the single AI-generated seed recipe with a static set of 40-50 curated recipes from a `src/starterRecipes.js` file (user is compiling these in markdown format).

## EmailJS Config
Constants at the top of App.jsx:
```js
const EMAILJS_SERVICE_ID  = "service_x5nb9bq";
const EMAILJS_TEMPLATE_ID = "template_p41pwvr";
const EMAILJS_PUBLIC_KEY  = "-WH1PmKm41XUBa0WQ";
```
Template variables expected: `{{feedback_type}}`, `{{user_email}}`, `{{message}}`.

## Cloudflare Worker
- **Deploy**: `cd worker && wrangler deploy`
- **Secrets**: `wrangler secret put ANTHROPIC_API_KEY`
- **CORS origins**: Hardcoded in `worker/index.js` — update if domains change:
  ```js
  const ALLOWED_ORIGINS = [
    "https://coocheena.com",
    "https://www.coocheena.com",
    "https://recipevault-86p.pages.dev",
    "http://localhost:5173",
    "http://localhost:4173",
  ];
  ```

## Local Dev
```bash
cd ~/recipevault
npm run dev          # Vite dev server at localhost:5173
```
No `.env.local` needed — the Worker URL is hardcoded as a fallback in App.jsx.

## Deploy
Push to `main` → Cloudflare Pages auto-builds and deploys. Usually live within 2 minutes.
```bash
git add .
git commit -m "your message"
git push
```

## Pending Work
1. **Starter recipe book seeding**: User will provide 40-50 recipes in markdown format. Convert to `src/starterRecipes.js` and update seed logic in the `loadUserData` effect to insert all of them instead of generating one via Claude.
2. Markdown template for recipes:
   ```markdown
   # Recipe Title
   **Description:** One sentence.
   **Category:** Dinner
   **Prep Time:** 15 min
   **Cook Time:** 30 min
   **Servings:** 4
   **Tags:** quick, weeknight
   ## Ingredients
   - ...
   ## Steps
   1. ...
   ---
   (next recipe)
   ```
