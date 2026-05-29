import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Post, PostMeta } from './types'

const POSTS_DIR = path.join(process.cwd(), 'content/posts')

function computeReadTime(content: string): number {
  const words = content.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}

function parsePost(slug: string): Post {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`)
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  return {
    slug,
    title: data.title as string,
    date: data.date as string,
    tags: (data.tags as string[]) ?? [],
    excerpt: data.excerpt as string,
    readTime: computeReadTime(content),
    content,
  }
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return []
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''))
}

export function getAllPostMeta(): PostMeta[] {
  return getAllSlugs()
    .map((slug) => {
      const post = parsePost(slug)
      const { content: _, ...meta } = post
      return meta
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): Post {
  return parsePost(slug)
}
