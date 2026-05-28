import Nav from '@/components/Nav'
import PostCard from '@/components/PostCard'
import { getAllPosts } from '@/lib/posts'

export const metadata = {
  title: 'Blog — Sanli',
  description: '文章与碎碎念',
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <main>
      <Nav />
      <section className="px-8 py-[50px]">
        {/* Header */}
        <div className="mb-10 flex items-baseline gap-4">
          <span className="font-mono text-[11px] font-black uppercase tracking-[3px] opacity-30"
            style={{ color: 'var(--color-ink)' }}>§ 04</span>
          <h1 className="text-[36px] font-black"
            style={{ color: 'var(--color-ink)', borderBottom: '4px solid var(--color-accent-cyan)', paddingBottom: '2px' }}>
            博客
          </h1>
        </div>

        {/* Grid */}
        <div className="grid gap-[14px] md:grid-cols-2 lg:grid-cols-3">
          {posts.map(post => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="flex items-center justify-between px-8 py-[14px] font-mono text-[10px] font-bold uppercase tracking-[2px]"
        style={{ backgroundColor: 'var(--color-ink)', color: 'var(--color-bg)', borderTop: '3px solid var(--color-ink)' }}>
        <span>© 2026 Sanli</span>
        <span>Next.js · Tailwind · Framer Motion</span>
      </footer>
    </main>
  )
}
