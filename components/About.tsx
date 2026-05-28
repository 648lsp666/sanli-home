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
