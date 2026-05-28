'use client'
import Link from 'next/link'
import { useLang } from '@/components/LangProvider'
import type { Post } from '@/lib/posts'

export default function BlogPostHeader({ post }: { post: Post }) {
  const { lang } = useLang()
  const title = lang === 'zh' ? post.title   : post.titleEn
  const cat   = lang === 'zh' ? post.category : post.categoryEn

  return (
    <>
      {/* Back */}
      <Link href="/blog"
        className="mb-8 inline-flex items-center gap-2 font-mono text-[11px] font-black uppercase tracking-[2px] opacity-50 transition-opacity hover:opacity-100"
        style={{ color: 'var(--color-ink)' }}>
        ← {lang === 'zh' ? '所有文章' : 'All Posts'}
      </Link>

      {/* Category */}
      <div className="mb-4">
        <span className="inline-block border-[1.5px] px-[6px] py-[2px] font-mono text-[9px] font-black uppercase tracking-[2px]"
          style={{ borderColor: post.categoryColor, color: post.categoryColor }}>
          {cat}
        </span>
      </div>

      {/* Title */}
      <h1 className="mb-5 text-[clamp(28px,5vw,52px)] font-black leading-[1.1] tracking-[-1px]"
        style={{ color: 'var(--color-ink)', fontFamily: '"Fusion Pixel", "VCR OSD Neue", ui-monospace, monospace' }}>
        {title}
      </h1>

      {/* Meta */}
      <div className="mb-6 flex flex-wrap items-center gap-3 font-mono text-[11px] opacity-45"
        style={{ color: 'var(--color-ink)' }}>
        <span>{post.date}</span>
        {post.readTime && <><span>·</span><span>{post.readTime} read</span></>}
        {post.tags.map(tag => (
          <span key={tag} className="border-[1.5px] px-2 py-[2px] text-[9px]"
            style={{ borderColor: 'var(--color-ink)' }}>{tag}</span>
        ))}
      </div>

      {/* EN notice */}
      {lang === 'en' && (
        <p className="mb-6 border-l-4 pl-4 font-mono text-[11px] opacity-50"
          style={{ borderColor: 'var(--color-accent-cyan)', color: 'var(--color-ink)' }}>
          本文以中文撰写 · This article is written in Chinese.
        </p>
      )}

      <hr style={{ border: 'none', borderTop: '3px solid var(--color-ink)', marginBottom: '2.5rem', opacity: 0.15 }} />
    </>
  )
}
