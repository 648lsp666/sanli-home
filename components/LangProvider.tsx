'use client'
import { createContext, useContext, useState, useEffect } from 'react'
import type { Lang } from '@/lib/content'

interface LangCtx { lang: Lang; toggle: () => void }
const Ctx = createContext<LangCtx>({ lang: 'zh', toggle: () => {} })

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('zh')

  useEffect(() => {
    const saved = localStorage.getItem('lang') as Lang | null
    if (saved === 'zh' || saved === 'en') setLang(saved)
  }, [])

  const toggle = () =>
    setLang(l => {
      const next: Lang = l === 'zh' ? 'en' : 'zh'
      localStorage.setItem('lang', next)
      return next
    })

  return <Ctx.Provider value={{ lang, toggle }}>{children}</Ctx.Provider>
}

export const useLang = () => useContext(Ctx)
