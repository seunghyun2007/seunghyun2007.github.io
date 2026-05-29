const SKILLS: { category: string; items: string[] }[] = [
  {
    category: 'Languages & Programming',
    items: ['Python', 'C++', 'JavaScript', 'TypeScript', 'HTML/CSS'],
  },
  {
    category: 'Hardware & Electronics',
    items: ['Arduino', 'ESP32', 'CAD (Fusion 360)', 'Soldering', 'Sensors & Actuators'],
  },
  {
    category: 'Math & Science',
    items: ['Calculus BC', 'AP Physics I & II', 'Statistics', 'Linear Algebra'],
  },
  {
    category: 'Tools & Workflow',
    items: ['Git & GitHub', 'Notion', 'GoodNotes', 'VS Code', 'Linux CLI'],
  },
]

export function SkillsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {SKILLS.map(({ category, items }) => (
        <div
          key={category}
          className="border border-[var(--site-border)] rounded-md p-4 bg-white/50 dark:bg-white/5"
        >
          <h4 className="text-xs font-semibold tracking-widest uppercase text-[var(--site-text-soft)] mb-3">
            {category}
          </h4>
          <div className="flex flex-wrap gap-2">
            {items.map((skill) => (
              <span
                key={skill}
                className="px-2.5 py-1 text-xs rounded-full bg-[var(--site-accent-soft)] text-[var(--site-text)] border border-[var(--site-accent)]"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
