import type { Metadata } from 'next'
import { PeriodicTablePractice } from '@/components/practice/PeriodicTablePractice'

export const metadata: Metadata = {
  title: 'Periodic Table Practice',
  description:
    'Learn all 71 elements (H–Rn, excluding lanthanoids) through group-based symbol and name memorization.',
}

export default function PeriodicTablePracticePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <PeriodicTablePractice />
    </div>
  )
}
