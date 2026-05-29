import type { Metadata } from 'next'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { ProjectFilter } from '@/components/projects/ProjectFilter'
import { PROJECTS, FEATURED_PROJECT } from '@/lib/projects'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Side projects, experiments, and builds by Seunghyun Kang — electronics, hardware, and academic exploration.',
}

export default function ProjectsPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <SectionHeader
        title="Side Projects & Experiments"
        intro="Smaller projects, notes, and experiments that helped me learn. Most are documented in more detail on Notion."
      />
      <ProjectFilter projects={PROJECTS} featuredId={FEATURED_PROJECT?.id ?? 'esp32-rc-plane'} />
      <p className="mt-10 text-sm text-[var(--site-text-soft)]">
        I will continue adding more projects over time. Each card links to a more detailed Notion page with images and informal notes.
      </p>
    </div>
  )
}
