# Sanli Home — Neo Brutalist Redesign Spec

**Date:** 2026-05-28  
**Project:** sanli-home (Next.js 16 + Tailwind v4 + Framer Motion)  
**Status:** Approved

---

## 1. Design Direction

**Style:** Neo Brutalist — bold black borders, offset box-shadows, hard edges, confrontational typography.

**Personality:** Indie hacker who takes their craft seriously. Not trying to look like everyone else's dark-minimal portfolio.

**Distinguishing traits:**
- Cream base with dot-grid + neon blobs — structured but alive
- Fluorescent 3-color accent system (green / pink / cyan)
- Offset solid shadow (`box-shadow: Npx Npx 0 #000`) on every card/button
- Semi-transparent cards so background texture bleeds through
- Oversized hero typography that breaks conventional portfolio proportions

---

## 2. Design Tokens

### Colors
| Token | Value | Usage |
|---|---|---|
| `--color-bg` | `#faf6ee` | Page background (cream) |
| `--color-ink` | `#000000` | All borders, shadows, primary text |
| `--color-paper` | `rgba(255,255,255,0.72)` | Card backgrounds (semi-transparent) |
| `--color-accent-green` | `#b6ff4e` | Primary CTA, project highlights, hero underline §01 |
| `--color-accent-pink` | `#ff6bff` | Secondary highlights, NEW badges, §02 underline |
| `--color-accent-cyan` | `#00d2ff` | Tertiary highlights, contact CTA, §03 underline |
| `--color-featured-bg` | `rgba(0,0,0,0.88)` | Featured article card (inverted) |

### Typography
| Role | Size | Weight | Notes |
|---|---|---|---|
| Hero title | 96px (clamp to ~60px mobile) | 900 | letter-spacing: -4px, line-height: 0.88 |
| Section title | 28px | 900 | with colored 4px underline |
| Eyebrow / label | 11px | 900 | uppercase, letter-spacing: 4px, opacity 0.4 |
| Body text | 14–15px | 400 | line-height: 1.7, opacity 0.65 |
| Card title | 18px | 900 | |
| Small meta | 9–10px | 700 | monospace, opacity 0.35 |

Font stack: Geist Sans (already in project) + system-ui fallback.

### Borders & Shadows
- **Standard card border:** `2.5px solid #000`
- **Standard card shadow:** `5px 5px 0 #000`
- **Button shadow:** `4px 4px 0 #000`
- **Small element shadow:** `2px 2px 0 #000` / `1.5px 1.5px 0 #000`
- **Nav border:** `3px solid #000`
- **Section divider:** `3px solid #000` (bottom border)

### Background System
- **Dot grid:** `radial-gradient(circle, rgba(0,0,0,0.18) 1px, transparent 1px)`, size `20px 20px`, applied as full-page `position: fixed` or absolute overlay, `z-index: 0`
- **Blob TL (green):** `radial-gradient(circle, rgba(182,255,78,0.42), transparent 65%)`, 340×340px, top-left of hero
- **Blob BR (pink):** `radial-gradient(circle, rgba(255,107,255,0.32), transparent 65%)`, 300×300px, bottom-right of hero
- **Blob TR (cyan):** `radial-gradient(circle, rgba(0,210,255,0.22), transparent 65%)`, 160×160px, top-right of hero

---

## 3. Page Architecture

Single scroll page. All sections on `app/page.tsx`. No routing changes in v1.

```
<Nav />           — sticky, blur backdrop
<Hero />          — full-height, big type, 3 neon blobs, 3 badge chips
<Projects />      — §01, 2-col card grid
<About />         — §02, text + tech stack rows
<Insights />      — §03, featured dark card + side cards + horizontal scroll lane
<Contact />       — large type CTA + links
<Footer />        — black bar
```

---

## 4. Component Specs

### Nav
- Sticky top, `z-index: 50`
- Background: `rgba(250,246,238,0.92)` + `backdrop-filter: blur(6px)`
- Left: logo "SANLI" + 9px green dot (online indicator)
- Right: 4 links (项目 / 关于 / 文章 / 联系), 11px uppercase, opacity 0.45
- Bottom: `3px solid #000`

### Hero
- `min-height: 100vh`
- Three positioned blobs (TL green, BR pink, TR cyan) behind content
- Top-right: 3 badge chips (ByteDance / Indie Hacker / AI Builder), stacked, each with `box-shadow: 2px 2px 0 #000`
- Eyebrow: "Frontend Engineer · Builder · 2026"
- Title: "在字节 / **搬砖**（green hl）， / 偷偷**造**（pink hl）/ 东西。" — highlighted words get `background + border: 3px solid #000`
- Subtitle: 1–2 sentences, opacity 0.55
- CTAs: "查看项目 →" (green filled) + "关于我" (outline), both with offset shadow

### Projects (§01)
- Section underline: `#b6ff4e`
- 2-column CSS grid, `gap: 14px`
- Each card: semi-transparent white bg, `2.5px solid #000`, `5px 5px 0 #000` shadow
- Top-left corner accent: 16×16px L-bracket in card's accent color (green for proj01, cyan for proj02)
- Card anatomy: number label (monospace) → name (18px 900) → description → tags row → "访问 →" link with green underline
- Empty/upcoming slot: dashed border, no shadow, 30% opacity

