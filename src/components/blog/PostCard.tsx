import Link from 'next/link'
import { TagBadge } from './TagBadge'
import type { PostMeta } from '@/lib/types'

interface Props {
  post: PostMeta
}

export function PostCard({ post }: Props) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block border border-[var(--site-border)] rounded-lg p-6 hover:border-[var(--site-accent)] hover:shadow-soft transition-all bg-white/50 dark:bg-white/5"
    >
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        {post.tags.map((t) => (
          <TagBadge key={t} tag={t} />
        ))}
        <span className="text-xs text-[var(--site-text-soft)] ml-auto">
          {post.readTime} min read
        </span>
      </div>
      <h2 className="text-lg font-semibold text-[var(--site-text)] group-hover:text-[var(--site-bordeaux)] transition-colors mb-2">
        {post.title}
      </h2>
      <p className="text-sm text-[var(--site-text-soft)] leading-relaxed mb-3">{post.excerpt}</p>
      <time className="text-xs text-[var(--site-text-soft)]">
        {new Date(post.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </time>
    </Link>
  )
}
