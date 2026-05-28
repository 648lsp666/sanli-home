# Personal Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a dark-techy personal homepage for Sanli with 6 sections (Nav/Hero/About/Projects/Insights/Contact), deployed on Vercel.

**Architecture:** Single Next.js App Router page composed of 6 isolated components. Each component owns its own animations (Framer Motion `whileInView`). No data fetching — all content is co-located in each component file for easy editing. No CMS, no MDX in v1.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion, Geist fonts (bundled with Next.js), Vercel deployment

---

> **Note on testing:** This is a pure-UI personal site with no business logic. Instead of unit tests, each task ends with a **visual verification step** — run `npm run dev` and check the browser. This is the correct testing approach for this project type.

---

## File Map

| File | Responsibility |
|------|---------------|
| `app/layout.tsx` | Root layout: Geist fonts, metadata, dark background |
| `app/page.tsx` | Compose all 6 section components |
| `app/globals.css` | Tailwind directives, scroll-behavior, base resets |
| `tailwind.config.ts` | Extend colors (accent, muted, bg), fontFamily |
| `components/Nav.tsx` | Fixed nav: logo, anchor links, scroll border |
| `components/Hero.tsx` | Full-screen hero: eyebrow, name, tagline, CTAs, grid bg |
| `components/About.tsx` | Two-column: avatar + text paragraphs + tags |
| `components/Projects.tsx` | Project cards grid with hover effects |
| `components/Insights.tsx` | 3-card opinion section |
| `components/Contact.tsx` | Centered: heading, icon links, footer line |
| `public/avatar.jpg` | Profile photo (user replaces manually) |
| `public/prowl-cover.png` | Project cover (user replaces manually) |

---

## Task 1: Scaffold Next.js project

**Files:**
- Create: all Next.js scaffold files inside `sanli-home/`

- [ ] **Step 1: Scaffold inside the existing directory**

```bash
cd /Users/sanli/Desktop/workplace/ai-programme/workspace/projects/sanli-home
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --yes
```

Expected: files created — `app/`, `components/` (empty), `public/`, `package.json`, `tailwind.config.ts`, `next.config.ts`, `tsconfig.json`

- [ ] **Step 2: Install Framer Motion**

```bash
cd /Users/sanli/Desktop/workplace/ai-programme/workspace/projects/sanli-home
npm install framer-motion
```

Expected: `framer-motion` appears in `package.json` dependencies

- [ ] **Step 3: Remove Next.js boilerplate**

Delete: `app/page.tsx` content, `app/globals.css` content (keep file), `public/next.svg`, `public/vercel.svg`

```bash
rm -f public/next.svg public/vercel.svg
```

