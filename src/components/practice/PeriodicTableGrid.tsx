'use client'

import { useEffect, useState } from 'react'
import { ELEMENTS, GRID_POSITIONS } from '@/lib/elements'

interface Props {
  completedSymbols: Set<string>
  pulsingSymbol: string | null
  mode: 'sp-block' | 'd-block' | null
}

const FULL_COLS = 18
const ALL_ROWS = 6

const POSITION_MAP: Record<number, Record<number, string>> = {}
for (const el of ELEMENTS) {
  const { col, row } = GRID_POSITIONS[el.symbol]
  if (!POSITION_MAP[row]) POSITION_MAP[row] = {}
  POSITION_MAP[row][col] = el.symbol
}

const BY_SYMBOL = Object.fromEntries(ELEMENTS.map(el => [el.symbol, el]))

const BLOCK_STYLES = {
  s: { bg: 'rgba(59,130,246,0.11)', label: 's block', dot: '#3b82f6' },
  p: { bg: 'rgba(168,85,247,0.11)', label: 'p block', dot: '#a855f7' },
  d: { bg: 'rgba(245,158,11,0.11)', label: 'd block', dot: '#f59e0b' },
} as const

type Block = keyof typeof BLOCK_STYLES

function getBlock(group: number): Block {
  if (group === 1 || group === 2) return 's'
  if (group >= 13) return 'p'
  return 'd'
}

const POPULATED_COLS = new Set(ELEMENTS.map(el => el.group))

// Mobile layout: only show columns relevant to the active mode.
// s/p block → groups 1-2 + gap + groups 13-18 (9 cols total)
// d block   → groups 3-12 (10 cols), only periods 4-6 which have d elements
type MobileConfig = {
  templateColumns: string
  headerCols: (number | null)[]      // null = visual gap column
  colMap: Record<number, number>     // group → grid column (1-based)
  rows: number[]                     // periods to render
  rowIndex: (period: number) => number
  legend: Block[]
}

const SP_COL_MAP: Record<number, number> = { 1: 1, 2: 2, 13: 4, 14: 5, 15: 6, 16: 7, 17: 8, 18: 9 }
const D_COL_MAP: Record<number, number> = Object.fromEntries(
  [3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((g, i) => [g, i + 1])
)

const MOBILE_CONFIGS: Record<'sp-block' | 'd-block', MobileConfig> = {
  'sp-block': {
    templateColumns: 'repeat(2, minmax(30px, 1fr)) 8px repeat(6, minmax(30px, 1fr))',
    headerCols: [1, 2, null, 13, 14, 15, 16, 17, 18],
    colMap: SP_COL_MAP,
    rows: [1, 2, 3, 4, 5, 6],
    rowIndex: p => p,
    legend: ['s', 'p'],
  },
  'd-block': {
    templateColumns: 'repeat(10, minmax(30px, 1fr))',
    headerCols: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    colMap: D_COL_MAP,
    rows: [4, 5, 6],       // d elements only exist in periods 4-6
    rowIndex: p => p - 3,  // period 4 → row 1, 5 → row 2, 6 → row 3
    legend: ['d'],
  },
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])
  return isMobile
}

function cellClass(completed: boolean, pulsing: boolean) {
  return [
    'rounded-sm flex flex-col items-center justify-center text-center border transition-all duration-300',
    completed
      ? 'border-[var(--site-accent)] bg-[var(--site-accent-soft)] cell-fill-in'
      : pulsing
      ? 'cell-active'
      : 'border-[var(--site-border)]',
  ].join(' ')
}

function CellLabel({ symbol }: { symbol: string }) {
  const el = BY_SYMBOL[symbol]
  return (
    <>
      <span className="text-[9px] font-bold text-[var(--site-text)] leading-none">{symbol}</span>
      <span className="text-[6px] text-[var(--site-text-soft)] leading-none mt-0.5 truncate w-full px-0.5 text-center">
        {el.name}
      </span>
    </>
  )
}

function Legend({ blocks }: { blocks: Block[] }) {
  return (
    <div className="flex gap-4 justify-center mt-2">
      {blocks.map(block => (
        <div key={block} className="flex items-center gap-1.5">
          <span
            className="inline-block w-2.5 h-2.5 rounded-[2px] border border-[var(--site-border)]"
            style={{ backgroundColor: BLOCK_STYLES[block].bg }}
          />
          <span className="text-[9px] text-[var(--site-text-soft)]">{BLOCK_STYLES[block].label}</span>
        </div>
      ))}
    </div>
  )
}

