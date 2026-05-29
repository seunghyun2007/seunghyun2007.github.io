import type { Metadata } from 'next'
import { HeroSection } from '@/components/home/HeroSection'

export const metadata: Metadata = {
  title: 'Seunghyun Kang',
  description:
    'Portfolio and learning journal of Seunghyun Kang, an engineering student building things and documenting the journey.',
}

export default function HomePage() {
  return <HeroSection />
}
