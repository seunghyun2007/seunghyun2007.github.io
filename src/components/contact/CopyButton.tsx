'use client'

import { useState } from 'react'

interface Props {
  text: string
}

export function CopyButton({ text }: Props) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1200)
  }

  return (
    <button
      onClick={handleCopy}
      aria-label="Copy to clipboard"
      className={`flex-shrink-0 px-2 py-0.5 text-xs rounded border transition-colors ${
        copied
          ? 'border-[var(--site-accent)] text-[var(--site-text)] bg-[var(--site-accent-soft)]'
          : 'border-[var(--site-border)] text-[var(--site-text-soft)] hover:border-[var(--site-accent)] hover:text-[var(--site-text)]'
      }`}
    >
      {copied ? 'copied!' : 'copy'}
    </button>
  )
}
