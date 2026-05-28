'use client'
import { motion } from 'framer-motion'
import { useLang } from '@/components/LangProvider'
import { PROJECTS, t } from '@/lib/content'

export default function Projects() {
  const { lang } = useLang()

  return (
    <section id="projects" className="px-8 py-[50px]" style={{ borderBottom: '3px solid var(--color-ink)' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.5 }}
        className="mb-7 flex items-baseline gap-4">
        <span className="font-mono text-[11px] font-black uppercase tracking-[3px] opacity-30" style={{ color: 'var(--color-ink)' }}>§ 01</span>
        <h2 className="text-[28px] font-black" style={{ color: 'var(--color-ink)', borderBottom: '4px solid var(--color-accent-green)', paddingBottom: '2px' }}>
          {lang === 'zh' ? '我做的东西' : "Things I've Built"}
        </h2>
      </motion.div>

      <div className="grid gap-[14px] md:grid-cols-2">
        {PROJECTS.map((project, i) => (
          <motion.div key={project.number}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
            whileHover={{ y: -3, boxShadow: '7px 7px 0 var(--color-ink)' }}
            className="relative border-[2.5px] p-[22px]"
            style={{ borderColor: 'var(--color-ink)', backgroundColor: 'var(--color-paper)', backdropFilter: 'blur(2px)', boxShadow: '5px 5px 0 var(--color-ink)' }}>
            <div aria-hidden="true" className="absolute left-[-3px] top-[-3px] h-4 w-4 border-[3px]"
              style={{ borderColor: project.accentColor, borderRightColor: 'transparent', borderBottomColor: 'transparent' }} />
            <div className="mb-2 font-mono text-[10px] font-black tracking-[3px] opacity-30" style={{ color: 'var(--color-ink)' }}>
              NO. {project.number}
            </div>
            <h3 className="mb-2 text-[18px] font-black" style={{ color: 'var(--color-ink)' }}>{t(project.name, lang)}</h3>
            <p className="mb-4 text-[12px] leading-[1.65] opacity-55" style={{ color: 'var(--color-ink)' }}>{t(project.description, lang)}</p>
            <div className="mb-4 flex flex-wrap gap-[5px]">
              {project.tags.map(tag => (
                <span key={tag.en} className="border-[1.5px] px-2 py-[3px] font-mono text-[9px] font-black uppercase tracking-[1px]"
                  style={{ borderColor: 'var(--color-ink)', color: 'var(--color-ink)', boxShadow: '1.5px 1.5px 0 var(--color-ink)' }}>
                  {t(tag, lang)}
                </span>
              ))}
            </div>
            <a href={project.url} target="_blank" rel="noopener noreferrer"
              className="font-mono text-[11px] font-black uppercase tracking-[1px]"
              style={{ color: 'var(--color-ink)', borderBottom: `2.5px solid ${project.accentColor}`, paddingBottom: '1px' }}>
              {lang === 'zh' ? '访问项目 →' : 'Visit Project →'}
            </a>
          </motion.div>
        ))}

        <div className="flex min-h-[72px] items-center justify-center border-[2.5px] font-mono text-[11px] font-black uppercase tracking-[2px] opacity-30 md:col-span-2"
          style={{ borderColor: 'var(--color-ink)', borderStyle: 'dashed', color: 'var(--color-ink)' }}>
          {lang === 'zh' ? '+ 更多' : '+ More'}
        </div>
      </div>
    </section>
  )
}
