'use client'
import { motion } from 'framer-motion'

const INSIGHTS = [
  {
    title: 'AI 不会取代你',
    body: '但会取代不用 AI 的你。工具永远是放大器，关键是你放大了什么。',
    href: '#',
  },
  {
    title: '前端的天花板在哪',
    body: '不在技术，在产品感。写得出来不难，知道该写什么才是护城河。',
    href: '#',
  },
  {
    title: '副业的本质是什么',
    body: '是用时间换资产，而不是换钱。有复利的副业才值得做。',
    href: '#',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

export default function Insights() {
  return (
    <section id="insights" className="mx-auto max-w-5xl px-6 py-32">
      <motion.p
        custom={0}
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mb-2 font-mono text-xs tracking-[0.3em] text-accent uppercase"
      >
        Insights
      </motion.p>
      <motion.h2
        custom={1}
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mb-12 text-3xl font-extrabold text-white"
      >
        一些想法
      </motion.h2>

      <div className="grid gap-6 md:grid-cols-3">
        {INSIGHTS.map((item, i) => (
          <motion.div
            key={item.title}
            custom={i + 2}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="rounded-xl border border-white/10 bg-white/[0.02] p-6"
          >
            <h3 className="mb-3 text-base font-bold text-white">{item.title}</h3>
            <p className="mb-6 text-sm leading-relaxed text-muted">{item.body}</p>
            <a
              href={item.href}
              className="text-xs font-semibold text-accent transition-opacity hover:opacity-70"
            >
              阅读更多 →
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
