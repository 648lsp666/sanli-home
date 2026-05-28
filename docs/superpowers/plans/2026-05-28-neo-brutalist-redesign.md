# Neo Brutalist Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign sanli-home from dark-minimal to Neo Brutalist — cream base, dot-grid + neon blobs, fluorescent 3-color accent system, offset solid shadows, dark mode via system preference.

**Architecture:** All six components are rewritten in-place. A fixed dot-grid div lives in `layout.tsx` behind all content. Design tokens are CSS custom properties in `globals.css`; dark mode overrides them by setting `.dark {}` variables, so Tailwind classes (`bg-bg`, `text-ink`, `border-ink`) flip automatically without per-element `dark:` prefixes. Box shadows use `var(--color-ink)` to auto-flip.

**Tech Stack:** Next.js 16.2.6 (App Router), Tailwind v4.3, Framer Motion 12, Geist fonts, next-themes (to install)

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `package.json` | modify | add next-themes |
| `components/ThemeProvider.tsx` | create | client wrapper for next-themes |
| `app/globals.css` | rewrite | design tokens, dark mode, dot-grid, scrollbar |
| `app/layout.tsx` | modify | ThemeProvider + fixed dot-grid overlay |
| `components/Nav.tsx` | rewrite | sticky nav, logo + green dot, 4 links |
| `components/Hero.tsx` | rewrite | big type, 3 neon blobs, 3 badge chips, CTAs |
| `components/Projects.tsx` | rewrite | §01, 2-col card grid, corner accents |
| `components/About.tsx` | rewrite | §02, bio text + tech stack rows |
| `components/Insights.tsx` | rewrite | §03, featured dark card + side cards + scroll lane |
| `components/Contact.tsx` | rewrite | §04, display title + link buttons + footer bar |

---

## Task 1: Install next-themes + Create ThemeProvider

**Files:**
- Modify: `package.json`
- Create: `components/ThemeProvider.tsx`

- [ ] **Step 1: Install next-themes**

```bash
cd /path/to/sanli-home && npm install next-themes
```

Expected output: `added 1 package` (or similar). No peer dep warnings.

- [ ] **Step 2: Create `components/ThemeProvider.tsx`**

```tsx
'use client'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import type { ThemeProviderProps } from 'next-themes'

export default function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add components/ThemeProvider.tsx package.json package-lock.json
git commit -m "feat: add next-themes ThemeProvider for dark mode"
```

---

## Task 2: Rewrite globals.css — Design Tokens + Dark Mode

**Files:**
- Rewrite: `app/globals.css`

- [ ] **Step 1: Replace globals.css entirely**

```css
@import "tailwindcss";

/* ── Dark mode: class strategy ── */
@variant dark (&:where(.dark, .dark *));

/* ── Design tokens (light) ── */
@theme {
  --color-bg:           #faf6ee;
  --color-ink:          #000000;
  --color-paper:        rgba(255, 255, 255, 0.72);
  --color-dot:          rgba(0, 0, 0, 0.18);
  --color-accent-green: #b6ff4e;
  --color-accent-pink:  #ff6bff;
  --color-accent-cyan:  #00d2ff;
  --color-featured-bg:  rgba(0, 0, 0, 0.88);
  --font-sans: var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif;
  --font-mono: var(--font-geist-mono), ui-monospace, monospace;
}

/* ── Dark token overrides ── */
.dark {
  --color-bg:           #0f0f0f;
  --color-ink:          #faf6ee;
  --color-paper:        rgba(255, 255, 255, 0.07);
  --color-dot:          rgba(250, 246, 238, 0.18);
  --color-featured-bg:  rgba(250, 246, 238, 0.10);
  /* accent colors unchanged — they pop on dark too */
}

/* ── Base ── */
html {
  scroll-behavior: smooth;
  background-color: var(--color-bg);
  color: var(--color-ink);
}

body {
  background-color: var(--color-bg);
  color: var(--color-ink);
  transition: background-color 0.2s ease, color 0.2s ease;
}

::selection {
  background-color: rgba(182, 255, 78, 0.35);
}

/* ── Scrollbar ── */
::-webkit-scrollbar       { width: 4px; height: 4px; }
::-webkit-scrollbar-track { background: var(--color-bg); }
::-webkit-scrollbar-thumb { background: var(--color-ink); opacity: 0.3; border-radius: 2px; }
```

