'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

const TAGS = ['ByteDance', 'AI 工具', '副业探索', '前端工程师']

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
}

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-5xl px-6 py-32">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid gap-12 md:grid-cols-2 md:items-center"
      >
        {/* Avatar */}
        <div className="flex justify-center md:justify-start">
          <div className="relative h-64 w-64 overflow-hidden rounded-2xl border border-white/10">
            <Image src="/avatar.jpg" alt="Sanli" fill className="object-cover" priority />
          </div>
        </div>

        {/* Text */}
        <div>
          <p className="mb-2 font-mono text-xs tracking-[0.3em] text-accent uppercase">About</p>
          <h2 className="mb-6 text-3xl font-extrabold text-white">嗨，我是 Sanli</h2>
          <div className="space-y-4 leading-relaxed text-muted">
            <p>前端工程师，2026 年加入字节跳动。写代码是本职，造东西是爱好。</p>
            <p>
              关注 AI 如何改变工作和创作方式，在业余时间探索副业的可能性——想用技术换来更多时间自由。
            </p>
            <p>相信好的产品是把复杂藏起来、把简单留给用户。</p>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {TAGS.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 px-3 py-1 text-xs text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
