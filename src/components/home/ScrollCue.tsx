'use client'

import { motion, useScroll, useTransform } from 'framer-motion'

export function ScrollCue() {
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 100], [1, 0])

  return (
    <motion.div
      style={{ opacity }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[var(--site-text-soft)] text-xs pointer-events-none select-none"
    >
      <span>scroll</span>
      <motion.svg
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <polyline points="6 9 12 15 18 9" />
      </motion.svg>
    </motion.div>
  )
}
