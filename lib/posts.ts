// lib/posts.ts
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'

const POSTS_DIR = path.join(process.cwd(), 'content/posts')

export interface Post {
  slug: string
  title: string
  titleEn: string
  date: string
  category: string
  categoryEn: string
  categoryColor: string
  readTime: string
  excerpt: string
  excerptEn: string
  tags: string[]
  content?: string
}

export function getAllPosts(): Post[] {
  const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'))
  return files
    .map(filename => {
      const raw = fs.readFileSync(path.join(POSTS_DIR, filename), 'utf-8')
      const { data } = matter(raw)
      return data as Post
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPost(slug: string): Post {
  const filepath = path.join(POSTS_DIR, `${slug}.md`)
  const raw = fs.readFileSync(filepath, 'utf-8')
  const { data, content } = matter(raw)
  return {
    ...(data as Post),
    content: marked(content) as string,
  }
}
