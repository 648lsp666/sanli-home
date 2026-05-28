'use client'
import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center px-6 pt-20">
      {/* CSS grid background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(34,211,238,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      {/* Radial glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,211,238,0.06),transparent)]" />

      <div className="relative max-w-4xl">
        <motion.p
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mb-4 font-mono text-xs tracking-[0.3em] text-accent uppercase"
        >
          Frontend Engineer / Builder
        </motion.p>

        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mb-6 text-6xl font-extrabold tracking-tight text-white md:text-8xl"
        >
          Sanli
        </motion.h1>

        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mb-10 text-xl text-muted md:text-2xl"
        >
          在字节搬砖，偷偷造东西。
        </motion.p>

        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap gap-4"
        >
          <a
            href="#projects"
            className="rounded-md bg-accent px-6 py-3 text-sm font-semibold text-[#0a0a0a] transition-opacity hover:opacity-80"
          >
            查看项目
          </a>
          <a
            href="#about"
            className="rounded-md border border-white/20 px-6 py-3 text-sm font-semibold text-[#e5e5e5] transition-colors hover:border-white/40"
          >
            关于我
          </a>
        </motion.div>
      </div>
    </section>
  )
}
