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
      <About />
      <Projects />
      <Insights />
      <Contact />
    </main>
  )
}
