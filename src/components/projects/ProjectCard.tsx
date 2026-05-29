'use client'

import { motion } from 'framer-motion'
import { StackBadge } from './StackBadge'
import { useLightbox } from '@/components/shared/Lightbox'
import type { Project } from '@/lib/types'

interface Props {
  project: Project
  featured?: boolean
  delay?: number
}

export function ProjectCard({ project, featured, delay = 0 }: Props) {
  const { open } = useLightbox()

  if (project.comingSoon) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay }}
        className="border border-dashed border-[var(--site-border)] rounded-lg p-6 flex items-center justify-center min-h-[200px]"
      >
        <p className="text-[var(--site-text-soft)] text-sm">{project.title}</p>
      </motion.div>
    )
  }

  if (featured) {
    return (
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay }}
        whileHover={{ y: -2 }}
        className="border border-[var(--site-accent)] rounded-lg overflow-hidden shadow-soft bg-white/70 dark:bg-white/5 mb-8 md:flex"
      >
        <div className="md:w-2/5 flex-shrink-0">
          <img
            src={project.image}
            alt={project.title}
            onClick={() => open(project.image, project.title)}
            className="w-full h-56 md:h-full object-cover cursor-zoom-in"
          />
        </div>
        <div className="p-6 flex flex-col justify-between">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-[var(--site-text-soft)] mb-1">
              Featured Project
            </p>
            <h3 className="text-xl font-bold text-[var(--site-text)] mb-3">{project.title}</h3>
            <p className="text-sm text-[var(--site-text-soft)] leading-relaxed mb-4">{project.summary}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.stack.map((s) => (
                <StackBadge key={s} label={s} />
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            {project.notionUrl && (
              <a
                href={project.notionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-[var(--site-text)] hover:text-[var(--site-bordeaux)] transition-colors"
              >
                Open on Notion →
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-[var(--site-text)] hover:text-[var(--site-bordeaux)] transition-colors"
              >
                GitHub →
              </a>
            )}
          </div>
        </div>
      </motion.article>
    )
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -2 }}
      className="border border-[var(--site-border)] rounded-lg overflow-hidden shadow-soft hover:shadow-card-hover hover:border-[var(--site-accent)] transition-all bg-white/70 dark:bg-white/5"
    >
      <img
        src={project.image}
        alt={project.title}
        onClick={() => open(project.image, project.title)}
        className="w-full h-44 object-cover cursor-zoom-in"
      />
      <div className="p-5">
        <h3 className="font-semibold text-[var(--site-text)] mb-2">{project.title}</h3>
        <p className="text-sm text-[var(--site-text-soft)] leading-relaxed mb-3">{project.summary}</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.stack.map((s) => (
            <StackBadge key={s} label={s} />
          ))}
        </div>
        <div className="flex flex-col gap-1">
          {project.notionUrl && (
            <a
              href={project.notionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-[var(--site-text-soft)] hover:text-[var(--site-bordeaux)] transition-colors"
            >
              Open full documentation on Notion →
            </a>
          )}
          {project.externalUrl && (
            <a
              href={project.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-[var(--site-text-soft)] hover:text-[var(--site-bordeaux)] transition-colors"
            >
              {project.externalLabel ?? 'View externally'} →
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}
