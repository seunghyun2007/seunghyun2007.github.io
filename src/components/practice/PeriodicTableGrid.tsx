'use client'

import { ELEMENTS, GRID_POSITIONS } from '@/lib/elements'

interface Props {
  completedSymbols: Set<string>
  pulsingSymbol: string | null
}

const COLS = 18
const ROWS = 6

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

// Group numbers that have at least one element (to decide label visibility)
const POPULATED_COLS = new Set(ELEMENTS.map(el => el.group))

export function PeriodicTableGrid({ completedSymbols, pulsingSymbol }: Props) {
  return (
    <div className="overflow-x-auto w-full">
      {/* Group number row */}
      <div
        className="grid gap-[2px] mb-1"
        style={{
          gridTemplateColumns: `repeat(${COLS}, minmax(34px, 1fr))`,
          minWidth: '612px',
        }}
      >
        {Array.from({ length: COLS }, (_, i) => {
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
          gridTemplateColumns: `repeat(${COLS}, minmax(34px, 1fr))`,
          gridTemplateRows: `repeat(${ROWS}, 40px)`,
          minWidth: '612px',
        }}
      >
        {Array.from({ length: ROWS }, (_, rowIdx) =>
          Array.from({ length: COLS }, (_, colIdx) => {
            const row = rowIdx + 1
            const col = colIdx + 1
            const symbol = POSITION_MAP[row]?.[col]

            if (!symbol) {
              return (
                <div
                  key={`empty-${row}-${col}`}
                  style={{ gridColumn: col, gridRow: row }}
                />
              )
            }

            const el = BY_SYMBOL[symbol]
            const completed = completedSymbols.has(symbol)
            const pulsing = pulsingSymbol === symbol
            const block = getBlock(el.group)

            return (
              <div
                key={symbol}
                style={{
                  gridColumn: col,
                  gridRow: row,
                  ...(!completed && !pulsing
                    ? { backgroundColor: BLOCK_STYLES[block].bg }
                    : {}),
                }}
                className={[
                  'rounded-sm flex flex-col items-center justify-center text-center border transition-all duration-300',
                  completed
                    ? 'border-[var(--site-accent)] bg-[var(--site-accent-soft)] cell-fill-in'
                    : pulsing
                    ? 'cell-active'
                    : 'border-[var(--site-border)]',
                ].join(' ')}
              >
                {completed && (
                  <>
                    <span className="text-[9px] font-bold text-[var(--site-text)] leading-none">
                      {symbol}
                    </span>
                    <span className="text-[6px] text-[var(--site-text-soft)] leading-none mt-0.5 truncate w-full px-0.5 text-center">
                      {el.name}
                    </span>
                  </>
                )}
              </div>
            )
          })
        )}
      </div>

      {/* Block legend */}
      <div className="flex gap-5 justify-center mt-2">
        {(['s', 'p', 'd'] as const).map(block => (
          <div key={block} className="flex items-center gap-1.5">
            <span
              className="inline-block w-2.5 h-2.5 rounded-[2px] border border-[var(--site-border)]"
              style={{ backgroundColor: BLOCK_STYLES[block].bg }}
            />
            <span className="text-[9px] text-[var(--site-text-soft)]">
              {BLOCK_STYLES[block].label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
