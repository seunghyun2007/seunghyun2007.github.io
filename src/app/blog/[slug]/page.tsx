import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllSlugs, getPostBySlug } from '@/lib/posts'
import { TagBadge } from '@/components/blog/TagBadge'
import Link from 'next/link'

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const slugs = getAllSlugs()
  if (!slugs.includes(params.slug)) return {}
  const post = getPostBySlug(params.slug)
  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string }
}) {
  const slugs = getAllSlugs()
  if (!slugs.includes(params.slug)) notFound()

  const post = getPostBySlug(params.slug)

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1 text-sm text-[var(--site-text-soft)] hover:text-[var(--site-text)] mb-8 transition-colors"
      >
        ← Back to Blog
      </Link>

      <header className="mb-10">
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags.map((t) => (
            <TagBadge key={t} tag={t} />
          ))}
          <span className="text-xs text-[var(--site-text-soft)]">
            {post.readTime} min read
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--site-text)] mb-3">
          {post.title}
        </h1>
        <time className="text-sm text-[var(--site-text-soft)]">
          {new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
      </header>

      <article className="prose prose-neutral dark:prose-invert max-w-none prose-headings:text-[var(--site-text)] prose-p:text-[var(--site-text-soft)] prose-p:leading-relaxed prose-a:text-[var(--site-bordeaux)]">
        <MDXRemote source={post.content} />
      </article>
    </div>
  )
}
