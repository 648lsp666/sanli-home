'use client'
import { motion } from 'framer-motion'
import { useLang } from '@/components/LangProvider'
import { ARTICLES, t } from '@/lib/content'

function CategoryTag({ label, color }: { label: string; color: string }) {
  return (
    <span className="inline-block border-[1.5px] px-[6px] py-[2px] font-mono text-[8px] font-black uppercase tracking-[2px]"
      style={{ borderColor: color, color }}>
      {label}
    </span>
  )
}

export default function Insights() {
  const { lang } = useLang()
  const featured = ARTICLES.find(a => a.isFeatured)!
  const sideCards = ARTICLES.filter(a => !a.isFeatured).slice(0, 2)
  const scrollCards = ARTICLES.filter(a => !a.isFeatured).slice(2)

  return (
    <section id="insights" className="px-8 py-[50px]" style={{ borderBottom: '3px solid var(--color-ink)' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.5 }}
        className="mb-7 flex items-baseline gap-4">
        <span className="font-mono text-[11px] font-black uppercase tracking-[3px] opacity-30" style={{ color: 'var(--color-ink)' }}>§ 03</span>
        <h2 className="text-[28px] font-black" style={{ color: 'var(--color-ink)', borderBottom: '4px solid var(--color-accent-cyan)', paddingBottom: '2px' }}>
          {lang === 'zh' ? '文章 & 碎碎念' : 'Articles & Notes'}
        </h2>
      </motion.div>

      {/* Featured row */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.05 }}
        className="mb-4 grid gap-[14px] md:grid-cols-[2fr_1fr]">
        <a href={featured.url} className="block border-[2.5px] p-6"
          style={{ borderColor: 'var(--color-ink)', backgroundColor: 'var(--color-featured-bg)', boxShadow: '5px 5px 0 var(--color-ink)' }}>
          <div className="mb-3">
            <CategoryTag label={t(featured.category, lang)} color="var(--color-accent-green)" />
          </div>
          <h3 className="mb-3 text-[20px] font-black leading-[1.2]" style={{ color: '#faf6ee' }}>
            {t(featured.title, lang)}
          </h3>
          {featured.excerpt && (
            <p className="mb-4 text-[12px] leading-[1.65]" style={{ color: '#faf6ee', opacity: 0.55 }}>
              {t(featured.excerpt, lang)}
            </p>
          )}
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] opacity-35" style={{ color: '#faf6ee' }}>
              {featured.date}{featured.readTime ? ` · ${featured.readTime} read` : ''}
            </span>
            <span className="font-mono text-[11px] font-black uppercase tracking-[1px]"
              style={{ color: '#faf6ee', borderBottom: '2.5px solid var(--color-accent-green)', paddingBottom: '1px' }}>
              {lang === 'zh' ? '阅读全文 →' : 'Read Full →'}
            </span>
          </div>
        </a>

        <div className="flex flex-col gap-[10px]">
          {sideCards.map(article => (
            <a key={t(article.title, lang)} href={article.url}
              className="relative block border-[2.5px] p-[15px]"
              style={{ borderColor: 'var(--color-ink)', backgroundColor: 'var(--color-paper)', backdropFilter: 'blur(2px)', boxShadow: '3px 3px 0 var(--color-ink)' }}>
              {article.isNew && (
                <span className="absolute -top-[2px] right-2 border-[1.5px] px-[6px] py-[2px] font-mono text-[8px] font-black"
                  style={{ backgroundColor: 'var(--color-accent-pink)', borderColor: 'var(--color-ink)', color: 'var(--color-ink)' }}>
                  NEW
                </span>
              )}
              <div className="mb-[5px]">
                <CategoryTag label={t(article.category, lang)} color={article.categoryColor} />
              </div>
              <h4 className="mb-1 text-[12px] font-black leading-[1.35]" style={{ color: 'var(--color-ink)' }}>
                {t(article.title, lang)}
              </h4>
              <span className="font-mono text-[9px] opacity-35" style={{ color: 'var(--color-ink)' }}>{article.date}</span>
            </a>
          ))}
        </div>
      </motion.div>

      {/* Scroll lane */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
        <div className="mb-[10px] flex items-center gap-3">
          <span className="font-mono text-[10px] font-black uppercase tracking-[3px] opacity-35" style={{ color: 'var(--color-ink)' }}>
            {lang === 'zh' ? '更多文章' : 'More Articles'}
          </span>
          <span className="px-2 py-1 font-mono text-[9px] font-black uppercase tracking-[1px]"
            style={{ backgroundColor: 'var(--color-ink)', color: 'var(--color-bg)' }}>
            ← {lang === 'zh' ? '滑动' : 'Scroll'} →
          </span>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2">
          {scrollCards.map(article => (
            <a key={t(article.title, lang)} href={article.url}
              className="block w-[190px] shrink-0 border-[2.5px] p-[15px]"
              style={{ borderColor: 'var(--color-ink)', backgroundColor: 'var(--color-paper)', backdropFilter: 'blur(2px)', boxShadow: '3px 3px 0 var(--color-ink)' }}>
              <div className="mb-[5px]">
                <CategoryTag label={t(article.category, lang)} color={article.categoryColor} />
              </div>
              <h4 className="mb-1 text-[12px] font-black leading-[1.35]" style={{ color: 'var(--color-ink)' }}>
                {t(article.title, lang)}
              </h4>
              <span className="font-mono text-[9px] opacity-35" style={{ color: 'var(--color-ink)' }}>{article.date}</span>
            </a>
          ))}

          <div className="flex w-[190px] shrink-0 items-center justify-center border-[2.5px] p-[15px] opacity-30"
            style={{ borderColor: 'var(--color-ink)', borderStyle: 'dashed', color: 'var(--color-ink)' }}>
            <span className="font-mono text-[10px] font-black uppercase tracking-[1px]">
              {lang === 'zh' ? '查看全部 →' : 'See All →'}
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
