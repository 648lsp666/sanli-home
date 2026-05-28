'use client'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { useLang } from '@/components/LangProvider'

const LINKS = {
  zh: [{ href: '#projects', label: '项目' }, { href: '#about', label: '关于' }, { href: '#insights', label: '文章' }, { href: '#contact', label: '联系' }],
  en: [{ href: '#projects', label: 'Work' }, { href: '#about', label: 'About' }, { href: '#insights', label: 'Blog' }, { href: '#contact', label: 'Contact' }],
}

export default function Nav() {
  const { resolvedTheme, setTheme } = useTheme()
  const { lang, toggle: toggleLang } = useLang()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const isDark = mounted && resolvedTheme === 'dark'

  const btnBase = 'border-[2px] px-[9px] py-[3px] font-mono text-[9px] font-black uppercase tracking-[1.5px] transition-all active:scale-95 cursor-pointer'
  const btnStyle = { borderColor: 'var(--color-ink)', color: 'var(--color-ink)' }

  return (
    <nav
      className="sticky top-0 z-50 flex items-center justify-between border-b-[3px] px-8 py-[14px]"
      style={{ borderColor: 'var(--color-ink)', backgroundColor: 'var(--color-nav-bg)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2">
        <span className="text-[16px] font-black tracking-[-0.5px]" style={{ color: 'var(--color-ink)' }}>SANLI</span>
        <span className="h-[9px] w-[9px] rounded-full border-[2px]" style={{ backgroundColor: 'var(--color-accent-green)', borderColor: 'var(--color-ink)' }} />
      </div>

      <div className="flex items-center gap-5">
        {/* Nav links */}
        <div className="flex gap-[22px] font-mono text-[11px] font-bold uppercase tracking-[2px]">
          {LINKS[lang].map(({ href, label }) => (
            <a key={href} href={href} className="opacity-45 transition-opacity hover:opacity-100" style={{ color: 'var(--color-ink)' }}>
              {label}
            </a>
          ))}
        </div>

        {/* Divider */}
        <span className="h-[14px] w-[2px] opacity-20" style={{ backgroundColor: 'var(--color-ink)' }} />

        {/* Toggle buttons */}
        <div className="flex items-center gap-[6px]">
          {/* Dark / Light */}
          <button
            className={btnBase}
            style={btnStyle}
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            aria-label="Toggle theme"
          >
            {mounted ? (isDark ? '☀' : '◑') : '◑'}
          </button>

          {/* Lang */}
          <button
            className={btnBase}
            style={btnStyle}
            onClick={toggleLang}
            aria-label="Toggle language"
          >
            {lang === 'zh' ? 'EN' : '中'}
          </button>
        </div>
      </div>
    </nav>
  )
}
