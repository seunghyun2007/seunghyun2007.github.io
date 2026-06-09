'use client'

import { useEffect, useRef, useState } from 'react'

export interface SpProps {
  variant: 'sp'
  onInput: (v: string) => void
  onManualSubmit: (v: string) => void
  onContinue: () => void
  shaking: boolean
  hint: string | null
  revealed: string | null
}

export interface DProps {
  variant: 'd'
  prompt: string
  promptLabel: string
  answerLabel: string
  onInput: (v: string) => void
  onManualSubmit: (v: string) => void
  onContinue: () => void
  shaking: boolean
  hintText: string | null
  revealed: string | null
}

export type PracticeQuestionProps = SpProps | DProps

// Scroll input into view after keyboard animation finishes (mobile only)
function scrollToInput(el: HTMLElement | null) {
  if (!el || typeof window === 'undefined' || window.innerWidth >= 640) return
  setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'center' }), 320)
}

// ── s/p block: single combined input ──────────────────────────────────────

function SpPractice(props: SpProps) {
  const [value, setValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setValue('')
    inputRef.current?.focus()
    scrollToInput(inputRef.current)
  }, [])

  useEffect(() => {
    if (!props.shaking && props.revealed === null) {
      inputRef.current?.focus()
      scrollToInput(inputRef.current)
    }
  }, [props.shaking, props.revealed])

  const handleChange = (raw: string) => {
    setValue(raw)
    props.onInput(raw)
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key !== 'Enter') return
    e.preventDefault()
    if (props.revealed !== null) { props.onContinue(); return }
    if (value.trim()) props.onManualSubmit(value)
  }

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-md mx-auto">
      <p className="text-xs text-[var(--site-text-soft)] uppercase tracking-widest text-center">
        Name the element at this position
      </p>

      {props.revealed !== null ? (
        <div className="flex flex-col items-center gap-3 w-full">
          <div className="w-full rounded-lg border border-orange-300 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/30 px-6 py-3 text-center">
            <p className="text-xs text-orange-600 dark:text-orange-400 mb-1">Answer</p>
            <p className="text-xl font-semibold text-orange-700 dark:text-orange-300">{props.revealed}</p>
          </div>
          <button
            type="button"
            onClick={props.onContinue}
            autoFocus
            className="px-6 py-3 sm:py-2 rounded-lg bg-[var(--site-accent)] text-[var(--site-text)] text-sm font-medium hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-[var(--site-accent)] min-h-[44px]"
          >
            Continue →
          </button>
          <p className="text-xs text-[var(--site-text-soft)]">or press Enter</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2 w-full">
          <input
            ref={inputRef}
            value={value}
            onChange={e => handleChange(e.target.value)}
            onKeyDown={handleKey}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            placeholder="symbol and name — e.g. H Hydrogen"
            className={[
              'w-full rounded-lg border border-[var(--site-border)] bg-[var(--site-bg)]',
              'text-[var(--site-text)] text-center text-base sm:text-lg px-4 py-3',
              'placeholder:text-[var(--site-text-soft)] focus:outline-none focus:ring-2 focus:ring-[var(--site-accent)] transition-colors',
              props.shaking ? 'input-shake' : '',
            ].join(' ')}
          />
          {props.hint && (
            <p className="text-sm text-[var(--site-text-soft)] text-center">
              Hint: <span className="font-medium text-[var(--site-text)]">{props.hint}</span>
            </p>
          )}
          <p className="text-xs text-[var(--site-text-soft)] text-center">
            auto-advances when correct · Enter to check
          </p>
        </div>
      )}
    </div>
  )
}

// ── d block: single field ──────────────────────────────────────────────────

function DPractice(props: DProps) {
  const [value, setValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setValue('')
    inputRef.current?.focus()
    scrollToInput(inputRef.current)
  }, [props.prompt])

  useEffect(() => {
    if (!props.shaking && props.revealed === null) {
      inputRef.current?.focus()
      scrollToInput(inputRef.current)
    }
  }, [props.shaking, props.revealed])

  const handleChange = (raw: string) => {
    setValue(raw)
    props.onInput(raw)
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key !== 'Enter') return
    e.preventDefault()
    if (props.revealed !== null) { props.onContinue(); return }
    if (value.trim()) props.onManualSubmit(value)
  }

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-sm mx-auto">
      <div className="text-center">
        <p className="text-xs text-[var(--site-text-soft)] uppercase tracking-widest mb-1">
          {props.promptLabel}
        </p>
        <p className="text-2xl font-bold text-[var(--site-text)]">{props.prompt}</p>
      </div>

      <div className="flex flex-col gap-2 w-full">
        <label className="text-xs text-[var(--site-text-soft)] uppercase tracking-widest text-center">
          {props.answerLabel}
        </label>

        {props.revealed !== null ? (
          <div className="rounded-lg border border-orange-300 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/30 px-4 py-3 text-center">
            <p className="text-xs text-orange-600 dark:text-orange-400 mb-0.5">Answer</p>
            <p className="text-xl font-semibold text-orange-700 dark:text-orange-300">{props.revealed}</p>
          </div>
        ) : (
          <input
            ref={inputRef}
            value={value}
            onChange={e => handleChange(e.target.value)}
            onKeyDown={handleKey}
            autoFocus
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            placeholder="Type your answer…"
            className={[
              'w-full rounded-lg border border-[var(--site-border)] bg-[var(--site-bg)]',
              'text-[var(--site-text)] text-center text-base sm:text-lg px-4 py-3',
              'placeholder:text-[var(--site-text-soft)] focus:outline-none focus:ring-2 focus:ring-[var(--site-accent)] transition-colors',
              props.shaking ? 'input-shake' : '',
            ].join(' ')}
          />
        )}

        {props.hintText && props.revealed === null && (
          <p className="text-sm text-[var(--site-text-soft)] text-center">
            Hint: <span className="font-medium text-[var(--site-text)]">{props.hintText}</span>
          </p>
        )}
        {props.revealed === null && (
          <p className="text-xs text-[var(--site-text-soft)] text-center">
            auto-advances when correct · Enter to check
          </p>
        )}
      </div>

      {props.revealed !== null && (
        <div className="flex flex-col items-center gap-2">
          <button
            type="button"
            onClick={props.onContinue}
            autoFocus
            className="px-6 py-3 sm:py-2 rounded-lg bg-[var(--site-accent)] text-[var(--site-text)] text-sm font-medium hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-[var(--site-accent)] min-h-[44px]"
          >
            Continue →
          </button>
          <p className="text-xs text-[var(--site-text-soft)]">or press Enter</p>
        </div>
      )}
    </div>
  )
}

// ── dispatcher ─────────────────────────────────────────────────────────────

export function PracticeQuestion(props: PracticeQuestionProps) {
  if (props.variant === 'sp') return <SpPractice {...props} />
  return <DPractice {...props} />
}
