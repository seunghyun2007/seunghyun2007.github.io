'use client'

import { useEffect, useState } from 'react'

const ACCENTS = [
  { label: 'Green', value: '#bfe3c0', soft: '#e3f4e7' },
  { label: 'Blue', value: '#bfd5f5', soft: '#e3edfb' },
  { label: 'Purple', value: '#d5bff5', soft: '#ede3fb' },
  { label: 'Orange', value: '#f5d5bf', soft: '#fbede3' },
  { label: 'Pink', value: '#f5bfd5', soft: '#fbe3ed' },
]

const FONTS = [
  { label: 'Geist', value: 'var(--font-geist-sans), Inter, system-ui, sans-serif' },
  { label: 'Inter', value: 'Inter, system-ui, sans-serif' },
  { label: 'Nunito', value: 'Nunito, system-ui, sans-serif' },
]

const SPACINGS = [
  { label: 'Compact', value: '0.8' },
  { label: 'Normal', value: '1' },
  { label: 'Relaxed', value: '1.2' },
]

const STORAGE_KEY = 'design-toolbar-prefs'

interface Prefs {
  accentIdx: number
  fontIdx: number
  spacingIdx: number
}

const DEFAULT_PREFS: Prefs = { accentIdx: 0, fontIdx: 0, spacingIdx: 1 }

function applyPrefs(prefs: Prefs) {
  const root = document.documentElement
  const accent = ACCENTS[prefs.accentIdx]
  const font = FONTS[prefs.fontIdx]
  const spacing = SPACINGS[prefs.spacingIdx]
  if (accent) {
    root.style.setProperty('--site-accent', accent.value)
    root.style.setProperty('--site-accent-soft', accent.soft)
  }
  if (font) root.style.setProperty('--font-family', font.value)
  if (spacing) root.style.setProperty('--spacing-base', spacing.value)
}

export function DesignToolbar() {
  const [open, setOpen] = useState(false)
  const [prefs, setPrefs] = useState<Prefs>(DEFAULT_PREFS)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as Prefs
        setPrefs(parsed)
        applyPrefs(parsed)
      }
    } catch {}
  }, [])

  const update = (patch: Partial<Prefs>) => {
    const next = { ...prefs, ...patch }
    setPrefs(next)
    applyPrefs(next)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  }

  return (
    <div className="design-toolbar fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2">
      {open && (
        <div className="bg-[var(--site-bg)] border border-[var(--site-border)] rounded-lg shadow-card-hover p-4 w-56 text-sm">
          <p className="text-xs font-semibold tracking-widest uppercase text-[var(--site-text-soft)] mb-3">
            Customization (dev)
          </p>

          {/* Accent */}
          <p className="text-xs text-[var(--site-text-soft)] mb-1.5">Accent</p>
          <div className="flex gap-2 mb-4">
            {ACCENTS.map((a, i) => (
              <button
                key={a.label}
                aria-label={a.label}
                onClick={() => update({ accentIdx: i })}
                style={{ background: a.value }}
                className={`w-6 h-6 rounded-full border-2 transition-transform ${
                  prefs.accentIdx === i
                    ? 'border-[var(--site-text)] scale-110'
                    : 'border-transparent hover:scale-105'
                }`}
              />
            ))}
          </div>

          {/* Font */}
          <p className="text-xs text-[var(--site-text-soft)] mb-1.5">Font</p>
          <div className="flex gap-1 mb-4">
            {FONTS.map((f, i) => (
              <button
                key={f.label}
                onClick={() => update({ fontIdx: i })}
                className={`px-2 py-1 text-xs rounded border transition-colors ${
                  prefs.fontIdx === i
                    ? 'border-[var(--site-accent)] bg-[var(--site-accent-soft)] text-[var(--site-text)]'
                    : 'border-[var(--site-border)] text-[var(--site-text-soft)] hover:border-[var(--site-accent)]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Spacing */}
          <p className="text-xs text-[var(--site-text-soft)] mb-1.5">Spacing</p>
          <div className="flex gap-1">
            {SPACINGS.map((s, i) => (
              <button
                key={s.label}
                onClick={() => update({ spacingIdx: i })}
                className={`px-2 py-1 text-xs rounded border transition-colors ${
                  prefs.spacingIdx === i
                    ? 'border-[var(--site-accent)] bg-[var(--site-accent-soft)] text-[var(--site-text)]'
                    : 'border-[var(--site-border)] text-[var(--site-text-soft)] hover:border-[var(--site-accent)]'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle design toolbar"
        className="w-10 h-10 rounded-full bg-[var(--site-accent)] shadow-soft text-[var(--site-text)] flex items-center justify-center text-base hover:scale-105 transition-transform"
        title="Design toolbar (dev only)"
      >
        🎨
      </button>
    </div>
  )
}
