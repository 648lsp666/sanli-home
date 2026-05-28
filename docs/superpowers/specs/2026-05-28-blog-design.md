# Blog System Design — sanli-home

**Date:** 2026-05-28  
**Status:** Approved

---

## Goal

Add a `/blog` section to sanli-home that:
- Lists all articles with the same brutalist/pixel aesthetic
- Renders individual posts written in Markdown
- Integrates with existing dark-mode and zh/en toggle
- Links from the existing Insights section on the homepage

---

## Architecture

### File Structure

```
content/posts/
  ai-exit-path.md           # AI 时代副业脱身路径推演
  30-days-countdown.md      # 入职倒计时 30 天
  claude-code-thesis.md     # 用 Claude Code 做毕业论文格式化
  prowl-retrospective.md    # 见微 Prowl 上线复盘
  bytedance-week-one.md     # 字节实习第一周感受

lib/posts.ts                # getPost(slug), getAllPosts()
app/blog/page.tsx           # Blog list — Server Component
app/blog/[slug]/page.tsx    # Post detail — async Server Component (params is Promise)
app/globals.css             # Add .prose typography styles
```

### New Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `gray-matter` | ^4 | Parse frontmatter from .md files |
| `marked` | ^12 | Markdown → HTML |

---

## Data Model

### Frontmatter Schema (per .md file)

```yaml
---
slug: ai-exit-path
title: AI 时代独立开发者的副业脱身路径推演
titleEn: Simulating the AI-Era Indie Exit Path
date: 2026-05-25
category: 精选
categoryEn: Featured
categoryColor: "var(--color-accent-green)"
readTime: 12 min
excerpt: 模拟分析 2026 年副业转正的可行路径...
excerptEn: Simulating viable paths to indie independence in 2026...
tags: [AI, 副业, 推演]
---
```

### Post Object (TypeScript)

```ts
interface Post {
  slug: string
  title: string          // zh
  titleEn: string        // en
  date: string           // YYYY-MM-DD
  category: string       // zh
  categoryEn: string     // en
  categoryColor: string  // CSS var
  readTime: string
  excerpt: string        // zh
  excerptEn: string      // en
  tags: string[]
  content?: string       // HTML (only loaded for detail page)
}
```

---

## Pages

### `/blog` — Blog List Page

**Server Component.** Reads all `.md` files, extracts metadata only (no content body), renders sorted by date desc.

Layout:
- Nav (reuse existing component)
- Section header "博客 / Blog" with § 04 eyebrow — matches existing section style
- Grid of post cards (same border/shadow pattern as Projects)
- Each card: category tag, title (bilingual via `useLang`), date, excerpt, readTime
- Footer (reuse)

**Bilingual:** card titles and excerpts swap based on `useLang()`. UI labels ("所有文章" / "All Posts") also bilingual. Since it's a Server Component reading metadata, the lang switching is client-side only on the card text.

> Note: The list page itself is a Server Component; individual text nodes that need lang-switching are wrapped in a small `'use client'` `PostCard` component.

### `/blog/[slug]` — Post Detail Page

**Async Server Component** (Next.js 16 requires `await params`):

```ts
export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)
  // ...
}
```

Layout:
- Nav
- Article header: category tag, big pixel-font title (Fusion Pixel), date + readTime
- English mode banner: small note "本文以中文撰写 · Written in Chinese"
- `.prose` content area: `dangerouslySetInnerHTML={{ __html: post.content }}`
- Back button → `/blog`
- Footer

**Static generation:** Export `generateStaticParams()` from the page — returns all slugs so posts are statically built at deploy time.

---

## Typography — `.prose` Styles

Add to `globals.css`. Scoped to `.prose` class. Uses existing design tokens:

```css
.prose { color: var(--color-ink); }
.prose h2 { font-size: 22px; font-weight: 900; margin: 2rem 0 0.75rem; border-bottom: 3px solid var(--color-accent-green); }
.prose h3 { font-size: 17px; font-weight: 900; margin: 1.5rem 0 0.5rem; }
.prose p  { font-size: 15px; line-height: 1.85; margin: 0 0 1.2rem; opacity: 0.8; }
.prose strong { font-weight: 900; opacity: 1; }
.prose ul, .prose ol { margin: 0 0 1.2rem 1.5rem; }
.prose li { font-size: 15px; line-height: 1.75; margin-bottom: 0.4rem; opacity: 0.8; }
.prose blockquote { border-left: 4px solid var(--color-accent-cyan); padding-left: 1rem; margin: 1.5rem 0; opacity: 0.7; }
.prose code { font-family: var(--font-mono); font-size: 13px; background: var(--color-paper); padding: 2px 6px; border: 1.5px solid var(--color-ink); }
.prose pre code { display: block; padding: 1rem; overflow-x: auto; }
.prose hr { border: none; border-top: 2px solid var(--color-ink); opacity: 0.2; margin: 2rem 0; }
```

---

## Insights Integration

Update `lib/content.ts` ARTICLES array: change `url: '#'` to `url: '/blog/[slug]'` for each article. The Insights component already uses `article.url` for links — no other changes needed.

---

## `lib/posts.ts` API

```ts
getAllPosts(): Post[]          // metadata only, sorted by date desc
getPost(slug: string): Post   // with content HTML
```

Reads from `content/posts/*.md` using `fs` (Node.js). Works only in Server Components / `generateStaticParams`.

---

## Out of Scope

- Pagination (5 posts, not needed)
- Search
- Comments
- RSS feed
- Tags filter page
- English article content (body is Chinese only)
