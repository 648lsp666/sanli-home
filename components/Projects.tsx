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
    url: '#',
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
            whileHover={{ y: -3, boxShadow: '7px 7px 0 var(--color-ink)' }}
            className="relative border-[2.5px] p-[22px]"
            style={{
              borderColor: 'var(--color-ink)',
              backgroundColor: 'var(--color-paper)',
              backdropFilter: 'blur(2px)',
              boxShadow: '5px 5px 0 var(--color-ink)',
            }}
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
