interface Props {
  title: string
  intro?: string
  className?: string
}

export function SectionHeader({ title, intro, className }: Props) {
  return (
    <div className={`mb-10 ${className ?? ''}`}>
      <h2 className="text-2xl md:text-3xl font-bold text-[var(--site-text)] mb-3">{title}</h2>
      {intro && (
        <p className="text-[var(--site-text-soft)] max-w-2xl leading-relaxed">{intro}</p>
      )}
    </div>
  )
}
