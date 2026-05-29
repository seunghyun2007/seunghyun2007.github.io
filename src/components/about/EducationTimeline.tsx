const TIMELINE = [
  {
    period: '2025 →',
    title: 'Yonsei University',
    subtitle: 'Incoming undergraduate — Science & Engineering',
    note: '',
  },
  {
    period: '2020 – 2025',
    title: 'EIPACA — European School, Southern France',
    subtitle: 'European Baccalaureate — 92.0% (2025)',
    note: 'AP Calc BC & Chemistry — 5/5 · DALF C1 · SAT 1530 · TOEFL 113',
    link: { href: 'https://ecoleinternationalepaca.fr/en/', label: 'Visit school website' },
  },
]

export function EducationTimeline() {
  return (
    <div className="relative pl-6 border-l-2 border-[var(--site-accent)] space-y-8">
      {TIMELINE.map(({ period, title, subtitle, note, link }) => (
        <div key={title} className="relative">
          <span className="absolute -left-[1.35rem] top-1 w-3 h-3 rounded-full bg-[var(--site-accent)] border-2 border-[var(--site-bg)]" />
          <p className="text-xs font-semibold text-[var(--site-text-soft)] mb-1">{period}</p>
          <h4 className="font-semibold text-[var(--site-text)]">{title}</h4>
          <p className="text-sm text-[var(--site-text-soft)] mt-0.5">{subtitle}</p>
          {note && <p className="text-xs text-[var(--site-text-soft)] mt-1">{note}</p>}
          {link && (
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-1 text-xs text-[var(--site-bordeaux)] hover:underline"
            >
              {link.label} →
            </a>
          )}
        </div>
      ))}
    </div>
  )
}
