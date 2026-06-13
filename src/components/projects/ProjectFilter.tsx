'use client'

import { useState } from 'react'
import { ProjectCard } from './ProjectCard'
import type { Project } from '@/lib/types'

const TAGS = [
  { value: 'all', label: 'All' },
  { value: 'hardware', label: 'Hardware' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'academic', label: 'Academic' },
  { value: 'ai', label: 'AI / Creative' },
]

interface Props {
  projects: Project[]
  featuredId: string
}

export function ProjectFilter({ projects, featuredId }: Props) {
  const [active, setActive] = useState('all')

  const featured = projects.find((p) => p.id === featuredId)
  const others = projects.filter((p) => p.id !== featuredId)

  const filtered =
    active === 'all'
      ? others
      : others.filter((p) => p.tags.includes(active) || p.comingSoon)

  return (
    <div>
      {/* Featured */}
      {featured && <ProjectCard project={featured} featured delay={0} />}

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {TAGS.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setActive(value)}
            className={`px-4 py-1.5 text-sm rounded-full border transition-colors ${
              active === value
                ? 'bg-[var(--site-accent)] border-[var(--site-accent)] text-[var(--site-text)] font-medium'
                : 'border-[var(--site-border)] text-[var(--site-text-soft)] hover:border-[var(--site-accent)] hover:text-[var(--site-text)]'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((project, i) => (
          <ProjectCard key={project.id} project={project} delay={i * 0.08} />
        ))}
      </div>
    </div>
  )
}
