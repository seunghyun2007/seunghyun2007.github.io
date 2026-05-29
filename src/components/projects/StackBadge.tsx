interface Props {
  label: string
}

export function StackBadge({ label }: Props) {
  return (
    <span className="px-2 py-0.5 text-xs rounded-full bg-[var(--site-accent-soft)] border border-[var(--site-accent)] text-[var(--site-text)]">
      {label}
    </span>
  )
}
