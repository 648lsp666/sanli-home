# Personal Homepage Design Spec
**Date:** 2026-05-28  
**Project:** sanli-home  
**Status:** Approved

---

## Overview

A personal homepage for Sanli — a frontend engineer at ByteDance who builds side projects and has opinions about AI. The goal is to combine a professional portfolio with personal brand: who he is, what he's built, and what he thinks.

**Stack:** Next.js 14 (App Router) + Tailwind CSS + Framer Motion  
**Deploy:** Vercel  
**Style:** Dark techy minimalist, background `#0a0a0a`, accent cyan `#22d3ee`

---

## Page Sections

### 1. Nav
- Fixed top, `backdrop-blur` frosted glass background
- Left: name/logo (e.g. `Sanli` or chosen English handle)
- Right: anchor links (`About`, `Projects`, `Insights`, `Contact`) + GitHub icon
- Border appears subtly on scroll, does not compete with hero

### 2. Hero (full viewport height)
- Eyebrow label: small monospace text, e.g. `Frontend Engineer / Builder`
- Large name heading
- One-line tagline — honest, not corporate (e.g. `"在字节搬砖，偷偷造东西。"`)
- Two CTA buttons: `查看项目` (anchor to Projects) + `关于我` (anchor to About)
- Background: subtle animated element — CSS grid lines, floating particles, or typewriter effect
- Scroll-triggered fade-in via Framer Motion

### 3. About
- Two-column layout: left avatar (rounded or shaped crop), right text
- 2–3 paragraphs: who I am → what I'm doing → what I care about
- Authentic tone, not resume-speak
- Tags row: `ByteDance`, `AI工具`, `副业探索`, `前端工程师`
- Fade-in on scroll

### 4. Projects
- Section heading with `NO. 01` style numbering (expandable as more projects added)
- **见微 Prowl** card:
  - Cover image / screenshot
  - Project name + one-sentence description
  - Tech tags: `Next.js`, `AI`, `副业` etc.
  - Link button: `访问 →`
- Card hover: slight lift (`translateY(-4px)`) + cyan border glow
- Grid layout — add cards without restructuring

### 5. Insights
- Section heading: `AI 观点` or `Thoughts`
- 3 horizontal cards, each with:
  - One punchy core statement (≤ 20 characters)
  - 1–2 sentence elaboration
  - `阅读更多 →` link (can be placeholder initially)
- Themes: AI trends, frontend craft, side hustle philosophy
- Not a full blog — opinion entry points only

### 6. Contact
- Centered layout
- Large heading: `Say Hi`
- Icon row: GitHub, Email, 小红书 (add others as needed)
- Closing line: one sentence, personal and warm

---

## Animations

- All sections fade-in + slide-up on scroll (`whileInView` Framer Motion)
- Hero entrance animation on page load
- Card hover states: lift + border glow
- Nav border transition on scroll (JS scroll listener)

---

## Typography

- Headings: sans-serif (Geist or Inter), heavy weight
- Body: `#a3a3a3` on dark background
- Labels / eyebrow text: monospace, small, uppercase or tracking-widest
- Accent text: cyan `#22d3ee` for highlights

---

## File Structure

```
sanli-home/
├── app/
│   ├── layout.tsx          # Root layout, fonts, metadata
│   ├── page.tsx            # All sections composed here
│   └── globals.css         # Base styles, CSS variables
├── components/
│   ├── Nav.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Projects.tsx
│   ├── Insights.tsx
│   └── Contact.tsx
├── public/
│   └── avatar.jpg          # Profile photo
└── docs/
    └── superpowers/specs/
        └── 2026-05-28-personal-homepage-design.md
```

---

## Out of Scope (v1)

- Blog CMS / MDX system (Insights links are placeholders)
- Dark/light theme toggle
- Internationalization (EN/中文 toggle)
- Analytics

These can be added in v2 without restructuring.
