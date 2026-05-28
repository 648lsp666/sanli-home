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
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
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
              className="rounded-xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_0_30px_rgba(34,211,238,0.08)]"
            >
              <div className="mb-3 font-mono text-xs text-accent">NO. {project.number}</div>
              <h3 className="mb-2 text-lg font-bold text-white">{project.name}</h3>
              <p className="mb-4 text-sm leading-relaxed text-muted">{project.description}</p>
              <div className="mb-6 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 px-2.5 py-0.5 text-xs text-muted"
                  >
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
