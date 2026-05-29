import type { Metadata } from 'next'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { PhotoStrip } from '@/components/about/PhotoStrip'
import { SkillsGrid } from '@/components/about/SkillsGrid'
import { EducationTimeline } from '@/components/about/EducationTimeline'

export const metadata: Metadata = {
  title: 'About',
  description: 'About Seunghyun Kang — background, skills, education, and experiences.',
}

const PERSONAL_PHOTOS = [
  { src: '/assets/face3.jpeg', alt: 'Seunghyun' },
  { src: '/assets/seoul1.jpeg', alt: 'In Seoul' },
  { src: '/assets/running.jpeg', alt: 'Running' },
  { src: '/assets/makinghat.jpg', alt: 'Making a hat' },
]

const YONSEI_PHOTOS = [
  { src: '/assets/yonsei1.jpeg', alt: 'Yonsei University' },
  { src: '/assets/yonsei2.jpeg', alt: 'Yonsei University' },
  { src: '/assets/yonsei3.jpeg', alt: 'Yonsei University' },
  { src: '/assets/yonsei4.JPG', alt: 'Yonsei University' },
]

const GRADUATION_PHOTOS = [
  { src: '/assets/graduation4.jpeg', alt: 'Graduation group photo' },
  { src: '/assets/graduation3.jpg', alt: 'Graduation speech' },
  { src: '/assets/walking2.jpeg', alt: 'Walking at graduation' },
]

const EXPERIENCE_PHOTOS = [
  { src: '/assets/astronomy.jpg', alt: 'Astronomy Camp' },
  { src: '/assets/iter.jpeg', alt: 'ITER internship' },
  { src: '/assets/neuroscience.JPG', alt: 'Neuroscience Camp' },
]

function Divider() {
  return <hr className="border-t border-[var(--site-border)] my-12" />
}

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">

      {/* Intro */}
      <AnimatedSection>
        <h1 className="text-3xl font-bold text-[var(--site-text)] mb-4">About Me</h1>
        <p className="text-[var(--site-text-soft)] leading-relaxed max-w-xl">
          I&apos;m a South Korean student who just finished secondary education in France
          and is preparing to study science and engineering at Yonsei University.
          I always enjoyed making stuff as a kid.
        </p>
      </AnimatedSection>

      {/* Personal photos */}
      <AnimatedSection delay={0.05} className="mt-8">
        <PhotoStrip photos={PERSONAL_PHOTOS} />
      </AnimatedSection>

      <Divider />

      {/* Education */}
      <AnimatedSection delay={0.1}>
        <h2 className="text-xl font-semibold text-[var(--site-text)] mb-8">Education</h2>

        <div className="space-y-10">
          {/* Yonsei */}
          <div>
            <h3 className="font-medium text-[var(--site-text)] mb-1">Yonsei University</h3>
            <p className="text-sm text-[var(--site-text-soft)] mb-4">
              Incoming undergraduate — Science & Engineering. School starts soon.
            </p>
            <PhotoStrip photos={YONSEI_PHOTOS} />
          </div>

          {/* High school */}
          <div>
            <h3 className="font-medium text-[var(--site-text)] mb-1">
              EIPACA — European School, Southern France
            </h3>
            <p className="text-sm text-[var(--site-text-soft)] mb-3">
              European Baccalaureate — 92.0% (2025) ·{' '}
              <a
                href="https://ecoleinternationalepaca.fr/en/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--site-bordeaux)] hover:underline"
              >
                School website
              </a>
            </p>
            <ul className="text-sm text-[var(--site-text-soft)] space-y-0.5 mb-4">
              <li>AP Calc BC & Chemistry — 5/5 (2024/2025)</li>
              <li>DALF C1 · SAT 1530 · TOEFL 113</li>
            </ul>
            <PhotoStrip photos={GRADUATION_PHOTOS} />
          </div>
        </div>
      </AnimatedSection>

      <Divider />

      {/* Education timeline */}
      <AnimatedSection delay={0.1}>
        <EducationTimeline />
      </AnimatedSection>

      <Divider />

      {/* Experiences */}
      <AnimatedSection delay={0.1}>
        <h2 className="text-xl font-semibold text-[var(--site-text)] mb-6">Experiences & Research</h2>
        <ul className="text-sm text-[var(--site-text-soft)] space-y-1 mb-6">
          <li>Astronomy Camp — Saint Michel Observatory (2024)</li>
          <li>Maths Research Camp, Aix-Marseille University (2024)</li>
          <li>Computer Science Assistant at ITER (2023)</li>
          <li>Neuroscience Research Camp, Dublin University (2023)</li>
        </ul>
        <PhotoStrip photos={EXPERIENCE_PHOTOS} />
      </AnimatedSection>

      <Divider />

      {/* Skills */}
      <AnimatedSection delay={0.1}>
        <h2 className="text-xl font-semibold text-[var(--site-text)] mb-6">Skills</h2>
        <SkillsGrid />
      </AnimatedSection>

    </div>
  )
}
