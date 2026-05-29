interface Props {
  title: string
  children: React.ReactNode
}

export function ResumeSection({ title, children }: Props) {
  return (
    <section className="mb-8">
      <h2 className="text-sm font-semibold tracking-widest uppercase text-[var(--site-text-soft)] border-b border-[var(--site-border)] pb-2 mb-4">
        {title}
      </h2>
      {children}
    </section>
  )
}
