'use client'
import Link from 'next/link'
import { useLang } from '@/components/LangProvider'
import type { Post } from '@/lib/posts'

export default function PostCard({ post }: { post: Post }) {
  const { lang } = useLang()
  const title   = lang === 'zh' ? post.title   : post.titleEn
  const excerpt = lang === 'zh' ? post.excerpt  : post.excerptEn
  const cat     = lang === 'zh' ? post.category : post.categoryEn

  return (
    <Link href={`/blog/${post.slug}`} className="group block border-[2.5px] p-6 transition-all"
      style={{
        borderColor: 'var(--color-ink)',
        backgroundColor: 'var(--color-paper)',
        backdropFilter: 'blur(2px)',
        boxShadow: '5px 5px 0 var(--color-ink)',
      }}
      onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-3px)')}
      onMouseLeave={e => (e.currentTarget.style.transform = '')}>
      {/* Category */}
      <span className="mb-3 inline-block border-[1.5px] px-[6px] py-[2px] font-mono text-[8px] font-black uppercase tracking-[2px]"
        style={{ borderColor: post.categoryColor, color: post.categoryColor }}>
        {cat}
      </span>
      {/* Title */}
      <h2 className="mb-3 text-[18px] font-black leading-[1.25]" style={{ color: 'var(--color-ink)' }}>
        {title}
      </h2>
      {/* Excerpt */}
      {excerpt && (
        <p className="mb-4 text-[13px] leading-[1.7] opacity-55" style={{ color: 'var(--color-ink)' }}>
          {excerpt}
        </p>
      )}
      {/* Meta */}
      <div className="flex items-center gap-3">
        <span className="font-mono text-[10px] opacity-40" style={{ color: 'var(--color-ink)' }}>{post.date}</span>
        {post.readTime && (
          <>
            <span className="opacity-20" style={{ color: 'var(--color-ink)' }}>·</span>
            <span className="font-mono text-[10px] opacity-40" style={{ color: 'var(--color-ink)' }}>{post.readTime} read</span>
          </>
        )}
      </div>
    </Link>
  )
}
