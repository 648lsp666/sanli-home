'use client'
import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden px-8 pb-20 pt-16">
      {/* Neon blobs */}
      <div aria-hidden="true" className="pointer-events-none absolute -left-20 -top-20 h-[340px] w-[340px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(182,255,78,0.42) 0%, transparent 65%)' }} />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-20 -right-16 h-[300px] w-[300px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(255,107,255,0.32) 0%, transparent 65%)' }} />
      <div aria-hidden="true" className="pointer-events-none absolute right-5 top-5 h-[160px] w-[160px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(0,210,255,0.22) 0%, transparent 65%)' }} />

      {/* Badge chips — hidden on mobile, absolute top-right on md+ */}
      <div className="absolute right-8 top-8 hidden flex-col items-end gap-2 md:flex">
        {[
          { label: 'ByteDance ↗', bg: 'var(--color-accent-green)' },
          { label: 'Indie Hacker',  bg: 'var(--color-accent-pink)' },
          { label: 'AI Builder',    bg: 'var(--color-accent-cyan)' },
        ].map(({ label, bg }) => (
          <span
            key={label}
            className="border-[2px] px-[10px] py-1 font-mono text-[9px] font-black uppercase tracking-[2px]"
            style={{ background: bg, borderColor: 'var(--color-ink)', color: 'var(--color-ink)', boxShadow: '2px 2px 0 var(--color-ink)' }}
          >
            {label}
          </span>
        ))}
      </div>

      {/* Main content */}
      <div className="relative max-w-3xl">
        <motion.p
          custom={0} variants={fadeUp} initial="hidden" animate="visible"
          className="mb-5 font-mono text-[11px] font-black uppercase tracking-[4px] opacity-40"
          style={{ color: 'var(--color-ink)' }}
        >
          Frontend Engineer · Builder · 2026
        </motion.p>

        <motion.h1
          custom={1} variants={fadeUp} initial="hidden" animate="visible"
          className="mb-5 text-[clamp(56px,10vw,96px)] font-black leading-[0.88] tracking-[-4px]"
          style={{ color: 'var(--color-ink)' }}
        >
          在字节<br />
          <span
            className="border-[3px] px-2"
            style={{ background: 'var(--color-accent-green)', borderColor: 'var(--color-ink)' }}
          >搬砖</span>，<br />
          偷偷
          <span
            className="border-[3px] px-2"
            style={{ background: 'var(--color-accent-pink)', borderColor: 'var(--color-ink)' }}
          >造</span><br />
          东西。
        </motion.h1>

        <motion.p
          custom={2} variants={fadeUp} initial="hidden" animate="visible"
          className="mb-8 max-w-[460px] text-[15px] leading-[1.65] opacity-55"
          style={{ color: 'var(--color-ink)' }}
        >
          全栈前端，ByteDance 打工人。用 AI 造副业，探索脱身路径。
        </motion.p>

        <motion.div
          custom={3} variants={fadeUp} initial="hidden" animate="visible"
          className="flex flex-wrap gap-3"
        >
          <a
            href="#projects"
            className="border-[2.5px] px-6 py-3 font-mono text-[12px] font-black uppercase tracking-[1.5px] transition-transform active:scale-[0.97]"
            style={{ background: 'var(--color-accent-green)', borderColor: 'var(--color-ink)', color: 'var(--color-ink)', boxShadow: '4px 4px 0 var(--color-ink)' }}
          >
            查看项目 →
          </a>
          <a
            href="#about"
            className="border-[2.5px] px-6 py-3 font-mono text-[12px] font-black uppercase tracking-[1.5px] transition-transform active:scale-[0.97]"
            style={{ borderColor: 'var(--color-ink)', color: 'var(--color-ink)', boxShadow: '4px 4px 0 var(--color-ink)' }}
          >
            关于我
          </a>
        </motion.div>
      </div>
    </section>
  )
}
