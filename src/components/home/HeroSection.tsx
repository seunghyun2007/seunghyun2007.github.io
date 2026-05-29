'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { ScrollCue } from './ScrollCue'

const NAME = 'Seunghyun Kang'

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100svh] overflow-hidden flex flex-col"
    >
      {/* Parallax hero image */}
      <motion.div
        style={{ y: parallaxY }}
        className="absolute inset-0 will-change-transform"
      >
        <picture>
          <source srcSet="/assets/hero_mobile.png" media="(max-width: 768px)" />
          <img
            src="/assets/horizontal_hero.png"
            alt="Test flight"
            className="w-full h-full object-cover object-center"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-[var(--site-bg)]" />
      </motion.div>

      {/* Hero content — single column, vertically centered */}
      <div className="relative z-10 flex-1 flex flex-col justify-end px-5 sm:px-8 pb-10 sm:pb-16 pt-24 max-w-2xl mx-auto w-full">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-xs font-semibold tracking-widest uppercase text-white/60 mb-3"
        >
          Student Engineer · Learner
        </motion.p>

        {/* Animated name */}
        <h1 className="text-3xl sm:text-5xl font-bold text-white mb-3 leading-tight tracking-tight">
          {NAME.split('').map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.2 + i * 0.03 }}
              className="inline-block"
              style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
            >
              {char}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.75 }}
          className="text-sm sm:text-base text-white/75 max-w-md mb-6 leading-relaxed"
        >
          Learning by building, one project at a time. A quiet place to document
          what I&apos;m trying, what works, and what doesn&apos;t.
        </motion.p>

        {/* Featured project callout */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.95 }}
          className="bg-[var(--site-bg)]/95 backdrop-blur-sm border-l-2 border-[var(--site-accent)] pl-4 pr-4 py-3 mb-8 max-w-xs sm:max-w-sm"
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-[var(--site-text-soft)] mb-1">
            Featured Project
          </p>
          <p className="text-sm text-[var(--site-text)] mb-2 leading-snug">
            ESP32-based remote-controlled plane — embedded electronics, C++, CAD.
          </p>
          <a
            href="https://messy-lancer-b5f.notion.site/ESP32-RC-Plane-2be819f52866804ba86efb5c2db0bcef?pvs=74"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-[var(--site-bordeaux)] hover:underline"
          >
            Read on Notion →
          </a>
        </motion.div>

        {/* Nav links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1.1 }}
          className="flex flex-wrap gap-2"
        >
          {[
            { href: '/about', label: 'About' },
            { href: '/projects', label: 'Projects' },
            { href: '/blog', label: 'Blog' },
            { href: '/contact', label: 'Contact' },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="px-3 py-1.5 text-xs font-medium border border-white/30 text-white/80 hover:bg-white/10 hover:border-white/50 transition-colors"
            >
              {label}
            </Link>
          ))}
        </motion.div>
      </div>

      <ScrollCue />
    </section>
  )
}
