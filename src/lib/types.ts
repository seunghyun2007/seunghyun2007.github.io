export interface Project {
  id: string
  title: string
  summary: string
  stack: string[]
  image: string
  notionUrl?: string
  githubUrl?: string
  externalUrl?: string
  externalLabel?: string
  featured?: boolean
  tags: string[]
  comingSoon?: boolean
}

export interface PostMeta {
  slug: string
  title: string
  date: string
  tags: string[]
  excerpt: string
  readTime: number
}

export interface Post extends PostMeta {
  content: string
}
