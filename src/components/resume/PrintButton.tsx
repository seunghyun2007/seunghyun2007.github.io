'use client'

export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="px-4 py-2 text-sm rounded-md border border-[var(--site-border)] text-[var(--site-text-soft)] hover:border-[var(--site-accent)] hover:text-[var(--site-text)] transition-colors"
    >
      Print / Save PDF
    </button>
  )
}
