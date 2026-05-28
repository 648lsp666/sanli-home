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
            Mail →
          </a>
          <a
            href="http://xiaohongshu.com/user/profile/692823cc000000003201cfdd"
            target="_blank" rel="noopener noreferrer"
            className="border-[2.5px] px-6 py-3 font-mono text-[12px] font-black uppercase tracking-[1.5px] transition-transform active:scale-[0.97]"
            style={{ background: 'var(--color-accent-pink)', borderColor: 'var(--color-ink)', color: 'var(--color-ink)', boxShadow: '4px 4px 0 var(--color-ink)' }}
          >
            小红书 →
          </a>
          <a
            href="https://wpa.qq.com/msgrd?v=3&uin=815530704&site=qq&menu=yes"
            target="_blank" rel="noopener noreferrer"
            className="border-[2.5px] px-6 py-3 font-mono text-[12px] font-black uppercase tracking-[1.5px] transition-transform active:scale-[0.97]"
            style={{ borderColor: 'var(--color-ink)', color: 'var(--color-ink)', boxShadow: '4px 4px 0 var(--color-ink)' }}
          >
            QQ · 815530704
          </a>
        </div>
      </motion.div>
    </section>
  )
}
