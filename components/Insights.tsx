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
            className="px-2 py-1 font-mono text-[9px] font-black uppercase tracking-[1px]"
            style={{ backgroundColor: 'var(--color-ink)', color: 'var(--color-bg)' }}
          >
            ← 滑动 →
          </span>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2">
          {scrollCards.map(article => (
            <a
              key={article.title}
              href={article.url}
              className="block w-[190px] shrink-0 border-[2.5px] p-[15px]"
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
