import Nav from '@/components/Nav'

export default function Home() {
  return (
    <main>
      <Nav />
      <div className="h-[200vh] p-10 pt-24">
        <p className="font-mono text-accent">Nav test — scroll to see border appear</p>
      </div>
    </main>
  )
}
