'use client'

import { useReducer, useEffect } from 'react'
import { ELEMENTS, isSpBlock, isDBlock, type ElementData } from '@/lib/elements'
import { PeriodicTableGrid } from './PeriodicTableGrid'
import { PracticeQuestion } from './PracticeQuestion'

type Mode = 'sp-block' | 'd-block'
type Phase = 'mode-select' | 'practice' | 'done'

interface State {
  mode: Mode
  phase: Phase
  queue: ElementData[]
  currentElement: ElementData | null
  completedSymbols: string[]
  totalElements: number
  // sp block
  spAttempts: number
  spHint: string | null
  spRevealed: string | null
  // d block
  dQuestionType: 'symbol' | 'name'
  dAttempts: number
  dHint: string | null
  dRevealed: string | null
  // shared
  shaking: boolean
  ordered: boolean
}

type Action =
  | { type: 'SELECT_MODE'; mode: Mode }
  | { type: 'LIVE_CHECK_SP'; input: string }
  | { type: 'SUBMIT_SP'; input: string }
  | { type: 'CONTINUE_SP' }
  | { type: 'LIVE_CHECK_D'; input: string }
  | { type: 'SUBMIT_D'; input: string }
  | { type: 'CONTINUE_D' }
  | { type: 'CLEAR_SHAKE' }
  | { type: 'RESTART' }
  | { type: 'TOGGLE_ORDER' }

