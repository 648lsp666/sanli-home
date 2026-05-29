import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import BlogPostHeader from '@/components/BlogPostHeader'
import { getAllPosts, getPost, type Post } from '@/lib/posts'

export async function generateStaticParams() {
  return getAllPosts().map(post => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  try {
    const post = getPost(slug)
    return { title: `${post.title} — Sanli`, description: post.excerpt }
  } catch {
    return { title: 'Post Not Found' }
  }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let post: Post | undefined
  try {
    post = getPost(slug)
  } catch {
    notFound()
  }

  return (
    <main>
      <Nav />
      <article className="px-8 py-[50px]">
        <div className="mx-auto max-w-[720px]">
          <BlogPostHeader post={post} />
          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: post.content! }}
          />
        </div>
      </article>

      <footer className="flex items-center justify-between px-8 py-[14px] font-mono text-[10px] font-bold uppercase tracking-[2px]"
        style={{ backgroundColor: 'var(--color-ink)', color: 'var(--color-bg)', borderTop: '3px solid var(--color-ink)' }}>
        <span>© 2026 Sanli</span>
        <span>Next.js · Tailwind · Framer Motion</span>
      </footer>
    </main>
  )
}