### About (§02)
- Section underline: `#ff6bff`
- 2-column grid: left = bio text, right = tech stack list
- Stack rows: white semi-transparent bg, solid border + shadow, colored dot + key label + right-aligned value

### Insights (§03)
- Section underline: `#00d2ff`
- **Featured row** (2fr / 1fr grid):
  - Left: dark inverted card (`rgba(0,0,0,0.88)`), "精选文章" eyebrow in green, title + excerpt + date/readtime + "阅读全文 →"
  - Right: 2 stacked side-cards (semi-transparent), category tag + title + date; newest gets pink "NEW" badge
- **Scroll lane** below the featured row:
  - Label "更多文章" + "← 滑动 →" black pill
  - `overflow-x: auto`, `flex` row, cards `flex: 0 0 190px`
  - Each scroll card: same semi-transparent style, category tag + title + date
  - Last slot: dashed ghost card "查看全部 →"
- Category tag colors: 精选=green, 碎碎念=pink, 技术/产品=gray (#888), 新=cyan

### Contact
- Large display title: "来**聊**（cyan hl）/ 一下？"
- Right side: vertical stack of 3 buttons ("发邮件 →" cyan filled, "GitHub" outline, "Twitter / X" outline)

### Footer
- Full-width black bar
- Left: "© 2026 Sanli"
- Right: "Next.js · Tailwind · Framer Motion"
- Text: `#faf6ee`, 10px uppercase, opacity 0.9

---

## 5. Animation

Using existing Framer Motion. Keep animations subtle — Brutalism should feel intentional, not floaty.

- **Hero elements:** staggered `fadeUp` (already in codebase) — keep as-is
- **Section scroll reveal:** `whileInView` fade-up, `once: true`, `duration: 0.5`
- **Card hover:** `translateY(-3px)` + shadow from `5px 5px 0 #000` → `7px 7px 0 #000` — no layout shift (use `margin` compensation or `will-change: transform`)
- **Button hover/press:** `scale(0.97)` on press, snap back — no shadow change (keep crisp)
- **Scroll lane:** native CSS scroll, no JS animation needed
- No parallax. No decorative motion.

---

## 6. Responsiveness

Mobile-first. Key breakpoints: `sm: 640px`, `md: 768px`, `lg: 1024px`.

| Section | Mobile | Desktop |
|---|---|---|
| Hero title | ~56–64px, letter-spacing -2px | 96px, letter-spacing -4px |
| Hero badges | hidden (`display: none`) on mobile | absolute top-right on `md+` |
| Projects grid | 1 col | 2 col |
| About grid | stacked | 2 col |
| Insights feat row | stacked | 2fr / 1fr |
| Contact | stacked | side by side |

Dot grid and blobs: always visible. Blobs scale down on mobile.

---

## 7. Files to Change

All existing components get rewritten in-place. No new files needed for v1.

| File | Change |
|---|---|
| `app/globals.css` | New design tokens, dot-grid base styles |
| `components/Nav.tsx` | Full rewrite |
| `components/Hero.tsx` | Full rewrite (blobs, new title markup) |
| `components/Projects.tsx` | Full rewrite (corner accents, new card style) |
| `components/About.tsx` | Full rewrite (stack rows) |
| `components/Insights.tsx` | Full rewrite (featured + scroll lane) |
| `components/Contact.tsx` | Full rewrite (display title + buttons) |
| `app/layout.tsx` | Add dot-grid div as fixed bg layer |

---

## 8. Dark Mode

Dark mode is **in scope for v1**. Implemented via Tailwind `dark:` variants + `next-themes` (or `class` strategy on `<html>`). System preference respected by default; no manual toggle required for v1.

### Dark Tokens
| Token | Light | Dark |
|---|---|---|
| Page background | `#faf6ee` | `#0f0f0f` |
| Primary text | `#000` | `#faf6ee` |
| Border / ink | `#000` | `#faf6ee` |
| Card background | `rgba(255,255,255,0.72)` | `rgba(255,255,255,0.07)` |
| Box shadow | `N N 0 #000` | `N N 0 #faf6ee` |
| Nav background | `rgba(250,246,238,0.92)` | `rgba(15,15,15,0.92)` |
| Featured card bg | `rgba(0,0,0,0.88)` | `rgba(250,246,238,0.10)` + cream text |
| Footer background | `#000` | `#faf6ee` (inverted) |
| Footer text | `#faf6ee` | `#000` |

Accent colors (`#b6ff4e` / `#ff6bff` / `#00d2ff`) are **unchanged** in dark mode — they pop even more against a dark background.

Dot grid dots: `rgba(250,246,238,0.18)` in dark mode.  
Neon blobs: opacity reduced to ~0.28/0.22/0.18 in dark mode to avoid overwhelming the dark canvas.

---

## 9. Out of Scope (v1)

- Blog routes (`/blog/[slug]`) — Insights links to external URLs for now
- Search / filtering in Insights — Tab filter deferred to v2
- CMS / MDX pipeline — content hardcoded in components for v1
- Manual dark/light toggle button — system preference only in v1