- [ ] **Step 4: Add placeholder images to public/**

```bash
# Download a 400x400 placeholder avatar
curl -o public/avatar.jpg "https://placehold.co/400x400/1a1a1a/22d3ee.jpg?text=Sanli"
# Download a 800x450 placeholder cover
curl -o public/prowl-cover.png "https://placehold.co/800x450/1a1a1a/22d3ee.png?text=Prowl"
```

Expected: `public/avatar.jpg` and `public/prowl-cover.png` exist

- [ ] **Step 5: Verify dev server starts**

```bash
cd /Users/sanli/Desktop/workplace/ai-programme/workspace/projects/sanli-home
npm run dev
```

Expected: server starts at `http://localhost:3000` with no errors

- [ ] **Step 6: Commit**

```bash
cd /Users/sanli/Desktop/workplace/ai-programme/workspace/projects/sanli-home
git add -A
git commit -m "feat: scaffold Next.js project with framer-motion"
```

---

## Task 2: Configure base styles and layout

**Files:**
- Modify: `app/globals.css`
- Modify: `tailwind.config.ts`
- Create: `app/layout.tsx`

- [ ] **Step 1: Write `app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
}

body {
  background-color: #0a0a0a;
  color: #e5e5e5;
}

::selection {
  background-color: rgba(34, 211, 238, 0.2);
}

::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: #0a0a0a;
}

::-webkit-scrollbar-thumb {
  background: #22d3ee22;
  border-radius: 2px;
}
```

- [ ] **Step 2: Write `tailwind.config.ts`**

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        accent: '#22d3ee',
        muted: '#a3a3a3',
        'bg-base': '#0a0a0a',
      },
      fontFamily: {
        mono: ['var(--font-geist-mono)', 'monospace'],
        sans: ['var(--font-geist-sans)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 3: Write `app/layout.tsx`**

```tsx
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sanli — Frontend Engineer & Builder',
  description: '前端工程师，在字节搬砖，偷偷造东西。',
  openGraph: {
    title: 'Sanli — Frontend Engineer & Builder',
    description: '前端工程师，在字节搬砖，偷偷造东西。',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
```

- [ ] **Step 4: Write minimal `app/page.tsx` to verify layout**

```tsx
export default function Home() {
  return (
    <main>
      <p className="p-10 font-mono text-accent">sanli-home loading...</p>
    </main>
  )
}
```

- [ ] **Step 5: Visual verification**

Open `http://localhost:3000` — expect: black background, cyan text "sanli-home loading..."

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: configure base styles, Tailwind, and root layout"
```

---

## Task 3: Nav component

**Files:**
- Create: `components/Nav.tsx`

- [ ] **Step 1: Create `components/Nav.tsx`**

```tsx
'use client'
import { useEffect, useState } from 'react'

const NAV_LINKS = ['About', 'Projects', 'Insights', 'Contact']

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md transition-all duration-300 ${
        scrolled ? 'border-b border-white/10 bg-[#0a0a0a]/80' : 'bg-transparent'
      }`}
    >
      <span className="font-mono text-sm tracking-[0.2em] text-accent">SANLI</span>
      <div className="flex items-center gap-6">
        {NAV_LINKS.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            className="text-sm text-muted transition-colors hover:text-white"
          >
            {link}
          </a>
        ))}
        <a
          href="https://github.com/648lsp666"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="text-muted transition-colors hover:text-white"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
        </a>
      </div>
    </nav>
  )
}
```

- [ ] **Step 2: Add Nav to `app/page.tsx`**

```tsx
import Nav from '@/components/Nav'

export default function Home() {
  return (
    <main>
      <Nav />
      <div className="h-screen" />
    </main>
  )
}
```

- [ ] **Step 3: Visual verification**

Open `http://localhost:3000` — expect: transparent nav at top; scroll down → border appears with frosted glass effect. Hover on links → turn white.

- [ ] **Step 4: Commit**

```bash
git add components/Nav.tsx app/page.tsx
git commit -m "feat: add Nav component with scroll-aware border"
```

---

## Task 4: Hero component

**Files:**
- Create: `components/Hero.tsx`

- [ ] **Step 1: Create `components/Hero.tsx`**

```tsx
'use client'
import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center px-6 pt-20">
      {/* CSS grid background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(34,211,238,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      {/* Radial glow at top */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,211,238,0.06),transparent)]" />

      <div className="relative max-w-4xl">
        <motion.p
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mb-4 font-mono text-xs tracking-[0.3em] text-accent uppercase"
        >
          Frontend Engineer / Builder
        </motion.p>

        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mb-6 text-6xl font-extrabold tracking-tight text-white md:text-8xl"
        >
          Sanli
        </motion.h1>

        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mb-10 text-xl text-muted md:text-2xl"
        >
          在字节搬砖，偷偷造东西。
        </motion.p>

        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap gap-4"
        >
          <a
            href="#projects"
            className="rounded-md bg-accent px-6 py-3 text-sm font-semibold text-[#0a0a0a] transition-opacity hover:opacity-80"
          >
            查看项目
          </a>
          <a
            href="#about"
            className="rounded-md border border-white/20 px-6 py-3 text-sm font-semibold text-[#e5e5e5] transition-colors hover:border-white/40"
          >
            关于我
          </a>
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add Hero to `app/page.tsx`**

```tsx
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
    </main>
  )
}
```

- [ ] **Step 3: Visual verification**

Open `http://localhost:3000` — expect: full-screen dark section with subtle cyan grid, staggered fade-up of eyebrow → name → tagline → buttons. Buttons have correct colors (cyan filled / outlined).

- [ ] **Step 4: Commit**

```bash
git add components/Hero.tsx app/page.tsx
git commit -m "feat: add Hero section with staggered entrance animation"
```

---

## Task 5: About component

**Files:**
- Create: `components/About.tsx`

- [ ] **Step 1: Create `components/About.tsx`**

