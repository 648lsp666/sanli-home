import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Insights from '@/components/Insights'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Projects />
      <About />
      <Insights />
      <Contact />
      <footer
        className="flex items-center justify-between px-8 py-[14px] font-mono text-[10px] font-bold uppercase tracking-[2px]"
        style={{ backgroundColor: 'var(--color-ink)', color: 'var(--color-bg)' }}
      >
        <span>© 2026 Sanli</span>
        <span>Next.js · Tailwind · Framer Motion</span>
      </footer>
    </main>
  )
}