const initialState: State = {
  mode: 'sp-block',
  phase: 'mode-select',
  queue: [],
  currentElement: null,
  completedSymbols: [],
  totalElements: 0,
  spAttempts: 0,
  spHint: null,
  spRevealed: null,
  dQuestionType: 'name',
  dAttempts: 0,
  dHint: null,
  dRevealed: null,
  shaking: false,
  ordered: false,
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function normalize(s: string) {
  return s.trim().toLowerCase()
}

function checkSp(input: string, el: ElementData): { symOk: boolean; nameOk: boolean } {
  const tokens = input.trim().toLowerCase().split(/\s+/)
  return {
    symOk: tokens.includes(el.symbol.toLowerCase()),
    nameOk: tokens.includes(el.name.toLowerCase()),
  }
}

function spHintText(el: ElementData, symOk: boolean, nameOk: boolean): string {
  const parts: string[] = []
  if (!symOk) parts.push(`symbol: ${el.symbol[0].toUpperCase()}...`)
  if (!nameOk) parts.push(`name: ${el.name[0].toUpperCase()}...`)
  return parts.join(' · ')
}

function resetQuestion(state: State, el: ElementData): State {
  return {
    ...state,
    currentElement: el,
    spAttempts: 0,
    spHint: null,
    spRevealed: null,
    dQuestionType: Math.random() < 0.5 ? 'symbol' : 'name',
    dAttempts: 0,
    dHint: null,
    dRevealed: null,
    shaking: false,
  }
}

function advanceNext(state: State): State {
  if (state.queue.length > 0) {
    const [next, ...rest] = state.queue
    return resetQuestion({ ...state, queue: rest }, next)
  }
  return { ...state, phase: 'done', currentElement: null }
}

function markComplete(state: State): State {
  const el = state.currentElement!
  const already = state.completedSymbols.includes(el.symbol)
  const newCompleted = already ? state.completedSymbols : [...state.completedSymbols, el.symbol]
  return { ...state, completedSymbols: newCompleted }
}

function reducer(state: State, action: Action): State {
  switch (action.type) {

    case 'SELECT_MODE': {
      const els = ELEMENTS.filter(el =>
        action.mode === 'sp-block' ? isSpBlock(el.group) : isDBlock(el.group)
      )
      const queue = state.ordered
        ? [...els].sort((a, b) => a.group - b.group || a.period - b.period)
        : shuffle(els)
      const [first, ...rest] = queue
      return resetQuestion({
        ...initialState,
        ordered: state.ordered,
        mode: action.mode,
        phase: 'practice',
        queue: rest,
        totalElements: queue.length,
      }, first)
    }

    // ── sp: live check (auto-advance only) ──────────────────────────────
    case 'LIVE_CHECK_SP': {
      const el = state.currentElement
      if (!el || state.spRevealed !== null) return state
      const { symOk, nameOk } = checkSp(action.input, el)
      if (symOk && nameOk) return advanceNext(markComplete(state))
      return state
    }

    // ── sp: manual Enter (advance if correct, wrong-attempt if wrong) ──
    case 'SUBMIT_SP': {
      const el = state.currentElement
      if (!el || state.spRevealed !== null) return state
      const { symOk, nameOk } = checkSp(action.input, el)

      if (symOk && nameOk) return advanceNext(markComplete(state))

      const newAttempts = state.spAttempts + 1
      if (newAttempts >= 3) {
        return {
          ...state,
          spAttempts: newAttempts,
          spRevealed: `${el.symbol} — ${el.name}`,
          spHint: null,
          shaking: false,
        }
      }
      if (newAttempts === 2) {
        return {
          ...state,
          spAttempts: newAttempts,
          spHint: spHintText(el, symOk, nameOk),
          shaking: false,
        }
      }
      return { ...state, spAttempts: newAttempts, shaking: true }
    }

    case 'CONTINUE_SP': {
      if (state.spRevealed === null) return state
      return advanceNext(state)
    }

    // ── d: live check ────────────────────────────────────────────────────
    case 'LIVE_CHECK_D': {
      const el = state.currentElement
      if (!el || state.dRevealed !== null) return state
      const expected = state.dQuestionType === 'symbol' ? el.name : el.symbol
      if (normalize(action.input) === normalize(expected)) {
        return advanceNext(markComplete(state))
      }
      return state
    }

    // ── d: manual Enter ──────────────────────────────────────────────────
    case 'SUBMIT_D': {
      const el = state.currentElement
      if (!el || state.dRevealed !== null) return state
      const expected = state.dQuestionType === 'symbol' ? el.name : el.symbol
      if (normalize(action.input) === normalize(expected)) {
        return advanceNext(markComplete(state))
      }
      const newAttempts = state.dAttempts + 1
      if (newAttempts >= 3) {
        return { ...state, dAttempts: newAttempts, dRevealed: expected, dHint: null, shaking: false }
      }
      if (newAttempts === 2) {
        return {
          ...state,
          dAttempts: newAttempts,
          dHint: expected[0].toUpperCase() + '...',
          shaking: false,
        }
      }
      return { ...state, dAttempts: newAttempts, shaking: true }
    }

    case 'CONTINUE_D': {
      if (state.dRevealed === null) return state
      return advanceNext(state)
    }

    case 'CLEAR_SHAKE':
      return { ...state, shaking: false }

    case 'RESTART':
      return { ...initialState, ordered: state.ordered }

    case 'TOGGLE_ORDER':
      return { ...state, ordered: !state.ordered }

    default:
      return state
  }
}

export function PeriodicTablePractice() {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    if (state.shaking) {
      const t = setTimeout(() => dispatch({ type: 'CLEAR_SHAKE' }), 500)
      return () => clearTimeout(t)
    }
  }, [state.shaking])

  const {
    mode, phase, currentElement, completedSymbols, totalElements,
    spAttempts, spHint, spRevealed,
    dQuestionType, dHint, dRevealed, shaking, ordered,
  } = state

  const completedSet = new Set(completedSymbols)
  const learned = completedSymbols.length

  // Key resets component internal input state when element changes
  const questionKey = currentElement?.symbol ?? 'none'
  const spRevealedKey = spRevealed !== null ? '-rev' : ''
  const dRevealedKey = dRevealed !== null ? '-rev' : ''

  return (
    <div className="flex flex-col gap-6">

      {/* ── Mode select ───────────────────────────────────────── */}
      {phase === 'mode-select' && (
        <div className="flex flex-col items-center gap-8 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[var(--site-text)] mb-2">
              Periodic Table Practice
            </h1>
            <p className="text-sm text-[var(--site-text-soft)] max-w-sm">
              All 71 elements (H–Rn, no lanthanoids). Start completely from blank.
            </p>
          </div>
          {/* Order toggle */}
          <div className="flex items-center gap-1 rounded-full border border-[var(--site-border)] p-0.5 text-xs">
            <button
              onClick={() => !ordered || dispatch({ type: 'TOGGLE_ORDER' })}
              className={[
                'px-3 py-1 rounded-full transition-colors',
                !ordered
                  ? 'bg-[var(--site-accent)] text-[var(--site-text)] font-semibold'
                  : 'text-[var(--site-text-soft)] hover:text-[var(--site-text)]',
              ].join(' ')}
            >
              ⇅ Random
            </button>
            <button
              onClick={() => ordered || dispatch({ type: 'TOGGLE_ORDER' })}
              className={[
                'px-3 py-1 rounded-full transition-colors',
                ordered
                  ? 'bg-[var(--site-accent)] text-[var(--site-text)] font-semibold'
                  : 'text-[var(--site-text-soft)] hover:text-[var(--site-text)]',
              ].join(' ')}
            >
              ↓ In order
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => dispatch({ type: 'SELECT_MODE', mode: 'sp-block' })}
              className="px-8 py-5 rounded-xl border-2 border-[var(--site-accent)] bg-[var(--site-accent-soft)] text-[var(--site-text)] font-semibold hover:bg-[var(--site-accent)] transition-colors text-sm"
            >
              <div className="text-xl mb-1">s / p block</div>
              <div className="font-normal text-[var(--site-text-soft)] text-xs">
                Groups 1–2, 13–18 · 42 elements
              </div>
              <div className="font-normal text-[var(--site-text-soft)] text-xs mt-1">
                Type symbol and name together
              </div>
            </button>
            <button
              onClick={() => dispatch({ type: 'SELECT_MODE', mode: 'd-block' })}
              className="px-8 py-5 rounded-xl border-2 border-[var(--site-border)] bg-[var(--site-bg)] text-[var(--site-text)] font-semibold hover:border-[var(--site-accent)] transition-colors text-sm"
            >
              <div className="text-xl mb-1">d block</div>
              <div className="font-normal text-[var(--site-text-soft)] text-xs">
                Groups 3–12 · 29 elements
              </div>
              <div className="font-normal text-[var(--site-text-soft)] text-xs mt-1">
                Given symbol or name, guess the other
              </div>
            </button>
          </div>
        </div>
      )}

      {/* ── Practice / Done ───────────────────────────────────── */}
      {phase !== 'mode-select' && (
        <>
          {/* Header */}
          <div className="flex items-center justify-between py-2 border-b border-[var(--site-border)]">
            <span className="text-sm font-semibold text-[var(--site-text)]">
              {learned} / {totalElements} learned
            </span>
            <div className="flex gap-2">
              <span className="text-xs px-2 py-1 rounded border border-[var(--site-border)] text-[var(--site-text-soft)]">
                {mode === 'sp-block' ? 's/p block' : 'd block'}
              </span>
              <span className="text-xs px-2 py-1 rounded border border-[var(--site-border)] text-[var(--site-text-soft)]">
                {ordered ? '↓ in order' : '⇅ random'}
              </span>
              <button
                onClick={() => dispatch({ type: 'RESTART' })}
                className="text-xs px-3 py-1 rounded border border-[var(--site-border)] text-[var(--site-text-soft)] hover:text-[var(--site-text)] transition-colors"
              >
                ← Modes
              </button>
            </div>
          </div>

          {/* Grid */}
          <PeriodicTableGrid
            completedSymbols={completedSet}
            pulsingSymbol={phase === 'practice' ? (currentElement?.symbol ?? null) : null}
          />

          {/* Practice */}
          {phase === 'practice' && currentElement && (
            <div className="py-4">
              {mode === 'sp-block' ? (
                <PracticeQuestion
                  key={questionKey + spRevealedKey}
                  variant="sp"
                  onInput={v => dispatch({ type: 'LIVE_CHECK_SP', input: v })}
                  onManualSubmit={v => dispatch({ type: 'SUBMIT_SP', input: v })}
                  onContinue={() => dispatch({ type: 'CONTINUE_SP' })}
                  shaking={shaking}
                  hint={spHint}
                  revealed={spRevealed}
                />
              ) : (
                <PracticeQuestion
                  key={questionKey + dRevealedKey}
                  variant="d"
                  prompt={dQuestionType === 'symbol' ? currentElement.symbol : currentElement.name}
                  promptLabel={dQuestionType === 'symbol' ? 'Symbol' : 'Name'}
                  answerLabel={dQuestionType === 'symbol' ? 'Name' : 'Symbol'}
                  onInput={v => dispatch({ type: 'LIVE_CHECK_D', input: v })}
                  onManualSubmit={v => dispatch({ type: 'SUBMIT_D', input: v })}
                  onContinue={() => dispatch({ type: 'CONTINUE_D' })}
                  shaking={shaking}
                  hintText={dHint}
                  revealed={dRevealed}
                />
              )}

              {/* Attempt dots */}
              <div className="flex justify-center gap-1.5 mt-4">
                {[0, 1, 2].map(i => {
                  const attempts = mode === 'sp-block' ? spAttempts : state.dAttempts
                  return (
                    <span
                      key={i}
                      className={[
                        'w-1.5 h-1.5 rounded-full transition-colors',
                        i < attempts ? 'bg-orange-400' : 'bg-[var(--site-border)]',
                      ].join(' ')}
                    />
                  )
                })}
              </div>
            </div>
          )}

          {/* Done */}
          {phase === 'done' && (
            <div className="flex flex-col items-center gap-6 py-12 text-center">
              <div>
                <p className="text-xs text-[var(--site-text-soft)] uppercase tracking-widest mb-2">
                  Complete
                </p>
                <h2 className="text-2xl font-bold text-[var(--site-text)]">
                  All {totalElements} elements done!
                </h2>
              </div>
              <div className="flex gap-3">
                <button
                  autoFocus
                  onClick={() => dispatch({ type: 'SELECT_MODE', mode })}
                  className="px-5 py-2.5 rounded-lg bg-[var(--site-accent)] text-[var(--site-text)] text-sm font-medium hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-[var(--site-accent)]"
                >
                  Play again
                </button>
                <button
                  onClick={() => dispatch({ type: 'RESTART' })}
                  className="px-5 py-2.5 rounded-lg border border-[var(--site-border)] text-[var(--site-text-soft)] text-sm hover:text-[var(--site-text)] transition-colors"
                >
                  ← Modes
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