```tsx
'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

const TAGS = ['ByteDance', 'AI 工具', '副业探索', '前端工程师']

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-5xl px-6 py-32">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid gap-12 md:grid-cols-2 md:items-center"
      >
        {/* Avatar */}
        <div className="flex justify-center md:justify-start">
          <div className="relative h-64 w-64 overflow-hidden rounded-2xl border border-white/10">
            <Image src="/avatar.jpg" alt="Sanli" fill className="object-cover" priority />
          </div>
        </div>

        {/* Text */}
        <div>
          <p className="mb-2 font-mono text-xs tracking-[0.3em] text-accent uppercase">About</p>
          <h2 className="mb-6 text-3xl font-extrabold text-white">嗨，我是 Sanli</h2>
          <div className="space-y-4 text-muted leading-relaxed">
            <p>前端工程师，2026 年加入字节跳动。写代码是本职，造东西是爱好。</p>
            <p>
              关注 AI 如何改变工作和创作方式，在业余时间探索副业的可能性——想用技术换来更多时间自由。
            </p>
            <p>相信好的产品是把复杂藏起来、把简单留给用户。</p>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {TAGS.map((tag) => (
              <span key={tag} className="rounded-full border border-white/10 px-3 py-1 text-xs text-muted">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 2: Add About to `app/page.tsx`**

```tsx
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import About from '@/components/About'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <About />
    </main>
  )
}
```

- [ ] **Step 3: Visual verification**

Scroll down on `http://localhost:3000` — expect: two-column layout with placeholder avatar on left, text + tags on right. Entire block fades up on scroll. Tags have subtle border pill style.

- [ ] **Step 4: Commit**

```bash
git add components/About.tsx app/page.tsx
git commit -m "feat: add About section with avatar and tags"
```

---

## Task 6: Projects component

**Files:**
- Create: `components/Projects.tsx`

- [ ] **Step 1: Create `components/Projects.tsx`**

```tsx
'use client'
import { motion } from 'framer-motion'

interface Project {
  number: string
  name: string
  description: string
  tags: string[]
  url: string
}

const PROJECTS: Project[] = [
  {
    number: '01',
    name: '见微 Prowl',
    description: '副业机会雷达，帮你发现 AI 时代真实可行的赚钱方向。',
    tags: ['Next.js', 'AI', '副业'],
    url: 'https://opradar.indevs.in',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-32">
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <p className="mb-2 font-mono text-xs tracking-[0.3em] text-accent uppercase">Projects</p>
        <h2 className="mb-12 text-3xl font-extrabold text-white">我做的东西</h2>

        <div className="grid gap-6 md:grid-cols-2">
          {PROJECTS.map((project) => (
            <div
              key={project.number}
              className="group rounded-xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_0_30px_rgba(34,211,238,0.08)]"
            >
              <div className="mb-3 font-mono text-xs text-accent">NO. {project.number}</div>
              <h3 className="mb-2 text-lg font-bold text-white">{project.name}</h3>
              <p className="mb-4 text-sm text-muted leading-relaxed">{project.description}</p>
              <div className="mb-6 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-white/10 px-2.5 py-0.5 text-xs text-muted">
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-accent transition-opacity hover:opacity-70"
              >
                访问 →
              </a>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 2: Add Projects to `app/page.tsx`**

```tsx
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Projects from '@/components/Projects'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <About />
      <Projects />
    </main>
  )
}
```

- [ ] **Step 3: Visual verification**

Scroll to Projects section — expect: `NO. 01` label in cyan, card with border. Hover card → slight lift + cyan border glow. `访问 →` link is cyan.

- [ ] **Step 4: Commit**

```bash
git add components/Projects.tsx app/page.tsx
git commit -m "feat: add Projects section with hover card effects"
```

---

## Task 7: Insights component

**Files:**
- Create: `components/Insights.tsx`

- [ ] **Step 1: Create `components/Insights.tsx`**

```tsx
'use client'
import { motion } from 'framer-motion'

