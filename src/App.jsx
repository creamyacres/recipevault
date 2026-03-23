import { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://pmkfrzpyqcgkfujpdkdf.supabase.co";
const SUPABASE_KEY = "sb_publishable_bMU1GrxhDzwSV2P3eggzog_iltkZU9i";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const GOOGLE_FONTS = `@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Nunito:ital,wght@0,400;0,700;0,800;1,700&display=swap');`;

const STYLES = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #FFF5E6; font-family: 'Nunito', sans-serif; }

  /* ── Core tokens ── */
  :root {
    --cream: #FFF5E6;
    --cream-dark: #F5EAD4;
    --ink: #1A0A00;
    --red: #E8421A;
    --yellow: #FFD166;
    --muted: #7A5A3A;
    --border: 3px solid #1A0A00;
  }

  /* ── Buttons ── */
  .pm-btn {
    border: 3px solid #1A0A00; font-family: 'Nunito', sans-serif; font-size: 13px;
    font-weight: 800; text-transform: uppercase; letter-spacing: 1px;
    cursor: pointer; transition: background 0.1s, color 0.1s; padding: 10px 20px;
  }
  .pm-btn:disabled { opacity: 0.5; cursor: default; }
  .pm-btn-primary { background: #E8421A; color: #fff; border-color: #E8421A; }
  .pm-btn-yellow { background: #FFD166; color: #1A0A00; }
  .pm-btn-ghost { background: #FFF5E6; color: #1A0A00; }
  .pm-btn-ghost:hover { background: #1A0A00; color: #FFF5E6; }
  .pm-btn-dark { background: #1A0A00; color: #FFF5E6; }

  /* ── Inputs ── */
  .pm-input {
    border: 3px solid #1A0A00; font-family: 'Nunito', sans-serif; font-size: 14px;
    font-weight: 700; background: #fff; color: #1A0A00; padding: 12px 16px; outline: none;
  }
  .pm-input::placeholder { color: #C4A882; }
  .pm-input:focus { border-color: #E8421A; }

  /* ── Tags ── */
  .pm-tag {
    border: 2px solid #1A0A00; font-family: 'Nunito', sans-serif;
    font-size: 10px; font-weight: 800; text-transform: uppercase;
    letter-spacing: 1px; padding: 2px 10px;
  }

  /* ── Header ── */
  .pm-header {
    background: #FFF5E6; border-bottom: 3px solid #1A0A00;
    position: sticky; top: 0; z-index: 100;
  }

  /* ── Ticker ── */
  .cc-ticker {
    background: #E8421A; border-bottom: 3px solid #1A0A00;
    padding: 9px 0; overflow: hidden; white-space: nowrap;
  }
  .cc-ticker-inner {
    display: inline-flex; animation: ticker 22s linear infinite;
  }
  .cc-ticker-item {
    font-family: 'Bebas Neue', cursive; font-size: 16px;
    letter-spacing: 2.5px; color: #FFF5E6; padding: 0 24px;
  }
  .cc-ticker-dot { color: #FFD166; padding: 0 4px; font-size: 16px; }
  @keyframes ticker {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  /* ── Cards ── */
  .pm-card {
    background: #FFF5E6; border: 3px solid #1A0A00;
    cursor: pointer; position: relative; transition: background 0.1s;
  }
  .pm-card:hover { background: #FFD166; }

  /* ── Sections ── */
  .pm-section {
    background: #FFF5E6; border: 3px solid #1A0A00;
    padding: 20px; margin-bottom: 20px;
  }

  /* ── Modal ── */
  .pm-modal-bg {
    position: fixed; inset: 0; background: rgba(26,10,0,0.6);
    z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 20px;
  }
  .pm-modal {
    background: #FFF5E6; border: 4px solid #1A0A00;
    max-width: 640px; width: 100%;
    max-height: 88vh; overflow-y: auto; padding: 36px; position: relative;
  }

  /* ── Stat box ── */
  .pm-stat-box {
    background: #FFD166; border: 3px solid #1A0A00;
    text-align: center; padding: 10px 18px;
  }

  /* ── Loading anim ── */
  @keyframes bounce {
    0%,100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-8px) rotate(5deg); }
  }
  .cooking-anim { animation: bounce 0.8s ease-in-out infinite; display: inline-block; font-size: 44px; }

  /* ── Calendar ── */
  .cal-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 0; border: 3px solid #1A0A00; }
  .cal-day {
    background: #FFF5E6; border-right: 3px solid #1A0A00;
    min-height: 140px; padding: 8px;
    display: flex; flex-direction: column; gap: 4px;
  }
  .cal-day:last-child { border-right: none; }
  .cal-day.easy-mode { background: #FFF9E6; }
  .cal-day.drag-over { background: #FFD166; }
  .cal-day-header {
    font-family: 'Bebas Neue', cursive; font-size: 14px; letter-spacing: 1px;
    color: #1A0A00; text-align: center; margin-bottom: 2px;
    border-bottom: 2px solid #1A0A00; padding-bottom: 4px;
  }
  .cal-meal-slot {
    border: 2px dashed #C4A882; padding: 4px 6px;
    font-family: 'Nunito', sans-serif; font-size: 11px; font-weight: 700; color: #C4A882;
    text-align: center; cursor: pointer; transition: all 0.1s; min-height: 32px;
    display: flex; align-items: center; justify-content: center;
  }
  .cal-meal-slot:hover { border-color: #E8421A; color: #E8421A; }
  .cal-meal-slot.filled {
    background: #FFD166; border: 2px solid #1A0A00; color: #1A0A00;
    font-weight: 800; cursor: default;
  }
  .cal-meal-slot.filled .remove-meal {
    display: none; position: absolute; top: 2px; right: 2px;
    background: #E8421A; border: 1px solid #1A0A00; border-radius: 50%;
    width: 14px; height: 14px; font-size: 8px; color: #fff;
    cursor: pointer; align-items: center; justify-content: center; line-height: 1;
  }
  .cal-meal-slot.filled:hover .remove-meal { display: flex; }
  .cal-meal-slot-wrap { position: relative; }
  .meal-label {
    font-family: 'Bebas Neue', cursive; font-size: 10px; letter-spacing: 1px;
    color: #7A5A3A; margin-bottom: 2px;
  }

  /* ── Grocery ── */
  .grocery-section { margin-bottom: 0; border-bottom: 3px solid #1A0A00; }
  .grocery-section:last-child { border-bottom: none; }
  .grocery-section-header {
    font-family: 'Bebas Neue', cursive; font-size: 18px; letter-spacing: 2px; color: #FFD166;
    background: #1A0A00; padding: 8px 16px;
  }
  .grocery-item {
    display: flex; align-items: center; gap: 10px; padding: 10px 16px;
    background: #FFF5E6; border-bottom: 2px dashed #E0D0BC; transition: background 0.1s;
  }
  .grocery-item:last-child { border-bottom: none; }
  .grocery-item.checked { background: #F5EFE5; }
  .grocery-item.skipped { opacity: 0.4; }
  .grocery-item-name { font-family: 'Nunito', sans-serif; font-size: 14px; font-weight: 800; flex: 1; color: #1A0A00; }
  .grocery-item.checked .grocery-item-name { text-decoration: line-through; color: #C4A882; }

  /* ── Drag ── */
  .dragging { opacity: 0.5; }

  /* ── Toast ── */
  .toast {
    position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%) translateY(80px);
    background: #1A0A00; color: #FFF5E6; padding: 12px 28px;
    font-family: 'Bebas Neue', cursive; font-size: 17px; letter-spacing: 2px;
    border: 3px solid #E8421A;
    transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
    z-index: 9999; pointer-events: none;
  }
  .toast.show { transform: translateX(-50%) translateY(0); }

  /* ── Auth ── */
  .auth-card {
    background: #FFF5E6; border: 4px solid #1A0A00;
    padding: 40px; width: 100%; max-width: 440px;
    box-shadow: 8px 8px 0 #1A0A00;
  }
  .auth-tab {
    flex: 1; padding: 10px; font-family: 'Nunito', sans-serif;
    font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px;
    border: 3px solid #1A0A00; cursor: pointer; transition: all 0.1s;
  }
  .auth-tab.active { background: #E8421A; color: #fff; border-color: #E8421A; }
  .auth-tab:not(.active) { background: #fff; color: #1A0A00; }
  .auth-tab:first-child { border-radius: 0; }
  .auth-tab:last-child { border-radius: 0; }
  .google-btn {
    width: 100%; padding: 12px; background: #fff; border: 3px solid #1A0A00;
    font-family: 'Nunito', sans-serif; font-size: 14px; font-weight: 800;
    cursor: pointer; display: flex; align-items: center; justify-content: center;
    gap: 10px; transition: background 0.1s;
  }
  .google-btn:hover { background: #F5EFE5; }
  .divider {
    display: flex; align-items: center; gap: 12px; margin: 18px 0;
    font-family: 'Nunito', sans-serif; font-size: 13px; color: #7A5A3A; font-weight: 700;
  }
  .divider::before, .divider::after { content: ''; flex: 1; border-top: 2px solid #C4A882; }

  /* ── Recipe Books Shelf ── */
  .rb-shelf {
    display: flex; gap: 12px; overflow-x: auto; padding: 4px 0 20px;
    scrollbar-width: thin; scrollbar-color: #1A0A00 #FFF5E6;
    -webkit-overflow-scrolling: touch;
  }
  .rb-shelf::-webkit-scrollbar { height: 4px; }
  .rb-shelf::-webkit-scrollbar-track { background: #FFF5E6; }
  .rb-shelf::-webkit-scrollbar-thumb { background: #1A0A00; }
  .rb-book-card {
    flex-shrink: 0; width: 112px; background: #FFF5E6; border: 3px solid #1A0A00;
    padding: 14px 10px; cursor: pointer; transition: background 0.1s, transform 0.1s;
    display: flex; flex-direction: column; align-items: center; gap: 5px; text-align: center;
    position: relative;
  }
  .rb-book-card:hover { background: #FFD166; transform: translateY(-2px); }
  .rb-book-card.active { background: #1A0A00; }
  .rb-book-card.active .rb-book-name { color: #FFF5E6; }
  .rb-book-card.active .rb-book-count { color: #FFD166; }
  .rb-book-emoji { font-size: 30px; line-height: 1; }
  .rb-book-name {
    font-family: 'Bebas Neue', cursive; font-size: 13px; letter-spacing: 1px;
    color: #1A0A00; line-height: 1.2; word-break: break-word; width: 100%;
  }
  .rb-book-count {
    font-family: 'Nunito', sans-serif; font-size: 10px; font-weight: 800;
    color: #7A5A3A; text-transform: uppercase; letter-spacing: 0.5px;
  }
  .rb-book-delete {
    position: absolute; top: 4px; right: 4px;
    background: #E8421A; border: 1px solid #1A0A00; width: 18px; height: 18px;
    font-size: 9px; color: #fff; cursor: pointer; display: none;
    align-items: center; justify-content: center; font-weight: 800;
  }
  .rb-book-card:not(.active):hover .rb-book-delete { display: flex; }
  .rb-new-book-btn {
    flex-shrink: 0; width: 90px; background: #FFF5E6; border: 3px dashed #C4A882;
    padding: 14px 10px; cursor: pointer; transition: all 0.1s;
    display: flex; flex-direction: column; align-items: center; gap: 5px;
    font-family: 'Bebas Neue', cursive; font-size: 12px; letter-spacing: 1px; color: #C4A882;
  }
  .rb-new-book-btn:hover { border-color: #1A0A00; color: #1A0A00; background: #FFD166; }
  .rb-new-book-form {
    flex-shrink: 0; background: #FFF5E6; border: 3px solid #1A0A00;
    padding: 14px 12px; display: flex; flex-direction: column; gap: 8px; width: 200px;
  }

  /* ── Responsive mobile ── */
  @media (max-width: 768px) {
    .cal-grid { grid-template-columns: 1fr; }
    .cal-day { border-right: none; border-bottom: 3px solid #1A0A00; min-height: auto; }
    .cal-day:last-child { border-bottom: none; }
  }

  /* ── Mobile nav ── */
  .pm-desktop-nav { display: flex; gap: 6px; flex-wrap: wrap; align-items: center; }
  .pm-hamburger-btn { display: none; }
  .pm-bottom-nav { display: none; }

  @media (max-width: 768px) {
    .pm-desktop-nav { display: none !important; }

    .pm-hamburger-btn {
      display: flex; align-items: center; justify-content: center;
      background: none; border: 3px solid #1A0A00; width: 44px; height: 44px;
      cursor: pointer; font-size: 22px; color: #1A0A00; flex-shrink: 0;
    }

    .pm-bottom-nav {
      display: flex; position: fixed; bottom: 0; left: 0; right: 0;
      background: #FFF5E6; border-top: 3px solid #1A0A00; z-index: 100; height: 64px;
    }
    .pm-bottom-nav-item {
      flex: 1; display: flex; flex-direction: column; align-items: center;
      justify-content: center; gap: 1px; border: none; background: none;
      cursor: pointer; padding: 6px 2px;
      border-right: 2px solid #1A0A00;
      font-family: 'Bebas Neue', cursive; font-size: 9px; letter-spacing: 1px; color: #1A0A00;
      transition: background 0.1s;
    }
    .pm-bottom-nav-item:last-child { border-right: none; }
    .pm-bottom-nav-item.active { background: #FFD166; }
    .pm-bottom-nav-item .nav-icon { font-size: 22px; line-height: 1; }

    .pm-mobile-content { padding-bottom: 80px; }
  }

  /* ── Feedback Widget ── */
  .fb-btn {
    position: fixed; bottom: 24px; right: 20px;
    background: #E8421A; border: 3px solid #1A0A00; color: #fff;
    font-family: 'Bebas Neue', cursive; font-size: 14px; letter-spacing: 2px;
    padding: 10px 16px; cursor: pointer; z-index: 500;
    box-shadow: 3px 3px 0 #1A0A00; transition: transform 0.1s, box-shadow 0.1s;
  }
  .fb-btn:hover { transform: translateY(-2px); box-shadow: 3px 5px 0 #1A0A00; }
  .fb-panel {
    position: fixed; bottom: 78px; right: 20px;
    width: 300px; background: #FFF5E6; border: 3px solid #1A0A00;
    z-index: 500; box-shadow: 5px 5px 0 #1A0A00; padding: 20px;
  }
  @media (max-width: 768px) {
    .fb-btn { bottom: 74px; right: 12px; font-size: 12px; padding: 8px 12px; }
    .fb-panel { bottom: 140px; right: 10px; left: 10px; width: auto; }
  }

  /* ── Hamburger slide-out menu ── */
  .pm-hamburger-overlay {
    position: fixed; inset: 0; background: rgba(26,10,0,0.5); z-index: 200;
  }
  .pm-hamburger-panel {
    position: absolute; top: 0; right: 0; width: 220px; height: 100%;
    background: #FFF5E6; border-left: 4px solid #1A0A00;
    display: flex; flex-direction: column; padding-top: 80px;
  }
  .pm-hamburger-panel-item {
    width: 100%; padding: 18px 28px; background: none; border: none;
    border-bottom: 2px solid #1A0A00; text-align: left; cursor: pointer;
    font-family: 'Bebas Neue', cursive; font-size: 20px; letter-spacing: 2px; color: #1A0A00;
    transition: background 0.1s;
  }
  .pm-hamburger-panel-item:hover { background: #FFD166; }
  .pm-hamburger-panel-item.danger { color: #E8421A; }
`

// ── EmailJS feedback config ──
// Sign up at emailjs.com, then replace these three values:
const EMAILJS_SERVICE_ID  = "service_x5nb9bq";
const EMAILJS_TEMPLATE_ID = "template_p41pwvr";
const EMAILJS_PUBLIC_KEY  = "WH1PmKm41XUBa0WQ";

async function sendFeedbackEmail({ feedbackType, userEmail, message }) {
  const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: EMAILJS_SERVICE_ID,
      template_id: EMAILJS_TEMPLATE_ID,
      user_id: EMAILJS_PUBLIC_KEY,
      template_params: {
        feedback_type: feedbackType,
        user_email: userEmail,
        message,
      }
    })
  });
  if (!res.ok) throw new Error("EmailJS error");
}

// ── Constants ──
const CATEGORIES = ["Breakfast","Lunch","Dinner","Dessert","Snacks","Drinks","Other"];
const MEALS = ["Breakfast","Lunch","Dinner"];
const DAYS = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
const DAY_SHORT = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const GROCERY_SECTIONS = ["Produce","Meat & Seafood","Dairy & Eggs","Pantry & Dry Goods","Frozen","Bakery","Other"];

const CAT_COLORS = {
  Breakfast:{bg:"#ffd166",text:"#1a1a1a"}, Lunch:{bg:"#06d6a0",text:"#1a1a1a"},
  Dinner:{bg:"#ef476f",text:"#fff"}, Dessert:{bg:"#ff9f1c",text:"#1a1a1a"},
  Snacks:{bg:"#a8dadc",text:"#1a1a1a"}, Drinks:{bg:"#457b9d",text:"#fff"},
  Other:{bg:"#c8b8ff",text:"#1a1a1a"},
};

const MEAL_COLORS = { Breakfast:"#ffd166", Lunch:"#06d6a0", Dinner:"#ef476f" };

const KEYS = {
  recipes: "rv2_recipes",
  mealPlan: "rv2_mealplan",
  groceryList: "rv2_grocery",
  mealHistory: "rv2_history",
};

// ── Storage helpers ──
const load = (key, def) => { try { return JSON.parse(localStorage.getItem(key)) ?? def; } catch { return def; } };
const save = (key, val) => { try { localStorage.setItem(key, JSON.stringify(val)); } catch {} };

// ── Claude API ──
// Requests go through our Cloudflare Worker proxy (worker/index.js) so the
// Anthropic API key is never exposed client-side and CORS is handled server-side.
// Set VITE_AI_PROXY_URL in Cloudflare Pages environment variables after deploying the worker.
const AI_PROXY_URL = import.meta.env.VITE_AI_PROXY_URL || "https://coocheena-ai-proxy.ztsantore.workers.dev";

async function callClaude(system, user, maxTokens = 1500) {
  const res = await fetch(AI_PROXY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: maxTokens, system, messages: [{ role: "user", content: user }] })
  });
  const data = await res.json();
  const text = data.content?.map(b => b.text || "").join("") || "";
  try { return JSON.parse(text.replace(/```json|```/g, "").trim()); } catch { return null; }
}

// For URL parsing: worker fetches the page content, then Claude parses it
async function callClaudeWithUrl(system, url, maxTokens = 1500) {
  const res = await fetch(AI_PROXY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: maxTokens, system, fetchUrl: url })
  });
  const data = await res.json();
  const text = data.content?.map(b => b.text || "").join("") || "";
  try { return JSON.parse(text.replace(/```json|```/g, "").trim()); } catch { return null; }
}

const SYS_RECIPE_PARSE = `You are a recipe parser. Return ONLY a JSON object:
{"title":"...","description":"One sentence.","prepTime":"15 min","cookTime":"30 min","servings":"4","category":"Dinner","ingredients":["..."],"steps":["..."],"tags":["..."]}`;

const SYS_RECIPE_GEN = `You are a creative chef. Return ONLY a JSON object:
{"title":"...","description":"One sentence.","prepTime":"15 min","cookTime":"30 min","servings":"4","category":"Dinner","ingredients":["..."],"steps":["..."],"tags":["..."]}`;

const SYS_MEAL_PLAN = `You are a meal planning assistant. Return ONLY a JSON object mapping day names to recipe IDs for dinner slots. Use exactly this format:
{"Monday":"recipeId","Tuesday":"recipeId",...}
Rules: avoid recipes used in the last 2 weeks, prefer quick recipes (under 30min total) for easy mode nights.`;

const SYS_GROCERY = `You are a grocery list generator. Given a list of ingredients from multiple recipes, consolidate them (combine duplicates, sum quantities) and categorize each. Return ONLY a JSON array:
[{"name":"2 cloves garlic","section":"Produce"},{"name":"1 lb chicken breast","section":"Meat & Seafood"},...]
Sections must be one of: Produce, Meat & Seafood, Dairy & Eggs, Pantry & Dry Goods, Frozen, Bakery, Other.`;

// ── Utility ──
function parseTotalMinutes(prepTime, cookTime) {
  const parse = str => { if (!str) return 0; const m = str.match(/(\d+)/); return m ? parseInt(m[1]) : 0; };
  return parse(prepTime) + parse(cookTime);
}

function getWeekOf() {
  const d = new Date();
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  const mon = new Date(d.setDate(diff));
  return mon.toISOString().split("T")[0];
}

// ── Toast ──
function useToast() {
  const [msg, setMsg] = useState("");
  const [show, setShow] = useState(false);
  const timer = useRef(null);
  const toast = (m) => {
    setMsg(m); setShow(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setShow(false), 2500);
  };
  return { msg, show, toast };
}

// ── RecipeCard ──
function RecipeCard({ recipe, onClick, onDelete, wobble = "", draggable = false, onDragStart }) {
  const cat = recipe.category || "Other";
  const colors = CAT_COLORS[cat] || CAT_COLORS.Other;
  return (
    <div className={`pm-card ${wobble}`}
      draggable={draggable}
      onDragStart={onDragStart ? (e) => { e.dataTransfer.setData("recipeId", recipe.id); onDragStart(e); } : undefined}
      onClick={() => onClick(recipe)}
      style={{ padding: "18px", cursor: draggable ? "grab" : "pointer" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"8px" }}>
        <span className="pm-tag" style={{ background: cat === "Dinner" ? "#E8421A" : cat === "Lunch" ? "#4CAF82" : cat === "Dessert" ? "#FFD166" : "#1A0A00", color: cat === "Dessert" ? "#1A0A00" : "#fff", borderColor: cat === "Dinner" ? "#E8421A" : cat === "Lunch" ? "#4CAF82" : cat === "Dessert" ? "#1A0A00" : "#1A0A00" }}>{cat}</span>
        <button onClick={e => { e.stopPropagation(); onDelete(recipe.id); }}
          style={{ background:"#E8421A", border:"2px solid #1A0A00", width:"26px", height:"26px", cursor:"pointer", fontSize:"12px", color:"#fff", fontWeight:800, lineHeight:1, flexShrink:0 }}>✕</button>
      </div>
      <h3 style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"20px", letterSpacing:"1px", color:"#1A0A00", margin:"6px 0 4px", lineHeight:1.1 }}>{recipe.title}</h3>
      <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:"12px", fontWeight:700, color:"#7A5A3A", margin:"0 0 10px", lineHeight:1.4 }}>{recipe.description}</p>
      <div style={{ display:"flex", gap:"6px", flexWrap:"wrap" }}>
        {recipe.prepTime && <span style={{ fontFamily:"'Nunito',sans-serif", fontSize:"11px", fontWeight:800, background:"#FFD166", border:"2px solid #1A0A00", padding:"1px 7px" }}>⏱ {recipe.prepTime}</span>}
        {recipe.cookTime && <span style={{ fontFamily:"'Nunito',sans-serif", fontSize:"11px", fontWeight:800, background:"#E8421A", border:"2px solid #1A0A00", padding:"1px 7px", color:"#fff" }}>🔥 {recipe.cookTime}</span>}
      </div>
      {draggable && <div style={{ fontFamily:"'Nunito',sans-serif", fontSize:"10px", fontWeight:800, color:"#C4A882", marginTop:"6px", textAlign:"center", textTransform:"uppercase", letterSpacing:"0.5px" }}>drag to calendar ↑</div>}
    </div>
  );
}

// ── RecipeModal ──
function RecipeModal({ recipe, onClose, onSave, books = [], onToggleBook }) {
  const [category, setCategory] = useState(recipe.category || "Other");
  const [saved, setSaved] = useState(recipe._saved || false);
  return (
    <div className="pm-modal-bg" onClick={onClose}>
      <div className="pm-modal" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="pm-btn" style={{ position:"absolute", top:"16px", right:"16px", background:"#ff5252", color:"#fff", width:"34px", height:"34px", padding:0, fontSize:"16px" }}>✕</button>
        <div style={{ display:"flex", gap:"8px", flexWrap:"wrap", marginBottom:"12px" }}>
          {recipe.tags?.map(t => <span key={t} className="pm-tag" style={{ background:"#c8b8ff", color:"#1a1a1a" }}>{t}</span>)}
        </div>
        <h2 style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"36px", letterSpacing:"1px", color:"#1A0A00", margin:"0 0 8px", lineHeight:1, paddingRight:"40px" }}>{recipe.title}</h2>
        <p style={{ fontFamily:"'Nunito',sans-serif", color:"#7A5A3A", fontWeight:700, margin:"0 0 20px", fontSize:"14px", lineHeight:1.6 }}>{recipe.description}</p>
        <div style={{ display:"flex", gap:"10px", flexWrap:"wrap", marginBottom:"20px" }}>
          {recipe.prepTime && <div className="pm-stat-box"><div style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"22px", letterSpacing:"1px" }}>{recipe.prepTime}</div><div style={{ fontFamily:"'Nunito',sans-serif", fontSize:"10px", fontWeight:800, textTransform:"uppercase", letterSpacing:"1px" }}>Prep</div></div>}
          {recipe.cookTime && <div className="pm-stat-box" style={{ background:"#E8421A" }}><div style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"22px", letterSpacing:"1px", color:"#fff" }}>{recipe.cookTime}</div><div style={{ fontFamily:"'Nunito',sans-serif", fontSize:"10px", fontWeight:800, textTransform:"uppercase", letterSpacing:"1px", color:"#fff" }}>Cook</div></div>}
          {recipe.servings && <div className="pm-stat-box" style={{ background:"#FFD166" }}><div style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"22px", letterSpacing:"1px" }}>{recipe.servings}</div><div style={{ fontFamily:"'Nunito',sans-serif", fontSize:"10px", fontWeight:800, textTransform:"uppercase", letterSpacing:"1px" }}>Servings</div></div>}
        </div>
        <div className="pm-section wobble-1" style={{ marginBottom:"14px" }}>
          <h4 style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"22px", letterSpacing:"1px", color:"#1A0A00", marginBottom:"10px" }}>Ingredients</h4>
          <ul style={{ fontFamily:"'Nunito',sans-serif", color:"#1a1a1a", lineHeight:1.9, paddingLeft:"20px" }}>
            {recipe.ingredients?.map((ing,i) => <li key={i} style={{ fontSize:"13px", fontWeight:600 }}>{ing}</li>)}
          </ul>
        </div>
        <div className="pm-section wobble-2" style={{ marginBottom:"18px" }}>
          <h4 style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"22px", letterSpacing:"1px", color:"#1A0A00", marginBottom:"10px" }}>Instructions</h4>
          <ol style={{ fontFamily:"'Nunito',sans-serif", color:"#1a1a1a", lineHeight:1.8, paddingLeft:"22px" }}>
            {recipe.steps?.map((step,i) => <li key={i} style={{ fontSize:"13px", fontWeight:600, marginBottom:"8px" }}>{step}</li>)}
          </ol>
        </div>
        {!recipe._saved && (
          <div style={{ borderTop:"3px dashed #1a1a1a", paddingTop:"18px" }}>
            <div style={{ display:"flex", gap:"10px", alignItems:"center", flexWrap:"wrap" }}>
              <select value={category} onChange={e => setCategory(e.target.value)} className="pm-input" style={{ flex:1, minWidth:"140px" }}>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
              <button onClick={() => { onSave({ ...recipe, category, _saved:true }); setSaved(true); }} className="pm-btn"
                style={{ background: saved ? "#FFD166" : "#E8421A", color: saved ? "#1A0A00" : "#fff", padding:"10px 24px", flex:1, borderColor: saved ? "#1A0A00" : "#E8421A" }}>
                {saved ? "✓ Saved!" : "Save Recipe!"}
              </button>
            </div>
          </div>
        )}
        {recipe._saved && books.length > 0 && onToggleBook && (
          <div style={{ borderTop:"3px dashed #1a1a1a", paddingTop:"18px", marginTop:"6px" }}>
            <h4 style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"20px", letterSpacing:"1px", color:"#1A0A00", marginBottom:"10px" }}>📚 Add to Book</h4>
            <div style={{ display:"flex", flexWrap:"wrap", gap:"8px" }}>
              {books.map(book => {
                const inBook = book.recipeIds.includes(recipe.id);
                return (
                  <button key={book.id} onClick={() => onToggleBook(book.id, recipe.id)} className="pm-btn"
                    style={{ padding:"7px 14px", fontSize:"12px", background: inBook ? "#1A0A00" : "#FFF5E6", color: inBook ? "#FFF5E6" : "#1A0A00" }}>
                    {inBook ? "✓ " : ""}{book.emoji} {book.name}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Easy Mode Modal ──
function EasyModeModal({ onConfirm, onCancel }) {
  const [selected, setSelected] = useState([]);
  const toggle = d => setSelected(prev => prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d]);
  return (
    <div className="pm-modal-bg">
      <div className="pm-modal" style={{ maxWidth:"480px" }} onClick={e => e.stopPropagation()}>
        <div style={{ textAlign:"center", marginBottom:"24px" }}>
          <div style={{ fontSize:"48px", marginBottom:"8px" }}>⚡</div>
          <h2 style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"32px", letterSpacing:"1px", color:"#1A0A00" }}>Which nights are Easy Mode?</h2>
          <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:"14px", color:"#7a5c3a", marginTop:"8px", fontWeight:600 }}>
            Easy Mode nights get quick recipes (≤30 min total). Tap the nights you'll be busy or tired!
          </p>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px", marginBottom:"24px" }}>
          {DAYS.map(d => (
            <button key={d} onClick={() => toggle(d)} className="pm-btn"
              style={{ padding:"12px", background: selected.includes(d) ? "#457b9d" : "#fff", color: selected.includes(d) ? "#fff" : "#1a1a1a", fontSize:"16px" }}>
              {selected.includes(d) ? "⚡" : "🍽️"} {d}
            </button>
          ))}
        </div>
        <div style={{ display:"flex", gap:"10px" }}>
          <button onClick={onCancel} className="pm-btn" style={{ flex:1, padding:"12px", background:"#f5e6c8", color:"#1a1a1a" }}>Cancel</button>
          <button onClick={() => onConfirm(selected)} className="pm-btn" style={{ flex:2, padding:"12px", background:"#ff5252", color:"#fff" }}>
            ✨ Generate My Week!
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Meal Calendar Tab ──
function MealCalendarTab({ recipes, mealPlan, setMealPlan, mealHistory, setMealHistory, toast }) {
  const [showEasyMode, setShowEasyMode] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [dragOver, setDragOver] = useState(null); // "day-meal"
  const [pickerFor, setPickerFor] = useState(null); // {day, meal}

  const weekOf = mealPlan.weekOf || getWeekOf();

  const getSlot = (day, meal) => {
    const id = mealPlan.days?.[day]?.[meal];
    return id ? recipes.find(r => r.id === id) : null;
  };

  const setSlot = (day, meal, recipeId) => {
    setMealPlan(prev => ({
      ...prev,
      weekOf,
      days: { ...prev.days, [day]: { ...(prev.days?.[day] || {}), [meal]: recipeId } }
    }));
  };

  const clearSlot = (day, meal) => {
    setMealPlan(prev => {
      const days = { ...prev.days };
      if (days[day]) { const d = { ...days[day] }; delete d[meal]; days[day] = d; }
      return { ...prev, days };
    });
  };

  const handleDrop = (e, day, meal) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("recipeId");
    if (id) { setSlot(day, meal, parseInt(id)); toast("📅 Recipe added to " + day + " " + meal + "!"); }
    setDragOver(null);
  };

  const generateWeek = async (easyNights) => {
    setShowEasyMode(false);
    setGenerating(true);

    // Get recent history (last 2 weeks)
    const historyTitles = mealHistory.map(h => h.title);
    const dinnerRecipes = recipes.filter(r => !r.category || r.category === "Dinner" || r.category === "Other");
    const easyRecipes = dinnerRecipes.filter(r => parseTotalMinutes(r.prepTime, r.cookTime) <= 30);
    const normalRecipes = dinnerRecipes.filter(r => !historyTitles.includes(r.title));

    if (dinnerRecipes.length < 3) {
      toast("⚠️ Add more dinner recipes first!"); setGenerating(false); return;
    }

    const recipeList = dinnerRecipes.map(r => ({
      id: r.id, title: r.title,
      totalTime: parseTotalMinutes(r.prepTime, r.cookTime),
      isQuick: parseTotalMinutes(r.prepTime, r.cookTime) <= 30
    }));

    const result = await callClaude(SYS_MEAL_PLAN,
      `Here are my saved dinner recipes: ${JSON.stringify(recipeList)}
Recent history (avoid these): ${JSON.stringify(historyTitles)}
Easy mode nights (assign quick recipes ≤30min): ${JSON.stringify(easyNights)}
Assign one dinner recipe per day for all 7 days. Return JSON mapping day name to recipe id number.`
    , 800);

    if (result) {
      const newDays = { ...(mealPlan.days || {}) };
      DAYS.forEach(day => {
        if (result[day]) {
          const rid = typeof result[day] === "string" ? parseInt(result[day]) : result[day];
          newDays[day] = { ...(newDays[day] || {}), Dinner: rid };
        }
      });
      // Save to history
      const newHistory = [...mealHistory];
      DAYS.forEach(day => {
        const rid = newDays[day]?.Dinner;
        if (rid) {
          const r = recipes.find(x => x.id === rid);
          if (r && !newHistory.find(h => h.title === r.title)) {
            newHistory.push({ title: r.title, weekOf, addedAt: Date.now() });
          }
        }
      });
      // Keep only 2 weeks of history
      const twoWeeksAgo = Date.now() - 14 * 24 * 60 * 60 * 1000;
      setMealHistory(newHistory.filter(h => h.addedAt > twoWeeksAgo));
      setMealPlan(prev => ({ ...prev, weekOf, days: newDays, easyNights }));
      toast("✨ Week planned! Drag to adjust.");
    } else {
      toast("⚠️ Couldn't generate plan. Try again!"); 
    }
    setGenerating(false);
  };

  const clearWeek = () => { setMealPlan({ weekOf, days: {}, easyNights: [] }); toast("🗑️ Week cleared!"); };

  return (
    <div>
      {/* Header */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"20px", flexWrap:"wrap", gap:"12px" }}>
        <div style={{ display:"inline-block", background:"#ffd166", border:"3px solid #1a1a1a", borderRadius:"12px", boxShadow:"4px 4px 0 #1a1a1a", padding:"8px 20px" }}>
          <h2 style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"32px", letterSpacing:"1px", color:"#1A0A00" }}>📅 Weekly Meal Plan</h2>
        </div>
        <div style={{ display:"flex", gap:"8px", flexWrap:"wrap" }}>
          <button onClick={() => setShowEasyMode(true)} disabled={generating || recipes.length === 0} className="pm-btn"
            style={{ padding:"10px 18px", background: generating ? "#c8b89a" : "#ff5252", color:"#fff", fontSize:"14px" }}>
            {generating ? <><span className="cooking-anim" style={{ fontSize:"16px" }}>🍳</span> Planning...</> : "⚡ AI Plan My Week"}
          </button>
          <button onClick={clearWeek} className="pm-btn" style={{ padding:"10px 14px", background:"#f5e6c8", color:"#1a1a1a", fontSize:"13px" }}>🗑️ Clear</button>
        </div>
      </div>

      {recipes.length === 0 && (
        <div style={{ textAlign:"center", padding:"40px", background:"#fff9ed", border:"3px dashed #c8b89a", borderRadius:"16px", marginBottom:"20px" }}>
          <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:"16px", fontWeight:700, color:"#7a5c3a" }}>Add some recipes first, then come back to plan your week! 🍽️</p>
        </div>
      )}

      {/* Legend */}
      <div style={{ display:"flex", gap:"10px", marginBottom:"12px", flexWrap:"wrap", alignItems:"center" }}>
        <span style={{ fontFamily:"'Nunito',sans-serif", fontSize:"12px", fontWeight:700, color:"#7a5c3a" }}>Legend:</span>
        <span style={{ background:"#e8f5ff", border:"2px solid #457b9d", borderRadius:"6px", padding:"2px 10px", fontFamily:"'Nunito',sans-serif", fontSize:"12px", fontWeight:700, color:"#457b9d" }}>⚡ Easy Mode Night</span>
        {MEALS.map(m => <span key={m} style={{ background: MEAL_COLORS[m], border:"2px solid #1a1a1a", borderRadius:"6px", padding:"2px 10px", fontFamily:"'Nunito',sans-serif", fontSize:"11px", fontWeight:700 }}>{m}</span>)}
      </div>

      {/* Calendar Grid */}
      <div className="cal-grid" style={{ marginBottom:"20px" }}>
        {DAYS.map((day, di) => {
          const isEasy = mealPlan.easyNights?.includes(day);
          return (
            <div key={day} className={`cal-day ${isEasy ? "easy-mode" : ""}`}>
              <div className="cal-day-header">
                {isEasy && <span style={{ color:"#457b9d" }}>⚡</span>} {DAY_SHORT[di]}
              </div>
              {MEALS.map(meal => {
                const recipe = getSlot(day, meal);
                const slotKey = `${day}-${meal}`;
                return (
                  <div key={meal} className="cal-meal-slot-wrap"
                    onDragOver={e => { e.preventDefault(); setDragOver(slotKey); }}
                    onDragLeave={() => setDragOver(null)}
                    onDrop={e => handleDrop(e, day, meal)}>
                    <div className="meal-label" style={{ color: MEAL_COLORS[meal] }}>{meal.slice(0,1)}</div>
                    {recipe ? (
                      <div className="cal-meal-slot filled" style={{ borderColor: MEAL_COLORS[meal], background: MEAL_COLORS[meal] + "22", position:"relative" }}>
                        <span style={{ fontSize:"10px", lineHeight:1.2, display:"block" }}>{recipe.title}</span>
                        <button className="remove-meal" onClick={() => clearSlot(day, meal)} style={{ display:"flex" }}>✕</button>
                      </div>
                    ) : (
                      <div className={`cal-meal-slot ${dragOver === slotKey ? "drag-over" : ""}`}
                        onClick={() => setPickerFor({ day, meal })}>
                        +
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Drag-from sidebar hint */}
      <div style={{ background:"#fff9ed", border:"3px dashed #c8b89a", borderRadius:"12px", padding:"14px 20px", marginBottom:"20px", display:"flex", alignItems:"center", gap:"10px" }}>
        <span style={{ fontSize:"20px" }}>👆</span>
        <span style={{ fontFamily:"'Nunito',sans-serif", fontSize:"13px", fontWeight:700, color:"#7a5c3a" }}>
          Drag recipes from <strong>My Recipes</strong> onto any slot, or click a <strong>+</strong> to pick from your library!
        </span>
      </div>

      {showEasyMode && <EasyModeModal onConfirm={generateWeek} onCancel={() => setShowEasyMode(false)} />}

      {/* Recipe picker modal */}
      {pickerFor && (
        <div className="pm-modal-bg" onClick={() => setPickerFor(null)}>
          <div className="pm-modal" style={{ maxWidth:"520px" }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setPickerFor(null)} className="pm-btn" style={{ position:"absolute", top:"16px", right:"16px", background:"#ff5252", color:"#fff", width:"34px", height:"34px", padding:0, fontSize:"16px" }}>✕</button>
            <h3 style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"26px", letterSpacing:"1px", color:"#1A0A00", marginBottom:"16px" }}>
              Pick a recipe for {pickerFor.day} {pickerFor.meal}
            </h3>
            <div style={{ display:"flex", flexDirection:"column", gap:"8px", maxHeight:"60vh", overflowY:"auto" }}>
              {recipes.map(r => (
                <div key={r.id} onClick={() => { setSlot(pickerFor.day, pickerFor.meal, r.id); setPickerFor(null); toast("📅 Added!"); }}
                  style={{ display:"flex", alignItems:"center", gap:"12px", padding:"10px 14px", background:"#fff9ed", border:"2px solid #1a1a1a", borderRadius:"10px", cursor:"pointer", boxShadow:"2px 2px 0 #1a1a1a", transition:"all 0.1s" }}
                  onMouseEnter={e => e.currentTarget.style.background="#ffd166"}
                  onMouseLeave={e => e.currentTarget.style.background="#fff9ed"}>
                  <span className="pm-tag" style={{ background: (CAT_COLORS[r.category]||CAT_COLORS.Other).bg, color:(CAT_COLORS[r.category]||CAT_COLORS.Other).text, flexShrink:0 }}>{r.category}</span>
                  <div style={{ flex:1 }}>
                    <div style={{ fontFamily:"'Nunito',sans-serif", fontSize:"14px", fontWeight:800 }}>{r.title}</div>
                    <div style={{ fontFamily:"'Nunito',sans-serif", fontSize:"11px", color:"#7a5c3a" }}>⏱ {r.prepTime} · 🔥 {r.cookTime}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Grocery List Tab ──
function GroceryListTab({ recipes, mealPlan, groceryList, setGroceryList, toast }) {
  const [generating, setGenerating] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [showShare, setShowShare] = useState(false);

  const plannedRecipes = [];
  DAYS.forEach(day => {
    MEALS.forEach(meal => {
      const id = mealPlan.days?.[day]?.[meal];
      if (id) { const r = recipes.find(x => x.id === id); if (r) plannedRecipes.push(r); }
    });
  });
  const uniqueRecipes = plannedRecipes.filter((r,i,a) => a.findIndex(x => x.id === r.id) === i);

  const generateGroceryList = async () => {
    if (uniqueRecipes.length === 0) { toast("⚠️ Plan some meals first!"); return; }
    setGenerating(true);
    const allIngredients = uniqueRecipes.flatMap(r => r.ingredients || []);
    const result = await callClaude(SYS_GROCERY,
      `Consolidate and categorize these ingredients from ${uniqueRecipes.length} recipes: ${JSON.stringify(allIngredients)}`, 2000);
    if (result && Array.isArray(result)) {
      setGroceryList({ items: result.map((item, i) => ({ ...item, id: i, checked: false, skipped: false })), generatedAt: Date.now() });
      toast("🛒 Grocery list ready!");
    } else { toast("⚠️ Couldn't generate list. Try again!"); }
    setGenerating(false);
  };

  const toggleCheck = (id) => setGroceryList(prev => ({ ...prev, items: prev.items.map(item => item.id === id ? { ...item, checked: !item.checked } : item) }));
  const toggleSkip = (id) => setGroceryList(prev => ({ ...prev, items: prev.items.map(item => item.id === id ? { ...item, skipped: !item.skipped, checked: false } : item) }));
  const clearChecked = () => setGroceryList(prev => ({ ...prev, items: prev.items.map(i => ({ ...i, checked: false })) }));

  const bySection = GROCERY_SECTIONS.reduce((acc, s) => {
    acc[s] = (groceryList.items || []).filter(i => i.section === s && !i.skipped);
    return acc;
  }, {});

  const checkedCount = (groceryList.items || []).filter(i => i.checked).length;
  const totalCount = (groceryList.items || []).filter(i => !i.skipped).length;

  const handleShare = () => {
    try {
      const payload = btoa(encodeURIComponent(JSON.stringify({ items: groceryList.items, generatedAt: groceryList.generatedAt })));
      const url = `${window.location.origin}${window.location.pathname}?grocery=${payload}`;
      navigator.clipboard?.writeText(url).catch(() => {});
      setShareUrl(url);
      setShowShare(true);
      toast("🔗 Share link copied!");
    } catch { toast("⚠️ Couldn't generate link"); }
  };

  const handlePrint = () => window.print();

  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"20px", flexWrap:"wrap", gap:"12px" }}>
        <div style={{ display:"inline-block", background:"#06d6a0", border:"3px solid #1a1a1a", borderRadius:"12px", boxShadow:"4px 4px 0 #1a1a1a", padding:"8px 20px" }}>
          <h2 style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"32px", letterSpacing:"1px", color:"#1A0A00" }}>🛒 Grocery List</h2>
        </div>
        <div style={{ display:"flex", gap:"8px", flexWrap:"wrap" }}>
          <button onClick={generateGroceryList} disabled={generating || uniqueRecipes.length === 0} className="pm-btn"
            style={{ padding:"10px 16px", background: generating ? "#c8b89a" : "#ff5252", color:"#fff", fontSize:"13px" }}>
            {generating ? "Generating..." : "✨ Generate from Meal Plan"}
          </button>
          {groceryList.items?.length > 0 && <>
            <button onClick={handleShare} className="pm-btn" style={{ padding:"10px 14px", background:"#457b9d", color:"#fff", fontSize:"13px" }}>🔗 Share</button>
            <button onClick={handlePrint} className="pm-btn" style={{ padding:"10px 14px", background:"#ffd166", color:"#1a1a1a", fontSize:"13px" }}>🖨️ Print/PDF</button>
            <button onClick={clearChecked} className="pm-btn" style={{ padding:"10px 14px", background:"#f5e6c8", color:"#1a1a1a", fontSize:"13px" }}>↺ Uncheck All</button>
          </>}
        </div>
      </div>

      {/* Planned meals summary */}
      {uniqueRecipes.length > 0 && (
        <div style={{ background:"#fff9ed", border:"3px solid #1a1a1a", borderRadius:"12px", boxShadow:"3px 3px 0 #1a1a1a", padding:"14px 18px", marginBottom:"20px" }}>
          <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:"14px", fontWeight:800, color:"#1a1a1a", marginBottom:"8px" }}>📋 Based on {uniqueRecipes.length} planned recipes:</p>
          <div style={{ display:"flex", flexWrap:"wrap", gap:"6px" }}>
            {uniqueRecipes.map(r => (
              <span key={r.id} style={{ background:"#ffd166", border:"2px solid #1a1a1a", borderRadius:"20px", padding:"2px 10px", fontFamily:"'Nunito',sans-serif", fontSize:"12px", fontWeight:700 }}>{r.title}</span>
            ))}
          </div>
        </div>
      )}

      {groceryList.items?.length > 0 ? (
        <>
          {/* Progress bar */}
          <div style={{ background:"#fff9ed", border:"3px solid #1a1a1a", borderRadius:"12px", padding:"14px 18px", marginBottom:"20px", boxShadow:"3px 3px 0 #1a1a1a" }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"8px" }}>
              <span style={{ fontFamily:"'Nunito',sans-serif", fontSize:"15px", fontWeight:800 }}>🛍️ {checkedCount} / {totalCount} items grabbed!</span>
              {checkedCount === totalCount && totalCount > 0 && <span style={{ fontFamily:"'Nunito',sans-serif", fontSize:"15px", fontWeight:800, color:"#06d6a0" }}>✓ All done!</span>}
            </div>
            <div style={{ background:"#e2c89a", borderRadius:"100px", height:"12px", border:"2px solid #1a1a1a", overflow:"hidden" }}>
              <div style={{ background:"#06d6a0", height:"100%", width:`${totalCount > 0 ? (checkedCount/totalCount)*100 : 0}%`, transition:"width 0.3s", borderRadius:"100px" }}/>
            </div>
          </div>

          {GROCERY_SECTIONS.map(section => {
            const items = bySection[section];
            if (!items?.length) return null;
            return (
              <div key={section} className="grocery-section">
                <div className="grocery-section-header">{section}</div>
                {items.map(item => (
                  <div key={item.id} className={`grocery-item ${item.checked ? "checked" : ""}`}>
                    <input type="checkbox" checked={item.checked} onChange={() => toggleCheck(item.id)}
                      style={{ width:"18px", height:"18px", cursor:"pointer", accentColor:"#06d6a0" }}/>
                    <span className="grocery-item-name">{item.name}</span>
                    <button onClick={() => toggleSkip(item.id)}
                      style={{ background:"#f5e6c8", border:"2px solid #c8b89a", borderRadius:"6px", padding:"2px 8px", fontFamily:"'Nunito',sans-serif", fontSize:"11px", fontWeight:700, cursor:"pointer", color:"#7a5c3a", whiteSpace:"nowrap" }}>
                      ✓ Have it
                    </button>
                  </div>
                ))}
              </div>
            );
          })}

          {/* Skipped items */}
          {groceryList.items.filter(i => i.skipped).length > 0 && (
            <div style={{ marginTop:"20px" }}>
              <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:"14px", fontWeight:800, color:"#7a5c3a", marginBottom:"8px" }}>✓ Already have ({groceryList.items.filter(i=>i.skipped).length}):</p>
              <div style={{ display:"flex", flexWrap:"wrap", gap:"6px" }}>
                {groceryList.items.filter(i => i.skipped).map(item => (
                  <span key={item.id} onClick={() => toggleSkip(item.id)}
                    style={{ background:"#e2c89a", border:"2px solid #c8b89a", borderRadius:"20px", padding:"3px 12px", fontFamily:"'Nunito',sans-serif", fontSize:"12px", fontWeight:700, cursor:"pointer", textDecoration:"line-through", color:"#7a5c3a" }}>
                    {item.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <div style={{ textAlign:"center", padding:"80px 20px" }}>
          <div style={{ fontSize:"52px", marginBottom:"16px" }}>🛒</div>
          <p style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"32px", letterSpacing:"1px", color:"#1A0A00", marginBottom:"8px" }}>No grocery list yet!</p>
          <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:"14px", fontWeight:700, color:"#7a5c3a" }}>
            {uniqueRecipes.length === 0 ? "Plan some meals in the 📅 Meal Plan tab first!" : "Hit \"Generate from Meal Plan\" to build your list!"}
          </p>
        </div>
      )}

      {/* Share modal */}
      {showShare && (
        <div className="pm-modal-bg" onClick={() => setShowShare(false)}>
          <div className="pm-modal" style={{ maxWidth:"440px" }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowShare(false)} className="pm-btn" style={{ position:"absolute", top:"16px", right:"16px", background:"#ff5252", color:"#fff", width:"34px", height:"34px", padding:0, fontSize:"16px" }}>✕</button>
            <h3 style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"28px", letterSpacing:"1px", color:"#1A0A00", marginBottom:"16px" }}>🔗 Share Grocery List</h3>
            <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:"13px", color:"#7a5c3a", marginBottom:"12px", fontWeight:600 }}>Anyone with this link can view and check off items in real time!</p>
            <div style={{ background:"#f5e6c8", border:"3px solid #1a1a1a", borderRadius:"10px", padding:"10px 14px", marginBottom:"16px", wordBreak:"break-all", fontFamily:"'Nunito',sans-serif", fontSize:"11px", color:"#1a1a1a" }}>
              {shareUrl}
            </div>
            <button onClick={() => { navigator.clipboard?.writeText(shareUrl); toast("Copied!"); }} className="pm-btn"
              style={{ width:"100%", padding:"12px", background:"#06d6a0", color:"#1a1a1a" }}>📋 Copy Link</button>
          </div>
        </div>
      )}
    </div>
  );
}


// ── Auth Screen ──
function AuthScreen({ onAuth }) {
  const [authTab, setAuthTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleEmail = async () => {
    if (!email.trim() || !password.trim()) { setError("Please fill in all fields."); return; }
    setLoading(true); setError(""); setMessage("");
    try {
      if (authTab === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setMessage("✅ Check your email to confirm your account, then log in!");
        setLoading(false); return;
      }
    } catch (e) { setError(e.message || "Something went wrong."); }
    setLoading(false);
  };

  const handleGoogle = async () => {
    setLoading(true); setError("");
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin }
    });
    if (error) { setError(error.message); setLoading(false); }
  };

  return (
    <>
      <style>{GOOGLE_FONTS}</style>
      <style>{STYLES}</style>
      <div style={{ minHeight:"100vh", background:"#FFF5E6", display:"flex", alignItems:"center", justifyContent:"center", padding:"20px" }}>
        <div className="auth-card">
          <div style={{ textAlign:"center", marginBottom:"28px" }}>
            <div style={{ fontSize:"52px", marginBottom:"8px" }}>🍳</div>
            <h1 style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"48px", letterSpacing:"3px" }}>
              <span style={{ color:"#1A0A00" }}>Coo</span><span style={{ color:"#E8421A" }}>Cheena</span>
            </h1>
            <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:"13px", color:"#7A5A3A", fontWeight:800, marginTop:"4px", textTransform:"uppercase", letterSpacing:"1px" }}>Your kitchen, your recipes.</p>
          </div>

          {/* Google login */}
          <button className="google-btn" onClick={handleGoogle} disabled={loading}>
            <svg width="20" height="20" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Continue with Google
          </button>

          <div className="divider">or</div>

          {/* Email/password tabs */}
          <div style={{ display:"flex", marginBottom:"18px", borderRadius:"10px", overflow:"hidden", border:"3px solid #1a1a1a", boxShadow:"3px 3px 0 #1a1a1a" }}>
            <button className={`auth-tab ${authTab === "login" ? "active" : ""}`} onClick={() => { setAuthTab("login"); setError(""); setMessage(""); }}>Log In</button>
            <button className={`auth-tab ${authTab === "signup" ? "active" : ""}`} onClick={() => { setAuthTab("signup"); setError(""); setMessage(""); }}>Sign Up</button>
          </div>

          <div style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address" type="email"
              className="pm-input" style={{ width:"100%" }} onKeyDown={e => e.key === "Enter" && handleEmail()} />
            <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password"
              className="pm-input" style={{ width:"100%" }} onKeyDown={e => e.key === "Enter" && handleEmail()} />

            {error && <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:"13px", color:"#ff5252", fontWeight:700, textAlign:"center" }}>{error}</p>}
            {message && <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:"13px", color:"#06d6a0", fontWeight:700, textAlign:"center" }}>{message}</p>}

            <button onClick={handleEmail} disabled={loading} className="pm-btn"
              style={{ width:"100%", padding:"14px", background:"#E8421A", color:"#fff", fontSize:"15px", borderColor:"#E8421A" }}>
              {loading ? "..." : authTab === "login" ? "🔑 Log In" : "🎉 Create Account"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// ── Feedback Widget ──
function FeedbackWidget({ user }) {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("General");
  const [msg, setMsg] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState(false);

  const close = () => { setOpen(false); setDone(false); setErr(false); setMsg(""); setType("General"); };

  const handleSubmit = async () => {
    if (!msg.trim()) return;
    setSending(true); setErr(false);
    try {
      await sendFeedbackEmail({
        feedbackType: type,
        userEmail: user?.email || "Anonymous",
        message: msg.trim(),
      });
      setDone(true);
      setTimeout(close, 2800);
    } catch {
      setErr(true);
    }
    setSending(false);
  };

  return (
    <>
      <button className="fb-btn" onClick={() => setOpen(o => !o)}>
        💬 Feedback
      </button>
      {open && (
        <div className="fb-panel">
          {done ? (
            <div style={{ textAlign:"center", padding:"16px 0" }}>
              <div style={{ fontSize:"38px", marginBottom:"8px" }}>✅</div>
              <p style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"20px", letterSpacing:"1px", color:"#1A0A00" }}>Thanks! We'll look into it.</p>
            </div>
          ) : (
            <>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"14px" }}>
                <h3 style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"22px", letterSpacing:"1px", color:"#1A0A00" }}>Send Feedback</h3>
                <button onClick={close} style={{ background:"none", border:"none", fontSize:"18px", cursor:"pointer", color:"#7A5A3A", lineHeight:1 }}>✕</button>
              </div>
              <div style={{ display:"flex", gap:"4px", marginBottom:"12px" }}>
                {["Bug", "Feature", "General"].map(t => (
                  <button key={t} onClick={() => setType(t)} className="pm-btn"
                    style={{ flex:1, padding:"5px 4px", fontSize:"10px", background: type === t ? "#1A0A00" : "#FFF5E6", color: type === t ? "#FFF5E6" : "#1A0A00" }}>
                    {t === "Bug" ? "🐛 Bug" : t === "Feature" ? "✨ Feature" : "💬 General"}
                  </button>
                ))}
              </div>
              <textarea value={msg} onChange={e => setMsg(e.target.value)}
                placeholder="Tell us what's on your mind..."
                className="pm-input"
                style={{ width:"100%", minHeight:"90px", resize:"vertical", fontSize:"13px", display:"block", marginBottom:"10px" }} />
              {err && <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:"12px", fontWeight:800, color:"#E8421A", marginBottom:"8px" }}>Something went wrong — try again!</p>}
              <button onClick={handleSubmit} disabled={sending || !msg.trim()} className="pm-btn pm-btn-primary"
                style={{ width:"100%", padding:"10px" }}>
                {sending ? "Sending..." : "Send →"}
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}

// ── Main App ──
export default function CooCheena() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const [recipes, setRecipes] = useState([]);
  const [mealPlan, setMealPlan] = useState({ weekOf: getWeekOf(), days: {}, easyNights: [] });
  const [groceryList, setGroceryList] = useState({ items: [] });
  const [mealHistory, setMealHistory] = useState(() => load(KEYS.mealHistory, []));

  const [books, setBooks] = useState([]);
  const [activeBook, setActiveBook] = useState(null);
  const [showNewBook, setShowNewBook] = useState(false);
  const [newBookName, setNewBookName] = useState("");
  const [newBookEmoji, setNewBookEmoji] = useState("📖");

  const [input, setInput] = useState("");
  const [mode, setMode] = useState("generate");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [selected, setSelected] = useState(null);
  const [filterCat, setFilterCat] = useState("All");
  const [error, setError] = useState("");
  const [tab, setTab] = useState("add");
  const [menuOpen, setMenuOpen] = useState(false);
  const [dragRecipe, setDragRecipe] = useState(null);
  const { msg: toastMsg, show: toastShow, toast } = useToast();

  // ── Auth listener ──
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setAuthLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  // ── Load all user data when user logs in ──
  useEffect(() => {
    if (!user) return;
    const loadUserData = async () => {
      // Load recipes
      const { data: recipesData } = await supabase.from("recipes")
        .select("*").eq("user_id", user.id).order("created_at", { ascending: false });
      if (recipesData) {
        setRecipes(recipesData.map(r => ({
          id: r.id, title: r.title, description: r.description,
          prepTime: r.prep_time, cookTime: r.cook_time, servings: r.servings,
          category: r.category, ingredients: r.ingredients, steps: r.steps,
          tags: r.tags, website: r.website, _saved: true
        })));
      }

      // Load meal plan + grocery list (non-blocking)
      supabase.from("meal_plans").select("*").eq("user_id", user.id).eq("week_of", getWeekOf()).single()
        .then(({ data }) => { if (data) setMealPlan({ weekOf: data.week_of, days: data.days || {}, easyNights: data.easy_mode_nights || [] }); });
      supabase.from("grocery_lists").select("*").eq("user_id", user.id).eq("week_of", getWeekOf()).single()
        .then(({ data }) => { if (data) setGroceryList({ items: data.items || [] }); });

      // Load recipe books
      const { data: booksData } = await supabase.from("recipe_books")
        .select("*").eq("user_id", user.id).order("created_at");

      const seededKey = `rv2_seeded_${user.id}`;
      if (booksData && booksData.length === 0 && !localStorage.getItem(seededKey)) {
        // New user — seed a starter recipe + "Getting Started" book
        localStorage.setItem(seededKey, "1");
        const starterRecipe = await callClaude(SYS_RECIPE_GEN,
          "Create a recipe for: Classic Spaghetti Carbonara");
        if (starterRecipe?.title) {
          const { data: savedRecipe } = await supabase.from("recipes").insert({
            user_id: user.id, title: starterRecipe.title, description: starterRecipe.description,
            prep_time: starterRecipe.prepTime, cook_time: starterRecipe.cookTime,
            servings: starterRecipe.servings, category: starterRecipe.category || "Dinner",
            ingredients: starterRecipe.ingredients || [], steps: starterRecipe.steps || [],
            tags: starterRecipe.tags || [], website: ""
          }).select().single();
          if (savedRecipe) {
            setRecipes(prev => [{ id: savedRecipe.id, ...starterRecipe, _saved: true }, ...prev]);
            const { data: newBook } = await supabase.from("recipe_books").insert({
              user_id: user.id, name: "Getting Started", emoji: "⭐",
              recipe_ids: [savedRecipe.id]
            }).select().single();
            if (newBook) {
              setBooks([{ id: newBook.id, name: newBook.name, emoji: newBook.emoji, recipeIds: newBook.recipe_ids || [] }]);
              toast("🎉 Welcome! Your Getting Started book is ready!");
            }
          }
        }
      } else if (booksData) {
        setBooks(booksData.map(b => ({ id: b.id, name: b.name, emoji: b.emoji, recipeIds: b.recipe_ids || [] })));
      }
    };
    loadUserData();
  }, [user]);

  // ── Persist meal history locally ──
  useEffect(() => save(KEYS.mealHistory, mealHistory), [mealHistory]);

  // ── Sync meal plan to Supabase ──
  useEffect(() => {
    if (!user || !mealPlan.weekOf) return;
    supabase.from("meal_plans").upsert({
      user_id: user.id, week_of: mealPlan.weekOf,
      days: mealPlan.days || {}, easy_mode_nights: mealPlan.easyNights || []
    }, { onConflict: "user_id,week_of" });
  }, [mealPlan, user]);

  // ── Sync grocery list to Supabase ──
  useEffect(() => {
    if (!user) return;
    supabase.from("grocery_lists").upsert({
      user_id: user.id, week_of: getWeekOf(), items: groceryList.items || []
    }, { onConflict: "user_id,week_of" });
  }, [groceryList, user]);

  const signOut = async () => {
    await supabase.auth.signOut();
    setRecipes([]); setMealPlan({ weekOf: getWeekOf(), days: {}, easyNights: [] });
    setGroceryList({ items: [] }); setBooks([]); setActiveBook(null);
    toast("👋 Signed out!");
  };

  // ── Book helpers ──
  const createBook = async () => {
    if (!newBookName.trim() || !user) return;
    const { data, error: err } = await supabase.from("recipe_books").insert({
      user_id: user.id, name: newBookName.trim(), emoji: newBookEmoji, recipe_ids: []
    }).select().single();
    if (!err && data) {
      setBooks(prev => [...prev, { id: data.id, name: data.name, emoji: data.emoji, recipeIds: data.recipe_ids || [] }]);
      setNewBookName(""); setNewBookEmoji("📖"); setShowNewBook(false);
      toast("📚 Book created!");
    }
  };

  const deleteBook = async (bookId) => {
    if (!user) return;
    await supabase.from("recipe_books").delete().eq("id", bookId).eq("user_id", user.id);
    setBooks(prev => prev.filter(b => b.id !== bookId));
    if (activeBook === bookId) setActiveBook(null);
    toast("🗑️ Book deleted.");
  };

  const toggleRecipeInBook = async (bookId, recipeId) => {
    if (!user) return;
    const book = books.find(b => b.id === bookId);
    if (!book) return;
    const inBook = book.recipeIds.includes(recipeId);
    const newIds = inBook ? book.recipeIds.filter(id => id !== recipeId) : [...book.recipeIds, recipeId];
    const { error: err } = await supabase.from("recipe_books")
      .update({ recipe_ids: newIds }).eq("id", bookId).eq("user_id", user.id);
    if (!err) {
      setBooks(prev => prev.map(b => b.id === bookId ? { ...b, recipeIds: newIds } : b));
    }
  };

  // Check for shared grocery list in URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const shared = params.get("grocery");
    if (shared) {
      try {
        const data = JSON.parse(decodeURIComponent(atob(shared)));
        setGroceryList(data);
        setTab("grocery");
        history.replaceState(null, "", window.location.pathname);
      } catch {}
    }
  }, []);

  const handleSubmit = async () => {
    if (!input.trim()) return;
    setLoading(true); setError(""); setPreview(null);
    try {
      const isUrl = input.trim().startsWith("http");
      const result = isUrl
        ? await callClaudeWithUrl(SYS_RECIPE_PARSE, input.trim())
        : await callClaude(SYS_RECIPE_GEN, `Create a recipe for: ${input.trim()}`);
      if (!result?.title) throw new Error();
      setPreview({ ...result, id: Date.now() });
    } catch { setError("Something went wrong! Try a different idea."); }
    setLoading(false);
  };

  const handleSave = async (recipe) => {
    if (!user) return;
    const dbRecipe = {
      user_id: user.id, title: recipe.title, description: recipe.description,
      prep_time: recipe.prepTime, cook_time: recipe.cookTime, servings: recipe.servings,
      category: recipe.category, ingredients: recipe.ingredients || [],
      steps: recipe.steps || [], tags: recipe.tags || [], website: recipe.website || ""
    };
    const { data, error } = await supabase.from("recipes").insert(dbRecipe).select().single();
    if (!error && data) {
      const saved = { id: data.id, ...recipe, _saved: true };
      setRecipes(prev => [saved, ...prev.filter(r => r.id !== recipe.id)]);
      toast("✅ Recipe saved!");
    } else { toast("❌ Failed to save recipe."); }
  };

  const handleDelete = async (id) => {
    if (!user) return;
    await supabase.from("recipes").delete().eq("id", id).eq("user_id", user.id);
    setRecipes(prev => prev.filter(r => r.id !== id));
    toast("🗑️ Recipe deleted.");
  };
  let filtered = filterCat === "All" ? recipes : recipes.filter(r => r.category === filterCat);
  if (activeBook !== null) {
    const activeBookData = books.find(b => b.id === activeBook);
    if (activeBookData) filtered = filtered.filter(r => activeBookData.recipeIds.includes(r.id));
  }

  const TABS = [
    { id: "add", label: "✏️ Add" },
    { id: "library", label: `📚 Recipes (${recipes.length})` },
    { id: "calendar", label: "📅 Meal Plan" },
    { id: "grocery", label: "🛒 Grocery List" },
  ];

  // Auth gate
  if (authLoading) {
    return (
      <>
        <style>{GOOGLE_FONTS}</style>
        <style>{STYLES}</style>
        <div style={{ minHeight:"100vh", background:"#FFF5E6", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <div style={{ textAlign:"center" }}>
            <div className="cooking-anim">🍳</div>
            <p style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"24px", letterSpacing:"2px", color:"#1A0A00", marginTop:"14px" }}>Loading...</p>
          </div>
        </div>
      </>
    );
  }

  if (!user) return <AuthScreen />;

  return (
    <>
      <style>{GOOGLE_FONTS}</style>
      <style>{STYLES}</style>
      <div style={{ minHeight:"100vh", background:"#FFF5E6" }}>

        {/* Header */}
        <header className="pm-header">
          <div style={{ maxWidth:"1100px", margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", height:"68px", padding:"0 24px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
              <span style={{ fontSize:"28px" }}>🍳</span>
              <h1 style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"32px", letterSpacing:"3px" }}>
                <span style={{ color:"#1A0A00" }}>Coo</span><span style={{ color:"#E8421A" }}>Cheena</span>
              </h1>
            </div>
            {/* Desktop nav */}
            <nav className="pm-desktop-nav">
              {TABS.map(t => (
                <button key={t.id} onClick={() => setTab(t.id)} className="pm-btn"
                  style={{ padding:"8px 14px", background: tab === t.id ? "#FFD166" : "#fff", color:"#1A0A00", fontSize:"13px" }}>
                  {t.label}
                </button>
              ))}
              <button onClick={signOut} className="pm-btn"
                style={{ padding:"8px 14px", background:"#1A0A00", color:"#fff", fontSize:"13px", marginLeft:"6px" }}>
                Sign Out
              </button>
            </nav>
            {/* Mobile hamburger button */}
            <button className="pm-hamburger-btn" onClick={() => setMenuOpen(true)} aria-label="Menu">
              ☰
            </button>
          </div>
        </header>

        {/* Ticker */}
        <div className="cc-ticker">
          <div className="cc-ticker-inner">
            <span className="cc-ticker-item">WHAT'S FOR DINNER</span><span className="cc-ticker-dot">✦</span>
            <span className="cc-ticker-item">AI POWERED RECIPES</span><span className="cc-ticker-dot">✦</span>
            <span className="cc-ticker-item">MEAL PLAN YOUR WEEK</span><span className="cc-ticker-dot">✦</span>
            <span className="cc-ticker-item">GROCERY LIST READY</span><span className="cc-ticker-dot">✦</span>
            <span className="cc-ticker-item">YOUR KITCHEN YOUR RULES</span><span className="cc-ticker-dot">✦</span>
            <span className="cc-ticker-item">WHAT'S FOR DINNER</span><span className="cc-ticker-dot">✦</span>
            <span className="cc-ticker-item">AI POWERED RECIPES</span><span className="cc-ticker-dot">✦</span>
            <span className="cc-ticker-item">MEAL PLAN YOUR WEEK</span><span className="cc-ticker-dot">✦</span>
            <span className="cc-ticker-item">GROCERY LIST READY</span><span className="cc-ticker-dot">✦</span>
            <span className="cc-ticker-item">YOUR KITCHEN YOUR RULES</span><span className="cc-ticker-dot">✦</span>
          </div>
        </div>

        <main className="pm-mobile-content" style={{ maxWidth:"1200px", margin:"0 auto", padding:"40px 32px" }}>

          {/* ADD RECIPE TAB */}
          {tab === "add" && (
            <div style={{ maxWidth:"640px", margin:"0 auto" }}>
              <div style={{ marginBottom:"32px" }}>
                <h2 style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"80px", lineHeight:0.9, letterSpacing:"2px", color:"#1A0A00", marginBottom:"24px" }}>
                  <span style={{color:"#E8421A"}}>What</span><br/>Are You<br/><span style={{WebkitTextStroke:"3px #1A0A00", color:"transparent"}}>Cooking?</span>
                </h2>
                <p style={{ fontFamily:"'Nunito',sans-serif", color:"#7A5A3A", fontSize:"14px", fontWeight:700, marginBottom:"20px" }}>Paste a URL or describe what you want to make!</p>
              </div>
              <div style={{ display:"flex", gap:"10px", marginBottom:"16px" }}>
                {[{ val:"generate", label:"💡 From Idea" }, { val:"url", label:"🔗 From URL" }].map(m => (
                  <button key={m.val} onClick={() => setMode(m.val)} className="pm-btn"
                    style={{ padding:"11px 28px", background: mode === m.val ? "#E8421A" : "#FFF5E6", color: mode === m.val ? "#fff" : "#1A0A00", borderColor: mode === m.val ? "#E8421A" : "#1A0A00" }}>
                    {m.label}
                  </button>
                ))}
              </div>
              <div style={{ display:"flex", marginBottom:"28px", border:"3px solid #1A0A00", maxWidth:"560px" }}>
                <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSubmit()}
                  placeholder={mode === "url" ? "https://www.allrecipes.com/recipe/..." : "e.g. lemon pasta, chicken + spinach..."}
                  className="pm-input" style={{ flex:1, border:"none", outline:"none" }} />
                <button onClick={handleSubmit} disabled={loading || !input.trim()} className="pm-btn"
                  style={{ padding:"12px 24px", background: loading ? "#C4A882" : "#FFD166", color:"#1A0A00", whiteSpace:"nowrap", border:"none", borderLeft:"3px solid #1A0A00", fontFamily:"'Bebas Neue',cursive", fontSize:"20px", letterSpacing:"2px" }}>
                  {loading ? "Cooking..." : mode === "url" ? "Parse!" : "Generate!"}
                </button>
              </div>
              {error && <div style={{ textAlign:"center", marginBottom:"18px" }}><span style={{ fontFamily:"'Nunito',sans-serif", fontWeight:800, color:"#E8421A", fontSize:"14px", background:"#fff", border:"3px solid #E8421A", padding:"6px 16px", display:"inline-block" }}>{error}</span></div>}
              {loading && <div style={{ textAlign:"center", padding:"50px 0" }}><div className="cooking-anim">🍳</div><p style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"24px", letterSpacing:"2px", color:"#1A0A00", marginTop:"14px" }}>Crafting your recipe...</p></div>}
              {preview && !loading && (
                <div>
                  <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:"15px", fontWeight:800, color:"#1A0A00", marginBottom:"12px", textAlign:"center" }}>✨ Here's what I whipped up!</p>
                  <RecipeCard recipe={preview} onClick={() => setSelected(preview)} onDelete={() => setPreview(null)} wobble="wobble-1" />
                  <p style={{ textAlign:"center", fontSize:"11px", fontFamily:"'Nunito',sans-serif", fontWeight:800, color:"#7A5A3A", marginTop:"8px", textTransform:"uppercase", letterSpacing:"0.5px" }}>Click the card to view details & save!</p>
                </div>
              )}
            </div>
          )}

          {/* LIBRARY TAB */}
          {tab === "library" && (
            <div>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"18px", flexWrap:"wrap", gap:"10px" }}>
                <h2 style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"48px", letterSpacing:"2px", color:"#1A0A00", borderBottom:"3px solid #1A0A00", paddingBottom:"8px" }}>Your Library</h2>
              </div>

              {/* Book Shelf */}
              <div className="rb-shelf">
                {/* All Recipes card */}
                <div className={`rb-book-card ${activeBook === null ? "active" : ""}`} onClick={() => setActiveBook(null)}>
                  <span className="rb-book-emoji">📚</span>
                  <span className="rb-book-name">All Recipes</span>
                  <span className="rb-book-count">{recipes.length} recipe{recipes.length !== 1 ? "s" : ""}</span>
                </div>
                {/* User book cards */}
                {books.map(book => (
                  <div key={book.id} className={`rb-book-card ${activeBook === book.id ? "active" : ""}`}
                    onClick={() => setActiveBook(activeBook === book.id ? null : book.id)}>
                    <button className="rb-book-delete" onClick={e => { e.stopPropagation(); deleteBook(book.id); }}>✕</button>
                    <span className="rb-book-emoji">{book.emoji}</span>
                    <span className="rb-book-name">{book.name}</span>
                    <span className="rb-book-count">{book.recipeIds.length} recipe{book.recipeIds.length !== 1 ? "s" : ""}</span>
                  </div>
                ))}
                {/* New book */}
                {showNewBook ? (
                  <div className="rb-new-book-form">
                    <div style={{ display:"flex", gap:"4px", flexWrap:"wrap" }}>
                      {["📖","⭐","🌮","🥗","🍝","🍕","🥘","🍜"].map(e => (
                        <button key={e} onClick={() => setNewBookEmoji(e)}
                          style={{ fontSize:"18px", background: newBookEmoji === e ? "#FFD166" : "none", border: newBookEmoji === e ? "2px solid #1A0A00" : "2px solid transparent", cursor:"pointer", padding:"2px", borderRadius:"2px" }}>
                          {e}
                        </button>
                      ))}
                    </div>
                    <input value={newBookName} onChange={e => setNewBookName(e.target.value)}
                      placeholder="Book name..." className="pm-input"
                      style={{ fontSize:"12px", padding:"7px 10px" }}
                      onKeyDown={e => { if (e.key === "Enter") createBook(); if (e.key === "Escape") setShowNewBook(false); }}
                      autoFocus />
                    <div style={{ display:"flex", gap:"6px" }}>
                      <button onClick={createBook} className="pm-btn pm-btn-primary" style={{ flex:1, fontSize:"11px", padding:"6px" }}>Create</button>
                      <button onClick={() => { setShowNewBook(false); setNewBookName(""); }} className="pm-btn pm-btn-ghost" style={{ flex:1, fontSize:"11px", padding:"6px" }}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <button className="rb-new-book-btn" onClick={() => setShowNewBook(true)}>
                    <span style={{ fontSize:"22px" }}>+</span>
                    <span>New Book</span>
                  </button>
                )}
              </div>

              {/* Category filters */}
              <div style={{ display:"flex", gap:"6px", flexWrap:"wrap", marginBottom:"18px" }}>
                {["All", ...CATEGORIES].map(c => {
                  const active = filterCat === c;
                  return (
                    <button key={c} onClick={() => setFilterCat(c)} className="pm-btn"
                      style={{ padding:"6px 14px", fontSize:"11px", fontWeight:800, textTransform:"uppercase", letterSpacing:"0.8px", background: active ? "#1A0A00" : "#FFF5E6", color: active ? "#FFF5E6" : "#1A0A00", borderColor:"#1A0A00", borderRadius:"0" }}>
                      {c}
                    </button>
                  );
                })}
              </div>
              {filtered.length === 0 ? (
                <div style={{ textAlign:"center", padding:"80px 20px" }}>
                  <div style={{ fontSize:"52px", marginBottom:"16px" }}>📖</div>
                  <p style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"32px", letterSpacing:"1px", color:"#1A0A00", marginBottom:"8px" }}>No recipes yet!</p>
                  <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:"14px", fontWeight:700, color:"#7a5c3a" }}>Head to "✏️ Add" to get started</p>
                </div>
              ) : (
                <>
                  <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:"11px", fontWeight:800, color:"#7A5A3A", marginBottom:"12px", textTransform:"uppercase", letterSpacing:"0.5px" }}>Drag any recipe card onto the Meal Plan calendar</p>
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(260px, 1fr))", gap:"0", border:"3px solid #1A0A00" }}>
                    {filtered.map((r,i) => (
                      <RecipeCard key={r.id} recipe={r} onClick={setSelected} onDelete={handleDelete}
                        wobble={["wobble-1","wobble-2","wobble-3"][i%3]}
                        draggable={true}
                        onDragStart={() => setDragRecipe(r)} />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* MEAL PLAN TAB */}
          {tab === "calendar" && (
            <MealCalendarTab recipes={recipes} mealPlan={mealPlan} setMealPlan={setMealPlan}
              mealHistory={mealHistory} setMealHistory={setMealHistory} toast={toast} />
          )}

          {/* GROCERY LIST TAB */}
          {tab === "grocery" && (
            <GroceryListTab recipes={recipes} mealPlan={mealPlan}
              groceryList={groceryList} setGroceryList={setGroceryList} toast={toast} />
          )}

        </main>
      </div>

      {/* Recipe detail modal */}
      {selected && (
        <RecipeModal recipe={selected} onClose={() => setSelected(null)}
          books={books} onToggleBook={toggleRecipeInBook}
          onSave={r => { handleSave(r); setSelected(null); setPreview(null); setTab("library"); setInput(""); }} />
      )}

      {/* Toast */}
      <div className={`toast ${toastShow ? "show" : ""}`}>{toastMsg}</div>

      {/* Feedback widget */}
      <FeedbackWidget user={user} />

      {/* Mobile bottom nav */}
      <nav className="pm-bottom-nav">
        {[
          { id:"add",      icon:"✏️", label:"ADD"     },
          { id:"library",  icon:"📚", label:"RECIPES" },
          { id:"calendar", icon:"📅", label:"MEALS"   },
          { id:"grocery",  icon:"🛒", label:"GROCERY" },
        ].map(t => (
          <button key={t.id} className={`pm-bottom-nav-item${tab === t.id ? " active" : ""}`}
            onClick={() => setTab(t.id)}>
            <span className="nav-icon">{t.icon}</span>
            <span>{t.label}</span>
          </button>
        ))}
      </nav>

      {/* Mobile hamburger slide-out */}
      {menuOpen && (
        <div className="pm-hamburger-overlay" onClick={() => setMenuOpen(false)}>
          <div className="pm-hamburger-panel" onClick={e => e.stopPropagation()}>
            <button className="pm-hamburger-panel-item danger" onClick={() => { signOut(); setMenuOpen(false); }}>
              Sign Out
            </button>
          </div>
        </div>
      )}
    </>
  );
}
