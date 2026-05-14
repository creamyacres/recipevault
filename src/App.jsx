import { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";
import {
  CookingPot, CalendarBlank, ShoppingCart, Books, PencilSimple,
  MagnifyingGlass, Timer, Fire, X, Lightning, Trash, ChatCircle, Link as LinkIcon,
  Lightbulb, Brain, List as ListIcon, Diamond, Star, Printer, Sun, Moon,
  FloppyDisk, Check, ArrowRight, HandPointing, Bug, Sparkle, ClipboardText,
  Key, Confetti, Prohibit, BookOpen, ForkKnife, Package, Warning,
  Cookie, Leaf, Pizza, Coffee, Hamburger, IceCream, Wine, Egg, Fish,
  Carrot, Pepper, BowlFood, Cake, Bread, Flower, GearSix
} from "@phosphor-icons/react";

const BOOK_ICONS = {
  BookOpen, Star, ForkKnife, CookingPot, Fire, Cookie, Leaf, Pizza,
  Coffee, Hamburger, IceCream, Wine, Egg, Fish, Carrot, Pepper, BowlFood, Cake, Bread, Flower
};

const BookIcon = ({ icon, size = 30, ...props }) => {
  const Comp = BOOK_ICONS[icon];
  if (Comp) return <Comp size={size} weight="bold" {...props} />;
  return <span style={{ fontSize: size, lineHeight: 1 }}>{icon}</span>;
};

const SUPABASE_URL = "https://pmkfrzpyqcgkfujpdkdf.supabase.co";
const SUPABASE_KEY = "sb_publishable_bMU1GrxhDzwSV2P3eggzog_iltkZU9i";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const GOOGLE_FONTS = `@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Nunito:ital,wght@0,400;0,700;0,800;1,700&display=swap');`;

const STYLES = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { overflow-x: hidden; }
  body { background: #FFF5E6; font-family: 'Nunito', sans-serif; -webkit-font-smoothing: antialiased; }

  /* ── Core tokens ── */
  :root {
    --cream: #FFF5E6;
    --cream-dark: #F5EAD4;
    --ink: #1A0A00;
    --red: #E8421A;
    --yellow: #FFD166;
    --muted: #7A5A3A;
    --border: 3px solid #1A0A00;
    --radius-sm: 8px;
    --radius-md: 14px;
    --radius-lg: 20px;
    --shadow-sm: 0 2px 8px rgba(26,10,0,0.08);
    --shadow-md: 0 4px 20px rgba(26,10,0,0.10);
    --shadow-hard: 4px 4px 0 #1A0A00;
    --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
    --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
    --bg: #FFF5E6;
    --bg-card: #fff9ed;
    --bg-elevated: #fff;
    --text: #1A0A00;
    --text-muted: #7A5A3A;
    --border-subtle: rgba(26,10,0,0.2);
  }
  [data-theme="dark"] {
    --bg: #1a1510;
    --bg-card: #2a2018;
    --bg-elevated: #2a2018;
    --text: #F0E6D6;
    --text-muted: #9a8a7a;
    --border-subtle: rgba(255,255,255,0.1);
  }

  /* ── Buttons ── */
  .pm-btn {
    border: 3px solid #1A0A00; font-family: 'Nunito', sans-serif; font-size: 13px;
    font-weight: 800; text-transform: uppercase; letter-spacing: 1px;
    cursor: pointer; padding: 10px 20px; border-radius: var(--radius-sm);
    transition: transform 0.2s var(--ease-out), box-shadow 0.2s var(--ease-out), background 0.15s, color 0.15s;
  }
  .pm-btn:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(26,10,0,0.12); }
  .pm-btn:active { transform: translateY(0) scale(0.97); box-shadow: none; }
  .pm-btn:disabled { opacity: 0.5; cursor: default; transform: none; box-shadow: none; }
  .pm-btn-primary { background: #E8421A; color: #fff; border-color: #E8421A; }
  .pm-btn-primary:hover { background: #d63a15; }
  .pm-btn-yellow { background: #FFD166; color: #1A0A00; }
  .pm-btn-ghost { background: #FFF5E6; color: #1A0A00; }
  .pm-btn-ghost:hover { background: #1A0A00; color: #FFF5E6; }
  .pm-btn-dark { background: #1A0A00; color: #FFF5E6; }

  /* ── Inputs ── */
  .pm-input {
    border: 3px solid #1A0A00; font-family: 'Nunito', sans-serif; font-size: 14px;
    font-weight: 700; background: #fff; color: #1A0A00; padding: 12px 16px; outline: none;
    border-radius: var(--radius-sm);
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .pm-input::placeholder { color: #C4A882; }
  .pm-input:focus { border-color: #E8421A; box-shadow: 0 0 0 3px rgba(232,66,26,0.12); }

  /* ── Tags ── */
  .pm-tag {
    border: 2px solid #1A0A00; font-family: 'Nunito', sans-serif;
    font-size: 10px; font-weight: 800; text-transform: uppercase;
    letter-spacing: 1px; padding: 2px 10px; border-radius: 6px;
  }

  /* ── Header ── */
  .pm-header {
    background: rgba(255,245,230,0.92); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
    border-bottom: 3px solid #1A0A00;
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
    background: #FFF5E6; border: 3px solid #1A0A00; border-radius: var(--radius-md);
    cursor: pointer; position: relative; overflow: hidden;
    transition: transform 0.25s var(--ease-out), box-shadow 0.25s var(--ease-out), background 0.15s;
  }
  .pm-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(26,10,0,0.14); }
  .pm-card:active { transform: translateY(-1px) scale(0.98); }
  .pm-card .pm-card-img {
    transition: transform 0.4s var(--ease-out);
  }
  .pm-card:hover .pm-card-img { transform: scale(1.05); }

  /* ── Sections ── */
  .pm-section {
    background: #FFF5E6; border: 3px solid #1A0A00; border-radius: var(--radius-md);
    padding: 20px; margin-bottom: 20px;
  }

  /* ── Modal ── */
  body.modal-open { overflow: hidden; position: fixed; width: 100%; }
  .pm-modal-bg {
    position: fixed; inset: 0; background: rgba(26,10,0,0.5);
    backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px);
    z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 20px;
    animation: modalBgIn 0.25s var(--ease-out);
    overflow-y: auto; -webkit-overflow-scrolling: touch;
  }
  .pm-modal {
    background: #FFF5E6; border: 4px solid #1A0A00; border-radius: var(--radius-lg);
    max-width: 640px; width: 100%;
    max-height: 88vh; overflow-y: auto; padding: 36px; position: relative;
    box-shadow: 0 24px 80px rgba(26,10,0,0.2);
    animation: modalIn 0.3s var(--ease-spring);
    -webkit-overflow-scrolling: touch;
  }
  @keyframes modalBgIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes modalIn { from { opacity: 0; transform: scale(0.92) translateY(16px); } to { opacity: 1; transform: scale(1) translateY(0); } }

  /* ── Stat box ── */
  .pm-stat-box {
    background: #FFD166; border: 3px solid #1A0A00; border-radius: var(--radius-sm);
    text-align: center; padding: 10px 18px;
  }

  /* ── Loading anim ── */
  @keyframes bounce {
    0%,100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-8px) rotate(5deg); }
  }
  .cooking-anim { animation: bounce 0.8s ease-in-out infinite; display: inline-block; font-size: 44px; }

  /* ── Calendar ── */
  .cal-grid {
    display: grid; grid-template-columns: repeat(7, 1fr); gap: 0;
    border: 3px solid #1A0A00; border-radius: var(--radius-md); overflow: hidden;
    box-shadow: var(--shadow-md);
  }
  .cal-day {
    background: #FFF5E6; border-right: 2px solid rgba(26,10,0,0.12);
    min-height: 140px; padding: 8px;
    display: flex; flex-direction: column; gap: 4px;
    transition: background 0.2s;
  }
  .cal-day:last-child { border-right: none; }
  .cal-day.easy-mode { background: #eef6ff; }
  .cal-day.drag-over { background: #FFF0CC; }
  .cal-day-header {
    font-family: 'Bebas Neue', cursive; font-size: 14px; letter-spacing: 1px;
    color: #1A0A00; text-align: center; margin-bottom: 2px;
    border-bottom: 2px solid rgba(26,10,0,0.15); padding-bottom: 4px;
  }
  .cal-meal-slot {
    border: 2px dashed #d4c4a8; padding: 4px 6px; border-radius: 8px;
    font-family: 'Nunito', sans-serif; font-size: 11px; font-weight: 700; color: #C4A882;
    text-align: center; cursor: pointer; min-height: 32px;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.2s var(--ease-out);
  }
  .cal-meal-slot:hover { border-color: #E8421A; color: #E8421A; background: rgba(232,66,26,0.04); }
  .cal-meal-slot.filled {
    background: #FFD166; border: 2px solid #1A0A00; color: #1A0A00;
    font-weight: 800; cursor: default; border-radius: 8px;
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
  .grocery-wrap { border: 3px solid #1A0A00; border-radius: var(--radius-md); overflow: hidden; box-shadow: var(--shadow-md); }
  .grocery-section { margin-bottom: 0; border-bottom: 2px solid rgba(26,10,0,0.1); }
  .grocery-section:last-child { border-bottom: none; }
  .grocery-section-header {
    font-family: 'Bebas Neue', cursive; font-size: 18px; letter-spacing: 2px; color: #FFD166;
    background: #1A0A00; padding: 10px 18px;
  }
  .grocery-item {
    display: flex; align-items: center; gap: 10px; padding: 12px 18px;
    background: #FFF5E6; border-bottom: 1px solid rgba(26,10,0,0.06);
    transition: background 0.15s;
  }
  .grocery-item:hover { background: #fff9ed; }
  .grocery-item:last-child { border-bottom: none; }
  .grocery-item.checked { background: #f5f0e8; }
  .grocery-item.skipped { opacity: 0.4; }
  .grocery-item-name { font-family: 'Nunito', sans-serif; font-size: 14px; font-weight: 800; flex: 1; color: #1A0A00; transition: color 0.2s; }
  .grocery-item.checked .grocery-item-name { text-decoration: line-through; color: #C4A882; }

  /* ── Drag ── */
  .dragging { opacity: 0.5; }

  /* ── Toast ── */
  .toast {
    position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%) translateY(80px);
    background: #1A0A00; color: #FFF5E6; padding: 14px 32px;
    font-family: 'Bebas Neue', cursive; font-size: 17px; letter-spacing: 2px;
    border: 3px solid #E8421A; border-radius: var(--radius-md);
    box-shadow: 0 8px 32px rgba(26,10,0,0.25);
    transition: transform 0.4s var(--ease-spring), opacity 0.4s;
    z-index: 9999; pointer-events: none; opacity: 0;
  }
  .toast.show { transform: translateX(-50%) translateY(0); opacity: 1; }

  /* ── Auth ── */
  .auth-card {
    background: #FFF5E6; border: 4px solid #1A0A00; border-radius: var(--radius-lg);
    padding: 44px 40px; width: 100%; max-width: 440px;
    box-shadow: 0 20px 60px rgba(26,10,0,0.15);
  }
  .auth-tab {
    flex: 1; padding: 10px; font-family: 'Nunito', sans-serif;
    font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px;
    border: 3px solid #1A0A00; cursor: pointer;
    transition: all 0.2s var(--ease-out);
  }
  .auth-tab.active { background: #E8421A; color: #fff; border-color: #E8421A; }
  .auth-tab:not(.active) { background: #fff; color: #1A0A00; }
  .auth-tab:not(.active):hover { background: #FFF0DC; }
  .auth-tab:first-child { border-radius: var(--radius-sm) 0 0 var(--radius-sm); }
  .auth-tab:last-child { border-radius: 0 var(--radius-sm) var(--radius-sm) 0; }
  .google-btn {
    width: 100%; padding: 14px; background: #fff; border: 3px solid #1A0A00; border-radius: var(--radius-sm);
    font-family: 'Nunito', sans-serif; font-size: 14px; font-weight: 800;
    cursor: pointer; display: flex; align-items: center; justify-content: center;
    gap: 10px; transition: all 0.2s var(--ease-out);
  }
  .google-btn:hover { background: #F5EFE5; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(26,10,0,0.08); }
  .google-btn:active { transform: translateY(0) scale(0.98); }
  .divider {
    display: flex; align-items: center; gap: 12px; margin: 20px 0;
    font-family: 'Nunito', sans-serif; font-size: 13px; color: #7A5A3A; font-weight: 700;
  }
  .divider::before, .divider::after { content: ''; flex: 1; border-top: 2px solid #E8D8C4; }

  /* ── Recipe Books Shelf ── */
  .rb-shelf {
    display: flex; gap: 12px; overflow-x: auto; padding: 8px 4px 20px;
    scrollbar-width: thin; scrollbar-color: #C4A882 transparent;
    -webkit-overflow-scrolling: touch;
    mask-image: linear-gradient(to right, transparent 0, #000 8px, #000 calc(100% - 24px), transparent);
    -webkit-mask-image: linear-gradient(to right, transparent 0, #000 8px, #000 calc(100% - 24px), transparent);
  }
  .rb-shelf::-webkit-scrollbar { height: 4px; }
  .rb-shelf::-webkit-scrollbar-track { background: transparent; }
  .rb-shelf::-webkit-scrollbar-thumb { background: #C4A882; border-radius: 4px; }
  .rb-book-card {
    flex-shrink: 0; width: 112px; background: #FFF5E6; border: 3px solid #1A0A00;
    padding: 14px 10px; cursor: pointer; border-radius: var(--radius-md);
    transition: all 0.25s var(--ease-out);
    display: flex; flex-direction: column; align-items: center; gap: 5px; text-align: center;
    position: relative;
  }
  .rb-book-card:hover { background: #FFD166; transform: translateY(-4px); box-shadow: 0 8px 20px rgba(26,10,0,0.12); }
  .rb-book-card.active { background: #1A0A00; box-shadow: 0 4px 16px rgba(26,10,0,0.2); }
  .rb-book-card.active .rb-book-name { color: #FFF5E6; }
  .rb-book-card.active .rb-book-count { color: #FFD166; }
  .rb-book-emoji { font-size: 30px; line-height: 1; display: flex; align-items: center; justify-content: center; }
  .rb-book-card.active .rb-book-emoji { color: #FFF5E6; }
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
    background: #E8421A; border: 1px solid #1A0A00; border-radius: 50%; width: 18px; height: 18px;
    font-size: 9px; color: #fff; cursor: pointer; display: none;
    align-items: center; justify-content: center; font-weight: 800;
    transition: transform 0.15s;
  }
  .rb-book-delete:hover { transform: scale(1.15); }
  .rb-book-card:not(.active):hover .rb-book-delete { display: flex; }
  .rb-new-book-btn {
    flex-shrink: 0; width: 90px; background: #FFF5E6; border: 3px dashed #C4A882;
    padding: 14px 10px; cursor: pointer; border-radius: var(--radius-md);
    transition: all 0.2s var(--ease-out);
    display: flex; flex-direction: column; align-items: center; gap: 5px;
    font-family: 'Bebas Neue', cursive; font-size: 12px; letter-spacing: 1px; color: #C4A882;
  }
  .rb-new-book-btn:hover { border-color: #1A0A00; color: #1A0A00; background: #FFD166; transform: translateY(-2px); }
  .rb-new-book-form {
    flex-shrink: 0; background: #FFF5E6; border: 3px solid #1A0A00; border-radius: var(--radius-md);
    padding: 14px 12px; display: flex; flex-direction: column; gap: 8px; width: 200px;
  }

  /* ── Responsive mobile ── */
  @media (max-width: 768px) {
    .cal-grid {
      grid-template-columns: 1fr !important;
      border-radius: var(--radius-md);
      border: none; box-shadow: none; gap: 14px; overflow: visible;
      background: transparent;
    }
    .cal-day {
      border-right: none; min-height: auto;
      border: 3px solid #1A0A00; border-radius: var(--radius-md);
      padding: 0; overflow: hidden;
      box-shadow: 0 2px 10px rgba(26,10,0,0.06);
    }
    .cal-day:last-child { border-bottom: 3px solid #1A0A00; }
    .cal-day-header {
      font-size: 20px !important; letter-spacing: 2px !important;
      padding: 10px 14px !important; margin-bottom: 0 !important;
      background: #1A0A00; color: #FFF5E6 !important;
      border-bottom: 3px solid #1A0A00 !important;
      text-align: left !important;
    }
    .cal-day.easy-mode .cal-day-header { background: #2a3a50; }
    .cal-day > *:not(.cal-day-header) { padding-left: 10px; padding-right: 10px; }
    .cal-day > :nth-child(2) { padding-top: 10px; }
    .cal-day > :last-child { padding-bottom: 10px; }
    .pm-modal { padding: 24px; border-radius: var(--radius-lg); }
    .cc-hero-heading { font-size: 56px !important; letter-spacing: 3px !important; }
    .cc-hero-heading .outline-text { -webkit-text-stroke-width: 2px !important; }
  }

  /* ── Mobile nav ── */
  .pm-desktop-nav { display: flex; gap: 6px; flex-wrap: nowrap; align-items: center; }
  .pm-hamburger-btn { display: none; }
  .pm-bottom-nav { display: none; }

  @media (max-width: 768px) {
    .pm-desktop-nav { display: none !important; }

    .pm-hamburger-btn {
      display: flex; align-items: center; justify-content: center;
      background: none; border: 3px solid #1A0A00; border-radius: var(--radius-sm);
      width: 44px; height: 44px;
      cursor: pointer; font-size: 22px; color: #1A0A00; flex-shrink: 0;
      transition: background 0.15s;
    }
    .pm-hamburger-btn:active { background: #FFD166; }

    .pm-bottom-nav {
      display: flex; position: fixed; bottom: 0; left: 0; right: 0;
      background: rgba(255,245,230,0.95); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
      border-top: 3px solid #1A0A00; z-index: 100; height: 64px;
      overflow: hidden;
    }
    .pm-bottom-nav-item {
      flex: 1; display: flex; flex-direction: column; align-items: center;
      justify-content: center; gap: 1px; border: none; background: none;
      cursor: pointer; padding: 6px 2px; height: 64px; box-sizing: border-box;
      border-right: 1px solid rgba(26,10,0,0.1);
      font-family: 'Bebas Neue', cursive; font-size: 9px; letter-spacing: 1px; color: #1A0A00;
      transition: all 0.2s var(--ease-out); position: relative;
    }
    .pm-bottom-nav-item:last-child { border-right: none; }
    .pm-bottom-nav-item.active { color: #E8421A; }
    .pm-bottom-nav-item.active::before {
      content: ''; position: absolute; top: 0; left: 20%; right: 20%; height: 3px;
      background: #E8421A; border-radius: 0 0 3px 3px;
    }
    .pm-bottom-nav-item .nav-icon { font-size: 22px; line-height: 1; transition: transform 0.2s var(--ease-spring); }
    .pm-bottom-nav-item.active .nav-icon { transform: scale(1.15) translateY(-1px); }

    .pm-mobile-content { padding: 20px 16px 80px !important; }
  }

  /* ── Feedback Widget ── */
  .fb-btn {
    position: fixed; bottom: 24px; right: 20px;
    background: #E8421A; border: 3px solid #1A0A00; border-radius: 50px; color: #fff;
    font-family: 'Bebas Neue', cursive; font-size: 14px; letter-spacing: 2px;
    padding: 10px 18px; cursor: pointer; z-index: 500;
    box-shadow: 0 4px 16px rgba(232,66,26,0.3);
    transition: transform 0.2s var(--ease-out), box-shadow 0.2s;
  }
  .fb-btn:hover { transform: translateY(-2px) scale(1.03); box-shadow: 0 8px 24px rgba(232,66,26,0.35); }
  .fb-btn:active { transform: translateY(0) scale(0.97); }
  .fb-panel {
    position: fixed; bottom: 78px; right: 20px;
    width: 320px; background: #FFF5E6; border: 3px solid #1A0A00; border-radius: var(--radius-lg);
    z-index: 500; box-shadow: 0 16px 48px rgba(26,10,0,0.18); padding: 24px;
    animation: modalIn 0.25s var(--ease-spring);
  }
  @media (max-width: 768px) {
    .fb-btn { bottom: 74px; right: 12px; font-size: 12px; padding: 8px 14px; }
    .fb-panel { bottom: 140px; right: 10px; left: 10px; width: auto; }
  }

  /* ── Hamburger slide-out menu ── */
  .pm-hamburger-overlay {
    position: fixed; inset: 0; background: rgba(26,10,0,0.4);
    backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px);
    z-index: 200; animation: modalBgIn 0.2s var(--ease-out);
  }
  .pm-hamburger-panel {
    position: absolute; top: 0; right: 0; width: 240px; height: 100%;
    background: #FFF5E6; border-left: 4px solid #1A0A00;
    display: flex; flex-direction: column; padding-top: 80px;
    box-shadow: -8px 0 32px rgba(26,10,0,0.12);
    animation: slideIn 0.3s var(--ease-out);
  }
  @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
  .pm-hamburger-panel-item {
    width: 100%; padding: 18px 28px; background: none; border: none;
    border-bottom: 2px solid rgba(26,10,0,0.1); text-align: left; cursor: pointer;
    font-family: 'Bebas Neue', cursive; font-size: 20px; letter-spacing: 2px; color: #1A0A00;
    transition: all 0.15s;
  }
  .pm-hamburger-panel-item:hover { background: #FFD166; padding-left: 36px; }
  .pm-hamburger-panel-item.danger { color: #E8421A; }

  /* ── Scrollbar (global) ── */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #C4A882; border-radius: 4px; }
  ::-webkit-scrollbar-thumb:hover { background: #7A5A3A; }

  /* ── Date inputs — make entire box clickable ── */
  input[type="date"] { cursor: pointer; position: relative; }
  input[type="date"]::-webkit-calendar-picker-indicator {
    position: absolute; inset: 0; width: 100%; height: 100%;
    opacity: 0; cursor: pointer;
  }

  /* ── Selection color ── */
  ::selection { background: #FFD166; color: #1A0A00; }

  /* ── Dark Mode ── */
  [data-theme="dark"] body { background: #1a1510; color: #F0E6D6; }
  [data-theme="dark"] .pm-header { background: rgba(30,22,16,0.92); border-bottom-color: #3a2a1a; }
  [data-theme="dark"] .cc-ticker { background: #a8321a; border-bottom-color: #3a2a1a; }
  [data-theme="dark"] .pm-card { background: #2a2018; border-color: #3a2a1a; }
  [data-theme="dark"] .pm-card:hover { background: #3a2a1a; }
  [data-theme="dark"] .pm-section { background: #2a2018; border-color: #3a2a1a; }
  [data-theme="dark"] .pm-input { background: #2a2018; border-color: #3a2a1a; color: #F0E6D6; }
  [data-theme="dark"] .pm-input::placeholder { color: #7a6a5a; }
  [data-theme="dark"] .pm-input:focus { border-color: #E8421A; box-shadow: 0 0 0 3px rgba(232,66,26,0.2); }
  [data-theme="dark"] .pm-btn { border-color: #3a2a1a; }
  [data-theme="dark"] .pm-btn-ghost { background: #2a2018; color: #F0E6D6; }
  [data-theme="dark"] .pm-btn-ghost:hover { background: #F0E6D6; color: #1a1510; }
  [data-theme="dark"] .pm-modal-bg { background: rgba(0,0,0,0.6); }
  [data-theme="dark"] .pm-modal { background: #231a12; border-color: #3a2a1a; }
  [data-theme="dark"] .pm-stat-box { background: #3a2a1a; border-color: #4a3a2a; }
  [data-theme="dark"] .pm-tag { border-color: #4a3a2a; }
  [data-theme="dark"] .auth-card { background: #231a12; border-color: #3a2a1a; box-shadow: 0 20px 60px rgba(0,0,0,0.3); }
  [data-theme="dark"] .auth-tab:not(.active) { background: #2a2018; color: #F0E6D6; border-color: #3a2a1a; }
  [data-theme="dark"] .auth-tab:not(.active):hover { background: #3a2a1a; }
  [data-theme="dark"] .google-btn { background: #2a2018; border-color: #3a2a1a; color: #F0E6D6; }
  [data-theme="dark"] .google-btn:hover { background: #3a2a1a; }
  [data-theme="dark"] .divider { color: #7a6a5a; }
  [data-theme="dark"] .divider::before, [data-theme="dark"] .divider::after { border-top-color: #3a2a1a; }
  [data-theme="dark"] .cal-grid { border-color: #3a2a1a; }
  [data-theme="dark"] .cal-day { background: #231a12; border-right-color: rgba(255,255,255,0.06); }
  [data-theme="dark"] .cal-day.easy-mode { background: #1a2530; }
  [data-theme="dark"] .cal-day.drag-over { background: #3a2a1a; }
  [data-theme="dark"] .cal-day-header { color: #F0E6D6; border-bottom-color: rgba(255,255,255,0.1); }
  [data-theme="dark"] .cal-meal-slot { border-color: #3a2a1a; color: #7a6a5a; }
  [data-theme="dark"] .cal-meal-slot:hover { border-color: #E8421A; color: #E8421A; background: rgba(232,66,26,0.08); }
  [data-theme="dark"] .cal-meal-slot.filled { background: #3a2a1a; border-color: #4a3a2a; color: #F0E6D6; }
  [data-theme="dark"] .grocery-wrap { border-color: #3a2a1a; }
  [data-theme="dark"] .grocery-section { border-bottom-color: rgba(255,255,255,0.06); }
  [data-theme="dark"] .grocery-section-header { background: #2a2018; color: #FFD166; }
  [data-theme="dark"] .grocery-item { background: #231a12; border-bottom-color: rgba(255,255,255,0.04); }
  [data-theme="dark"] .grocery-item:hover { background: #2a2018; }
  [data-theme="dark"] .grocery-item.checked { background: #1a1510; }
  [data-theme="dark"] .grocery-item-name { color: #F0E6D6; }
  [data-theme="dark"] .toast { background: #F0E6D6; color: #1a1510; border-color: #E8421A; }
  [data-theme="dark"] .rb-book-card { background: #2a2018; border-color: #3a2a1a; }
  [data-theme="dark"] .rb-book-card:hover { background: #3a2a1a; }
  [data-theme="dark"] .rb-book-card.active { background: #F0E6D6; }
  [data-theme="dark"] .rb-book-card.active .rb-book-name { color: #1a1510; }
  [data-theme="dark"] .rb-book-card.active .rb-book-emoji { color: #1a1510; }
  [data-theme="dark"] .rb-book-emoji { color: #F0E6D6; }
  [data-theme="dark"] .rb-book-name { color: #F0E6D6; }
  [data-theme="dark"] .rb-new-book-btn { background: #2a2018; border-color: #4a3a2a; color: #7a6a5a; }
  [data-theme="dark"] .rb-new-book-btn:hover { background: #3a2a1a; border-color: #F0E6D6; color: #F0E6D6; }
  [data-theme="dark"] .rb-new-book-form { background: #2a2018; border-color: #3a2a1a; color: #F0E6D6; }
  [data-theme="dark"] .rb-new-book-form button { color: #F0E6D6; }
  [data-theme="dark"] .fb-btn { box-shadow: 0 4px 16px rgba(232,66,26,0.4); }
  [data-theme="dark"] .fb-panel { background: #231a12; border-color: #3a2a1a; }
  [data-theme="dark"] .pm-bottom-nav { background: rgba(30,22,16,0.95); border-top-color: #3a2a1a; }
  [data-theme="dark"] .pm-bottom-nav-item { color: #F0E6D6; border-right-color: rgba(255,255,255,0.06); }
  [data-theme="dark"] .pm-hamburger-overlay { background: rgba(0,0,0,0.5); }
  [data-theme="dark"] .pm-hamburger-panel { background: #231a12; border-left-color: #3a2a1a; }
  [data-theme="dark"] .pm-hamburger-panel-item { color: #F0E6D6; border-bottom-color: rgba(255,255,255,0.08); }
  [data-theme="dark"] .pm-hamburger-panel-item:hover { background: #3a2a1a; }
  [data-theme="dark"] .pm-hamburger-btn { border-color: #3a2a1a; color: #F0E6D6; }
  /* Force dark text on yellow/light backgrounds in dark mode */
  [data-theme="dark"] .pm-btn-yellow { color: #1A0A00; }
  [data-theme="dark"] .pm-stat-box { color: #1A0A00; }
  [data-theme="dark"] .pm-stat-box * { color: #1A0A00; }
  [data-theme="dark"] ::selection { background: #E8421A; color: #fff; }
  [data-theme="dark"] ::-webkit-scrollbar-thumb { background: #4a3a2a; }
  [data-theme="dark"] ::-webkit-scrollbar-thumb:hover { background: #6a5a4a; }
  @media (max-width: 768px) {
    [data-theme="dark"] .cal-day { border-color: #3a2a1a; }
    [data-theme="dark"] .cal-day-header { background: #2a2018 !important; color: #FFD166 !important; border-bottom-color: #3a2a1a !important; }
  }
`

// ── EmailJS feedback config ──
// Sign up at emailjs.com, then replace these three values:
const EMAILJS_SERVICE_ID  = "service_x5nb9bq";
const EMAILJS_TEMPLATE_ID = "template_p41pwvr";
const EMAILJS_PUBLIC_KEY  = "-WH1PmKm41XUBa0WQ";

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
const CATEGORIES = ["Breakfast","Lunch","Dinner","Sides","Salads","Dessert","Snacks","Drinks","Other"];
const MEALS = ["Breakfast","Lunch","Dinner"];
const DAYS = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
const DAY_SHORT = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const GROCERY_SECTIONS = ["Produce","Meat & Seafood","Dairy & Eggs","Pantry & Dry Goods","Frozen","Bakery","Other"];

const CAT_COLORS = {
  Breakfast:{bg:"#ffd166",text:"#1a1a1a"}, Lunch:{bg:"#06d6a0",text:"#1a1a1a"},
  Dinner:{bg:"#ef476f",text:"#fff"}, Dessert:{bg:"#ff9f1c",text:"#1a1a1a"},
  Sides:{bg:"#b7e4c7",text:"#1a1a1a"}, Salads:{bg:"#52b788",text:"#fff"},
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

// ── Meal Plan Settings Defaults ──
const DEFAULT_MEAL_SETTINGS = {
  preferredProteins: [],
  repeatAvoidanceDays: 14,
  mealsToGenerate: ["Breakfast", "Dinner"],
};

// ── Protein Keywords ──
const PROTEIN_KEYWORDS = {
  chicken: ["chicken", "poultry", "turkey"],
  beef: ["beef", "steak", "ground beef", "sirloin", "chuck", "brisket"],
  pork: ["pork", "ham", "bacon", "sausage", "prosciutto", "pancetta"],
  fish: ["salmon", "tuna", "cod", "tilapia", "shrimp", "prawns", "fish", "halibut", "mahi", "scallops", "crab", "lobster", "mussels", "clams", "anchovies", "sardines"],
  lamb: ["lamb"],
  vegetarian: [],
};
const ALL_MEAT_KEYWORDS = Object.values(PROTEIN_KEYWORDS).flat();

// ── Ingredient Section Map ──
const INGREDIENT_SECTION_MAP = {
  // Produce
  garlic:"Produce", onion:"Produce", tomato:"Produce", lettuce:"Produce", carrot:"Produce",
  celery:"Produce", potato:"Produce", "sweet potato":"Produce", pepper:"Produce",
  "bell pepper":"Produce", jalapeño:"Produce", jalapeno:"Produce", lemon:"Produce",
  lime:"Produce", avocado:"Produce", cilantro:"Produce", basil:"Produce", parsley:"Produce",
  ginger:"Produce", spinach:"Produce", kale:"Produce", broccoli:"Produce", cauliflower:"Produce",
  zucchini:"Produce", cucumber:"Produce", mushroom:"Produce", corn:"Produce", pea:"Produce",
  "green bean":"Produce", asparagus:"Produce", cabbage:"Produce", scallion:"Produce",
  "green onion":"Produce", shallot:"Produce", leek:"Produce", radish:"Produce",
  eggplant:"Produce", squash:"Produce", pumpkin:"Produce", beet:"Produce", turnip:"Produce",
  apple:"Produce", banana:"Produce", orange:"Produce", berry:"Produce", strawberry:"Produce",
  blueberry:"Produce", raspberry:"Produce", mango:"Produce", pineapple:"Produce",
  peach:"Produce", pear:"Produce", grape:"Produce", watermelon:"Produce", mint:"Produce",
  rosemary:"Produce", thyme:"Produce", oregano:"Produce", dill:"Produce", sage:"Produce",
  chive:"Produce", arugula:"Produce", "bok choy":"Produce",
  // Meat & Seafood
  chicken:"Meat & Seafood", beef:"Meat & Seafood", pork:"Meat & Seafood", steak:"Meat & Seafood",
  "ground beef":"Meat & Seafood", "ground turkey":"Meat & Seafood", "ground pork":"Meat & Seafood",
  bacon:"Meat & Seafood", sausage:"Meat & Seafood", ham:"Meat & Seafood", turkey:"Meat & Seafood",
  lamb:"Meat & Seafood", salmon:"Meat & Seafood", tuna:"Meat & Seafood", shrimp:"Meat & Seafood",
  cod:"Meat & Seafood", tilapia:"Meat & Seafood", halibut:"Meat & Seafood", crab:"Meat & Seafood",
  lobster:"Meat & Seafood", scallop:"Meat & Seafood", mussels:"Meat & Seafood", clams:"Meat & Seafood",
  prosciutto:"Meat & Seafood", pancetta:"Meat & Seafood", anchovy:"Meat & Seafood", anchovies:"Meat & Seafood",
  // Dairy & Eggs
  milk:"Dairy & Eggs", butter:"Dairy & Eggs", cheese:"Dairy & Eggs", egg:"Dairy & Eggs",
  cream:"Dairy & Eggs", "heavy cream":"Dairy & Eggs", "sour cream":"Dairy & Eggs",
  yogurt:"Dairy & Eggs", "cream cheese":"Dairy & Eggs", parmesan:"Dairy & Eggs",
  mozzarella:"Dairy & Eggs", cheddar:"Dairy & Eggs", ricotta:"Dairy & Eggs", feta:"Dairy & Eggs",
  "half and half":"Dairy & Eggs", whipping:"Dairy & Eggs",
  // Pantry & Dry Goods
  flour:"Pantry & Dry Goods", sugar:"Pantry & Dry Goods", "brown sugar":"Pantry & Dry Goods",
  rice:"Pantry & Dry Goods", pasta:"Pantry & Dry Goods", noodle:"Pantry & Dry Goods",
  spaghetti:"Pantry & Dry Goods", penne:"Pantry & Dry Goods", linguine:"Pantry & Dry Goods",
  oil:"Pantry & Dry Goods", "olive oil":"Pantry & Dry Goods", "vegetable oil":"Pantry & Dry Goods",
  vinegar:"Pantry & Dry Goods", "soy sauce":"Pantry & Dry Goods", "fish sauce":"Pantry & Dry Goods",
  salt:"Pantry & Dry Goods", "black pepper":"Pantry & Dry Goods", cumin:"Pantry & Dry Goods",
  paprika:"Pantry & Dry Goods", "chili powder":"Pantry & Dry Goods", cinnamon:"Pantry & Dry Goods",
  nutmeg:"Pantry & Dry Goods", turmeric:"Pantry & Dry Goods", cayenne:"Pantry & Dry Goods",
  "baking powder":"Pantry & Dry Goods", "baking soda":"Pantry & Dry Goods",
  vanilla:"Pantry & Dry Goods", honey:"Pantry & Dry Goods", "maple syrup":"Pantry & Dry Goods",
  ketchup:"Pantry & Dry Goods", mustard:"Pantry & Dry Goods", mayonnaise:"Pantry & Dry Goods",
  "tomato sauce":"Pantry & Dry Goods", "tomato paste":"Pantry & Dry Goods",
  "coconut milk":"Pantry & Dry Goods", broth:"Pantry & Dry Goods", stock:"Pantry & Dry Goods",
  "chicken broth":"Pantry & Dry Goods", "beef broth":"Pantry & Dry Goods",
  bean:"Pantry & Dry Goods", lentil:"Pantry & Dry Goods", chickpea:"Pantry & Dry Goods",
  "canned tomato":"Pantry & Dry Goods", "diced tomato":"Pantry & Dry Goods",
  "crushed tomato":"Pantry & Dry Goods", oat:"Pantry & Dry Goods", cereal:"Pantry & Dry Goods",
  quinoa:"Pantry & Dry Goods", couscous:"Pantry & Dry Goods", cornstarch:"Pantry & Dry Goods",
  "peanut butter":"Pantry & Dry Goods", almond:"Pantry & Dry Goods", walnut:"Pantry & Dry Goods",
  pecan:"Pantry & Dry Goods", cashew:"Pantry & Dry Goods", sesame:"Pantry & Dry Goods",
  "chocolate chip":"Pantry & Dry Goods", cocoa:"Pantry & Dry Goods", raisin:"Pantry & Dry Goods",
  "hot sauce":"Pantry & Dry Goods", sriracha:"Pantry & Dry Goods", worcestershire:"Pantry & Dry Goods",
  // Frozen
  frozen:"Frozen", "ice cream":"Frozen",
  // Bakery
  bread:"Bakery", bun:"Bakery", roll:"Bakery", tortilla:"Bakery", pita:"Bakery",
  bagel:"Bakery", croissant:"Bakery", "naan":"Bakery", flatbread:"Bakery",
};

// ── Unit Normalization ──
const UNIT_MAP = {
  cups:"cup", cup:"cup", c:"cup",
  tablespoons:"tbsp", tablespoon:"tbsp", tbsps:"tbsp", tbsp:"tbsp", tbs:"tbsp",
  teaspoons:"tsp", teaspoon:"tsp", tsps:"tsp", tsp:"tsp",
  ounces:"oz", ounce:"oz", oz:"oz",
  pounds:"lb", pound:"lb", lbs:"lb", lb:"lb",
  grams:"g", gram:"g", g:"g",
  kilograms:"kg", kilogram:"kg", kg:"kg",
  milliliters:"ml", milliliter:"ml", ml:"ml",
  liters:"l", liter:"l", l:"l",
  cloves:"clove", clove:"clove",
  cans:"can", can:"can",
  bunches:"bunch", bunch:"bunch",
  heads:"head", head:"head",
  stalks:"stalk", stalk:"stalk",
  sprigs:"sprig", sprig:"sprig",
  slices:"slice", slice:"slice",
  pieces:"piece", piece:"piece",
  pinch:"pinch", pinches:"pinch", dash:"dash",
  packages:"pkg", package:"pkg", pkg:"pkg",
  bags:"bag", bag:"bag",
  jars:"jar", jar:"jar",
  bottles:"bottle", bottle:"bottle",
};

// Volume units convertible to a common base (teaspoons) for cross-unit summing
const VOLUME_UNITS_TSP = {
  tsp: 1,
  tbsp: 3,
  "fl oz": 6,
  cup: 48,
  pint: 96,
  quart: 192,
  gallon: 768,
  ml: 1 / 4.92892,   // 1 tsp ≈ 4.92892 ml
  l: 1000 / 4.92892,
};

// Pick the largest cookbook unit that gives a clean-ish number for a total in teaspoons
function pickBestVolumeUnit(tsp) {
  const clean = (n) => Math.abs(n - Math.round(n)) < 0.01;
  if (tsp >= 48) {
    const cups = tsp / 48;
    if (clean(cups * 4) /* quarter-cup multiples */) return { qty: Math.round(cups * 4) / 4, unit: "cup" };
    return { qty: +cups.toFixed(2), unit: "cup" };
  }
  if (tsp >= 3) {
    const tbsp = tsp / 3;
    if (clean(tbsp)) return { qty: Math.round(tbsp), unit: "tbsp" };
    return { qty: +tbsp.toFixed(2), unit: "tbsp" };
  }
  if (clean(tsp)) return { qty: Math.round(tsp), unit: "tsp" };
  return { qty: +tsp.toFixed(2), unit: "tsp" };
}

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
  if (!res.ok) { const err = await res.text(); console.error("AI proxy error:", res.status, err); throw new Error(`AI error ${res.status}`); }
  const data = await res.json();
  if (data.error) { console.error("Claude API error:", data.error); throw new Error(data.error.message); }
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
  if (!res.ok) { const err = await res.text(); console.error("AI proxy error:", res.status, err); throw new Error(`AI error ${res.status}`); }
  const data = await res.json();
  if (data.error) { console.error("Claude API error:", data.error); throw new Error(data.error.message); }
  const text = data.content?.map(b => b.text || "").join("") || "";
  try { return JSON.parse(text.replace(/```json|```/g, "").trim()); } catch { return null; }
}

const SYS_RECIPE_PARSE = `You are a recipe parser. Return ONLY a JSON object:
{"title":"...","description":"One sentence.","prepTime":"15 min","cookTime":"30 min","servings":"4","category":"Dinner","ingredients":["..."],"steps":["..."],"tags":["..."]}`;

const SYS_RECIPE_GEN = `You are a creative chef. Return ONLY a JSON object:
{"title":"...","description":"One sentence.","prepTime":"15 min","cookTime":"30 min","servings":"4","category":"Dinner","ingredients":["..."],"steps":["..."],"tags":["..."]}`;

const SYS_RECIPE_GEN_3 = `You are a creative chef. Return ONLY a JSON array of exactly 3 recipe objects. Make each recipe meaningfully different in style, cuisine, or technique. Each object must follow this exact shape:
{"title":"...","description":"One sentence.","prepTime":"15 min","cookTime":"30 min","servings":"4","category":"Dinner","ingredients":["..."],"steps":["..."],"tags":["..."]}`;

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

function todayISO() {
  return new Date().toISOString().split("T")[0];
}

// ── Ingredient Parsing ──
const FRACTION_MAP = { "½":0.5, "⅓":0.333, "⅔":0.667, "¼":0.25, "¾":0.75, "⅛":0.125, "⅜":0.375, "⅝":0.625, "⅞":0.875 };

// Prep verbs that describe how an ingredient is processed (typically harmless to strip)
const PREP_MODIFIERS = new Set([
  "chopped","diced","sliced","minced","grated","shredded","crushed","peeled",
  "crumbled","melted","softened","halved","quartered","cubed","julienned",
  "seeded","deseeded","deveined","cored","pitted","stoned","drained","rinsed",
  "packed","sifted","beaten","whisked","divided","trimmed","stemmed","skinned",
  "boned","ground","mashed","pureed","blended","zested","juiced","squeezed",
  "torn","scrubbed","washed","thawed","blanched","steamed","boiled","fried",
  "baked","roasted","toasted","browned","caramelized","wilted","seared",
  "marinated","brined","drained","reserved","strained","frozen","canned",
  "jarred","bottled","crumbled","flaked","ribboned","spiralized","crushed",
  "split","scored","scooped","trimmed","clarified","cured","smoked","poached",
  "sweated","reduced","whipped","creamed","folded","sliced","slivered",
  "rough chopped","roughly chopped","finely chopped","coarsely chopped",
  "thinly sliced","thickly sliced","finely diced","coarsely grated","finely grated",
]);

// Size, quality, freshness, and dietary descriptors
const SIZE_MODIFIERS = new Set([
  "small","medium","large","jumbo","baby","mini","big","tiny","huge",
  "ripe","overripe","underripe","fresh","stale","whole","half","quarter",
  "thick","thin","long","short","wide","narrow","heaping","level","scant",
  "generous","light","heavy","firm","soft","hard","tender","crisp","crispy",
  "lean","fatty","boneless","skinless","organic","wild","farmed","plain",
  "greek","raw","uncooked","cooked","cold","hot","warm","dried","frozen",
  "salted","unsalted","sweetened","unsweetened","skim","whole","reduced",
  "extra","virgin","premium","natural","plain","pure","real","quality",
  "good","best","fancy","standard","regular","mild","medium","sharp","aged",
  "young","old","new","seasonal","ripe","tart","sweet","sour","bitter",
  "salty","spicy","mild","strong","weak","light","dark","white","black",
  "red","green","yellow","brown","golden","blonde","clear",
  "freshly","newly","barely","slightly","lightly","deeply","generously",
]);

// Multi-word phrases to remove before tokenization (regex-escaped, hyphens normalized to spaces)
const MULTI_WORD_PHRASES_RE = /\b(extra virgin|extra large|extra small|extra firm|low sodium|reduced sodium|low fat|fat free|nonfat|no fat|whole grain|whole wheat|grass fed|pasture raised|free range|cage free|bone in|skin on|skinless and boneless|boneless and skinless|room temperature|at room temperature|to taste|as needed|optional|plus more|plus more for serving|plus extra|plus additional|or more to taste|to drizzle|to top|to sprinkle|to garnish|freshly grated|freshly chopped|freshly ground|freshly squeezed|freshly picked|finely chopped|roughly chopped|coarsely chopped|thinly sliced|thickly sliced|finely diced|finely grated|coarsely grated|cut into|broken into|torn into|each cut|each peeled|peeled and chopped|peeled and diced|peeled and minced|peeled and sliced|seeded and diced|seeded and chopped|stemmed and chopped|trimmed and chopped|drained and rinsed|drained and chopped|cooked and crumbled|cooked and shredded|cooked and diced|cut in half|cut in halves|cut in quarters|halved lengthwise|sliced thin|sliced thinly|sliced into rounds|cut into rounds|cut into wedges|cut into strips|cut into pieces|cut into chunks|cut into cubes|cut into florets)\b/g;

// Irregular plurals that need special handling
const IRREGULAR_PLURALS = {
  tomatoes:"tomato", potatoes:"potato", loaves:"loaf", halves:"half",
  leaves:"leaf", knives:"knife", lives:"life", wolves:"wolf",
  shelves:"shelf", thieves:"thief", calves:"calf", scarves:"scarf",
  cherries:"cherry", berries:"berry", strawberries:"strawberry",
  blueberries:"blueberry", raspberries:"raspberry", cranberries:"cranberry",
  blackberries:"blackberry", gooseberries:"gooseberry",
  anchovies:"anchovy", chilies:"chili", chillies:"chili",
  geese:"goose", mice:"mouse", feet:"foot", teeth:"tooth", men:"man", women:"woman",
  // Common food irregulars
  loaves:"loaf", roes:"roe",
};

function cleanItemString(s) {
  if (!s) return "";
  // Drop everything after first comma (prep instructions: "garlic, minced")
  s = s.split(",")[0].trim();
  // Drop everything after first semicolon
  s = s.split(";")[0].trim();
  // Normalize hyphens to spaces (so "extra-virgin" tokenizes as two words)
  s = s.replace(/[-–—]/g, " ");
  // Strip trailing "for X" clauses ("for serving", "for frosting", "for topping", etc.)
  s = s.replace(/\s+for\s+\w+.*$/i, "");
  // Strip trailing "or X" alternatives ("milk or water", "broth or stock")
  s = s.replace(/\s+or\s+\w+.*$/i, "");
  // Strip trailing percent descriptors ("milk 2%", "yogurt 2% fat")
  s = s.replace(/\s*\d+(\.\d+)?\s*%.*$/i, "");
  // Remove multi-word phrases
  s = s.replace(MULTI_WORD_PHRASES_RE, " ");
  // Collapse whitespace
  s = s.replace(/\s+/g, " ").trim();
  // Tokenize
  let tokens = s.split(/\s+/).filter(Boolean);
  // Strip leading modifiers (single words)
  while (tokens.length > 1 && (PREP_MODIFIERS.has(tokens[0]) || SIZE_MODIFIERS.has(tokens[0]) || tokens[0] === "of" || tokens[0] === "the" || tokens[0] === "a" || tokens[0] === "an")) {
    tokens.shift();
  }
  // Strip trailing modifiers
  while (tokens.length > 1 && (PREP_MODIFIERS.has(tokens[tokens.length - 1]) || SIZE_MODIFIERS.has(tokens[tokens.length - 1]) || tokens[tokens.length - 1] === "or")) {
    tokens.pop();
  }
  // Strip trailing "and X" leftovers (e.g., "garlic and" after dropping ", minced")
  if (tokens.length > 1 && tokens[tokens.length - 1] === "and") tokens.pop();
  return tokens.join(" ").trim();
}

function parseIngredient(str) {
  if (!str || typeof str !== "string") return { quantity: null, unit: null, item: str || "", original: str || "" };
  const original = str.trim();
  let s = original.toLowerCase().trim();

  // Strip ALL parentheticals up front (e.g., "1 (14 oz) can diced tomatoes" → "1  can diced tomatoes")
  s = s.replace(/\([^)]*\)/g, " ").replace(/\s+/g, " ").trim();

  // Extract quantity
  let quantity = null;
  // Unicode fractions
  const fracMatch = s.match(/^(\d+\s*)?([½⅓⅔¼¾⅛⅜⅝⅞])/);
  if (fracMatch) {
    const whole = fracMatch[1] ? parseFloat(fracMatch[1]) : 0;
    quantity = whole + (FRACTION_MAP[fracMatch[2]] || 0);
    s = s.slice(fracMatch[0].length).trim();
  } else {
    // Mixed fraction: "1 1/2" or slash fraction "1/2"
    const mixedMatch = s.match(/^(\d+)\s+(\d+)\/(\d+)/);
    if (mixedMatch) {
      quantity = parseInt(mixedMatch[1]) + parseInt(mixedMatch[2]) / parseInt(mixedMatch[3]);
      s = s.slice(mixedMatch[0].length).trim();
    } else {
      const slashMatch = s.match(/^(\d+)\/(\d+)/);
      if (slashMatch) {
        quantity = parseInt(slashMatch[1]) / parseInt(slashMatch[2]);
        s = s.slice(slashMatch[0].length).trim();
      } else {
        // Range: "2-3" or simple number "2" or "1.5"
        const rangeMatch = s.match(/^(\d+(?:\.\d+)?)\s*-\s*(\d+(?:\.\d+)?)/);
        if (rangeMatch) {
          quantity = parseFloat(rangeMatch[2]); // take higher
          s = s.slice(rangeMatch[0].length).trim();
        } else {
          const numMatch = s.match(/^(\d+(?:\.\d+)?)/);
          if (numMatch) {
            quantity = parseFloat(numMatch[1]);
            s = s.slice(numMatch[0].length).trim();
          }
        }
      }
    }
  }

  // Extract unit (now safe to match — parentheticals already gone)
  let unit = null;
  const unitMatch = s.match(/^([a-z]+\.?)\s/);
  if (unitMatch && UNIT_MAP[unitMatch[1].replace(/\.$/, "")]) {
    unit = UNIT_MAP[unitMatch[1].replace(/\.$/, "")];
    s = s.slice(unitMatch[0].length).trim();
  }

  // Strip leading "of"
  s = s.replace(/^of\s+/, "");

  // Clean modifiers from the item portion
  const item = cleanItemString(s);

  return { quantity, unit, item, original };
}

function normalizeItemName(name) {
  let n = (name || "").toLowerCase().trim().replace(/\s+/g, " ");
  if (!n) return n;
  // Exact-match irregular plurals
  if (IRREGULAR_PLURALS[n]) return IRREGULAR_PLURALS[n];
  // Multi-word: normalize the LAST word (e.g., "cherry tomatoes" → "cherry tomato")
  const words = n.split(" ");
  let last = words[words.length - 1];
  if (IRREGULAR_PLURALS[last]) {
    last = IRREGULAR_PLURALS[last];
  } else if (/(x|ch|sh)es$/.test(last) && last.length > 3) {
    last = last.replace(/(x|ch|sh)es$/, "$1");          // boxes → box, dishes → dish
  } else if (/ies$/.test(last) && last.length > 3) {
    last = last.replace(/ies$/, "y");                    // berries → berry
  } else if (/oes$/.test(last) && last.length > 3) {
    last = last.replace(/oes$/, "o");                    // tomatoes → tomato
  } else if (last.length >= 4 && /s$/.test(last) && !last.endsWith("ss") && !last.endsWith("us") && !last.endsWith("is")) {
    last = last.replace(/s$/, "");                       // carrots → carrot, avocados → avocado (skip cheese/grass/bus/basis)
  }
  words[words.length - 1] = last;
  return words.join(" ");
}

// Pluralize the LAST word of a phrase based on count (for grocery list display)
const PLURAL_IRREGULAR = {
  tomato:"tomatoes", potato:"potatoes", leaf:"leaves", loaf:"loaves",
  half:"halves", knife:"knives", life:"lives", wolf:"wolves",
  shelf:"shelves", calf:"calves", scarf:"scarves",
  berry:"berries", cherry:"cherries", strawberry:"strawberries",
  blueberry:"blueberries", raspberry:"raspberries", cranberry:"cranberries",
  blackberry:"blackberries", anchovy:"anchovies", chili:"chilies",
  goose:"geese", mouse:"mice", foot:"feet", tooth:"teeth", man:"men", woman:"women",
};
// Nouns ending in -o that take -oes (not -os) in plural form
const PLURAL_ES_O = new Set([
  "tomato","potato","echo","hero","veto","embargo","torpedo","volcano",
  "buffalo","mosquito","domino","cargo","mango",
]);
function pluralizeItem(phrase, count) {
  if (!phrase || count <= 1) return phrase;
  const parts = phrase.split(" ");
  let last = parts[parts.length - 1];
  // Defensive: if the word is already plural (ends in s) and isn't a known singular irregular,
  // leave it alone to avoid double-pluralization like "avocadoses" or "yolkses".
  if (/s$/.test(last) && !PLURAL_IRREGULAR[last] && !last.endsWith("ss")) {
    return phrase;
  }
  if (PLURAL_IRREGULAR[last]) last = PLURAL_IRREGULAR[last];
  else if (/[^aeiou]y$/.test(last)) last = last.slice(0, -1) + "ies";
  else if (/(x|z|ch|sh|ss)$/.test(last)) last = last + "es";
  else if (/o$/.test(last) && PLURAL_ES_O.has(last)) last = last + "es";
  else last = last + "s";
  parts[parts.length - 1] = last;
  return parts.join(" ");
}

function consolidateIngredients(ingredients) {
  const parsed = ingredients.map(parseIngredient);
  const groups = {};

  parsed.forEach(p => {
    const key = normalizeItemName(p.item);
    if (!key) return;
    if (!groups[key]) groups[key] = [];
    groups[key].push(p);
  });

  const formatQty = (n) => n % 1 === 0 ? n.toString() : (+n.toFixed(2)).toString().replace(/\.?0+$/, "");

  const result = [];
  Object.entries(groups).forEach(([key, items]) => {
    // Split the item's parses into three buckets:
    //  - volume-convertible (unit is in VOLUME_UNITS_TSP) — all summed in teaspoons
    //  - non-volume quantified (grouped by exact unit string)
    //  - null-quantity (no number)
    const volumeItems = [];
    const nonVolumeByUnit = {};
    const nullQtyItems = [];

    items.forEach(p => {
      if (p.quantity === null) {
        nullQtyItems.push(p);
        return;
      }
      if (p.unit && Object.prototype.hasOwnProperty.call(VOLUME_UNITS_TSP, p.unit)) {
        volumeItems.push(p);
        return;
      }
      const u = p.unit || "_none";
      if (!nonVolumeByUnit[u]) nonVolumeByUnit[u] = { quantity: 0, items: [] };
      nonVolumeByUnit[u].quantity += p.quantity;
      nonVolumeByUnit[u].items.push(p);
    });

    let hasQuantifiedOutput = false;

    // Volume group — sum in teaspoons, pick the best display unit
    if (volumeItems.length > 0) {
      const totalTsp = volumeItems.reduce((sum, p) => sum + p.quantity * VOLUME_UNITS_TSP[p.unit], 0);
      if (totalTsp > 0) {
        const { qty, unit } = pickBestVolumeUnit(totalTsp);
        const unitDisplay = pluralizeItem(unit, qty);
        result.push({ name: `${formatQty(qty)} ${unitDisplay} ${key}`, item: key });
        hasQuantifiedOutput = true;
      }
    }

    // Non-volume quantified groups — emit one line per unit
    Object.entries(nonVolumeByUnit).forEach(([unit, data]) => {
      if (data.quantity === 0) return;
      const qty = formatQty(data.quantity);
      let name;
      if (unit === "_none") {
        name = `${qty} ${pluralizeItem(key, data.quantity)}`;
      } else {
        const unitDisplay = pluralizeItem(unit, data.quantity);
        name = `${qty} ${unitDisplay} ${key}`;
      }
      result.push({ name, item: key });
      hasQuantifiedOutput = true;
    });

    // Null-quantity items — drop entirely if we already have a quantified line for this key,
    // otherwise collapse them into ONE representative line (shortest original as tiebreak)
    if (nullQtyItems.length > 0 && !hasQuantifiedOutput) {
      const rep = nullQtyItems.slice().sort((a, b) => a.original.length - b.original.length)[0];
      result.push({ name: rep.original, item: key });
    }
  });

  return result;
}

function categorizeIngredient(itemName) {
  const lower = itemName.toLowerCase();
  // Check multi-word keys first (longest match)
  const multiWord = Object.keys(INGREDIENT_SECTION_MAP).filter(k => k.includes(" ")).sort((a, b) => b.length - a.length);
  for (const key of multiWord) {
    if (lower.includes(key)) return INGREDIENT_SECTION_MAP[key];
  }
  // Then single-word keys
  for (const key of Object.keys(INGREDIENT_SECTION_MAP)) {
    if (!key.includes(" ") && lower.includes(key)) return INGREDIENT_SECTION_MAP[key];
  }
  return "Other";
}

// ── Protein Classification ──
function classifyProtein(recipe) {
  const text = (recipe.ingredients || []).join(" ").toLowerCase();
  const matched = [];
  Object.entries(PROTEIN_KEYWORDS).forEach(([protein, keywords]) => {
    if (protein === "vegetarian") return;
    if (keywords.some(kw => {
      const idx = text.indexOf(kw);
      if (idx === -1) return false;
      // Skip "chicken broth", "beef stock", etc.
      const after = text.slice(idx + kw.length, idx + kw.length + 10);
      if (/^\s*(broth|stock|bouillon|base)/.test(after)) return false;
      return true;
    })) matched.push(protein);
  });
  if (matched.length === 0) matched.push("vegetarian");
  return matched;
}

function matchesProtein(recipe, preferredProteins) {
  if (!preferredProteins || preferredProteins.length === 0) return true;
  const recipeProteins = classifyProtein(recipe);
  return recipeProteins.some(p => preferredProteins.includes(p));
}

// ── Deterministic Meal Planner ──
const MEAL_FILTERS = {
  category: (r, ctx) => {
    if (ctx.mealType === "Dinner") return !r.category || r.category === "Dinner" || r.category === "Other";
    return r.category === ctx.mealType;
  },
  easyMode: (r, ctx) => !ctx.isEasyNight || ctx.mealType !== "Dinner" || parseTotalMinutes(r.prepTime, r.cookTime) <= 30,
  protein: (r, ctx) => ctx.mealType !== "Dinner" || matchesProtein(r, ctx.settings.preferredProteins),
  excluded: (r, ctx) => !(ctx.settings.excludedIngredients?.length) || !ctx.settings.excludedIngredients.some(ex => (r.ingredients || []).join(" ").toLowerCase().includes(ex.toLowerCase())),
};

const MEAL_SCORERS = {
  history: (r, ctx) => ctx.recentTitles.includes(r.title) ? -5 : 0,
  usedThisWeek: (r, ctx) => ctx.usedThisWeek.has(r.id) ? -8 : 0,
  adjacency: (r, ctx) => ctx.yesterdayRecipeId === r.id ? -3 : 0,
  proteinMatch: (r, ctx) => ctx.mealType === "Dinner" && matchesProtein(r, ctx.settings.preferredProteins) ? 2 : 0,
  variety: () => Math.random() * 2,
};

function planWeekDeterministic(recipes, activeDates, easyNights, mealHistory, settings, excludedBookIds, books) {
  const s = { ...DEFAULT_MEAL_SETTINGS, ...settings };
  const recentTitles = mealHistory.map(h => h.title);
  const usedThisWeek = new Set();
  const result = {};

  // Filter out recipes from excluded books
  let pool = recipes;
  if (excludedBookIds?.length && books?.length) {
    const excludedRecipeIds = new Set();
    books.filter(b => excludedBookIds.includes(b.id)).forEach(b => b.recipeIds.forEach(id => excludedRecipeIds.add(id)));
    pool = pool.filter(r => !excludedRecipeIds.has(r.id));
  }

  activeDates.forEach((date, dateIdx) => {
    result[date] = {};
    const isEasyNight = (easyNights || []).includes(date);

    (s.mealsToGenerate || MEALS).forEach(mealType => {
      const ctx = { mealType, isEasyNight, settings: s, recentTitles, usedThisWeek, yesterdayRecipeId: null, dateIdx, date };

      // Get yesterday's recipe for this meal type
      if (dateIdx > 0) {
        const prevDate = activeDates[dateIdx - 1];
        const prevSlot = result[prevDate]?.[mealType];
        if (prevSlot) ctx.yesterdayRecipeId = prevSlot;
      }

      // Apply all filters
      let candidates = pool;
      Object.values(MEAL_FILTERS).forEach(filter => {
        candidates = candidates.filter(r => filter(r, ctx));
      });

      // Fallback: if no candidates after filtering, relax protein filter
      if (candidates.length === 0) {
        candidates = pool;
        Object.entries(MEAL_FILTERS).forEach(([key, filter]) => {
          if (key !== "protein") candidates = candidates.filter(r => filter(r, ctx));
        });
      }

      if (candidates.length === 0) return;

      // Score each candidate
      const scored = candidates.map(r => {
        let score = 10;
        Object.values(MEAL_SCORERS).forEach(scorer => { score += scorer(r, ctx); });
        return { recipe: r, score };
      });

      // Pick highest score, random tiebreak
      scored.sort((a, b) => b.score - a.score);
      const topScore = scored[0].score;
      const ties = scored.filter(s => Math.abs(s.score - topScore) < 0.01);
      const winner = ties[Math.floor(Math.random() * ties.length)].recipe;

      result[date][mealType] = winner.id;
      usedThisWeek.add(winner.id);
    });
  });

  return result;
}

function addDays(isoDate, n) {
  const d = new Date(isoDate + "T00:00:00");
  d.setDate(d.getDate() + n);
  return d.toISOString().split("T")[0];
}

function dateRangeDates(startDate, endDate) {
  const dates = [];
  let cur = startDate;
  while (cur <= endDate) { dates.push(cur); cur = addDays(cur, 1); }
  return dates;
}

function formatDateLabel(isoDate) {
  const d = new Date(isoDate + "T00:00:00");
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

// ── Raw food detection ──
const RAW_PATTERNS = [
  /\braw\s+(egg|fish|meat|chicken|pork|beef|shrimp|salmon|tuna|oyster|clam|mussel)/i,
  /\buncooked\s+(egg|fish|meat|chicken|pork|beef|shrimp|seafood)/i,
  /\braw\b.*\b(yolk|white)\b/i,
  /\bsashimi\b/i,
  /\btartare?\b/i,
  /\bceviche\b/i,
  /\bcarpaccio\b/i,
  /\bcrudo\b/i,
  /\braw\s+dough\b/i,
  /\braw\s+batter\b/i,
  /\bunpasteurized\b/i,
];

function detectRawFood(recipes) {
  const found = new Set();
  const list = Array.isArray(recipes) ? recipes : [recipes];
  list.forEach(r => {
    const text = [
      r.title, r.description,
      ...(r.ingredients || []),
      ...(r.steps || [])
    ].filter(Boolean).join(" ");
    RAW_PATTERNS.forEach(p => {
      const m = text.match(p);
      if (m) found.add(m[0].trim());
    });
  });
  return [...found];
}

// ── Toxic/poisonous food detection ──
const TOXIC_PATTERNS = [
  /\bfugu\b/i, /\bpufferfish\b/i, /\bpuffer\s+fish\b/i, /\bblowfish\b/i,
  /\belderberr(y|ies)\b.*\braw\b|\braw\b.*\belderberr(y|ies)\b/i,
  /\brhubarb\s+lea(f|ves)\b/i,
  /\bcastor\s+bean/i, /\bricin\b/i,
  /\bgreen\s+potato/i, /\bpotato\s+sprout/i,
  /\bsolanine\b/i,
  /\baki\b|\backee\b/i,
  /\bcassava\b.*\braw\b|\braw\b.*\bcassava\b/i,
  /\bbitter\s+almond/i, /\bapricot\s+kernel/i, /\bcherry\s+pit/i, /\bapple\s+seed/i,
  /\bamygdalin\b/i, /\bcyanide\b/i,
  /\bdeath\s+cap\b/i, /\bamanita\b/i,
  /\bmonkshood\b/i, /\baconite\b/i, /\bwolfsbane\b/i,
  /\bbelladonna\b/i, /\bdeadly\s+nightshade\b/i,
  /\bhemlock\b/i,
  /\blilyof\s*the\s*valley\b|\blily\s+of\s+the\s+valley\b/i,
];

function detectToxicFood(recipes) {
  const found = new Set();
  const list = Array.isArray(recipes) ? recipes : [recipes];
  list.forEach(r => {
    const text = [
      r.title, r.description,
      ...(r.ingredients || []),
      ...(r.steps || [])
    ].filter(Boolean).join(" ");
    TOXIC_PATTERNS.forEach(p => {
      const m = text.match(p);
      if (m) found.add(m[0].trim());
    });
  });
  return [...found];
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

// ── Photo helper ──
function getPhotoUrl(title) {
  return `https://source.unsplash.com/400x200/?food,${encodeURIComponent(title)}`;
}

// ── ManualRecipeForm ──
function ManualRecipeForm({ books = [], onSave, onCancel }) {
  const [title, setTitle]           = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory]     = useState("Dinner");
  const [prepTime, setPrepTime]     = useState("");
  const [cookTime, setCookTime]     = useState("");
  const [servings, setServings]     = useState("");
  const [ingredients, setIngredients] = useState(["", "", ""]);
  const [steps, setSteps]           = useState(["", ""]);
  const [tags, setTags]             = useState([]);
  const [tagInput, setTagInput]     = useState("");
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [saving, setSaving]         = useState(false);
  const [titleErr, setTitleErr]     = useState(false);

  const updateList  = (setter, i, val) => setter(prev => prev.map((x, idx) => idx === i ? val : x));
  const removeItem  = (setter, i)      => setter(prev => prev.filter((_, idx) => idx !== i));

  const addTag = () => {
    const t = tagInput.trim().toLowerCase().replace(/,/g, "");
    if (t && !tags.includes(t)) setTags(prev => [...prev, t]);
    setTagInput("");
  };
  const toggleBook = id => setSelectedBooks(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const handleSave = async () => {
    if (!title.trim()) { setTitleErr(true); return; }
    setSaving(true);
    await onSave({
      title: title.trim(), description: description.trim(), category,
      prepTime: prepTime.trim(), cookTime: cookTime.trim(), servings: servings.trim(),
      ingredients: ingredients.filter(i => i.trim()),
      steps: steps.filter(s => s.trim()),
      tags,
    }, selectedBooks);
    setSaving(false);
  };

  const L  = { fontFamily:"'Bebas Neue',cursive", fontSize:"17px", letterSpacing:"1px", color:"var(--text, #1A0A00)", display:"block", marginBottom:"6px" };
  const S  = { marginBottom:"20px" };
  const iS = { width:"100%", boxSizing:"border-box" };

  return (
    <div>
      {/* Title */}
      <div style={S}>
        <label style={L}>Recipe Title <span style={{ color:"#E8421A" }}>*</span></label>
        <input value={title} onChange={e => { setTitle(e.target.value); setTitleErr(false); }}
          placeholder="e.g. Grandma's Chicken Soup"
          className="pm-input" style={{ ...iS, borderColor: titleErr ? "#E8421A" : undefined }} />
        {titleErr && <p style={{ color:"#E8421A", fontFamily:"'Nunito',sans-serif", fontSize:"12px", fontWeight:800, margin:"4px 0 0" }}>Title is required</p>}
      </div>

      {/* Description */}
      <div style={S}>
        <label style={L}>Description</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)}
          placeholder="A one-sentence description of the dish…"
          className="pm-input" rows={2}
          style={{ ...iS, resize:"vertical", fontFamily:"'Nunito',sans-serif", fontSize:"14px" }} />
      </div>

      {/* Category / Times / Servings */}
      <div style={{ ...S, display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px" }}>
        <div style={{ gridColumn:"1 / -1" }}>
          <label style={L}>Category</label>
          <select value={category} onChange={e => setCategory(e.target.value)} className="pm-input" style={iS}>
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label style={{ ...L, fontSize:"14px" }}>Prep Time</label>
          <input value={prepTime} onChange={e => setPrepTime(e.target.value)} placeholder="15 min" className="pm-input" style={iS} />
        </div>
        <div>
          <label style={{ ...L, fontSize:"14px" }}>Cook Time</label>
          <input value={cookTime} onChange={e => setCookTime(e.target.value)} placeholder="30 min" className="pm-input" style={iS} />
        </div>
        <div>
          <label style={{ ...L, fontSize:"14px" }}>Servings</label>
          <input value={servings} onChange={e => setServings(e.target.value)} placeholder="4" className="pm-input" style={iS} />
        </div>
      </div>

      {/* Ingredients */}
      <div style={S}>
        <label style={L}>Ingredients</label>
        {ingredients.map((ing, i) => (
          <div key={i} style={{ display:"flex", gap:"6px", marginBottom:"6px", alignItems:"center" }}>
            <span style={{ fontFamily:"'Nunito',sans-serif", fontSize:"12px", fontWeight:800, color:"var(--text-muted, #7A5A3A)", minWidth:"18px", textAlign:"right" }}>{i + 1}.</span>
            <input value={ing} onChange={e => updateList(setIngredients, i, e.target.value)}
              placeholder="e.g. 2 cups flour"
              className="pm-input" style={{ flex:1 }}
              onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); setIngredients(prev => [...prev, ""]); } }} />
            {ingredients.length > 1 && (
              <button onClick={() => removeItem(setIngredients, i)}
                style={{ background:"none", border:"none", cursor:"pointer", fontSize:"15px", color:"#C4A882", fontWeight:800, padding:"0 2px", lineHeight:1 }}><X size={14} weight="bold" /></button>
            )}
          </div>
        ))}
        <button onClick={() => setIngredients(prev => [...prev, ""])} className="pm-btn pm-btn-ghost"
          style={{ fontSize:"12px", padding:"4px 12px", marginTop:"2px" }}>+ Add Ingredient</button>
      </div>

      {/* Steps */}
      <div style={S}>
        <label style={L}>Steps</label>
        {steps.map((step, i) => (
          <div key={i} style={{ display:"flex", gap:"6px", marginBottom:"8px", alignItems:"flex-start" }}>
            <span style={{ fontFamily:"'Nunito',sans-serif", fontSize:"12px", fontWeight:800, color:"var(--text-muted, #7A5A3A)", minWidth:"18px", textAlign:"right", paddingTop:"10px" }}>{i + 1}.</span>
            <textarea value={step} onChange={e => updateList(setSteps, i, e.target.value)}
              placeholder={`Step ${i + 1}…`}
              className="pm-input" rows={2}
              style={{ flex:1, resize:"vertical", fontFamily:"'Nunito',sans-serif", fontSize:"13px" }} />
            {steps.length > 1 && (
              <button onClick={() => removeItem(setSteps, i)}
                style={{ background:"none", border:"none", cursor:"pointer", fontSize:"15px", color:"#C4A882", fontWeight:800, padding:"0 2px", marginTop:"8px", lineHeight:1 }}><X size={14} weight="bold" /></button>
            )}
          </div>
        ))}
        <button onClick={() => setSteps(prev => [...prev, ""])} className="pm-btn pm-btn-ghost"
          style={{ fontSize:"12px", padding:"4px 12px", marginTop:"2px" }}>+ Add Step</button>
      </div>

      {/* Tags */}
      <div style={S}>
        <label style={L}>Tags</label>
        {tags.length > 0 && (
          <div style={{ display:"flex", gap:"6px", flexWrap:"wrap", marginBottom:"8px" }}>
            {tags.map(t => (
              <span key={t} className="pm-tag" style={{ background:"#c8b8ff", color:"var(--text, #1a1a1a)", display:"flex", alignItems:"center", gap:"4px" }}>
                {t}
                <button onClick={() => setTags(prev => prev.filter(x => x !== t))}
                  style={{ background:"none", border:"none", cursor:"pointer", fontSize:"10px", fontWeight:800, lineHeight:1, padding:0, color:"var(--text, #1a1a1a)" }}><X size={10} weight="bold" /></button>
              </span>
            ))}
          </div>
        )}
        <div style={{ display:"flex", gap:"8px" }}>
          <input value={tagInput} onChange={e => setTagInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" || e.key === ",") { e.preventDefault(); addTag(); } }}
            placeholder="Type a tag, press Enter or comma…"
            className="pm-input" style={{ flex:1 }} />
          <button onClick={addTag} className="pm-btn" style={{ padding:"8px 14px", fontSize:"13px", whiteSpace:"nowrap" }}>Add</button>
        </div>
      </div>

      {/* Recipe Books */}
      {books.length > 0 && (
        <div style={S}>
          <label style={L}>Add to Recipe Book</label>
          <div style={{ display:"flex", gap:"8px", flexWrap:"wrap" }}>
            {books.map(book => {
              const sel = selectedBooks.includes(book.id);
              return (
                <button key={book.id} onClick={() => toggleBook(book.id)} className="pm-btn"
                  style={{ padding:"7px 14px", fontSize:"12px", background: sel ? "#1A0A00" : "var(--bg-elevated, #FFF5E6)", color: sel ? "#FFF5E6" : "var(--text, #1A0A00)" }}>
                  {sel ? <><Check size={12} weight="bold" style={{ marginRight:4 }} /></> : ""}<BookIcon icon={book.emoji} size={14} style={{ verticalAlign:"middle", marginRight:2 }} /> {book.name}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Actions */}
      <div style={{ display:"flex", gap:"10px", borderTop:"3px solid #1A0A00", paddingTop:"20px", marginTop:"8px" }}>
        <button onClick={onCancel} className="pm-btn pm-btn-ghost" style={{ flex:1 }}>Cancel</button>
        <button onClick={handleSave} disabled={saving || !title.trim()} className="pm-btn pm-btn-primary"
          style={{ flex:2, fontSize:"16px", padding:"12px", opacity: saving || !title.trim() ? 0.6 : 1 }}>
          {saving ? "Saving…" : <><FloppyDisk size={16} weight="bold" style={{ marginRight:4, verticalAlign:"middle" }} /> Save Recipe</>}
        </button>
      </div>
    </div>
  );
}

// ── RecipeCard ──
function RecipeCard({ recipe, onClick, onDelete, wobble = "", draggable = false, onDragStart }) {
  const cat = recipe.category || "Other";
  const [imgError, setImgError] = useState(false);
  return (
    <div className={`pm-card ${wobble}`}
      draggable={draggable}
      onDragStart={onDragStart ? (e) => { e.dataTransfer.setData("recipeId", recipe.id); onDragStart(e); } : undefined}
      onClick={() => onClick(recipe)}
      style={{ padding: "0", cursor: draggable ? "grab" : "pointer", overflow:"hidden" }}>
      {!imgError && (
        <div style={{ overflow:"hidden", borderBottom:"3px solid #1A0A00" }}>
          <img
            src={recipe.photoUrl || getPhotoUrl(recipe.title)}
            alt={recipe.title}
            loading="lazy"
            onError={() => setImgError(true)}
            className="pm-card-img"
            style={{ width:"100%", height:"120px", objectFit:"cover", display:"block" }}
          />
        </div>
      )}
      <div style={{ padding:"14px 14px 16px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"8px" }}>
          <span className="pm-tag" style={{ background: cat === "Dinner" ? "#E8421A" : cat === "Lunch" ? "#4CAF82" : cat === "Dessert" ? "#FFD166" : "#1A0A00", color: cat === "Dessert" ? "#1A0A00" : "#fff", borderColor: cat === "Dinner" ? "#E8421A" : cat === "Lunch" ? "#4CAF82" : cat === "Dessert" ? "#1A0A00" : "#1A0A00" }}>{cat}</span>
          <button onClick={e => { e.stopPropagation(); onDelete(recipe.id); }}
            style={{ background:"#E8421A", border:"2px solid #1A0A00", borderRadius:"50%", width:"26px", height:"26px", cursor:"pointer", fontSize:"12px", color:"#fff", fontWeight:800, lineHeight:1, flexShrink:0, transition:"transform 0.15s", display:"flex", alignItems:"center", justifyContent:"center" }}
            onMouseEnter={e => e.currentTarget.style.transform="scale(1.15)"}
            onMouseLeave={e => e.currentTarget.style.transform="scale(1)"}><X size={12} weight="bold" /></button>
        </div>
        <h3 style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"20px", letterSpacing:"1px", color:"var(--text, #1A0A00)", margin:"6px 0 4px", lineHeight:1.1 }}>{recipe.title}</h3>
        <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:"12px", fontWeight:700, color:"var(--text-muted, #7A5A3A)", margin:"0 0 10px", lineHeight:1.4 }}>{recipe.description}</p>
        <div style={{ display:"flex", gap:"6px", flexWrap:"wrap" }}>
          {recipe.prepTime && <span style={{ fontFamily:"'Nunito',sans-serif", fontSize:"11px", fontWeight:800, background:"#FFD166", border:"2px solid #1A0A00", borderRadius:"6px", padding:"2px 8px", color:"#1A0A00", display:"inline-flex", alignItems:"center", gap:"3px" }}><Timer size={12} weight="bold" /> {recipe.prepTime}</span>}
          {recipe.cookTime && <span style={{ fontFamily:"'Nunito',sans-serif", fontSize:"11px", fontWeight:800, background:"#E8421A", border:"2px solid #1A0A00", borderRadius:"6px", padding:"2px 8px", color:"#fff", display:"inline-flex", alignItems:"center", gap:"3px" }}><Fire size={12} weight="bold" /> {recipe.cookTime}</span>}
        </div>
      </div>
    </div>
  );
}

// ── RecipeModal ──
function RecipeModal({ recipe, onClose, onSave, books = [], onToggleBook }) {
  const [category, setCategory] = useState(recipe.category || "Other");
  const [saved, setSaved] = useState(recipe._saved || false);
  const [imgError, setImgError] = useState(false);
  return (
    <div className="pm-modal-bg" onClick={onClose}>
      <div className="pm-modal" onClick={e => e.stopPropagation()} style={{ padding: 0, overflowX:"hidden" }}>
        {!imgError && (
          <div style={{ position:"relative" }}>
            <img
              src={recipe.photoUrl || getPhotoUrl(recipe.title)}
              alt={recipe.title}
              loading="lazy"
              onError={() => setImgError(true)}
              style={{ width:"100%", height:"220px", objectFit:"cover", display:"block", borderBottom:"4px solid #1A0A00" }}
            />
            <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"60px", background:"linear-gradient(transparent, rgba(26,10,0,0.15))", pointerEvents:"none" }} />
            <button onClick={onClose} className="pm-btn" style={{ position:"absolute", top:"12px", right:"12px", background:"rgba(26,10,0,0.7)", backdropFilter:"blur(6px)", color:"#fff", width:"34px", height:"34px", padding:0, fontSize:"16px", zIndex:2, borderColor:"transparent", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center" }}><X size={16} weight="bold" /></button>
          </div>
        )}
        <div style={{ padding:"24px 36px 36px" }}>
        {imgError && <button onClick={onClose} className="pm-btn" style={{ position:"absolute", top:"16px", right:"16px", background:"rgba(26,10,0,0.7)", backdropFilter:"blur(6px)", color:"#fff", width:"34px", height:"34px", padding:0, fontSize:"16px", borderColor:"transparent", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center" }}><X size={16} weight="bold" /></button>}
        <div style={{ display:"flex", gap:"8px", flexWrap:"wrap", marginBottom:"12px" }}>
          {recipe.tags?.map(t => <span key={t} className="pm-tag" style={{ background:"#c8b8ff", color:"var(--text, #1a1a1a)" }}>{t}</span>)}
        </div>
        <h2 style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"36px", letterSpacing:"1px", color:"var(--text, #1A0A00)", margin:"0 0 8px", lineHeight:1, paddingRight:"40px" }}>{recipe.title}</h2>
        <p style={{ fontFamily:"'Nunito',sans-serif", color:"var(--text-muted, #7A5A3A)", fontWeight:700, margin:"0 0 20px", fontSize:"14px", lineHeight:1.6 }}>{recipe.description}</p>
        <div style={{ display:"flex", gap:"10px", flexWrap:"wrap", marginBottom:"20px" }}>
          {recipe.prepTime && <div className="pm-stat-box"><div style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"22px", letterSpacing:"1px" }}>{recipe.prepTime}</div><div style={{ fontFamily:"'Nunito',sans-serif", fontSize:"10px", fontWeight:800, textTransform:"uppercase", letterSpacing:"1px" }}>Prep</div></div>}
          {recipe.cookTime && <div className="pm-stat-box" style={{ background:"#E8421A" }}><div style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"22px", letterSpacing:"1px", color:"#fff" }}>{recipe.cookTime}</div><div style={{ fontFamily:"'Nunito',sans-serif", fontSize:"10px", fontWeight:800, textTransform:"uppercase", letterSpacing:"1px", color:"#fff" }}>Cook</div></div>}
          {recipe.servings && <div className="pm-stat-box" style={{ background:"#FFD166" }}><div style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"22px", letterSpacing:"1px" }}>{recipe.servings}</div><div style={{ fontFamily:"'Nunito',sans-serif", fontSize:"10px", fontWeight:800, textTransform:"uppercase", letterSpacing:"1px" }}>Servings</div></div>}
        </div>
        <div className="pm-section wobble-1" style={{ marginBottom:"14px" }}>
          <h4 style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"22px", letterSpacing:"1px", color:"var(--text, #1A0A00)", marginBottom:"10px" }}>Ingredients</h4>
          <ul style={{ fontFamily:"'Nunito',sans-serif", color:"var(--text, #1a1a1a)", lineHeight:1.9, paddingLeft:"20px" }}>
            {recipe.ingredients?.map((ing,i) => <li key={i} style={{ fontSize:"13px", fontWeight:600 }}>{ing}</li>)}
          </ul>
        </div>
        <div className="pm-section wobble-2" style={{ marginBottom:"18px" }}>
          <h4 style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"22px", letterSpacing:"1px", color:"var(--text, #1A0A00)", marginBottom:"10px" }}>Instructions</h4>
          <ol style={{ fontFamily:"'Nunito',sans-serif", color:"var(--text, #1a1a1a)", lineHeight:1.8, paddingLeft:"22px" }}>
            {recipe.steps?.map((step,i) => <li key={i} style={{ fontSize:"13px", fontWeight:600, marginBottom:"8px" }}>{step}</li>)}
          </ol>
        </div>
        <div style={{ borderTop:"3px dashed #1a1a1a", paddingTop:"18px" }}>
          <div style={{ display:"flex", gap:"10px", alignItems:"center", flexWrap:"wrap" }}>
            <select value={category} onChange={e => setCategory(e.target.value)} className="pm-input" style={{ flex:1, minWidth:"140px" }}>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
            {!recipe._saved ? (
              <button onClick={() => { onSave({ ...recipe, category, _saved:true }); setSaved(true); }} className="pm-btn"
                style={{ background: saved ? "#FFD166" : "#E8421A", color: saved ? "#1A0A00" : "#fff", padding:"10px 24px", flex:1, borderColor: saved ? "#1A0A00" : "#E8421A" }}>
                {saved ? <><Check size={14} weight="bold" style={{ marginRight:4, verticalAlign:"middle" }} /> Saved!</> : "Save Recipe!"}
              </button>
            ) : category !== (recipe.category || "Other") ? (
              <button onClick={() => onSave({ ...recipe, category })} className="pm-btn"
                style={{ background:"#E8421A", color:"#fff", padding:"10px 18px" }}>
                Update
              </button>
            ) : null}
          </div>
        </div>
        {recipe._saved && books.length > 0 && onToggleBook && (
          <div style={{ borderTop:"3px dashed #1a1a1a", paddingTop:"18px", marginTop:"6px" }}>
            <h4 style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"20px", letterSpacing:"1px", color:"var(--text, #1A0A00)", marginBottom:"10px", display:"flex", alignItems:"center", gap:"6px" }}><Books size={20} weight="bold" /> Add to Book</h4>
            <div style={{ display:"flex", flexWrap:"wrap", gap:"8px" }}>
              {books.map(book => {
                const inBook = book.recipeIds.includes(recipe.id);
                return (
                  <button key={book.id} onClick={() => onToggleBook(book.id, recipe.id)} className="pm-btn"
                    style={{ padding:"7px 14px", fontSize:"12px", background: inBook ? "#1A0A00" : "var(--bg-elevated, #FFF5E6)", color: inBook ? "#FFF5E6" : "var(--text, #1A0A00)" }}>
                    {inBook ? <><Check size={12} weight="bold" style={{ marginRight:4 }} /></> : ""}<BookIcon icon={book.emoji} size={14} style={{ verticalAlign:"middle", marginRight:2 }} /> {book.name}
                  </button>
                );
              })}
            </div>
          </div>
        )}
        </div>{/* end padding wrapper */}
      </div>
    </div>
  );
}

// ── Meal Plan Settings Modal ──
function MealPlanSettingsModal({ settings, onSave, onClose }) {
  const [prefs, setPrefs] = useState({ ...DEFAULT_MEAL_SETTINGS, ...settings });

  const toggleProtein = (p) => {
    setPrefs(prev => ({
      ...prev,
      preferredProteins: prev.preferredProteins.includes(p)
        ? prev.preferredProteins.filter(x => x !== p)
        : [...prev.preferredProteins, p]
    }));
  };

  const toggleMeal = (m) => {
    setPrefs(prev => ({
      ...prev,
      mealsToGenerate: prev.mealsToGenerate.includes(m)
        ? prev.mealsToGenerate.filter(x => x !== m)
        : [...prev.mealsToGenerate, m]
    }));
  };

  const PROTEIN_OPTIONS = [
    { key: "chicken", label: "Chicken", icon: <ForkKnife size={14} weight="bold" /> },
    { key: "beef", label: "Beef", icon: <ForkKnife size={14} weight="bold" /> },
    { key: "pork", label: "Pork", icon: <ForkKnife size={14} weight="bold" /> },
    { key: "fish", label: "Fish & Seafood", icon: <Fish size={14} weight="bold" /> },
    { key: "lamb", label: "Lamb", icon: <ForkKnife size={14} weight="bold" /> },
    { key: "vegetarian", label: "Vegetarian", icon: <Leaf size={14} weight="bold" /> },
  ];

  return (
    <div className="pm-modal-bg" onClick={onClose}>
      <div className="pm-modal" style={{ maxWidth:"480px" }} onClick={e => e.stopPropagation()}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"20px" }}>
          <h2 style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"28px", letterSpacing:"1px", color:"var(--text, #1A0A00)", margin:0 }}>
            <GearSix size={24} weight="bold" style={{ verticalAlign:"middle", marginRight:8 }} />
            Meal Plan Settings
          </h2>
          <button onClick={onClose} style={{ background:"none", border:"none", cursor:"pointer", color:"var(--text, #1A0A00)" }}><X size={20} weight="bold" /></button>
        </div>

        {/* Preferred Proteins */}
        <div style={{ marginBottom:"20px" }}>
          <label style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"16px", letterSpacing:"1px", color:"var(--text, #1A0A00)", display:"block", marginBottom:"8px" }}>
            Preferred Proteins
          </label>
          <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:"12px", color:"var(--text-muted, #7A5A3A)", marginBottom:"8px" }}>
            Leave empty for any protein. Select to filter dinner recipes.
          </p>
          <div style={{ display:"flex", gap:"6px", flexWrap:"wrap" }}>
            {PROTEIN_OPTIONS.map(p => (
              <button key={p.key} onClick={() => toggleProtein(p.key)} className="pm-btn"
                style={{ padding:"6px 12px", fontSize:"12px",
                  background: prefs.preferredProteins.includes(p.key) ? "#FFD166" : "var(--bg-elevated, #FFF5E6)",
                  color: prefs.preferredProteins.includes(p.key) ? "#1A0A00" : "var(--text, #1A0A00)",
                  border: prefs.preferredProteins.includes(p.key) ? "2px solid #1A0A00" : "2px solid var(--border-subtle, rgba(26,10,0,0.2))" }}>
                {p.icon} <span style={{ marginLeft:4 }}>{p.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Repeat Avoidance */}
        <div style={{ marginBottom:"20px" }}>
          <label style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"16px", letterSpacing:"1px", color:"var(--text, #1A0A00)", display:"block", marginBottom:"8px" }}>
            Avoid Repeats Within
          </label>
          <select value={prefs.repeatAvoidanceDays} onChange={e => setPrefs(prev => ({ ...prev, repeatAvoidanceDays: parseInt(e.target.value) }))}
            className="pm-input" style={{ fontSize:"13px", padding:"8px 12px", maxWidth:"200px" }}>
            <option value={7}>1 week</option>
            <option value={14}>2 weeks</option>
            <option value={21}>3 weeks</option>
            <option value={0}>No limit</option>
          </select>
        </div>

        {/* Meals to Generate */}
        <div style={{ marginBottom:"24px" }}>
          <label style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"16px", letterSpacing:"1px", color:"var(--text, #1A0A00)", display:"block", marginBottom:"8px" }}>
            Meals to Plan
          </label>
          <div style={{ display:"flex", gap:"8px" }}>
            {MEALS.map(m => (
              <button key={m} onClick={() => toggleMeal(m)} className="pm-btn"
                style={{ padding:"8px 16px", fontSize:"13px", flex:1,
                  background: prefs.mealsToGenerate.includes(m) ? MEAL_COLORS[m] : "var(--bg-elevated, #FFF5E6)",
                  color: prefs.mealsToGenerate.includes(m) ? (m === "Dinner" ? "#fff" : "#1A0A00") : "var(--text, #1A0A00)",
                  border: prefs.mealsToGenerate.includes(m) ? "2px solid #1A0A00" : "2px solid var(--border-subtle, rgba(26,10,0,0.2))" }}>
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Save */}
        <div style={{ display:"flex", gap:"10px" }}>
          <button onClick={onClose} className="pm-btn pm-btn-ghost" style={{ flex:1, padding:"12px" }}>Cancel</button>
          <button onClick={() => { onSave(prefs); onClose(); }} className="pm-btn pm-btn-primary" style={{ flex:2, padding:"12px" }}>
            <FloppyDisk size={16} weight="bold" style={{ marginRight:4, verticalAlign:"middle" }} /> Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Easy Mode Modal ──
function EasyModeModal({ dates, onConfirm, onCancel }) {
  const [selected, setSelected] = useState([]);
  const toggle = d => setSelected(prev => prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d]);
  return (
    <div className="pm-modal-bg">
      <div className="pm-modal" style={{ maxWidth:"480px" }} onClick={e => e.stopPropagation()}>
        <div style={{ textAlign:"center", marginBottom:"24px" }}>
          <div style={{ fontSize:"48px", marginBottom:"8px" }}><Lightning size={48} weight="bold" color="#E8421A" /></div>
          <h2 style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"32px", letterSpacing:"1px", color:"var(--text, #1A0A00)" }}>Which nights are Easy Mode?</h2>
          <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:"14px", color:"var(--text-muted, #7a5c3a)", marginTop:"8px", fontWeight:600 }}>
            Easy Mode nights get quick recipes (≤30 min total). Tap the nights you'll be busy or tired!
          </p>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px", marginBottom:"24px" }}>
          {dates.map(d => (
            <button key={d} onClick={() => toggle(d)} className="pm-btn"
              style={{ padding:"12px", background: selected.includes(d) ? "#457b9d" : "var(--bg-elevated, #fff)", color: selected.includes(d) ? "#fff" : "var(--text, #1a1a1a)", fontSize:"15px" }}>
              {selected.includes(d) ? <Lightning size={16} weight="bold" style={{ marginRight:4, verticalAlign:"middle" }} /> : <ForkKnife size={16} weight="bold" style={{ marginRight:4, verticalAlign:"middle" }} />} {formatDateLabel(d)}
            </button>
          ))}
        </div>
        <div style={{ display:"flex", gap:"10px" }}>
          <button onClick={onCancel} className="pm-btn" style={{ flex:1, padding:"12px", background:"var(--bg-card, #f5e6c8)", color:"var(--text, #1a1a1a)" }}>Cancel</button>
          <button onClick={() => onConfirm(selected)} className="pm-btn" style={{ flex:2, padding:"12px", background:"#ff5252", color:"#fff" }}>
            <Sparkle size={16} weight="bold" style={{ marginRight:4, verticalAlign:"middle" }} /> Generate My Plan!
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Date Range Picker ──
function DateRangePicker({ startDate, endDate, onChange }) {
  const today = todayISO();
  const handleStart = (e) => {
    const newStart = e.target.value;
    if (newStart < today) return;
    const maxEnd = addDays(newStart, 6);
    const newEnd = endDate > maxEnd ? maxEnd : (endDate < newStart ? newStart : endDate);
    onChange(newStart, newEnd);
  };
  const handleEnd = (e) => {
    const newEnd = e.target.value;
    if (newEnd < startDate) return;
    const maxEnd = addDays(startDate, 6);
    onChange(startDate, newEnd > maxEnd ? maxEnd : newEnd);
  };
  const dayCount = dateRangeDates(startDate, endDate).length;
  const startRef = useRef(null);
  const endRef = useRef(null);
  return (
    <div style={{ display:"flex", alignItems:"center", gap:"8px", flexWrap:"wrap", background:"var(--bg-card, #fff9ed)", border:"2px solid #1a1a1a", borderRadius:"10px", padding:"10px 14px", boxShadow:"0 2px 10px rgba(26,10,0,0.06)" }}>
      <span style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"15px", letterSpacing:"1px", color:"var(--text-muted, #7A5A3A)", whiteSpace:"nowrap" }}>PLAN DATES</span>
      <div style={{ display:"flex", alignItems:"center", gap:"8px", flex:"1 1 auto", minWidth:0 }}>
        <input ref={startRef} type="date" value={startDate} min={today} onChange={handleStart}
          className="pm-input" style={{ flex:1, minWidth:0, padding:"6px 10px", fontSize:"13px", cursor:"pointer" }} />
        <ArrowRight size={14} weight="bold" style={{ color:"var(--text-muted, #7A5A3A)", flexShrink:0 }} />
        <input ref={endRef} type="date" value={endDate} min={startDate} max={addDays(startDate, 6)} onChange={handleEnd}
          className="pm-input" style={{ flex:1, minWidth:0, padding:"6px 10px", fontSize:"13px", cursor:"pointer" }} />
        <span style={{ fontFamily:"'Nunito',sans-serif", fontSize:"11px", fontWeight:700, color:"var(--text-muted, #7A5A3A)", whiteSpace:"nowrap", flexShrink:0 }}>
          {dayCount} day{dayCount !== 1 ? "s" : ""}
        </span>
      </div>
    </div>
  );
}

// ── Meal Calendar Tab ──
function MealCalendarTab({ recipes, mealPlan, setMealPlan, onDateRangeChange, mealHistory, setMealHistory, toast, books = [], mealPlanExcludedBooks = [], mealPlanSettings = {}, setMealPlanSettings = () => {} }) {
  const [showEasyMode, setShowEasyMode] = useState(false);
  const [dragOver, setDragOver] = useState(null); // "date-meal"
  const [pickerFor, setPickerFor] = useState(null); // {day: isoDate, meal}
  const [pickerSearch, setPickerSearch] = useState("");
  const [pickerCat, setPickerCat] = useState("All");
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const activeDates = dateRangeDates(mealPlan.startDate, mealPlan.endDate);

  const getSlot = (date, meal) => {
    const val = mealPlan.days?.[date]?.[meal];
    const ids = Array.isArray(val) ? val : (val ? [val] : []);
    return ids.map(id => recipes.find(r => r.id === id)).filter(Boolean);
  };

  const setSlot = (date, meal, recipeId) => {
    setMealPlan(prev => {
      const existing = prev.days?.[date]?.[meal];
      const ids = Array.isArray(existing) ? existing : (existing ? [existing] : []);
      if (ids.includes(recipeId)) return prev;
      return {
        ...prev,
        days: { ...prev.days, [date]: { ...(prev.days?.[date] || {}), [meal]: [...ids, recipeId] } }
      };
    });
  };

  const removeFromSlot = (date, meal, recipeId) => {
    setMealPlan(prev => {
      const existing = prev.days?.[date]?.[meal];
      const ids = Array.isArray(existing) ? existing : (existing ? [existing] : []);
      return { ...prev, days: { ...prev.days, [date]: { ...(prev.days?.[date] || {}), [meal]: ids.filter(id => id !== recipeId) } } };
    });
  };

  const handleDrop = (e, date, meal) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("recipeId");
    if (id) { setSlot(date, meal, id); toast("Added to " + formatDateLabel(date) + "!"); }
    setDragOver(null);
  };

  const generateWeek = (easyNights) => {
    setShowEasyMode(false);

    const dinnerRecipes = recipes.filter(r => !r.category || r.category === "Dinner" || r.category === "Other");
    if (dinnerRecipes.length < 3) {
      toast("Add more dinner recipes first!"); return;
    }

    const result = planWeekDeterministic(recipes, activeDates, easyNights, mealHistory, mealPlanSettings, mealPlanExcludedBooks, books);

    const newDays = { ...(mealPlan.days || {}) };
    const newHistory = [...mealHistory];
    activeDates.forEach(date => {
      const dayResult = result[date];
      if (!dayResult) return;
      newDays[date] = { ...(newDays[date] || {}) };
      MEALS.forEach(meal => {
        if (dayResult[meal]) {
          newDays[date][meal] = [dayResult[meal]];
          const r = recipes.find(x => x.id === dayResult[meal]);
          if (r && !newHistory.find(h => h.title === r.title)) {
            newHistory.push({ title: r.title, addedAt: Date.now() });
          }
        }
      });
    });
    const avoidMs = (mealPlanSettings.repeatAvoidanceDays || 14) * 24 * 60 * 60 * 1000;
    setMealHistory(newHistory.filter(h => h.addedAt > Date.now() - avoidMs));
    setMealPlan(prev => ({ ...prev, days: newDays, easyNights }));
    toast("Plan generated! Drag to adjust.");
  };

  const activeDatesHaveMeals = activeDates.some(date => {
    const dayMeals = mealPlan.days?.[date];
    return dayMeals && Object.values(dayMeals).some(ids => Array.isArray(ids) ? ids.length > 0 : !!ids);
  });

  const clearWeek = () => {
    const clearedDays = { ...(mealPlan.days || {}) };
    activeDates.forEach(date => { delete clearedDays[date]; });
    setMealPlan(prev => ({ ...prev, days: clearedDays, easyNights: [] }));
    setShowClearConfirm(false);
    toast("Plan cleared!");
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"14px", flexWrap:"wrap", gap:"12px" }}>
        <div style={{ display:"inline-block", background:"#ffd166", border:"3px solid #1a1a1a", borderRadius:"14px", boxShadow:"0 4px 16px rgba(26,10,0,0.1)", padding:"8px 22px" }}>
          <h2 style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"32px", letterSpacing:"1px", color:"#1A0A00", display:"flex", alignItems:"center", gap:"8px" }}><CalendarBlank size={28} weight="bold" /> Meal Plan</h2>
        </div>
        <div style={{ display:"flex", gap:"8px", flexWrap:"wrap" }}>
          <button onClick={() => setShowEasyMode(true)} disabled={recipes.length === 0} className="pm-btn"
            style={{ padding:"10px 18px", background:"#ff5252", color:"#fff", fontSize:"14px" }}>
            <Lightning size={16} weight="bold" style={{ marginRight:4, verticalAlign:"middle" }} /> Plan My Dates
          </button>
          <button onClick={() => setShowSettings(true)} className="pm-btn"
            style={{ padding:"10px 12px", background:"var(--bg-elevated, #FFF5E6)", color:"var(--text, #1A0A00)", fontSize:"14px" }}>
            <GearSix size={16} weight="bold" />
          </button>
          {activeDatesHaveMeals && <button onClick={() => setShowClearConfirm(true)} className="pm-btn" style={{ padding:"10px 14px", background:"var(--bg-card, #f5e6c8)", color:"var(--text, #1a1a1a)", fontSize:"13px", display:"inline-flex", alignItems:"center", gap:"4px" }}><Trash size={14} weight="bold" /> Clear</button>}
        </div>
      </div>

      {/* Date range picker */}
      <div style={{ marginBottom:"16px" }}>
        <DateRangePicker
          startDate={mealPlan.startDate}
          endDate={mealPlan.endDate}
          onChange={onDateRangeChange}
        />
      </div>

      {recipes.length === 0 && (
        <div style={{ textAlign:"center", padding:"40px", background:"var(--bg-card, #fff9ed)", border:"3px dashed #c8b89a", borderRadius:"16px", marginBottom:"20px" }}>
          <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:"16px", fontWeight:700, color:"var(--text-muted, #7a5c3a)" }}>Add some recipes first, then come back to plan your meals!</p>
        </div>
      )}

      {/* Legend */}
      <div style={{ display:"flex", gap:"10px", marginBottom:"12px", flexWrap:"wrap", alignItems:"center" }}>
        <span style={{ fontFamily:"'Nunito',sans-serif", fontSize:"12px", fontWeight:700, color:"var(--text-muted, #7a5c3a)" }}>Legend:</span>
        <span style={{ background:"#e8f5ff", border:"2px solid #457b9d", borderRadius:"6px", padding:"2px 10px", fontFamily:"'Nunito',sans-serif", fontSize:"12px", fontWeight:700, color:"#457b9d", display:"inline-flex", alignItems:"center", gap:"3px" }}><Lightning size={12} weight="bold" /> Easy Mode</span>
        {MEALS.map(m => <span key={m} style={{ background: MEAL_COLORS[m], border:"2px solid #1a1a1a", borderRadius:"6px", padding:"2px 10px", fontFamily:"'Nunito',sans-serif", fontSize:"11px", fontWeight:700 }}>{m}</span>)}
      </div>

      {/* Calendar Grid */}
      <div className="cal-grid" style={{ marginBottom:"20px", gridTemplateColumns:`repeat(${activeDates.length}, 1fr)` }}>
        {activeDates.map(date => {
          const isEasy = mealPlan.easyNights?.includes(date);
          return (
            <div key={date} className={`cal-day ${isEasy ? "easy-mode" : ""}`}>
              <div className="cal-day-header" style={{ fontSize:"11px", lineHeight:1.2, padding:"6px 4px" }}>
                {isEasy && <Lightning size={12} weight="bold" style={{ color:"#457b9d", verticalAlign:"middle", marginRight:2 }} />} {formatDateLabel(date)}
              </div>
              {MEALS.map(meal => {
                const slotRecipes = getSlot(date, meal);
                const slotKey = `${date}-${meal}`;
                return (
                  <div key={meal} className="cal-meal-slot-wrap"
                    onDragOver={e => { e.preventDefault(); setDragOver(slotKey); }}
                    onDragLeave={() => setDragOver(null)}
                    onDrop={e => handleDrop(e, date, meal)}>
                    <div className="meal-label" style={{ color: MEAL_COLORS[meal] }}>{meal.slice(0,1)}</div>
                    {slotRecipes.length > 0 ? (
                      <div className="cal-meal-slot filled" style={{ borderColor: MEAL_COLORS[meal], background: MEAL_COLORS[meal] + "22", flexDirection:"column", alignItems:"stretch", gap:"3px", cursor:"default" }}>
                        {slotRecipes.map(r => (
                          <div key={r.id} style={{ display:"flex", alignItems:"center", gap:"4px" }}>
                            <span style={{ fontSize:"10px", lineHeight:1.2, flex:1 }}>{r.title}</span>
                            <button onClick={() => removeFromSlot(date, meal, r.id)} style={{ flexShrink:0, background:"#E8421A", border:"2px solid #1A0A00", borderRadius:"50%", width:"22px", height:"22px", fontSize:"10px", color:"#fff", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", padding:0, lineHeight:1, transition:"transform 0.15s" }}
                              onMouseEnter={e => e.currentTarget.style.transform="scale(1.15)"}
                              onMouseLeave={e => e.currentTarget.style.transform="scale(1)"}><X size={10} weight="bold" /></button>
                          </div>
                        ))}
                        <button onClick={() => setPickerFor({ day: date, meal })} style={{ marginTop:"3px", fontSize:"11px", fontFamily:"'Nunito',sans-serif", fontWeight:800, color:"#E8421A", background:"rgba(232,66,26,0.06)", border:"2px dashed #E8421A", borderRadius:"6px", cursor:"pointer", padding:"4px 10px", alignSelf:"stretch", textAlign:"center", transition:"all 0.15s" }}
                          onMouseEnter={e => { e.currentTarget.style.background="rgba(232,66,26,0.15)"; }}
                          onMouseLeave={e => { e.currentTarget.style.background="rgba(232,66,26,0.06)"; }}>+ add</button>
                      </div>
                    ) : (
                      <div className={`cal-meal-slot ${dragOver === slotKey ? "drag-over" : ""}`}
                        onClick={() => setPickerFor({ day: date, meal })}>
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

      {/* Picker hint */}
      <div style={{ background:"var(--bg-card, #fff9ed)", border:"3px dashed #c8b89a", borderRadius:"12px", padding:"14px 20px", marginBottom:"20px", display:"flex", alignItems:"center", gap:"10px" }}>
        <HandPointing size={20} weight="bold" color="var(--text-muted, #7a5c3a)" />
        <span style={{ fontFamily:"'Nunito',sans-serif", fontSize:"13px", fontWeight:700, color:"var(--text-muted, #7a5c3a)" }}>
          Click any <strong>+</strong> slot to pick a recipe from your library!
        </span>
      </div>

      {showEasyMode && <EasyModeModal dates={activeDates} onConfirm={generateWeek} onCancel={() => setShowEasyMode(false)} />}

      {showSettings && <MealPlanSettingsModal settings={mealPlanSettings} onSave={(newSettings) => {
        save("rv_meal_settings", newSettings);
        setMealPlanSettings(newSettings);
        setShowSettings(false);
        toast("Meal plan settings saved");
      }} onClose={() => setShowSettings(false)} />}

      {showClearConfirm && (
        <div className="pm-modal-bg" onClick={() => setShowClearConfirm(false)}>
          <div className="pm-modal" style={{ maxWidth:"400px", textAlign:"center" }} onClick={e => e.stopPropagation()}>
            <h3 style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"26px", letterSpacing:"1px", color:"var(--text, #1A0A00)", marginBottom:"10px" }}>Clear Meal Plan?</h3>
            <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:"14px", color:"var(--text-muted, #7a5c3a)", marginBottom:"20px" }}>
              This will remove all meals from the selected dates. This cannot be undone.
            </p>
            <div style={{ display:"flex", gap:"10px", justifyContent:"center" }}>
              <button onClick={() => setShowClearConfirm(false)} className="pm-btn" style={{ padding:"10px 20px", background:"var(--bg-card, #f5e6c8)", color:"var(--text, #1a1a1a)", fontSize:"14px" }}>Cancel</button>
              <button onClick={clearWeek} className="pm-btn" style={{ padding:"10px 20px", background:"#E8421A", color:"#fff", fontSize:"14px" }}>Yes, Clear</button>
            </div>
          </div>
        </div>
      )}

      {/* Recipe picker modal */}
      {pickerFor && (() => {
        let pickerRecipes = mealPlanExcludedBooks.length === 0 ? recipes : recipes.filter(r =>
          !books.some(b => mealPlanExcludedBooks.includes(b.id) && b.recipeIds.includes(r.id))
        );
        if (pickerCat !== "All") pickerRecipes = pickerRecipes.filter(r => r.category === pickerCat);
        if (pickerSearch.trim()) {
          const q = pickerSearch.toLowerCase();
          pickerRecipes = pickerRecipes.filter(r =>
            r.title?.toLowerCase().includes(q) ||
            r.description?.toLowerCase().includes(q) ||
            r.tags?.some(t => t.toLowerCase().includes(q)) ||
            r.ingredients?.some(i => i.toLowerCase().includes(q))
          );
        }
        return (
        <div className="pm-modal-bg" onClick={() => { setPickerFor(null); setPickerSearch(""); setPickerCat("All"); }}>
          <div className="pm-modal" style={{ maxWidth:"520px" }} onClick={e => e.stopPropagation()}>
            <button onClick={() => { setPickerFor(null); setPickerSearch(""); setPickerCat("All"); }} className="pm-btn" style={{ position:"absolute", top:"16px", right:"16px", background:"rgba(26,10,0,0.7)", backdropFilter:"blur(6px)", color:"#fff", width:"34px", height:"34px", padding:0, fontSize:"16px", borderColor:"transparent", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center" }}><X size={16} weight="bold" /></button>
            <h3 style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"26px", letterSpacing:"1px", color:"var(--text, #1A0A00)", marginBottom:"14px", paddingRight:"40px" }}>
              Pick a recipe for {formatDateLabel(pickerFor.day)} {pickerFor.meal}
            </h3>
            <div style={{ position:"relative", marginBottom:"10px" }}>
              <MagnifyingGlass size={14} weight="bold" style={{ position:"absolute", left:"10px", top:"50%", transform:"translateY(-50%)", pointerEvents:"none", color:"var(--text-muted, #7A5A3A)" }} />
              <input value={pickerSearch} onChange={e => setPickerSearch(e.target.value)}
                placeholder="Search recipes, ingredients…" className="pm-input"
                style={{ width:"100%", paddingLeft:"32px", boxSizing:"border-box", fontSize:"13px", padding:"8px 10px 8px 32px" }} />
              {pickerSearch && (
                <button onClick={() => setPickerSearch("")}
                  style={{ position:"absolute", right:"8px", top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", fontSize:"14px", color:"var(--text-muted, #7A5A3A)", fontWeight:800 }}><X size={14} weight="bold" /></button>
              )}
            </div>
            <div style={{ display:"flex", gap:"5px", flexWrap:"wrap", marginBottom:"12px" }}>
              {["All", ...CATEGORIES].map(c => (
                <button key={c} onClick={() => setPickerCat(c)} className="pm-btn"
                  style={{ padding:"4px 10px", fontSize:"10px", fontWeight:800, textTransform:"uppercase", letterSpacing:"0.7px", background: pickerCat === c ? "#1A0A00" : "var(--bg-elevated, #FFF5E6)", color: pickerCat === c ? "#FFF5E6" : "var(--text, #1A0A00)", borderColor:"#1A0A00" }}>
                  {c}
                </button>
              ))}
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:"8px", maxHeight:"50vh", overflowY:"auto" }}>
              {pickerRecipes.length === 0 ? (
                <div style={{ textAlign:"center", padding:"32px 0", fontFamily:"'Nunito',sans-serif", fontSize:"13px", fontWeight:700, color:"var(--text-muted, #7A5A3A)" }}>
                  No recipes match — <span style={{ cursor:"pointer", textDecoration:"underline" }} onClick={() => { setPickerSearch(""); setPickerCat("All"); }}>clear filters</span>
                </div>
              ) : pickerRecipes.map(r => (
                <div key={r.id} onClick={() => { setSlot(pickerFor.day, pickerFor.meal, r.id); setPickerFor(null); setPickerSearch(""); setPickerCat("All"); toast("Added!"); }}
                  style={{ display:"flex", alignItems:"center", gap:"12px", padding:"10px 14px", background:"var(--bg-card, #fff9ed)", border:"2px solid rgba(26,10,0,0.12)", borderRadius:"10px", cursor:"pointer", transition:"all 0.2s cubic-bezier(0.16, 1, 0.3, 1)" }}
                  onMouseEnter={e => { e.currentTarget.style.background="#ffd166"; e.currentTarget.style.borderColor="#1a1a1a"; e.currentTarget.style.transform="translateY(-1px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background="#fff9ed"; e.currentTarget.style.borderColor="rgba(26,10,0,0.12)"; e.currentTarget.style.transform="none"; }}>
                  <span className="pm-tag" style={{ background: (CAT_COLORS[r.category]||CAT_COLORS.Other).bg, color:(CAT_COLORS[r.category]||CAT_COLORS.Other).text, flexShrink:0 }}>{r.category}</span>
                  <div style={{ flex:1 }}>
                    <div style={{ fontFamily:"'Nunito',sans-serif", fontSize:"14px", fontWeight:800 }}>{r.title}</div>
                    <div style={{ fontFamily:"'Nunito',sans-serif", fontSize:"11px", color:"var(--text-muted, #7a5c3a)", display:"flex", alignItems:"center", gap:"3px" }}><Timer size={11} weight="bold" /> {r.prepTime} · <Fire size={11} weight="bold" /> {r.cookTime}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        );
      })()}
    </div>
  );
}

// ── Staples Modal ──
function StaplesModal({ staples, onAdd, onRemove, onClose }) {
  const [name, setName] = useState("");
  const [section, setSection] = useState("Other");

  const handleAdd = () => {
    if (!name.trim()) return;
    onAdd(name, section);
    setName("");
  };

  const bySection = GROCERY_SECTIONS.reduce((acc, s) => {
    acc[s] = staples.filter(st => st.section === s);
    return acc;
  }, {});

  const hasStaples = staples.length > 0;

  return (
    <div className="pm-modal-bg" onClick={onClose}>
      <div className="pm-modal" style={{ maxWidth:"520px" }} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="pm-btn" style={{ position:"absolute", top:"16px", right:"16px", background:"rgba(26,10,0,0.7)", backdropFilter:"blur(6px)", color:"#fff", width:"34px", height:"34px", padding:0, fontSize:"16px", borderColor:"transparent", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center" }}><X size={16} weight="bold" /></button>

        <h3 style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"28px", letterSpacing:"1px", color:"var(--text, #1A0A00)", marginBottom:"6px", display:"flex", alignItems:"center", gap:"8px" }}>
          <Star size={24} weight="bold" color="#E8421A" /> Grocery Staples
        </h3>
        <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:"13px", color:"var(--text-muted, #7a5c3a)", marginBottom:"18px", fontWeight:600 }}>
          Items you always buy — they'll appear on every grocery list.
        </p>

        {/* Add form */}
        <div style={{ display:"flex", gap:"8px", marginBottom:"20px", flexWrap:"wrap" }}>
          <input value={name} onChange={e => setName(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") handleAdd(); }}
            placeholder="e.g. Milk, Eggs, Bread..."
            className="pm-input" style={{ flex:"2 1 160px", fontSize:"13px" }} />
          <select value={section} onChange={e => setSection(e.target.value)}
            className="pm-input" style={{ flex:"1 1 120px", fontSize:"13px", color:"var(--text, #1A0A00)", background:"var(--bg-elevated, #fff)" }}>
            {GROCERY_SECTIONS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <button onClick={handleAdd} disabled={!name.trim()} className="pm-btn pm-btn-primary"
            style={{ padding:"10px 18px", fontSize:"13px", whiteSpace:"nowrap" }}>+ Add</button>
        </div>

        {/* Staples list */}
        {hasStaples ? (
          <div className="grocery-wrap">
            {GROCERY_SECTIONS.map(sec => {
              const items = bySection[sec];
              if (!items?.length) return null;
              return (
                <div key={sec} className="grocery-section">
                  <div className="grocery-section-header">{sec}</div>
                  {items.map(item => (
                    <div key={item.id} className="grocery-item" style={{ justifyContent:"space-between" }}>
                      <span className="grocery-item-name">{item.name}</span>
                      <button onClick={() => onRemove(item.id)}
                        style={{ background:"none", border:"none", cursor:"pointer", color:"#E8421A", padding:"4px", lineHeight:1, transition:"transform 0.15s" }}
                        onMouseEnter={e => e.currentTarget.style.transform="scale(1.2)"}
                        onMouseLeave={e => e.currentTarget.style.transform="scale(1)"}>
                        <Trash size={16} weight="bold" />
                      </button>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ textAlign:"center", padding:"32px 16px", background:"var(--bg-card, #fff9ed)", border:"3px dashed #c8b89a", borderRadius:"14px" }}>
            <Star size={36} weight="bold" color="var(--text-muted, #7a5c3a)" style={{ marginBottom:"8px" }} />
            <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:"14px", fontWeight:700, color:"var(--text-muted, #7a5c3a)" }}>
              No staples yet — add items above!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Grocery List Tab ──
function GroceryListTab({ recipes, mealPlan, groceryList, setGroceryList, toast, staples, onShowStaples }) {
  const [shareUrl, setShareUrl] = useState("");
  const [showShare, setShowShare] = useState(false);
  const [groceryStart, setGroceryStart] = useState(mealPlan.startDate);
  const [groceryEnd, setGroceryEnd] = useState(mealPlan.endDate);

  // Keep grocery date range in sync when meal plan date range changes
  useEffect(() => {
    setGroceryStart(mealPlan.startDate);
    setGroceryEnd(mealPlan.endDate);
  }, [mealPlan.startDate, mealPlan.endDate]);

  const handleGroceryStart = (e) => {
    const val = e.target.value;
    if (val < mealPlan.startDate || val > mealPlan.endDate) return;
    setGroceryStart(val);
    if (val > groceryEnd) setGroceryEnd(val);
  };
  const handleGroceryEnd = (e) => {
    const val = e.target.value;
    if (val < mealPlan.startDate || val > mealPlan.endDate) return;
    setGroceryEnd(val);
    if (val < groceryStart) setGroceryStart(val);
  };

  const activeDates = dateRangeDates(groceryStart || mealPlan.startDate, groceryEnd || mealPlan.endDate);
  const plannedRecipes = [];
  activeDates.forEach(date => {
    MEALS.forEach(meal => {
      const val = mealPlan.days?.[date]?.[meal];
      const ids = Array.isArray(val) ? val : (val ? [val] : []);
      ids.forEach(id => { const r = recipes.find(x => x.id === id); if (r) plannedRecipes.push(r); });
    });
  });
  const uniqueRecipes = plannedRecipes.filter((r,i,a) => a.findIndex(x => x.id === r.id) === i);

  const generateGroceryList = () => {
    if (uniqueRecipes.length === 0) { toast("Plan some meals first!"); return; }

    // Collect all ingredients from planned recipes
    const allIngredients = uniqueRecipes.flatMap(r => r.ingredients || []);

    // Parse, consolidate, and categorize
    const consolidated = consolidateIngredients(allIngredients);
    const items = consolidated.map((entry, i) => ({
      name: entry.name,
      section: categorizeIngredient(entry.item || entry.name),
      id: `item-${i}`,
      checked: false,
      skipped: false,
    }));

    // Merge staples, deduplicating against generated items
    const itemNames = items.map(i => i.name.toLowerCase().replace(/[\d./½¼¾⅓⅔]+/g, "").trim());
    const stapleItems = (staples || [])
      .filter(s => !itemNames.some(n => n.includes(s.name.toLowerCase())))
      .map((s, i) => ({ name: s.name, section: s.section, id: `staple-${i}`, checked: false, skipped: false, isStaple: true }));

    setGroceryList({ items: [...items, ...stapleItems], generatedAt: Date.now() });
    toast("Grocery list ready!");
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
      toast("Share link copied!");
    } catch { toast("Couldn't generate link"); }
  };

  const handlePrint = () => window.print();

  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"14px", flexWrap:"wrap", gap:"12px" }}>
        <div style={{ display:"inline-block", background:"#06d6a0", border:"3px solid #1a1a1a", borderRadius:"14px", boxShadow:"0 4px 16px rgba(26,10,0,0.1)", padding:"8px 22px" }}>
          <h2 style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"32px", letterSpacing:"1px", color:"#1A0A00", display:"flex", alignItems:"center", gap:"8px" }}><ShoppingCart size={28} weight="bold" /> Grocery List</h2>
        </div>
        <div style={{ display:"flex", gap:"8px", flexWrap:"wrap" }}>
          <button onClick={generateGroceryList} disabled={uniqueRecipes.length === 0} className="pm-btn"
            style={{ padding:"10px 16px", background: uniqueRecipes.length === 0 ? "#c8b89a" : "#ff5252", color:"#fff", fontSize:"13px", display:"inline-flex", alignItems:"center", gap:"4px" }}>
            <ListIcon size={14} weight="bold" /> Build from Meal Plan
          </button>
          <button onClick={onShowStaples} className="pm-btn" style={{ padding:"10px 14px", background:"var(--bg-elevated, #fff)", color:"var(--text, #1a1a1a)", fontSize:"13px", display:"inline-flex", alignItems:"center", gap:"4px", borderColor:"var(--border-subtle, rgba(26,10,0,0.2))" }}><Star size={14} weight="bold" color="#E8421A" /> Staples{staples?.length > 0 ? ` (${staples.length})` : ""}</button>
          {groceryList.items?.length > 0 && <>
            <button onClick={handleShare} className="pm-btn" style={{ padding:"10px 14px", background:"#457b9d", color:"#fff", fontSize:"13px", display:"inline-flex", alignItems:"center", gap:"4px" }}><LinkIcon size={14} weight="bold" /> Share</button>
            <button onClick={handlePrint} className="pm-btn" style={{ padding:"10px 14px", background:"#ffd166", color:"var(--text, #1a1a1a)", fontSize:"13px", display:"inline-flex", alignItems:"center", gap:"4px" }}><Printer size={14} weight="bold" /> Print/PDF</button>
            <button onClick={clearChecked} className="pm-btn" style={{ padding:"10px 14px", background:"var(--bg-card, #f5e6c8)", color:"var(--text, #1a1a1a)", fontSize:"13px" }}>↺ Uncheck All</button>
          </>}
        </div>
      </div>

      {/* Date range filter */}
      <div style={{ display:"flex", alignItems:"center", gap:"8px", flexWrap:"wrap", background:"var(--bg-card, #fff9ed)", border:"2px solid #1a1a1a", borderRadius:"10px", padding:"10px 14px", marginBottom:"16px", boxShadow:"0 2px 10px rgba(26,10,0,0.06)" }}>
        <span style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"15px", letterSpacing:"1px", color:"var(--text-muted, #7A5A3A)", whiteSpace:"nowrap" }}>DATES</span>
        <div style={{ display:"flex", alignItems:"center", gap:"8px", flex:"1 1 auto", minWidth:0 }}>
          <input type="date" value={groceryStart} min={mealPlan.startDate} max={mealPlan.endDate} onChange={handleGroceryStart}
            className="pm-input" style={{ flex:1, minWidth:0, padding:"6px 10px", fontSize:"13px", cursor:"pointer" }} />
          <ArrowRight size={14} weight="bold" style={{ color:"var(--text-muted, #7A5A3A)", flexShrink:0 }} />
          <input type="date" value={groceryEnd} min={mealPlan.startDate} max={mealPlan.endDate} onChange={handleGroceryEnd}
            className="pm-input" style={{ flex:1, minWidth:0, padding:"6px 10px", fontSize:"13px", cursor:"pointer" }} />
          <span style={{ fontFamily:"'Nunito',sans-serif", fontSize:"11px", fontWeight:700, color:"var(--text-muted, #7A5A3A)", whiteSpace:"nowrap", flexShrink:0 }}>
            {activeDates.length} day{activeDates.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Planned meals summary */}
      {uniqueRecipes.length > 0 && (
        <div style={{ background:"var(--bg-card, #fff9ed)", border:"3px solid #1a1a1a", borderRadius:"14px", boxShadow:"0 4px 16px rgba(26,10,0,0.06)", padding:"14px 18px", marginBottom:"20px" }}>
          <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:"14px", fontWeight:800, color:"var(--text, #1a1a1a)", marginBottom:"8px", display:"flex", alignItems:"center", gap:"6px" }}><ClipboardText size={16} weight="bold" /> Based on {uniqueRecipes.length} planned recipes:</p>
          <div style={{ display:"flex", flexWrap:"wrap", gap:"6px" }}>
            {uniqueRecipes.map(r => (
              <span key={r.id} style={{ background:"#ffd166", border:"2px solid var(--text, #1a1a1a)", borderRadius:"20px", padding:"2px 10px", fontFamily:"'Nunito',sans-serif", fontSize:"12px", fontWeight:700, color:"#1A0A00" }}>{r.title}</span>
            ))}
          </div>
        </div>
      )}

      {groceryList.items?.length > 0 ? (
        <>
          {/* Progress bar */}
          <div style={{ background:"var(--bg-card, #fff9ed)", border:"3px solid #1a1a1a", borderRadius:"14px", padding:"16px 20px", marginBottom:"20px", boxShadow:"0 4px 20px rgba(26,10,0,0.08)" }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"10px" }}>
              <span style={{ fontFamily:"'Nunito',sans-serif", fontSize:"15px", fontWeight:800, display:"inline-flex", alignItems:"center", gap:"4px" }}><Package size={16} weight="bold" /> {checkedCount} / {totalCount} items grabbed!</span>
              {checkedCount === totalCount && totalCount > 0 && <span style={{ fontFamily:"'Nunito',sans-serif", fontSize:"15px", fontWeight:800, color:"#06d6a0", display:"inline-flex", alignItems:"center", gap:"4px" }}><Check size={16} weight="bold" /> All done!</span>}
            </div>
            <div style={{ background:"#e8d8c4", borderRadius:"100px", height:"10px", border:"2px solid #1a1a1a", overflow:"hidden" }}>
              <div style={{ background: checkedCount === totalCount && totalCount > 0 ? "#06d6a0" : "linear-gradient(90deg, #06d6a0, #4ae0b0)", height:"100%", width:`${totalCount > 0 ? (checkedCount/totalCount)*100 : 0}%`, transition:"width 0.4s cubic-bezier(0.16, 1, 0.3, 1)", borderRadius:"100px" }}/>
            </div>
          </div>

          <div className="grocery-wrap">
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
                      style={{ background:"var(--bg-card, #f5e6c8)", border:"2px solid var(--border-subtle, #c8b89a)", borderRadius:"6px", padding:"2px 8px", fontFamily:"'Nunito',sans-serif", fontSize:"11px", fontWeight:700, cursor:"pointer", color:"var(--text-muted, #7a5c3a)", whiteSpace:"nowrap" }}>
                      <Check size={12} weight="bold" style={{ verticalAlign:"middle", marginRight:2 }} /> Have it
                    </button>
                  </div>
                ))}
              </div>
            );
          })}
          </div>

          {/* Skipped items */}
          {groceryList.items.filter(i => i.skipped).length > 0 && (
            <div style={{ marginTop:"20px" }}>
              <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:"14px", fontWeight:800, color:"var(--text-muted, #7a5c3a)", marginBottom:"8px", display:"flex", alignItems:"center", gap:"4px" }}><Check size={14} weight="bold" /> Already have ({groceryList.items.filter(i=>i.skipped).length}):</p>
              <div style={{ display:"flex", flexWrap:"wrap", gap:"6px" }}>
                {groceryList.items.filter(i => i.skipped).map(item => (
                  <span key={item.id} onClick={() => toggleSkip(item.id)}
                    style={{ background:"#e2c89a", border:"2px solid #c8b89a", borderRadius:"20px", padding:"3px 12px", fontFamily:"'Nunito',sans-serif", fontSize:"12px", fontWeight:700, cursor:"pointer", textDecoration:"line-through", color:"var(--text-muted, #7a5c3a)" }}>
                    {item.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <div style={{ textAlign:"center", padding:"80px 20px" }}>
          <div style={{ fontSize:"52px", marginBottom:"16px" }}><ShoppingCart size={52} weight="bold" color="var(--text-muted, #7a5c3a)" /></div>
          <p style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"32px", letterSpacing:"1px", color:"var(--text, #1A0A00)", marginBottom:"8px" }}>No grocery list yet!</p>
          <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:"14px", fontWeight:700, color:"var(--text-muted, #7a5c3a)" }}>
            {uniqueRecipes.length === 0 ? "Plan some meals in the Meal Plan tab first!" : "Hit \"Generate from Meal Plan\" to build your list!"}
          </p>
        </div>
      )}

      {/* Share modal */}
      {showShare && (
        <div className="pm-modal-bg" onClick={() => setShowShare(false)}>
          <div className="pm-modal" style={{ maxWidth:"440px" }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowShare(false)} className="pm-btn" style={{ position:"absolute", top:"16px", right:"16px", background:"rgba(26,10,0,0.7)", backdropFilter:"blur(6px)", color:"#fff", width:"34px", height:"34px", padding:0, fontSize:"16px", borderColor:"transparent", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center" }}><X size={16} weight="bold" /></button>
            <h3 style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"28px", letterSpacing:"1px", color:"var(--text, #1A0A00)", marginBottom:"16px", display:"flex", alignItems:"center", gap:"8px" }}><LinkIcon size={24} weight="bold" /> Share Grocery List</h3>
            <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:"13px", color:"var(--text-muted, #7a5c3a)", marginBottom:"12px", fontWeight:600 }}>Anyone with this link can view and check off items in real time!</p>
            <div style={{ background:"var(--bg-card, #f5e6c8)", border:"3px solid #1a1a1a", borderRadius:"10px", padding:"10px 14px", marginBottom:"16px", wordBreak:"break-all", fontFamily:"'Nunito',sans-serif", fontSize:"11px", color:"var(--text, #1a1a1a)" }}>
              {shareUrl}
            </div>
            <button onClick={() => { navigator.clipboard?.writeText(shareUrl); toast("Copied!"); }} className="pm-btn"
              style={{ width:"100%", padding:"12px", background:"#06d6a0", color:"var(--text, #1a1a1a)", display:"inline-flex", alignItems:"center", justifyContent:"center", gap:"6px" }}><ClipboardText size={16} weight="bold" /> Copy Link</button>
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
        setMessage("Check your email to confirm your account, then log in!");
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
      <div style={{ minHeight:"100vh", background:"var(--bg, #FFF5E6)", display:"flex", alignItems:"center", justifyContent:"center", padding:"20px" }}>
        <div className="auth-card">
          <div style={{ textAlign:"center", marginBottom:"28px" }}>
            <div style={{ fontSize:"52px", marginBottom:"8px" }}><CookingPot size={52} weight="bold" color="#E8421A" /></div>
            <h1 style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"48px", letterSpacing:"3px" }}>
              <span style={{ color:"var(--text, #1A0A00)" }}>Coo</span><span style={{ color:"#E8421A" }}>Cheena</span>
            </h1>
            <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:"13px", color:"var(--text-muted, #7A5A3A)", fontWeight:800, marginTop:"4px", textTransform:"uppercase", letterSpacing:"1px" }}>Your kitchen, your recipes.</p>
          </div>

          {/* Google login */}
          <button className="google-btn" onClick={handleGoogle} disabled={loading}>
            <svg width="20" height="20" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Continue with Google
          </button>

          <div className="divider">or</div>

          {/* Email/password tabs */}
          <div style={{ display:"flex", marginBottom:"18px", overflow:"hidden", border:"3px solid #1a1a1a", borderRadius:"var(--radius-sm, 8px)", boxShadow:"0 2px 8px rgba(26,10,0,0.08)" }}>
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

            <button onClick={handleEmail} disabled={loading} className="pm-btn pm-btn-primary"
              style={{ width:"100%", padding:"14px", fontSize:"15px" }}>
              {loading ? "..." : authTab === "login" ? <><Key size={16} weight="bold" style={{ marginRight:4, verticalAlign:"middle" }} /> Log In</> : <><Confetti size={16} weight="bold" style={{ marginRight:4, verticalAlign:"middle" }} /> Create Account</>}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// ── Feedback Widget ──
function HouseholdModal({ inviteCode, householdPartner, onLinked, onUnlinked, onClose, toast }) {
  const [joinCode, setJoinCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleJoin = async () => {
    if (joinCode.trim().length !== 8) return;
    setLoading(true); setError("");
    const { data, error: rpcError } = await supabase.rpc("join_household", { code: joinCode.trim().toUpperCase() });
    if (rpcError || data?.error) {
      setError(data?.error || "Something went wrong. Try again.");
    } else {
      toast("Household linked! You now share recipes with your partner.");
      onLinked(data.household_id);
    }
    setLoading(false);
  };

  const handleLeave = async () => {
    if (!confirm("Are you sure? You'll keep your own recipes and books, but lose access to shared meal plans and grocery lists.")) return;
    setLoading(true);
    const { data, error: rpcError } = await supabase.rpc("leave_household");
    if (rpcError || data?.error) {
      toast("Something went wrong.");
    } else {
      toast("Unlinked from household. Your recipes are safe.");
      onUnlinked(data.household_id);
    }
    setLoading(false);
  };

  return (
    <div className="pm-modal-bg" onClick={onClose}>
      <div className="pm-modal" style={{ maxWidth:"480px" }} onClick={e => e.stopPropagation()}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"20px" }}>
          <h2 style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"28px", letterSpacing:"1px", color:"var(--text, #1A0A00)", display:"flex", alignItems:"center", gap:"8px" }}>
            <LinkIcon size={22} weight="bold" />Household
          </h2>
          <button onClick={onClose} style={{ background:"none", border:"none", cursor:"pointer", color:"var(--text, #1A0A00)" }}><X size={20} weight="bold" /></button>
        </div>

        {householdPartner ? (
          <div>
            <div style={{ background:"#FFD166", border:"3px solid #1A0A00", borderRadius:"12px", padding:"18px", marginBottom:"20px", textAlign:"center" }}>
              <p style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"24px", letterSpacing:"1px", color:"#1A0A00" }}>You're linked! 🔗</p>
              <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:"13px", fontWeight:700, color:"#7A5A3A", marginTop:"4px" }}>
                You and your partner share recipes, meal plans, and grocery lists.
              </p>
            </div>
            <button onClick={handleLeave} disabled={loading} className="pm-btn"
              style={{ width:"100%", padding:"12px", background:"transparent", color:"#E8421A", borderColor:"#E8421A", fontFamily:"'Nunito',sans-serif", fontSize:"13px", fontWeight:800 }}>
              {loading ? "..." : "Unlink Household"}
            </button>
          </div>
        ) : (
          <>
            <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:"13px", fontWeight:700, color:"var(--text-muted, #7A5A3A)", marginBottom:"24px", lineHeight:1.6 }}>
              Link your account with a partner to share your recipe library, meal plan, and grocery list.
            </p>

            <div style={{ marginBottom:"24px" }}>
              <p style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"16px", letterSpacing:"1px", color:"var(--text, #1A0A00)", marginBottom:"8px" }}>1 — Share your code with your partner</p>
              <div style={{ display:"flex", gap:"8px", alignItems:"stretch" }}>
                <div style={{ flex:1, background:"#1A0A00", color:"#FFD166", fontFamily:"'Bebas Neue',cursive", fontSize:"30px", letterSpacing:"8px", textAlign:"center", padding:"14px 12px", borderRadius:"10px", border:"3px solid #1A0A00" }}>
                  {inviteCode}
                </div>
                <button onClick={handleCopy} className="pm-btn"
                  style={{ padding:"12px 16px", background: copied ? "#06d6a0" : "var(--bg-elevated, #FFF5E6)", borderColor: copied ? "#06d6a0" : "#1A0A00", color:"#1A0A00" }}>
                  {copied ? <Check size={18} weight="bold" /> : <ClipboardText size={18} weight="bold" />}
                </button>
              </div>
              <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:"11px", fontWeight:700, color:"var(--text-muted, #7A5A3A)", marginTop:"6px" }}>
                8-character code · one-time use
              </p>
            </div>

            <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"24px" }}>
              <div style={{ flex:1, height:"2px", background:"rgba(26,10,0,0.1)" }} />
              <span style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"14px", letterSpacing:"1px", color:"var(--text-muted, #7A5A3A)" }}>or</span>
              <div style={{ flex:1, height:"2px", background:"rgba(26,10,0,0.1)" }} />
            </div>

            <div>
              <p style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"16px", letterSpacing:"1px", color:"var(--text, #1A0A00)", marginBottom:"8px" }}>2 — Enter your partner's code</p>
              <div style={{ display:"flex", gap:"8px" }}>
                <input value={joinCode} onChange={e => setJoinCode(e.target.value.toUpperCase())}
                  placeholder="XXXXXXXX" maxLength={8}
                  className="pm-input"
                  style={{ flex:1, fontFamily:"'Bebas Neue',cursive", fontSize:"24px", letterSpacing:"6px", textAlign:"center" }}
                  onKeyDown={e => e.key === "Enter" && handleJoin()} />
                <button onClick={handleJoin} disabled={loading || joinCode.length !== 8} className="pm-btn"
                  style={{ padding:"12px 20px", background: joinCode.length === 8 ? "#E8421A" : "var(--bg-elevated, #FFF5E6)", color: joinCode.length === 8 ? "#fff" : "var(--text-muted, #7A5A3A)", borderColor: joinCode.length === 8 ? "#E8421A" : "rgba(26,10,0,0.3)" }}>
                  {loading ? "..." : "Link!"}
                </button>
              </div>
              {error && <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:"12px", fontWeight:800, color:"#E8421A", marginTop:"8px" }}>{error}</p>}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

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
      <button className="fb-btn" onClick={() => setOpen(o => !o)} style={{ display:"inline-flex", alignItems:"center", gap:"6px" }}>
        <ChatCircle size={16} weight="bold" /> Feedback
      </button>
      {open && (
        <div className="fb-panel">
          {done ? (
            <div style={{ textAlign:"center", padding:"16px 0" }}>
              <div style={{ marginBottom:"8px" }}><Check size={38} weight="bold" color="#06d6a0" /></div>
              <p style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"20px", letterSpacing:"1px", color:"var(--text, #1A0A00)" }}>Thanks! We'll look into it.</p>
            </div>
          ) : (
            <>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"14px" }}>
                <h3 style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"22px", letterSpacing:"1px", color:"var(--text, #1A0A00)" }}>Send Feedback</h3>
                <button onClick={close} style={{ background:"none", border:"none", fontSize:"18px", cursor:"pointer", color:"var(--text-muted, #7A5A3A)", lineHeight:1 }}><X size={18} weight="bold" /></button>
              </div>
              <div style={{ display:"flex", gap:"4px", marginBottom:"12px" }}>
                {["Bug", "Feature", "General"].map(t => (
                  <button key={t} onClick={() => setType(t)} className="pm-btn"
                    style={{ flex:1, padding:"5px 4px", fontSize:"10px", background: type === t ? "#1A0A00" : "var(--bg-elevated, #FFF5E6)", color: type === t ? "#FFF5E6" : "var(--text, #1A0A00)" }}>
                    {t === "Bug" ? <><Bug size={12} weight="bold" style={{ marginRight:3, verticalAlign:"middle" }} /> Bug</> : t === "Feature" ? <><Sparkle size={12} weight="bold" style={{ marginRight:3, verticalAlign:"middle" }} /> Feature</> : <><ChatCircle size={12} weight="bold" style={{ marginRight:3, verticalAlign:"middle" }} /> General</>}
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
                {sending ? "Sending..." : <><span>Send</span> <ArrowRight size={14} weight="bold" style={{ verticalAlign:"middle" }} /></>}
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
  const [darkMode, setDarkMode] = useState(() => load("rv_dark_mode", false));

  const [recipes, setRecipes] = useState([]);
  const [mealPlan, setMealPlan] = useState(() => {
    const start = todayISO();
    return { startDate: start, endDate: addDays(start, 6), days: {}, easyNights: [] };
  });
  const [groceryList, setGroceryList] = useState({ items: [] });
  const [staples, setStaples] = useState([]);
  const [showStaplesModal, setShowStaplesModal] = useState(false);
  const [mealPlanLoaded, setMealPlanLoaded] = useState(false);
  const [mealHistory, setMealHistory] = useState(() => load(KEYS.mealHistory, []));

  const [books, setBooks] = useState([]);
  const [activeBook, setActiveBook] = useState(null);
  const [showNewBook, setShowNewBook] = useState(false);
  const [newBookName, setNewBookName] = useState("");
  const [newBookEmoji, setNewBookEmoji] = useState("BookOpen");

  const [input, setInput] = useState("");
  const [mode, setMode] = useState("generate");
  const [lazyCategory, setLazyCategory] = useState("Dinner");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [previews, setPreviews] = useState([]); // 3-option idea results
  const [selected, setSelected] = useState(null);
  const [filterCat, setFilterCat] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [mealPlanExcludedBooks, setMealPlanExcludedBooks] = useState(() => load("rv_excluded_books", []));
  const [mealPlanSettings, setMealPlanSettings] = useState(() => load("rv_meal_settings", { ...DEFAULT_MEAL_SETTINGS }));
  const [error, setError] = useState("");
  const [rawFoodWarning, setRawFoodWarning] = useState(null);
  const [toxicFoodWarning, setToxicFoodWarning] = useState(null);
  const [tab, setTab] = useState("add");
  const [menuOpen, setMenuOpen] = useState(false);
  const [dragRecipe, setDragRecipe] = useState(null);
  const { msg: toastMsg, show: toastShow, toast } = useToast();

  const [householdId, setHouseholdId] = useState(null);
  const [householdPartner, setHouseholdPartner] = useState(false);
  const [inviteCode, setInviteCode] = useState(null);
  const [showHouseholdModal, setShowHouseholdModal] = useState(false);

  // ── Dark mode toggle ──
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
    save("rv_dark_mode", darkMode);
  }, [darkMode]);

  // ── Lock body scroll when modals are open (prevents background scroll on mobile) ──
  useEffect(() => {
    const scrollY = window.scrollY;
    if (selected) {
      document.body.classList.add("modal-open");
      document.body.style.top = `-${scrollY}px`;
    }
    return () => {
      if (document.body.classList.contains("modal-open")) {
        document.body.classList.remove("modal-open");
        document.body.style.top = "";
        window.scrollTo(0, scrollY);
      }
    };
  }, [selected]);

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
      // Step 0: Resolve household_id for this user
      const { data: memberRow } = await supabase
        .from("household_members")
        .select("household_id, households(invite_code, invite_used)")
        .eq("user_id", user.id)
        .single();
      if (!memberRow) {
        // No household yet — backfill hasn't run or DB not migrated yet
        console.warn("CooCheena: no household found for user. Run the 001_households migration.");
        return;
      }
      const hId = memberRow.household_id;
      setHouseholdId(hId);
      setInviteCode(memberRow.households?.invite_code ?? null);
      const { data: otherMembers } = await supabase
        .from("household_members").select("user_id").eq("household_id", hId).neq("user_id", user.id);
      setHouseholdPartner((otherMembers?.length ?? 0) > 0);

      // Load recipes
      const { data: recipesData } = await supabase.from("recipes")
        .select("*").eq("household_id", hId).order("created_at", { ascending: false });
      if (recipesData) {
        setRecipes(recipesData.map(r => ({
          id: r.id, title: r.title, description: r.description,
          prepTime: r.prep_time, cookTime: r.cook_time, servings: r.servings,
          category: r.category, ingredients: r.ingredients, steps: r.steps,
          tags: r.tags, website: r.website, _saved: true
        })));
      }

      // Load meal plans — merge days from ALL saved plans so no data is lost
      supabase.from("meal_plans").select("*").eq("household_id", hId)
        .then(({ data: plans }) => {
          try {
            if (!plans || plans.length === 0) return;
            const today = todayISO();
            const isISODate = s => /^\d{4}-\d{2}-\d{2}$/.test(s);
            const validPlans = plans.filter(p => {
              const keys = Object.keys(p.days || {});
              return keys.length === 0 || isISODate(keys[0]);
            });
            if (validPlans.length === 0) return;
            // Merge days from all saved plans (newer plans win on conflict)
            const mergedDays = {};
            let latestEasyNights = [];
            validPlans
              .sort((a, b) => (a.week_of || "").localeCompare(b.week_of || ""))
              .forEach(p => {
                Object.entries(p.days || {}).forEach(([date, meals]) => {
                  if (!mergedDays[date]) mergedDays[date] = {};
                  Object.entries(meals).forEach(([meal, val]) => {
                    mergedDays[date][meal] = Array.isArray(val) ? val : (val ? [val] : []);
                  });
                });
                if (p.easy_mode_nights?.length) latestEasyNights = p.easy_mode_nights;
              });
            // Determine date range: prefer range containing today, else use today
            const allDates = Object.keys(mergedDays).sort();
            const start = today;
            const endDate = allDates.length && allDates[allDates.length - 1] >= today
              ? (allDates[allDates.length - 1] < addDays(today, 6) ? addDays(today, 6) : allDates[allDates.length - 1])
              : addDays(today, 6);
            setMealPlan({ startDate: start, endDate, days: mergedDays, easyNights: latestEasyNights });
            // Load grocery list for the current week
            supabase.from("grocery_lists").select("*").eq("household_id", hId).eq("week_of", start).single()
              .then(({ data: gl }) => { if (gl) setGroceryList({ items: gl.items || [] }); });
          } finally {
            setMealPlanLoaded(true);
          }
        });

      // Load grocery staples (stays per-user — personal preference)
      supabase.from("grocery_staples").select("*").eq("user_id", user.id).order("section")
        .then(({ data: staplesData }) => { if (staplesData) setStaples(staplesData.map(s => ({ id: s.id, name: s.name, section: s.section }))); });

      // Load recipe books
      const { data: booksData } = await supabase.from("recipe_books")
        .select("*").eq("household_id", hId).order("created_at");

      const seededKey = `rv2_seeded_${user.id}`;
      const isAloneInHousehold = (otherMembers?.length ?? 0) === 0;
      if (booksData && booksData.length === 0 && !localStorage.getItem(seededKey) && isAloneInHousehold) {
        // New solo user — seed a starter recipe + "Getting Started" book
        localStorage.setItem(seededKey, "1");
        const starterRecipe = await callClaude(SYS_RECIPE_GEN,
          "Create a recipe for: Classic Spaghetti Carbonara");
        if (starterRecipe?.title) {
          const { data: savedRecipe } = await supabase.from("recipes").insert({
            user_id: user.id, household_id: hId,
            title: starterRecipe.title, description: starterRecipe.description,
            prep_time: starterRecipe.prepTime, cook_time: starterRecipe.cookTime,
            servings: starterRecipe.servings, category: starterRecipe.category || "Dinner",
            ingredients: starterRecipe.ingredients || [], steps: starterRecipe.steps || [],
            tags: starterRecipe.tags || [], website: ""
          }).select().single();
          if (savedRecipe) {
            setRecipes(prev => [{ id: savedRecipe.id, ...starterRecipe, _saved: true }, ...prev]);
            const { data: newBook } = await supabase.from("recipe_books").insert({
              user_id: user.id, household_id: hId, name: "Getting Started", emoji: "Star",
              recipe_ids: [savedRecipe.id]
            }).select().single();
            if (newBook) {
              setBooks([{ id: newBook.id, name: newBook.name, emoji: newBook.emoji, recipeIds: newBook.recipe_ids || [] }]);
              toast("Welcome! Your Getting Started book is ready!");
            }
          }
        }
      } else if (booksData) {
        // Migrate old emoji values to Phosphor icon keys
        const EMOJI_TO_ICON = { "📖":"BookOpen", "📚":"BookOpen", "⭐":"Star", "★":"Star", "🌮":"ForkKnife", "🥗":"Leaf", "🍝":"BowlFood", "🍕":"Pizza", "🥘":"CookingPot", "🍜":"BowlFood" };
        const migrated = booksData.map(b => {
          const newEmoji = EMOJI_TO_ICON[b.emoji];
          if (newEmoji) {
            supabase.from("recipe_books").update({ emoji: newEmoji }).eq("id", b.id).eq("household_id", hId).then(() => {});
          }
          return { id: b.id, name: b.name, emoji: newEmoji || b.emoji, recipeIds: b.recipe_ids || [] };
        });
        setBooks(migrated);
      }
    };
    loadUserData();
  }, [user]);

  // ── Persist meal history locally ──
  useEffect(() => save(KEYS.mealHistory, mealHistory), [mealHistory]);

  // ── Sync meal plan to Supabase (only after initial load to avoid race wipe) ──
  useEffect(() => {
    if (!user || !householdId || !mealPlan.startDate || !mealPlanLoaded) return;
    const savePlan = async () => {
      // Delete all existing plans then save the canonical state as one row
      // This prevents stale rows from resurrecting deleted meals on reload
      await supabase.from("meal_plans").delete().eq("household_id", householdId).neq("week_of", mealPlan.startDate);
      const { error } = await supabase.from("meal_plans").upsert({
        user_id: user.id, household_id: householdId, week_of: mealPlan.startDate,
        days: mealPlan.days || {}, easy_mode_nights: mealPlan.easyNights || []
      }, { onConflict: "household_id,week_of" });
      if (error) console.error("Failed to save meal plan:", error);
    };
    savePlan();
  }, [mealPlan, user, householdId, mealPlanLoaded]);

  // ── Sync grocery list to Supabase ──
  useEffect(() => {
    if (!user || !householdId || !mealPlan.startDate) return;
    supabase.from("grocery_lists").upsert({
      user_id: user.id, household_id: householdId, week_of: mealPlan.startDate, items: groceryList.items || []
    }, { onConflict: "household_id,week_of" });
  }, [groceryList, user, householdId]);

  // ── Update date range — preserve all existing meals, just shift the view ──
  const handleDateRangeChange = (startDate, endDate) => {
    setMealPlan(prev => ({ ...prev, startDate, endDate }));
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    const start = todayISO();
    setHouseholdId(null); setHouseholdPartner(false); setInviteCode(null);
    setRecipes([]); setMealPlan({ startDate: start, endDate: addDays(start, 6), days: {}, easyNights: [] });
    setGroceryList({ items: [] }); setStaples([]); setBooks([]); setActiveBook(null);
    toast("Signed out!");
  };

  // ── Book helpers ──
  const createBook = async () => {
    if (!newBookName.trim() || !user || !householdId) return;
    const { data, error: err } = await supabase.from("recipe_books").insert({
      user_id: user.id, household_id: householdId, name: newBookName.trim(), emoji: newBookEmoji, recipe_ids: []
    }).select().single();
    if (!err && data) {
      setBooks(prev => [...prev, { id: data.id, name: data.name, emoji: data.emoji, recipeIds: data.recipe_ids || [] }]);
      setNewBookName(""); setNewBookEmoji("BookOpen"); setShowNewBook(false);
      toast("Book created!");
    }
  };

  const deleteBook = async (bookId) => {
    if (!user || !householdId) return;
    await supabase.from("recipe_books").delete().eq("id", bookId).eq("household_id", householdId);
    setBooks(prev => prev.filter(b => b.id !== bookId));
    if (activeBook === bookId) setActiveBook(null);
    toast("Book deleted.");
  };

  // ── Staple helpers ──
  const addStaple = async (name, section) => {
    if (!name.trim() || !user) return;
    const { data, error: err } = await supabase.from("grocery_staples").insert({
      user_id: user.id, name: name.trim(), section
    }).select().single();
    if (!err && data) {
      setStaples(prev => [...prev, { id: data.id, name: data.name, section: data.section }]);
      toast("Staple added!");
    } else if (err?.code === "23505") {
      toast("That staple already exists!");
    }
  };

  const removeStaple = async (id) => {
    if (!user) return;
    await supabase.from("grocery_staples").delete().eq("id", id).eq("user_id", user.id);
    setStaples(prev => prev.filter(s => s.id !== id));
  };

  const toggleRecipeInBook = async (bookId, recipeId) => {
    if (!user || !householdId) return;
    const book = books.find(b => b.id === bookId);
    if (!book) return;
    const inBook = book.recipeIds.includes(recipeId);
    const newIds = inBook ? book.recipeIds.filter(id => id !== recipeId) : [...book.recipeIds, recipeId];
    const { error: err } = await supabase.from("recipe_books")
      .update({ recipe_ids: newIds }).eq("id", bookId).eq("household_id", householdId);
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
    setLoading(true); setError(""); setPreview(null); setPreviews([]);
    try {
      const isUrl = input.trim().startsWith("http");
      if (isUrl) {
        const result = await callClaudeWithUrl(SYS_RECIPE_PARSE, input.trim());
        if (!result?.title) throw new Error();
        const parsed = { ...result, id: Date.now() };
        setPreview(parsed);
        const toxicItems = detectToxicFood(parsed);
        if (toxicItems.length) setToxicFoodWarning(toxicItems);
        else { const rawItems = detectRawFood(parsed); if (rawItems.length) setRawFoodWarning(rawItems); }
      } else {
        const result = await callClaude(SYS_RECIPE_GEN_3, `Give me 3 recipe ideas for: ${input.trim()}`, 4500);
        const arr = Array.isArray(result) ? result : result?.title ? [result] : null;
        if (!arr?.length) throw new Error();
        const mapped = arr.map((r, i) => ({ ...r, id: Date.now() + i }));
        setPreviews(mapped);
        const toxicItems = detectToxicFood(mapped);
        if (toxicItems.length) setToxicFoodWarning(toxicItems);
        else { const rawItems = detectRawFood(mapped); if (rawItems.length) setRawFoodWarning(rawItems); }
      }
    } catch { setError("Something went wrong! Try a different idea."); }
    setLoading(false);
  };

  const handleLazyPick = async () => {
    setLoading(true); setError(""); setPreview(null); setPreviews([]);
    try {
      const result = await callClaude(SYS_RECIPE_GEN, `Surprise me with a creative, delicious ${lazyCategory} recipe. Don't pick anything too basic — make it interesting!`, 1500);
      if (!result?.title) throw new Error();
      setPreview({ ...result, id: Date.now() });
    } catch { setError("Couldn't think of anything! Try again."); }
    setLoading(false);
  };

  const handleSave = async (recipe) => {
    if (!user || !householdId) return;
    const dbRecipe = {
      user_id: user.id, household_id: householdId,
      title: recipe.title, description: recipe.description,
      prep_time: recipe.prepTime, cook_time: recipe.cookTime, servings: recipe.servings,
      category: recipe.category, ingredients: recipe.ingredients || [],
      steps: recipe.steps || [], tags: recipe.tags || [], website: recipe.website || ""
    };
    const isUUID = id => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(String(id));
    if (recipe.id && isUUID(recipe.id)) {
      const { user_id: _uid, household_id: _hid, ...updateFields } = dbRecipe;
      const { error } = await supabase.from("recipes").update(updateFields).eq("id", recipe.id).eq("household_id", householdId);
      if (!error) {
        setRecipes(prev => prev.map(r => r.id === recipe.id ? { ...r, ...recipe } : r));
        toast("Recipe updated!");
        return { ...recipe };
      } else { toast("Failed to update recipe."); return null; }
    } else {
      const { data, error } = await supabase.from("recipes").insert(dbRecipe).select().single();
      if (!error && data) {
        const saved = { id: data.id, ...recipe, _saved: true };
        setRecipes(prev => [saved, ...prev.filter(r => r.id !== recipe.id)]);
        toast("Recipe saved!");
        return saved;
      } else { toast("Failed to save recipe."); return null; }
    }
  };

  const handleManualSave = async (recipe, selectedBookIds) => {
    const saved = await handleSave(recipe);
    if (saved && selectedBookIds.length > 0) {
      for (const bookId of selectedBookIds) {
        await toggleRecipeInBook(bookId, saved.id);
      }
    }
    setMode("generate");
    setTab("library");
    setInput("");
  };

  const toggleBookMealPlan = (bookId) => {
    setMealPlanExcludedBooks(prev => {
      const next = prev.includes(bookId) ? prev.filter(id => id !== bookId) : [...prev, bookId];
      save("rv_excluded_books", next);
      return next;
    });
  };

  const handleDelete = async (id) => {
    if (!user || !householdId) return;
    await supabase.from("recipes").delete().eq("id", id).eq("household_id", householdId);
    setRecipes(prev => prev.filter(r => r.id !== id));
    toast("Recipe deleted.");
  };
  let filtered = filterCat === "All" ? recipes : recipes.filter(r => r.category === filterCat);
  if (activeBook !== null) {
    const activeBookData = books.find(b => b.id === activeBook);
    if (activeBookData) filtered = filtered.filter(r => activeBookData.recipeIds.includes(r.id));
  }
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(r =>
      r.title?.toLowerCase().includes(q) ||
      r.description?.toLowerCase().includes(q) ||
      r.tags?.some(t => t.toLowerCase().includes(q)) ||
      r.ingredients?.some(i => i.toLowerCase().includes(q))
    );
  }

  const TABS = [
    { id: "add", label: "Add", icon: <PencilSimple size={14} weight="bold" style={{ marginRight:4, verticalAlign:"middle" }} /> },
    { id: "library", label: `Recipes (${recipes.length})`, icon: <Books size={14} weight="bold" style={{ marginRight:4, verticalAlign:"middle" }} /> },
    { id: "calendar", label: "Meal Plan", icon: <CalendarBlank size={14} weight="bold" style={{ marginRight:4, verticalAlign:"middle" }} /> },
    { id: "grocery", label: "Grocery List", icon: <ShoppingCart size={14} weight="bold" style={{ marginRight:4, verticalAlign:"middle" }} /> },
  ];

  // Auth gate
  if (authLoading) {
    return (
      <>
        <style>{GOOGLE_FONTS}</style>
        <style>{STYLES}</style>
        <div style={{ minHeight:"100vh", background:"var(--bg, #FFF5E6)", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <div style={{ textAlign:"center" }}>
            <div className="cooking-anim"><CookingPot size={44} weight="bold" color="#E8421A" /></div>
            <p style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"24px", letterSpacing:"2px", color:"var(--text, #1A0A00)", marginTop:"14px" }}>Loading...</p>
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
      <div style={{ minHeight:"100vh", background:"var(--bg, #FFF5E6)" }}>

        {/* Header */}
        <header className="pm-header">
          <div style={{ maxWidth:"1100px", margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", height:"68px", padding:"0 24px" }}>
            <div onClick={() => setTab("add")} style={{ display:"flex", alignItems:"center", gap:"10px", cursor:"pointer" }}>
              <CookingPot size={28} weight="bold" color="#E8421A" />
              <h1 style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"32px", letterSpacing:"3px" }}>
                <span style={{ color:"var(--text, #1A0A00)" }}>Coo</span><span style={{ color:"#E8421A" }}>Cheena</span>
              </h1>
            </div>
            {/* Desktop nav */}
            <nav className="pm-desktop-nav">
              {TABS.map(t => (
                <button key={t.id} onClick={() => setTab(t.id)} className="pm-btn"
                  style={{ padding:"8px 16px", background: tab === t.id ? "#FFD166" : "var(--bg-elevated, rgba(255,255,255,0.7))", color: tab === t.id ? "#1A0A00" : "var(--text, #1A0A00)", fontSize:"13px", borderColor: tab === t.id ? "#1A0A00" : "var(--border-subtle, rgba(26,10,0,0.2))" }}>
                  {t.icon}{t.label}
                </button>
              ))}
              <button onClick={() => setDarkMode(d => !d)} className="pm-btn"
                style={{ padding:"8px 12px", fontSize:"16px", marginLeft:"4px", background: darkMode ? "#FFD166" : "#2a2018", color: darkMode ? "#1A0A00" : "#FFD166", borderColor: darkMode ? "#1A0A00" : "#3a2a1a", lineHeight:1, display:"flex", alignItems:"center", justifyContent:"center" }}
                title={darkMode ? "Switch to light mode" : "Switch to dark mode"}>
                {darkMode ? <Sun size={18} weight="bold" /> : <Moon size={18} weight="bold" />}
              </button>
              <button onClick={() => setShowHouseholdModal(true)} className="pm-btn"
                style={{ padding:"8px 12px", background: householdPartner ? "#FFD166" : "var(--bg-elevated, rgba(255,255,255,0.7))", color:"var(--text, #1A0A00)", fontSize:"12px", borderColor: householdPartner ? "#1A0A00" : "var(--border-subtle, rgba(26,10,0,0.2))", whiteSpace:"nowrap" }}>
                <LinkIcon size={13} weight="bold" style={{ marginRight:3, verticalAlign:"middle" }} />
                {householdPartner ? "Household ✓" : "Link Partner"}
              </button>
              <button onClick={signOut} className="pm-btn"
                style={{ padding:"8px 12px", background:"#1A0A00", color:"#fff", fontSize:"12px", whiteSpace:"nowrap" }}>
                Sign Out
              </button>
            </nav>
            {/* Mobile hamburger button */}
            <button className="pm-hamburger-btn" onClick={() => setMenuOpen(true)} aria-label="Menu">
              <ListIcon size={22} weight="bold" />
            </button>
          </div>
        </header>

        {/* Ticker */}
        <div className="cc-ticker">
          <div className="cc-ticker-inner">
            <span className="cc-ticker-item">WHAT'S FOR DINNER?</span><span className="cc-ticker-dot"><Diamond size={10} weight="fill" /></span>
            <span className="cc-ticker-item">AI POWERED RECIPES</span><span className="cc-ticker-dot"><Diamond size={10} weight="fill" /></span>
            <span className="cc-ticker-item">MEAL PLAN YOUR WEEK</span><span className="cc-ticker-dot"><Diamond size={10} weight="fill" /></span>
            <span className="cc-ticker-item">GROCERY LIST READY</span><span className="cc-ticker-dot"><Diamond size={10} weight="fill" /></span>
            <span className="cc-ticker-item">YOUR KITCHEN YOUR RULES</span><span className="cc-ticker-dot"><Diamond size={10} weight="fill" /></span>
            <span className="cc-ticker-item">WHAT'S FOR DINNER?</span><span className="cc-ticker-dot"><Diamond size={10} weight="fill" /></span>
            <span className="cc-ticker-item">AI POWERED RECIPES</span><span className="cc-ticker-dot"><Diamond size={10} weight="fill" /></span>
            <span className="cc-ticker-item">MEAL PLAN YOUR WEEK</span><span className="cc-ticker-dot"><Diamond size={10} weight="fill" /></span>
            <span className="cc-ticker-item">GROCERY LIST READY</span><span className="cc-ticker-dot"><Diamond size={10} weight="fill" /></span>
            <span className="cc-ticker-item">YOUR KITCHEN YOUR RULES</span><span className="cc-ticker-dot"><Diamond size={10} weight="fill" /></span>
          </div>
        </div>

        <main className="pm-mobile-content" style={{ maxWidth:"1200px", margin:"0 auto", padding:"40px 32px" }}>

          {/* ADD RECIPE TAB */}
          {tab === "add" && (
            <div style={{ maxWidth:"640px", margin:"0 auto" }}>
              <div style={{ marginBottom:"32px" }}>
                <h2 className="cc-hero-heading" style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"80px", lineHeight:0.9, letterSpacing:"2px", color:"var(--text, #1A0A00)", marginBottom:"24px" }}>
                  <span style={{color:"#E8421A"}}>What</span><br/>Are You<br/><span className="outline-text" style={{WebkitTextStroke:"2px var(--text, #1A0A00)", color:"transparent", letterSpacing:"4px"}}>Cooking?</span>
                </h2>
                <p style={{ fontFamily:"'Nunito',sans-serif", color:"var(--text-muted, #7A5A3A)", fontSize:"14px", fontWeight:700, marginBottom:"20px" }}>
                  {mode === "manual" ? "Fill in your recipe details below." : mode === "lazy" ? "Pick a meal type and I'll choose something for you!" : "Paste a URL or describe what you want to make!"}
                </p>
              </div>
              <div style={{ display:"flex", gap:"10px", marginBottom:"24px", flexWrap:"wrap" }}>
                {[{ val:"generate", label:"From Idea", icon: <Lightbulb size={14} weight="bold" style={{ marginRight:4, verticalAlign:"middle" }} /> }, { val:"url", label:"From URL", icon: <LinkIcon size={14} weight="bold" style={{ marginRight:4, verticalAlign:"middle" }} /> }, { val:"manual", label:"From Memory", icon: <Brain size={14} weight="bold" style={{ marginRight:4, verticalAlign:"middle" }} /> }, { val:"lazy", label:"I'm Lazy, Pick For Me", icon: <span style={{ marginRight:4 }}>🎲</span> }].map(m => (
                  <button key={m.val} onClick={() => { setMode(m.val); setPreview(null); setPreviews([]); setError(""); }}
                    className="pm-btn"
                    style={{ padding:"11px 22px", background: mode === m.val ? "#E8421A" : "var(--bg-elevated, #FFF5E6)", color: mode === m.val ? "#fff" : "var(--text, #1A0A00)", borderColor: mode === m.val ? "#E8421A" : "var(--border-subtle, #1A0A00)" }}>
                    {m.icon}{m.label}
                  </button>
                ))}
              </div>

              {/* Manual form */}
              {mode === "manual" && (
                <ManualRecipeForm
                  books={books}
                  onSave={handleManualSave}
                  onCancel={() => { setMode("generate"); }} />
              )}

              {/* Lazy mode — category picker */}
              {mode === "lazy" && (
                <div>
                  <div style={{ display:"flex", gap:"10px", marginBottom:"20px", flexWrap:"wrap" }}>
                    {["Breakfast","Lunch","Dinner","Dessert","Snacks"].map(cat => (
                      <button key={cat} onClick={() => { setLazyCategory(cat); setPreview(null); setError(""); }}
                        className="pm-btn"
                        style={{ padding:"10px 20px", background: lazyCategory === cat ? "#FFD166" : "var(--bg-elevated, #FFF5E6)", color:"#1A0A00", borderColor: lazyCategory === cat ? "#1A0A00" : "var(--border-subtle, rgba(26,10,0,0.3))", fontFamily:"'Bebas Neue',cursive", fontSize:"18px", letterSpacing:"1px" }}>
                        {cat}
                      </button>
                    ))}
                  </div>
                  <button onClick={handleLazyPick} disabled={loading} className="pm-btn"
                    style={{ padding:"14px 32px", background: loading ? "#C4A882" : "#E8421A", color:"#fff", borderColor: loading ? "#C4A882" : "#E8421A", fontFamily:"'Bebas Neue',cursive", fontSize:"22px", letterSpacing:"2px", marginBottom:"28px" }}>
                    {loading ? "Thinking..." : "🎲 Pick For Me!"}
                  </button>
                  {error && <div style={{ textAlign:"center", marginBottom:"18px" }}><span style={{ fontFamily:"'Nunito',sans-serif", fontWeight:800, color:"#E8421A", fontSize:"14px", background:"var(--bg-elevated, #fff)", border:"3px solid #E8421A", borderRadius:"8px", padding:"6px 16px", display:"inline-block" }}>{error}</span></div>}
                  {loading && <div style={{ textAlign:"center", padding:"50px 0" }}><div className="cooking-anim"><CookingPot size={44} weight="bold" color="#E8421A" /></div><p style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"24px", letterSpacing:"2px", color:"var(--text, #1A0A00)", marginTop:"14px" }}>Finding something good...</p></div>}
                  {preview && !loading && (
                    <div>
                      <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:"15px", fontWeight:800, color:"var(--text, #1A0A00)", marginBottom:"12px", textAlign:"center", display:"flex", alignItems:"center", justifyContent:"center", gap:"6px" }}><Sparkle size={16} weight="bold" color="#E8421A" /> How does this sound?</p>
                      <RecipeCard recipe={preview} onClick={() => setSelected(preview)} onDelete={() => setPreview(null)} wobble="wobble-1" />
                      <p style={{ textAlign:"center", fontSize:"11px", fontFamily:"'Nunito',sans-serif", fontWeight:800, color:"var(--text-muted, #7A5A3A)", marginTop:"8px", textTransform:"uppercase", letterSpacing:"0.5px" }}>Click the card to view details & save — or roll again!</p>
                    </div>
                  )}
                </div>
              )}

              {/* AI input bar (idea + url modes) */}
              {mode !== "manual" && mode !== "lazy" && (<>
              <div style={{ display:"flex", marginBottom:"28px", border:"3px solid #1A0A00", maxWidth:"560px", borderRadius:"12px", overflow:"hidden", boxShadow:"0 4px 16px rgba(26,10,0,0.08)" }}>
                <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSubmit()}
                  placeholder={mode === "url" ? "https://www.allrecipes.com/recipe/..." : "e.g. lemon pasta, chicken + spinach..."}
                  className="pm-input" style={{ flex:1, border:"none", outline:"none", borderRadius:0 }} />
                <button onClick={handleSubmit} disabled={loading || !input.trim()} className="pm-btn"
                  style={{ padding:"12px 24px", background: loading ? "#C4A882" : "#FFD166", color:"#1A0A00", whiteSpace:"nowrap", border:"none", borderLeft:"3px solid #1A0A00", borderRadius:0, fontFamily:"'Bebas Neue',cursive", fontSize:"20px", letterSpacing:"2px" }}>
                  {loading ? "Cooking..." : mode === "url" ? "Parse!" : "Generate!"}
                </button>
              </div>
              {error && <div style={{ textAlign:"center", marginBottom:"18px" }}><span style={{ fontFamily:"'Nunito',sans-serif", fontWeight:800, color:"#E8421A", fontSize:"14px", background:"var(--bg-elevated, #fff)", border:"3px solid #E8421A", borderRadius:"8px", padding:"6px 16px", display:"inline-block" }}>{error}</span></div>}
              {loading && <div style={{ textAlign:"center", padding:"50px 0" }}><div className="cooking-anim"><CookingPot size={44} weight="bold" color="#E8421A" /></div><p style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"24px", letterSpacing:"2px", color:"var(--text, #1A0A00)", marginTop:"14px" }}>Crafting your recipes...</p></div>}

              {/* URL parse — single result */}
              {preview && !loading && (
                <div>
                  <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:"15px", fontWeight:800, color:"var(--text, #1A0A00)", marginBottom:"12px", textAlign:"center", display:"flex", alignItems:"center", justifyContent:"center", gap:"6px" }}><Sparkle size={16} weight="bold" color="#E8421A" /> Here's what I found!</p>
                  <RecipeCard recipe={preview} onClick={() => setSelected(preview)} onDelete={() => setPreview(null)} wobble="wobble-1" />
                  <p style={{ textAlign:"center", fontSize:"11px", fontFamily:"'Nunito',sans-serif", fontWeight:800, color:"var(--text-muted, #7A5A3A)", marginTop:"8px", textTransform:"uppercase", letterSpacing:"0.5px" }}>Click the card to view details & save!</p>
                </div>
              )}

              {/* From Idea — 3 options */}
              {previews.length > 0 && !loading && (
                <div>
                  <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:"15px", fontWeight:800, color:"var(--text, #1A0A00)", marginBottom:"14px", textAlign:"center", display:"flex", alignItems:"center", justifyContent:"center", gap:"6px" }}><Sparkle size={16} weight="bold" color="#E8421A" /> Pick your favourite — or save them all!</p>
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(260px, 1fr))", gap:"16px" }}>
                    {previews.map((r, i) => (
                      <RecipeCard key={r.id} recipe={r}
                        onClick={() => setSelected(r)}
                        onDelete={() => setPreviews(prev => prev.filter(p => p.id !== r.id))}
                        wobble={["wobble-1","wobble-2","wobble-3"][i % 3]} />
                    ))}
                  </div>
                  <p style={{ textAlign:"center", fontSize:"11px", fontFamily:"'Nunito',sans-serif", fontWeight:800, color:"var(--text-muted, #7A5A3A)", marginTop:"8px", textTransform:"uppercase", letterSpacing:"0.5px" }}>Click any card to view details & save!</p>
                </div>
              )}
              </>)}
            </div>
          )}

          {/* LIBRARY TAB */}
          {tab === "library" && (
            <div>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"18px", flexWrap:"wrap", gap:"10px" }}>
                <h2 style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"48px", letterSpacing:"2px", color:"var(--text, #1A0A00)", borderBottom:"3px solid #1A0A00", paddingBottom:"8px" }}>Your Library</h2>
              </div>

              {/* Search bar */}
              <div style={{ position:"relative", marginBottom:"18px" }}>
                <MagnifyingGlass size={16} weight="bold" style={{ position:"absolute", left:"12px", top:"50%", transform:"translateY(-50%)", pointerEvents:"none", color:"var(--text-muted, #7A5A3A)" }} />
                <input
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search recipes, ingredients, tags…"
                  className="pm-input"
                  style={{ width:"100%", paddingLeft:"38px", boxSizing:"border-box" }}
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")}
                    style={{ position:"absolute", right:"10px", top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", fontSize:"16px", color:"var(--text-muted, #7A5A3A)", fontWeight:800, lineHeight:1 }}><X size={16} weight="bold" /></button>
                )}
              </div>

              {/* Book Shelf */}
              <div className="rb-shelf">
                {/* All Recipes card */}
                <div className={`rb-book-card ${activeBook === null ? "active" : ""}`} onClick={() => setActiveBook(null)}>
                  <span className="rb-book-emoji"><Books size={30} weight="bold" /></span>
                  <span className="rb-book-name">All Recipes</span>
                  <span className="rb-book-count">{recipes.length} recipe{recipes.length !== 1 ? "s" : ""}</span>
                </div>
                {/* User book cards */}
                {books.map(book => {
                  const excluded = mealPlanExcludedBooks.includes(book.id);
                  return (
                    <div key={book.id} className={`rb-book-card ${activeBook === book.id ? "active" : ""}`}
                      onClick={() => setActiveBook(activeBook === book.id ? null : book.id)}>
                      <button className="rb-book-delete" onClick={e => { e.stopPropagation(); deleteBook(book.id); }}><X size={9} weight="bold" /></button>
                      <span className="rb-book-emoji"><BookIcon icon={book.emoji} size={30} /></span>
                      <span className="rb-book-name">{book.name}</span>
                      <span className="rb-book-count">{book.recipeIds.length} recipe{book.recipeIds.length !== 1 ? "s" : ""}</span>
                      <button
                        onClick={e => { e.stopPropagation(); toggleBookMealPlan(book.id); }}
                        title={excluded ? "Excluded from meal plan — click to include" : "Included in meal plan — click to exclude"}
                        style={{ background:"none", border:"none", cursor:"pointer", fontSize:"13px", padding:"0", lineHeight:1, opacity: excluded ? 1 : 0.35, marginTop:"2px" }}>
                        {excluded ? <Prohibit size={13} weight="bold" color="#E8421A" /> : <CalendarBlank size={13} weight="bold" />}
                      </button>
                    </div>
                  );
                })}
                {/* New book */}
                {showNewBook ? (
                  <div className="rb-new-book-form">
                    <div style={{ display:"flex", gap:"4px", flexWrap:"wrap" }}>
                      {Object.entries(BOOK_ICONS).map(([key, Icon]) => (
                        <button key={key} onClick={() => setNewBookEmoji(key)}
                          style={{ background: newBookEmoji === key ? "#FFD166" : "none", border: newBookEmoji === key ? "2px solid #1A0A00" : "2px solid transparent", cursor:"pointer", padding:"4px", borderRadius:"2px", display:"flex", alignItems:"center", justifyContent:"center" }}>
                          <Icon size={18} weight="bold" />
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
                      style={{ padding:"6px 14px", fontSize:"11px", fontWeight:800, textTransform:"uppercase", letterSpacing:"0.8px", background: active ? "#1A0A00" : "var(--bg-elevated, #FFF5E6)", color: active ? "#FFF5E6" : "var(--text, #1A0A00)", borderColor: active ? "#1A0A00" : "var(--border-subtle, rgba(26,10,0,0.2))" }}>
                      {c}
                    </button>
                  );
                })}
              </div>
              {filtered.length === 0 ? (
                <div style={{ textAlign:"center", padding:"80px 20px" }}>
                  <div style={{ fontSize:"52px", marginBottom:"16px" }}>{searchQuery ? <MagnifyingGlass size={52} weight="bold" color="var(--text-muted, #7a5c3a)" /> : <BookOpen size={52} weight="bold" color="var(--text-muted, #7a5c3a)" />}</div>
                  <p style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"32px", letterSpacing:"1px", color:"var(--text, #1A0A00)", marginBottom:"8px" }}>
                    {searchQuery ? `No results for "${searchQuery}"` : "No recipes yet!"}
                  </p>
                  <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:"14px", fontWeight:700, color:"var(--text-muted, #7a5c3a)" }}>
                    {searchQuery ? <span style={{ cursor:"pointer", textDecoration:"underline" }} onClick={() => setSearchQuery("")}>Clear search</span> : 'Head to "Add" to get started'}
                  </p>
                </div>
              ) : (
                <>
                  <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:"11px", fontWeight:800, color:"var(--text-muted, #7A5A3A)", marginBottom:"12px", textTransform:"uppercase", letterSpacing:"0.5px" }}>Tap a recipe to view it, add it to a book, or create a new recipe book</p>
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(260px, 1fr))", gap:"16px" }}>
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
              onDateRangeChange={handleDateRangeChange}
              mealHistory={mealHistory} setMealHistory={setMealHistory} toast={toast}
              books={books} mealPlanExcludedBooks={mealPlanExcludedBooks}
              mealPlanSettings={mealPlanSettings} setMealPlanSettings={setMealPlanSettings} />
          )}

          {/* GROCERY LIST TAB */}
          {tab === "grocery" && (
            <GroceryListTab recipes={recipes} mealPlan={mealPlan}
              groceryList={groceryList} setGroceryList={setGroceryList} toast={toast}
              staples={staples} onShowStaples={() => setShowStaplesModal(true)} />
          )}

        </main>
      </div>

      {/* Recipe detail modal */}
      {selected && (
        <RecipeModal recipe={selected} onClose={() => setSelected(null)}
          books={books} onToggleBook={toggleRecipeInBook}
          onSave={r => {
            handleSave(r);
            if (r._saved) {
              setSelected({ ...r });
            } else if (previews.some(p => p.id === r.id)) {
              // Saving one of the 3 idea options — remove it from the list, keep others
              setPreviews(prev => prev.filter(p => p.id !== r.id));
              setSelected(null);
            } else {
              setSelected(null); setPreview(null); setTab("library"); setInput("");
            }
          }} />
      )}

      {/* Toast */}
      <div className={`toast ${toastShow ? "show" : ""}`}>{toastMsg}</div>

      {/* Feedback widget */}
      <FeedbackWidget user={user} />

      {/* Mobile bottom nav */}
      <nav className="pm-bottom-nav">
        {[
          { id:"add",      icon:<PencilSimple size={22} weight="bold" />, label:"ADD"     },
          { id:"library",  icon:<Books size={22} weight="bold" />, label:"RECIPES" },
          { id:"calendar", icon:<CalendarBlank size={22} weight="bold" />, label:"MEALS"   },
          { id:"grocery",  icon:<ShoppingCart size={22} weight="bold" />, label:"GROCERY" },
        ].map(t => (
          <button key={t.id} className={`pm-bottom-nav-item${tab === t.id ? " active" : ""}`}
            onClick={() => setTab(t.id)}>
            <span className="nav-icon">{t.icon}</span>
            <span>{t.label}</span>
          </button>
        ))}
      </nav>

      {/* Toxic food warning modal */}
      {toxicFoodWarning && (
        <div className="pm-modal-bg" onClick={() => setToxicFoodWarning(null)}>
          <div className="pm-modal" style={{ maxWidth:"420px", textAlign:"center" }} onClick={e => e.stopPropagation()}>
            <div style={{ background:"#E8421A", width:"64px", height:"64px", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 12px" }}>
              <Warning size={36} weight="bold" color="#fff" />
            </div>
            <h3 style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"28px", letterSpacing:"1px", color:"#E8421A", marginBottom:"10px" }}>Potentially Dangerous Ingredient</h3>
            <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:"14px", color:"var(--text-muted, #7a5c3a)", marginBottom:"16px", fontWeight:600, lineHeight:1.6 }}>
              This recipe contains ingredients that can be <strong style={{ color:"var(--text, #1A0A00)" }}>toxic or poisonous</strong> if not prepared correctly by trained professionals. Improper preparation can cause serious illness or death.
            </p>
            <div style={{ display:"flex", flexWrap:"wrap", gap:"6px", justifyContent:"center", marginBottom:"20px" }}>
              {toxicFoodWarning.map((item, i) => (
                <span key={i} style={{ background:"#1A0A00", border:"2px solid #E8421A", borderRadius:"20px", padding:"4px 14px", fontFamily:"'Nunito',sans-serif", fontSize:"12px", fontWeight:800, color:"#E8421A" }}>{item}</span>
              ))}
            </div>
            <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:"12px", color:"var(--text-muted, #7a5c3a)", marginBottom:"16px", fontWeight:700, fontStyle:"italic" }}>
              Please consult a professional before attempting this recipe.
            </p>
            <button onClick={() => setToxicFoodWarning(null)} className="pm-btn pm-btn-primary"
              style={{ padding:"12px 32px", fontSize:"14px" }}>I Understand</button>
          </div>
        </div>
      )}

      {/* Raw food warning modal */}
      {rawFoodWarning && (
        <div className="pm-modal-bg" onClick={() => setRawFoodWarning(null)}>
          <div className="pm-modal" style={{ maxWidth:"420px", textAlign:"center" }} onClick={e => e.stopPropagation()}>
            <div style={{ marginBottom:"12px" }}><Warning size={48} weight="bold" color="#E8421A" /></div>
            <h3 style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"28px", letterSpacing:"1px", color:"var(--text, #1A0A00)", marginBottom:"10px" }}>Raw Food Warning</h3>
            <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:"14px", color:"var(--text-muted, #7a5c3a)", marginBottom:"16px", fontWeight:600, lineHeight:1.6 }}>
              This recipe contains ingredients that may be consumed raw or undercooked. Raw and undercooked foods can pose a health risk, especially for children, the elderly, pregnant women, and those with weakened immune systems.
            </p>
            <div style={{ display:"flex", flexWrap:"wrap", gap:"6px", justifyContent:"center", marginBottom:"20px" }}>
              {rawFoodWarning.map((item, i) => (
                <span key={i} style={{ background:"#fff0ec", border:"2px solid #E8421A", borderRadius:"20px", padding:"3px 12px", fontFamily:"'Nunito',sans-serif", fontSize:"12px", fontWeight:800, color:"#E8421A" }}>{item}</span>
              ))}
            </div>
            <button onClick={() => setRawFoodWarning(null)} className="pm-btn pm-btn-primary"
              style={{ padding:"12px 32px", fontSize:"14px" }}>Got It</button>
          </div>
        </div>
      )}

      {/* Staples modal */}
      {showStaplesModal && <StaplesModal staples={staples} onAdd={addStaple} onRemove={removeStaple} onClose={() => setShowStaplesModal(false)} />}
      {showHouseholdModal && (
        <HouseholdModal
          inviteCode={inviteCode}
          householdPartner={householdPartner}
          onLinked={() => { setShowHouseholdModal(false); window.location.reload(); }}
          onUnlinked={() => { setShowHouseholdModal(false); window.location.reload(); }}
          onClose={() => setShowHouseholdModal(false)}
          toast={toast}
        />
      )}

      {/* Mobile hamburger slide-out */}
      {menuOpen && (
        <div className="pm-hamburger-overlay" onClick={() => setMenuOpen(false)}>
          <div className="pm-hamburger-panel" onClick={e => e.stopPropagation()}>
            <button className="pm-hamburger-panel-item" onClick={() => { setShowHouseholdModal(true); setMenuOpen(false); }}>
              <LinkIcon size={18} weight="bold" style={{ marginRight:8, verticalAlign:"middle" }} />
              {householdPartner ? "Household ✓" : "Link Partner"}
            </button>
            <button className="pm-hamburger-panel-item" onClick={() => { setShowStaplesModal(true); setMenuOpen(false); }}>
              <Star size={18} weight="bold" style={{ marginRight:8, verticalAlign:"middle" }} /> Grocery Staples
            </button>
            <button className="pm-hamburger-panel-item" onClick={() => { setDarkMode(d => !d); setMenuOpen(false); }}>
              {darkMode ? <><Sun size={18} weight="bold" style={{ marginRight:8, verticalAlign:"middle" }} /> Light Mode</> : <><Moon size={18} weight="bold" style={{ marginRight:8, verticalAlign:"middle" }} /> Dark Mode</>}
            </button>
            <button className="pm-hamburger-panel-item danger" onClick={() => { signOut(); setMenuOpen(false); }}>
              Sign Out
            </button>
          </div>
        </div>
      )}
    </>
  );
}