const INSIGHTS = [
  {
    title: 'AI 不会取代你',
    body: '但会取代不用 AI 的你。工具永远是放大器，关键是你放大了什么。',
    href: '#',
  },
  {
    title: '前端的天花板在哪',
    body: '不在技术，在产品感。写得出来不难，知道该写什么才是护城河。',
    href: '#',
  },
  {
    title: '副业的本质是什么',
    body: '是用时间换资产，而不是换钱。有复利的副业才值得做。',
    href: '#',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Insights() {
  return (
    <section id="insights" className="mx-auto max-w-5xl px-6 py-32">
      <motion.p
        custom={0}
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mb-2 font-mono text-xs tracking-[0.3em] text-accent uppercase"
      >
        Insights
      </motion.p>
      <motion.h2
        custom={1}
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mb-12 text-3xl font-extrabold text-white"
      >
        一些想法
      </motion.h2>

      <div className="grid gap-6 md:grid-cols-3">
        {INSIGHTS.map((item, i) => (
          <motion.div
            key={item.title}
            custom={i + 2}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="rounded-xl border border-white/10 bg-white/[0.02] p-6"
          >
            <h3 className="mb-3 text-base font-bold text-white">{item.title}</h3>
            <p className="mb-6 text-sm text-muted leading-relaxed">{item.body}</p>
            <a href={item.href} className="text-xs font-semibold text-accent transition-opacity hover:opacity-70">
              阅读更多 →
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add Insights to `app/page.tsx`**

```tsx
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Insights from '@/components/Insights'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <About />
      <Projects />
      <Insights />
    </main>
  )
}
```

- [ ] **Step 3: Visual verification**

Scroll to Insights — expect: 3 cards in a row on desktop, staggered fade-in. Each card has title (white), body (muted), `阅读更多 →` in cyan.

- [ ] **Step 4: Commit**

```bash
git add components/Insights.tsx app/page.tsx
git commit -m "feat: add Insights section with staggered card animation"
```

---

## Task 8: Contact component

**Files:**
- Create: `components/Contact.tsx`

- [ ] **Step 1: Create `components/Contact.tsx`**

```tsx
'use client'
import { motion } from 'framer-motion'

const LINKS = [
  {
    label: 'GitHub',
    href: 'https://github.com/648lsp666',
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    href: 'mailto:alexeisiemail@gmail.com',
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function Contact() {
  return (
    <section id="contact" className="px-6 py-32 text-center">
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <p className="mb-2 font-mono text-xs tracking-[0.3em] text-accent uppercase">Contact</p>
        <h2 className="mb-4 text-5xl font-extrabold text-white">Say Hi</h2>
        <p className="mb-10 text-muted">有想法、有合作、或者只是想聊聊，都欢迎。</p>
        <div className="flex justify-center gap-6">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('mailto') ? undefined : '_blank'}
              rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
              aria-label={link.label}
              className="text-muted transition-colors hover:text-accent"
            >
              {link.icon}
            </a>
          ))}
        </div>
        <p className="mt-16 text-xs text-white/20">Built with Next.js · Deployed on Vercel</p>
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 2: Add Contact to `app/page.tsx`**

```tsx
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Insights from '@/components/Insights'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <About />
      <Projects />
      <Insights />
      <Contact />
    </main>
  )
}
```

- [ ] **Step 3: Visual verification**

Scroll to bottom — expect: centered "Say Hi" heading, GitHub + Email icons in muted gray → turn cyan on hover. Footer attribution line in very faint white.

- [ ] **Step 4: Commit**

```bash
git add components/Contact.tsx app/page.tsx
git commit -m "feat: add Contact section and complete page composition"
```

---

## Task 9: Final polish and push

**Files:**
- No new files — review all components

- [ ] **Step 1: Full page visual walkthrough**

Open `http://localhost:3000` and scroll through the entire page. Check:
- [ ] Nav is visible and scroll border works
- [ ] Hero grid background and animations play on load
- [ ] About avatar and tags render correctly
- [ ] Projects card hover shows lift + glow
- [ ] Insights 3 cards stagger-animate in
- [ ] Contact icons turn cyan on hover
- [ ] Nav anchor links scroll to correct sections
- [ ] No console errors

- [ ] **Step 2: Test on mobile viewport**

In browser devtools, switch to mobile viewport (375px width). Check:
- [ ] Nav links don't overflow (if they do, reduce gap or hide some on mobile)
- [ ] About switches to single column layout
- [ ] Insights 3 cards stack vertically

- [ ] **Step 3: Push to GitHub**

```bash
git push origin main
```

Expected: all commits pushed to `https://github.com/648lsp666/sanli-home`

---

## Task 10: Deploy to Vercel

- [ ] **Step 1: Deploy to Vercel preview**

```bash
vercel
```

Follow prompts: link to existing project or create new. Select `sanli-home`.

Expected: preview URL returned, e.g. `https://sanli-home-xxx.vercel.app`

- [ ] **Step 2: Visual verification on preview URL**

Open the Vercel preview URL and verify the page loads correctly in production build (no missing images, no hydration errors in console).

- [ ] **Step 3: Deploy to production**

```bash
vercel --prod
```

Expected: production URL returned.

- [ ] **Step 4: Done**

Share the production URL.

---

## Content Replacements (do after deploy)

These are manual steps the user does, not code changes:

| Item | Action |
|------|--------|
| `public/avatar.jpg` | Replace with actual profile photo (any size, will be cropped to 256×256) |
| `public/prowl-cover.png` | Replace with actual 见微 screenshot |
| Hero tagline | Edit `components/Hero.tsx` line with `在字节搬砖，偷偷造东西。` |
| About paragraphs | Edit `components/About.tsx` text in the `space-y-4` div |
| Insights content | Edit `INSIGHTS` array in `components/Insights.tsx` |
| Social links | Add 小红书 link to `LINKS` array in `components/Contact.tsx` |
