interface Props {
  tag: string
}

export function TagBadge({ tag }: Props) {
  return (
    <span className="px-2 py-0.5 text-xs rounded-full border border-[var(--site-border)] text-[var(--site-text-soft)]">
      #{tag}
    </span>
  )
}
