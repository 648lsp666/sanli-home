'use client'
import { motion } from 'framer-motion'

export default function Contact() {
  return (
    <section id="contact" className="px-8 py-[50px]" style={{ borderBottom: '3px solid var(--color-ink)' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.5 }}
        className="flex flex-wrap items-center justify-between gap-6"
      >
        {/* Display title */}
        <h2 className="text-[52px] font-black leading-[0.95] tracking-[-2px]" style={{ color: 'var(--color-ink)' }}>
          来
          <span
            className="border-[3px] px-[5px]"
            style={{ background: 'var(--color-accent-cyan)', borderColor: 'var(--color-ink)' }}
          >
            聊
          </span>
          <br />
          一下？
        </h2>

        {/* Links */}
        <div className="flex flex-col gap-3">
          <a
            href="mailto:alexeisiemail@gmail.com"
            className="border-[2.5px] px-6 py-3 font-mono text-[12px] font-black uppercase tracking-[1.5px] transition-transform active:scale-[0.97]"
            style={{ background: 'var(--color-accent-cyan)', borderColor: 'var(--color-ink)', color: 'var(--color-ink)', boxShadow: '4px 4px 0 var(--color-ink)' }}
          >
            发邮件 →
          </a>
          <a
            href="https://github.com/648lsp666"
            target="_blank" rel="noopener noreferrer"
            className="border-[2.5px] px-6 py-3 font-mono text-[12px] font-black uppercase tracking-[1.5px] transition-transform active:scale-[0.97]"
            style={{ borderColor: 'var(--color-ink)', color: 'var(--color-ink)', boxShadow: '4px 4px 0 var(--color-ink)' }}
          >
            GitHub
          </a>
          <a
            href="https://x.com"
            target="_blank" rel="noopener noreferrer"
            className="border-[2.5px] px-6 py-3 font-mono text-[12px] font-black uppercase tracking-[1.5px] transition-transform active:scale-[0.97]"
            style={{ borderColor: 'var(--color-ink)', color: 'var(--color-ink)', boxShadow: '4px 4px 0 var(--color-ink)' }}
          >
            Twitter / X
          </a>
        </div>
      </motion.div>
    </section>
  )
}