export function PeriodicTableGrid({ completedSymbols, pulsingSymbol, mode }: Props) {
  const isMobile = useIsMobile()

  // ── Mobile: filtered columns for the active mode ───────────────────────
  if (isMobile && mode) {
    const { templateColumns, headerCols, colMap, rows, rowIndex, legend } = MOBILE_CONFIGS[mode]

    return (
      <div className="w-full">
        {/* Group number headers */}
        <div className="grid gap-[2px] mb-1" style={{ gridTemplateColumns: templateColumns }}>
          {headerCols.map((g, i) =>
            g === null ? (
              <div key={`gh-gap-${i}`} />
            ) : (
              <div
                key={g}
                className="text-center text-[8px] font-semibold leading-tight"
                style={{ color: BLOCK_STYLES[getBlock(g)].dot }}
              >
                {g}
              </div>
            )
          )}
        </div>

        {/* Element grid */}
        <div
          className="grid gap-[2px]"
          style={{
            gridTemplateColumns: templateColumns,
            gridTemplateRows: `repeat(${rows.length}, 36px)`,
          }}
        >
          {rows.flatMap(period =>
            Object.entries(colMap).map(([gStr, mCol]) => {
              const group = Number(gStr)
              const symbol = POSITION_MAP[period]?.[group] ?? null
              const row = rowIndex(period)
              if (!symbol) {
                return <div key={`e-${period}-${group}`} style={{ gridColumn: mCol, gridRow: row }} />
              }
              const completed = completedSymbols.has(symbol)
              const pulsing = pulsingSymbol === symbol
              const block = getBlock(group)
              return (
                <div
                  key={symbol}
                  style={{
                    gridColumn: mCol,
                    gridRow: row,
                    ...(!completed && !pulsing ? { backgroundColor: BLOCK_STYLES[block].bg } : {}),
                  }}
                  className={cellClass(completed, pulsing)}
                >
                  {completed && <CellLabel symbol={symbol} />}
                </div>
              )
            })
          )}
        </div>

        <Legend blocks={legend} />
      </div>
    )
  }

  // ── Desktop: full 18-column periodic table ─────────────────────────────
  return (
    <div className="overflow-x-auto w-full">
      {/* Group number headers */}
      <div
        className="grid gap-[2px] mb-1"
        style={{ gridTemplateColumns: `repeat(${FULL_COLS}, minmax(34px, 1fr))`, minWidth: '612px' }}
      >
        {Array.from({ length: FULL_COLS }, (_, i) => {
          const group = i + 1
          const block = POPULATED_COLS.has(group) ? getBlock(group) : null
          return (
            <div
              key={i}
              className="text-center text-[8px] font-semibold leading-tight"
              style={{ color: block ? BLOCK_STYLES[block].dot : 'transparent' }}
            >
              {group}
            </div>
          )
        })}
      </div>

      {/* Element grid */}
      <div
        className="grid gap-[2px]"
        style={{
          gridTemplateColumns: `repeat(${FULL_COLS}, minmax(34px, 1fr))`,
          gridTemplateRows: `repeat(${ALL_ROWS}, 40px)`,
          minWidth: '612px',
        }}
      >
        {Array.from({ length: ALL_ROWS }, (_, rowIdx) =>
          Array.from({ length: FULL_COLS }, (_, colIdx) => {
            const row = rowIdx + 1
            const col = colIdx + 1
            const symbol = POSITION_MAP[row]?.[col] ?? null
            if (!symbol) {
              return <div key={`e-${row}-${col}`} style={{ gridColumn: col, gridRow: row }} />
            }
            const completed = completedSymbols.has(symbol)
            const pulsing = pulsingSymbol === symbol
            const block = getBlock(col)
            return (
              <div
                key={symbol}
                style={{
                  gridColumn: col,
                  gridRow: row,
                  ...(!completed && !pulsing ? { backgroundColor: BLOCK_STYLES[block].bg } : {}),
                }}
                className={cellClass(completed, pulsing)}
              >
                {completed && <CellLabel symbol={symbol} />}
              </div>
            )
          })
        )}
      </div>

      <Legend blocks={['s', 'p', 'd']} />
    </div>
  )
}
