import type { Metadata } from 'next'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { PostCard } from '@/components/blog/PostCard'
import { getAllPostMeta } from '@/lib/posts'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Learning notes, project logs, and reflections by Seunghyun Kang.',
}

export default function BlogPage() {
  const posts = getAllPostMeta()

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <SectionHeader
        title="Blog"
        intro="Notes on what I'm learning, building, and figuring out along the way."
      />
      {posts.length === 0 ? (
        <p className="text-[var(--site-text-soft)] text-sm">No posts yet. Check back soon.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}