- [ ] **Step 2: Verify build compiles cleanly**

```bash
npm run build 2>&1 | tail -20
```

Expected: `✓ Compiled` with no type errors.

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "feat: new design tokens and dark mode config in globals.css"
```

---

## Task 3: Update layout.tsx — ThemeProvider + Dot-Grid

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Replace layout.tsx**

```tsx
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import ThemeProvider from '@/components/ThemeProvider'
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
    <html lang="zh" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {/* Fixed dot-grid background — sits behind all content */}
          <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-0"
            style={{
              backgroundImage: 'radial-gradient(circle, var(--color-dot) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          />
          <div className="relative z-10">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
```

> `suppressHydrationWarning` on `<html>` is required when using next-themes — it prevents the hydration mismatch from the class being set by JS after SSR.

- [ ] **Step 2: Run dev server and confirm dot grid appears**

```bash
npm run dev
```

Open http://localhost:3000. You should see a faint dot grid pattern on the cream background. Check it works in both light and dark system preference.

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: add ThemeProvider and fixed dot-grid background layer"
```

---

## Task 4: Rewrite Nav.tsx

**Files:**
- Rewrite: `components/Nav.tsx`

- [ ] **Step 1: Replace Nav.tsx**

```tsx
'use client'

export default function Nav() {
  return (
    <nav
      className="sticky top-0 z-50 flex items-center justify-between border-b-[3px] px-8 py-[14px]"
      style={{
        borderColor: 'var(--color-ink)',
        backgroundColor: 'var(--color-bg)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2">
        <span className="text-[16px] font-black tracking-[-0.5px]" style={{ color: 'var(--color-ink)' }}>
          SANLI
        </span>
        <span
          className="h-[9px] w-[9px] rounded-full border-[2px]"
          style={{ backgroundColor: 'var(--color-accent-green)', borderColor: 'var(--color-ink)' }}
        />
      </div>

      {/* Links */}
      <div className="flex gap-[22px] font-mono text-[11px] font-bold uppercase tracking-[2px] opacity-45">
        <a href="#projects" className="transition-opacity hover:opacity-100" style={{ color: 'var(--color-ink)' }}>项目</a>
        <a href="#about"    className="transition-opacity hover:opacity-100" style={{ color: 'var(--color-ink)' }}>关于</a>
        <a href="#insights" className="transition-opacity hover:opacity-100" style={{ color: 'var(--color-ink)' }}>文章</a>
        <a href="#contact"  className="transition-opacity hover:opacity-100" style={{ color: 'var(--color-ink)' }}>联系</a>
      </div>
    </nav>
  )
}
```

- [ ] **Step 2: Check in browser**

```bash
npm run dev
```

Nav should be sticky, cream/dark background with blur, logo + green dot, links fade in on hover.

- [ ] **Step 3: Commit**

```bash
git add components/Nav.tsx
git commit -m "feat: rewrite Nav with Neo Brutalist style"
```

---

## Task 5: Rewrite Hero.tsx

**Files:**
- Rewrite: `components/Hero.tsx`

- [ ] **Step 1: Replace Hero.tsx**

```tsx
'use client'
import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden px-8 pb-20 pt-16">
      {/* Neon blobs */}
      <div aria-hidden="true" className="pointer-events-none absolute -left-20 -top-20 h-[340px] w-[340px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(182,255,78,0.42) 0%, transparent 65%)' }} />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-20 -right-16 h-[300px] w-[300px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(255,107,255,0.32) 0%, transparent 65%)' }} />
      <div aria-hidden="true" className="pointer-events-none absolute right-5 top-5 h-[160px] w-[160px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(0,210,255,0.22) 0%, transparent 65%)' }} />

      {/* Badge chips — hidden on mobile, absolute top-right on md+ */}
      <div className="absolute right-8 top-8 hidden flex-col items-end gap-2 md:flex">
        {[
          { label: 'ByteDance ↗', bg: 'var(--color-accent-green)' },
          { label: 'Indie Hacker',  bg: 'var(--color-accent-pink)' },
          { label: 'AI Builder',    bg: 'var(--color-accent-cyan)' },
        ].map(({ label, bg }) => (
          <span
            key={label}
            className="border-[2px] px-[10px] py-1 font-mono text-[9px] font-black uppercase tracking-[2px]"
            style={{ background: bg, borderColor: 'var(--color-ink)', color: 'var(--color-ink)', boxShadow: '2px 2px 0 var(--color-ink)' }}
          >
            {label}
          </span>
        ))}
      </div>

      {/* Main content */}
      <div className="relative max-w-3xl">
        <motion.p
          custom={0} variants={fadeUp} initial="hidden" animate="visible"
          className="mb-5 font-mono text-[11px] font-black uppercase tracking-[4px] opacity-40"
          style={{ color: 'var(--color-ink)' }}
        >
          Frontend Engineer · Builder · 2026
        </motion.p>

        <motion.h1
          custom={1} variants={fadeUp} initial="hidden" animate="visible"
          className="mb-5 text-[clamp(56px,10vw,96px)] font-black leading-[0.88] tracking-[-4px]"
          style={{ color: 'var(--color-ink)' }}
        >
          在字节<br />
          <span
            className="border-[3px] px-2"
            style={{ background: 'var(--color-accent-green)', borderColor: 'var(--color-ink)' }}
          >搬砖</span>，<br />
          偷偷
          <span
            className="border-[3px] px-2"
            style={{ background: 'var(--color-accent-pink)', borderColor: 'var(--color-ink)' }}
          >造</span><br />
          东西。
        </motion.h1>

        <motion.p
          custom={2} variants={fadeUp} initial="hidden" animate="visible"
          className="mb-8 max-w-[460px] text-[15px] leading-[1.65] opacity-55"
          style={{ color: 'var(--color-ink)' }}
        >
          全栈前端，ByteDance 打工人。用 AI 造副业，探索脱身路径。
        </motion.p>

        <motion.div
          custom={3} variants={fadeUp} initial="hidden" animate="visible"
          className="flex flex-wrap gap-3"
        >
          <a
            href="#projects"
            className="border-[2.5px] px-6 py-3 font-mono text-[12px] font-black uppercase tracking-[1.5px] transition-transform active:scale-[0.97]"
            style={{ background: 'var(--color-accent-green)', borderColor: 'var(--color-ink)', color: 'var(--color-ink)', boxShadow: '4px 4px 0 var(--color-ink)' }}
          >
            查看项目 →
          </a>
          <a
            href="#about"
            className="border-[2.5px] px-6 py-3 font-mono text-[12px] font-black uppercase tracking-[1.5px] transition-transform active:scale-[0.97]"
            style={{ borderColor: 'var(--color-ink)', color: 'var(--color-ink)', boxShadow: '4px 4px 0 var(--color-ink)' }}
          >
            关于我
          </a>
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Check in browser**

```bash
npm run dev
```

Verify: oversized title visible, green/pink highlights on keywords, blobs visible in corners, badge chips in top-right (desktop only), CTAs with offset shadows.

- [ ] **Step 3: Commit**

```bash
git add components/Hero.tsx
git commit -m "feat: rewrite Hero with oversized type, neon blobs, and badge chips"
```

---

## Task 6: Rewrite Projects.tsx

**Files:**
- Rewrite: `components/Projects.tsx`

- [ ] **Step 1: Replace Projects.tsx**

```tsx
'use client'
import { motion } from 'framer-motion'

interface Project {
  number: string
  name: string
  description: string
  tags: string[]
  url: string
  accentColor: string
}

const PROJECTS: Project[] = [
  {
    number: '01',
    name: '见微 Prowl',
    description: '副业机会雷达，帮你发现 AI 时代真实可行的赚钱方向。已上线。',
    tags: ['AI', 'Next.js', '副业'],
    url: 'https://opradar.indevs.in',
    accentColor: 'var(--color-accent-green)',
  },
  {
    number: '02',
    name: 'AI IDS Demo',
    description: '基于多源日志关联分析的 Web 应用入侵检测系统演示。',
    tags: ['安全', 'Python', 'ML'],
    url: 'https://github.com',
    accentColor: 'var(--color-accent-cyan)',
  },
]

export default function Projects() {
  return (
    <section id="projects" className="px-8 py-[50px]" style={{ borderBottom: '3px solid var(--color-ink)' }}>
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.5 }}
        className="mb-7 flex items-baseline gap-4"
      >
        <span className="font-mono text-[11px] font-black uppercase tracking-[3px] opacity-30" style={{ color: 'var(--color-ink)' }}>§ 01</span>
        <h2 className="text-[28px] font-black" style={{ color: 'var(--color-ink)', borderBottom: '4px solid var(--color-accent-green)', paddingBottom: '2px' }}>
          我做的东西
        </h2>
      </motion.div>

      {/* Grid */}
      <div className="grid gap-[14px] md:grid-cols-2">
        {PROJECTS.map((project, i) => (
          <motion.div
            key={project.number}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
            className="relative border-[2.5px] p-[22px] transition-transform duration-200 hover:-translate-y-[3px]"
            style={{
              borderColor: 'var(--color-ink)',
              backgroundColor: 'var(--color-paper)',
              backdropFilter: 'blur(2px)',
              boxShadow: '5px 5px 0 var(--color-ink)',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '7px 7px 0 var(--color-ink)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '5px 5px 0 var(--color-ink)' }}
          >
            {/* Corner accent */}
            <div
              className="absolute left-[-3px] top-[-3px] h-4 w-4 border-[3px]"
              style={{ borderColor: project.accentColor, borderRightColor: 'transparent', borderBottomColor: 'transparent' }}
            />
            <div className="mb-2 font-mono text-[10px] font-black tracking-[3px] opacity-30" style={{ color: 'var(--color-ink)' }}>
              NO. {project.number}
            </div>
            <h3 className="mb-2 text-[18px] font-black" style={{ color: 'var(--color-ink)' }}>{project.name}</h3>
            <p className="mb-4 text-[12px] leading-[1.65] opacity-55" style={{ color: 'var(--color-ink)' }}>{project.description}</p>
            <div className="mb-4 flex flex-wrap gap-[5px]">
              {project.tags.map(tag => (
                <span
                  key={tag}
                  className="border-[1.5px] px-2 py-[3px] font-mono text-[9px] font-black uppercase tracking-[1px]"
                  style={{ borderColor: 'var(--color-ink)', color: 'var(--color-ink)', boxShadow: '1.5px 1.5px 0 var(--color-ink)' }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] font-black uppercase tracking-[1px]"
              style={{ color: 'var(--color-ink)', borderBottom: '2.5px solid var(--color-accent-green)', paddingBottom: '1px' }}
            >
              访问项目 →
            </a>
          </motion.div>
        ))}

        {/* Empty slot */}
        <div
          className="flex min-h-[130px] items-center justify-center border-[2.5px] font-mono text-[11px] font-black uppercase tracking-[2px] opacity-30"
          style={{ borderColor: 'var(--color-ink)', borderStyle: 'dashed', color: 'var(--color-ink)' }}
        >
          + 更多
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Check in browser**

Cards should have cream/dark semi-transparent backgrounds, corner L-bracket accents in green/cyan, hover lifts 3px with shadow growing.

- [ ] **Step 3: Commit**

```bash
git add components/Projects.tsx
git commit -m "feat: rewrite Projects with Brutalist cards and corner accents"
```

---

## Task 7: Rewrite About.tsx

**Files:**
- Rewrite: `components/About.tsx`

- [ ] **Step 1: Replace About.tsx**

```tsx
'use client'
import { motion } from 'framer-motion'

const STACK = [
  { dot: 'var(--color-accent-green)', key: '前端', value: 'React · Next.js · TypeScript' },
  { dot: 'var(--color-accent-pink)',  key: '后端', value: 'Python · Node.js' },
  { dot: 'var(--color-accent-cyan)',  key: 'AI',   value: 'Claude · LLM Apps' },
  { dot: 'var(--color-ink)',          key: '当前',  value: 'ByteDance 2026 →' },
]

export default function About() {
  return (
    <section id="about" className="px-8 py-[50px]" style={{ borderBottom: '3px solid var(--color-ink)' }}>
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.5 }}
        className="mb-7 flex items-baseline gap-4"
      >
        <span className="font-mono text-[11px] font-black uppercase tracking-[3px] opacity-30" style={{ color: 'var(--color-ink)' }}>§ 02</span>
        <h2 className="text-[28px] font-black" style={{ color: 'var(--color-ink)', borderBottom: '4px solid var(--color-accent-pink)', paddingBottom: '2px' }}>
          关于我
        </h2>
      </motion.div>

      <div className="grid gap-7 md:grid-cols-2">
        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.05 }}
          className="text-[14px] leading-[1.75] opacity-65"
          style={{ color: 'var(--color-ink)' }}
        >
          <strong className="font-black opacity-100">Sanli</strong>，华中科技大学本科，
          2026 年 7 月入职<strong className="font-black opacity-100">字节跳动</strong>前端工程师。
          <br /><br />
          白天搬砖，下班造东西。相信 AI 正在重新定义独立开发者的可能性上限。
          <br /><br />
          正在用 AI 工具探索副业脱身路径。
        </motion.p>

        {/* Stack list */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col gap-2"
        >
          {STACK.map(({ dot, key, value }) => (
            <div
              key={key}
              className="flex items-center gap-3 border-[2px] px-[14px] py-[11px]"
              style={{ borderColor: 'var(--color-ink)', backgroundColor: 'var(--color-paper)', backdropFilter: 'blur(2px)', boxShadow: '3px 3px 0 var(--color-ink)' }}
            >
              <span className="h-[10px] w-[10px] shrink-0 border-[2px]" style={{ backgroundColor: dot, borderColor: 'var(--color-ink)' }} />
              <span className="font-mono text-[11px] font-black uppercase tracking-[1px]" style={{ color: 'var(--color-ink)' }}>{key}</span>
              <span className="ml-auto font-mono text-[10px] opacity-45" style={{ color: 'var(--color-ink)' }}>{value}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Check in browser**

Two-column grid (stacked on mobile). Stack rows have colored dots and right-aligned value labels.

- [ ] **Step 3: Commit**

```bash
git add components/About.tsx
git commit -m "feat: rewrite About with bio text and tech stack rows"
```

---

## Task 8: Rewrite Insights.tsx

**Files:**
- Rewrite: `components/Insights.tsx`

- [ ] **Step 1: Replace Insights.tsx**

```tsx
'use client'
import { motion } from 'framer-motion'

interface Article {
  category: string
  categoryColor: string
  title: string
  date: string
  excerpt?: string
  readTime?: string
  isNew?: boolean
  isFeatured?: boolean
  url?: string
}

const ARTICLES: Article[] = [
  {
    category: '精选',
    categoryColor: 'var(--color-accent-green)',
    title: 'AI 时代独立开发者的副业脱身路径推演',
    date: '2026-05-25',
    readTime: '12 min',
    excerpt: '模拟分析 2026 年副业转正的可行路径——黄金笼子、AI 自媒体、独立产品三条线的真实胜算。confidence 7/10。',
    isFeatured: true,
    url: '#',
  },
  {
    category: '碎碎念',
    categoryColor: 'var(--color-accent-pink)',
    title: '入职倒计时 30 天，我在想什么',
    date: '2026-05-28',
    isNew: true,
    url: '#',
  },
  {
    category: '技术',
    categoryColor: '#888',
    title: '用 Claude Code 做毕业论文格式化',
    date: '2026-05-20',
    url: '#',
  },
  {
    category: '产品',
    categoryColor: '#888',
    title: '见微 Prowl 上线复盘',
    date: '2026-05-15',
    url: '#',
  },
  {
    category: '碎碎念',
    categoryColor: 'var(--color-accent-cyan)',
    title: '字节实习第一周感受',
    date: '2026-04-10',
    url: '#',
  },
]

function CategoryTag({ label, color }: { label: string; color: string }) {
  return (
    <span
      className="inline-block border-[1.5px] px-[6px] py-[2px] font-mono text-[8px] font-black uppercase tracking-[2px]"
      style={{ borderColor: color, color }}
    >
      {label}
    </span>
  )
}

export default function Insights() {
  const featured = ARTICLES.find(a => a.isFeatured)!
  const sideCards = ARTICLES.filter(a => !a.isFeatured).slice(0, 2)
  const scrollCards = ARTICLES.filter(a => !a.isFeatured).slice(2)

  return (
    <section id="insights" className="px-8 py-[50px]" style={{ borderBottom: '3px solid var(--color-ink)' }}>
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.5 }}
        className="mb-7 flex items-baseline gap-4"
      >
        <span className="font-mono text-[11px] font-black uppercase tracking-[3px] opacity-30" style={{ color: 'var(--color-ink)' }}>§ 03</span>
        <h2 className="text-[28px] font-black" style={{ color: 'var(--color-ink)', borderBottom: '4px solid var(--color-accent-cyan)', paddingBottom: '2px' }}>
          文章 &amp; 碎碎念
        </h2>
      </motion.div>

      {/* Featured row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.05 }}
        className="mb-4 grid gap-[14px] md:grid-cols-[2fr_1fr]"
      >
        {/* Featured dark card — bg flips via --color-featured-bg token in dark mode */}
        <a
          href={featured.url}
          className="block border-[2.5px] p-6"
          style={{
            borderColor: 'var(--color-ink)',
            backgroundColor: 'var(--color-featured-bg)',
            boxShadow: '5px 5px 0 var(--color-ink)',
          }}
        >
          <div className="mb-3">
            <CategoryTag label={featured.category} color="var(--color-accent-green)" />
          </div>
          <h3 className="mb-3 text-[20px] font-black leading-[1.2]" style={{ color: '#faf6ee' }}>
            {featured.title}
          </h3>
          {featured.excerpt && (
            <p className="mb-4 text-[12px] leading-[1.65]" style={{ color: '#faf6ee', opacity: 0.55 }}>
              {featured.excerpt}
            </p>
          )}
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] opacity-35" style={{ color: '#faf6ee' }}>
              {featured.date}{featured.readTime ? ` · ${featured.readTime} read` : ''}
            </span>
            <span
              className="font-mono text-[11px] font-black uppercase tracking-[1px]"
              style={{ color: '#faf6ee', borderBottom: '2.5px solid var(--color-accent-green)', paddingBottom: '1px' }}
            >
              阅读全文 →
            </span>
          </div>
        </a>

        {/* Side cards */}
        <div className="flex flex-col gap-[10px]">
          {sideCards.map(article => (
            <a
              key={article.title}
              href={article.url}
              className="relative block border-[2.5px] p-[15px]"
              style={{ borderColor: 'var(--color-ink)', backgroundColor: 'var(--color-paper)', backdropFilter: 'blur(2px)', boxShadow: '3px 3px 0 var(--color-ink)' }}
            >
              {article.isNew && (
                <span
                  className="absolute -top-[2px] right-2 border-[1.5px] px-[6px] py-[2px] font-mono text-[8px] font-black"
                  style={{ backgroundColor: 'var(--color-accent-pink)', borderColor: 'var(--color-ink)', color: 'var(--color-ink)' }}
                >
                  NEW
                </span>
              )}
              <div className="mb-[5px]">
                <CategoryTag label={article.category} color={article.categoryColor} />
              </div>
              <h4 className="mb-1 text-[12px] font-black leading-[1.35]" style={{ color: 'var(--color-ink)' }}>
                {article.title}
              </h4>
              <span className="font-mono text-[9px] opacity-35" style={{ color: 'var(--color-ink)' }}>{article.date}</span>
            </a>
          ))}
        </div>
      </motion.div>

      {/* Scroll lane */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="mb-[10px] flex items-center gap-3">
          <span className="font-mono text-[10px] font-black uppercase tracking-[3px] opacity-35" style={{ color: 'var(--color-ink)' }}>
            更多文章
          </span>
          <span
            className="font-mono text-[9px] font-black uppercase tracking-[1px] px-2 py-1"
            style={{ backgroundColor: 'var(--color-ink)', color: 'var(--color-bg)' }}
          >
            ← 滑动 →
          </span>
        </div>

        <div
          className="flex gap-3 overflow-x-auto pb-2"
          style={{ WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
        >
          {scrollCards.map(article => (
            <a
              key={article.title}
              href={article.url}
              className="block shrink-0 w-[190px] border-[2.5px] p-[15px]"
              style={{ borderColor: 'var(--color-ink)', backgroundColor: 'var(--color-paper)', backdropFilter: 'blur(2px)', boxShadow: '3px 3px 0 var(--color-ink)' }}
            >
              <div className="mb-[5px]">
                <CategoryTag label={article.category} color={article.categoryColor} />
              </div>
              <h4 className="mb-1 text-[12px] font-black leading-[1.35]" style={{ color: 'var(--color-ink)' }}>
                {article.title}
              </h4>
              <span className="font-mono text-[9px] opacity-35" style={{ color: 'var(--color-ink)' }}>{article.date}</span>
            </a>
          ))}

          {/* Ghost slot */}
          <div
            className="flex w-[190px] shrink-0 items-center justify-center border-[2.5px] p-[15px] opacity-30"
            style={{ borderColor: 'var(--color-ink)', borderStyle: 'dashed', color: 'var(--color-ink)' }}
          >
            <span className="font-mono text-[10px] font-black uppercase tracking-[1px]">查看全部 →</span>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 2: Check in browser**

Featured dark card on left (2fr), two side cards on right (1fr). Below: scroll lane with horizontal swipe. Verify on mobile that featured row stacks vertically.

- [ ] **Step 3: Commit**

```bash
git add components/Insights.tsx
git commit -m "feat: rewrite Insights with featured card and horizontal scroll lane"
```

---

## Task 9: Rewrite Contact.tsx + Add Footer to page.tsx

**Files:**
- Rewrite: `components/Contact.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace Contact.tsx**

```tsx
'use client'
import { motion } from 'framer-motion'

export default function Contact() {
  return (
    <section id="contact" className="px-8 py-[50px]" style={{ borderBottom: '3px solid var(--color-ink)' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.5 }}
        className="flex flex-wrap items-center justify-between gap-6"
      >
        {/* Display title */}
        <h2 className="text-[52px] font-black leading-[0.95] tracking-[-2px]" style={{ color: 'var(--color-ink)' }}>
          来
          <span
            className="border-[3px] px-[5px]"
            style={{ background: 'var(--color-accent-cyan)', borderColor: 'var(--color-ink)' }}
          >
            聊
          </span>
          <br />
          一下？
        </h2>

        {/* Links */}
        <div className="flex flex-col gap-3">
          <a
            href="mailto:alexeisiemail@gmail.com"
            className="border-[2.5px] px-6 py-3 font-mono text-[12px] font-black uppercase tracking-[1.5px] transition-transform active:scale-[0.97]"
            style={{ background: 'var(--color-accent-cyan)', borderColor: 'var(--color-ink)', color: 'var(--color-ink)', boxShadow: '4px 4px 0 var(--color-ink)' }}
          >
            发邮件 →
          </a>
          <a
            href="https://github.com"
            target="_blank" rel="noopener noreferrer"
            className="border-[2.5px] px-6 py-3 font-mono text-[12px] font-black uppercase tracking-[1.5px] transition-transform active:scale-[0.97]"
            style={{ borderColor: 'var(--color-ink)', color: 'var(--color-ink)', boxShadow: '4px 4px 0 var(--color-ink)' }}
          >
            GitHub
          </a>
          <a
            href="https://x.com"
            target="_blank" rel="noopener noreferrer"
            className="border-[2.5px] px-6 py-3 font-mono text-[12px] font-black uppercase tracking-[1.5px] transition-transform active:scale-[0.97]"
            style={{ borderColor: 'var(--color-ink)', color: 'var(--color-ink)', boxShadow: '4px 4px 0 var(--color-ink)' }}
          >
            Twitter / X
          </a>
        </div>
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 2: Update page.tsx — add Footer**

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
      <Projects />
      <About />
      <Insights />
      <Contact />
      <footer
        className="flex items-center justify-between px-8 py-[14px] font-mono text-[10px] font-bold uppercase tracking-[2px]"
        style={{ backgroundColor: 'var(--color-ink)', color: 'var(--color-bg)' }}
      >
        <span>© 2026 Sanli</span>
        <span>Next.js · Tailwind · Framer Motion</span>
      </footer>
    </main>
  )
}
```

> Note: Projects now comes before About — matches the spec section order (§01 projects, §02 about).

- [ ] **Step 3: Check in browser**

Full page scroll: Nav → Hero → Projects → About → Insights → Contact → Footer (black bar). Test dark mode by switching system preference.

- [ ] **Step 4: Commit**

```bash
git add components/Contact.tsx app/page.tsx
git commit -m "feat: rewrite Contact, add Footer, fix section order"
```

---

## Task 10: Build Verification + Visual QA

**Files:** none

- [ ] **Step 1: Run production build**

```bash
npm run build
```

Expected: `✓ Compiled successfully` with no TypeScript errors. Note any warnings.

- [ ] **Step 2: Run production server and do final visual check**

```bash
npm run start
```

Open http://localhost:3000. Check each section:

| Item | Expected |
|---|---|
| Dot grid | Visible faint grid behind all content |
| Hero blobs | Green top-left, pink bottom-right, cyan top-right |
| Hero badges | Visible top-right on desktop, hidden on mobile |
| Card backgrounds | Semi-transparent — dot grid visible through cards |
| Card hover | Lift + shadow grows, no layout shift |
| Insights featured | Dark inverted card, green eyebrow, cream text |
| Scroll lane | Horizontal swipe works on mobile, scrollbar styled |
| Footer | Black bar, cream text |

- [ ] **Step 3: Check dark mode**

Toggle system dark mode (macOS: System Preferences → Appearance → Dark). Verify:
- Background flips to `#0f0f0f`
- All borders/text flip to cream
- Nav blur backdrop works on dark
- Accent colors (green/pink/cyan) unchanged
- Featured card (dark in light mode) looks correct in dark mode

- [ ] **Step 4: Check mobile (375px)**

In DevTools, set viewport to 375px wide. Verify:
- Hero title clamps to ~56px, no overflow
- Badge chips hidden
- Projects grid is 1 column
- About grid stacks
- Insights featured row stacks
- Contact stacks vertically
- No horizontal scrollbar on page (only in scroll lane)

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "chore: Neo Brutalist redesign complete — all sections, dark mode, mobile"
```
