import type { Metadata } from 'next'
import { ResumeSection } from '@/components/resume/ResumeSection'
import { PrintButton } from '@/components/resume/PrintButton'

export const metadata: Metadata = {
  title: 'Resume',
  description: 'Resume of Seunghyun Kang — engineering student, builder, learner.',
}

export default function ResumePage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      {/* Print button */}
      <div className="flex justify-end mb-8 no-print">
        <PrintButton />
      </div>

      {/* Header */}
      <header className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-[var(--site-text)] mb-1">Seunghyun Kang</h1>
        <p className="text-sm text-[var(--site-text-soft)]">
          ph3749205@gmail.com ·{' '}
          <a
            href="https://github.com/seunghyun2007"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            github.com/seunghyun2007
          </a>{' '}
          ·{' '}
          <a
            href="https://www.linkedin.com/in/seunghyun-kang-176898281/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            LinkedIn
          </a>
        </p>
      </header>

      <ResumeSection title="Education">
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-baseline">
              <h3 className="font-semibold text-[var(--site-text)]">Yonsei University</h3>
              <span className="text-sm text-[var(--site-text-soft)]">2025 →</span>
            </div>
            <p className="text-sm text-[var(--site-text-soft)]">Incoming undergraduate — Science & Engineering</p>
          </div>
          <div>
            <div className="flex justify-between items-baseline">
              <h3 className="font-semibold text-[var(--site-text)]">EIPACA — European International School</h3>
              <span className="text-sm text-[var(--site-text-soft)]">2020 – 2025</span>
            </div>
            <p className="text-sm text-[var(--site-text-soft)]">
              European Baccalaureate — 92.0% · Southern France
            </p>
          </div>
        </div>
      </ResumeSection>

      <ResumeSection title="Standardized Tests">
        <div className="grid grid-cols-2 gap-2 text-sm text-[var(--site-text-soft)]">
          <div>AP Calculus BC — 5 (2025)</div>
          <div>AP Chemistry — 5 (2024)</div>
          <div>DALF C1 French (2025)</div>
          <div>SAT — 1530 (2024)</div>
          <div>TOEFL iBT — 113 (2024)</div>
        </div>
      </ResumeSection>

      <ResumeSection title="Experience & Research">
        <div className="space-y-4 text-sm">
          <div>
            <div className="flex justify-between items-baseline">
              <h3 className="font-semibold text-[var(--site-text)]">Computer Science Assistant — ITER</h3>
              <span className="text-[var(--site-text-soft)]">2023</span>
            </div>
            <p className="text-[var(--site-text-soft)]">
              Short internship at the International Thermonuclear Experimental Reactor project; assisted with CS tasks and learned about large-scale engineering projects.
            </p>
          </div>
          <div>
            <div className="flex justify-between items-baseline">
              <h3 className="font-semibold text-[var(--site-text)]">Neuroscience Research Camp — Dublin University</h3>
              <span className="text-[var(--site-text-soft)]">2023</span>
            </div>
            <p className="text-[var(--site-text-soft)]">Participated in neuroscience experiments and seminars.</p>
          </div>
          <div>
            <div className="flex justify-between items-baseline">
              <h3 className="font-semibold text-[var(--site-text)]">Astronomy Camp — Saint Michel Observatory</h3>
              <span className="text-[var(--site-text-soft)]">2024</span>
            </div>
            <p className="text-[var(--site-text-soft)]">Observational astronomy and astrophysics workshops.</p>
          </div>
          <div>
            <div className="flex justify-between items-baseline">
              <h3 className="font-semibold text-[var(--site-text)]">Maths Research Camp — Aix-Marseille University</h3>
              <span className="text-[var(--site-text-soft)]">2024</span>
            </div>
            <p className="text-[var(--site-text-soft)]">Collaborative mathematical research with university professors.</p>
          </div>
        </div>
      </ResumeSection>

      <ResumeSection title="Projects">
        <div className="space-y-3 text-sm">
          <div>
            <h3 className="font-semibold text-[var(--site-text)]">
              ESP32 RC Plane{' '}
              <a
                href="https://messy-lancer-b5f.notion.site/ESP32-RC-Plane-2be819f52866804ba86efb5c2db0bcef?pvs=74"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--site-bordeaux)] font-normal hover:underline"
              >
                ↗
              </a>
            </h3>
            <p className="text-[var(--site-text-soft)]">
              Built a remote-controlled plane with an ESP32 microcontroller. Learned embedded systems, C++ control loops, aerodynamics, and CAD.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-[var(--site-text)]">
              Arduino Projects{' '}
              <a
                href="https://messy-lancer-b5f.notion.site/Arduino-Projects-2be819f5286680098e21eae9f1025d8d?pvs=73"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--site-bordeaux)] font-normal hover:underline"
              >
                ↗
              </a>
            </h3>
            <p className="text-[var(--site-text-soft)]">
              Built multiple projects with Arduino to understand sensors, actuators, and microcontroller programming.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-[var(--site-text)]">
              AP Physics I & II Notes{' '}
              <a
                href="https://web.goodnotes.com/s/ER3lSUV0MHVgxGXeP7gFpC"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--site-bordeaux)] font-normal hover:underline"
              >
                ↗
              </a>
            </h3>
            <p className="text-[var(--site-text-soft)]">
              Self-studied AP Physics I & II in 4 weeks, creating detailed notes and experiments on mechanics, electricity, magnetism, and waves.
            </p>
          </div>
        </div>
      </ResumeSection>

      <ResumeSection title="Skills">
        <div className="grid grid-cols-2 gap-2 text-sm text-[var(--site-text-soft)]">
          <div><span className="font-medium text-[var(--site-text)]">Languages:</span> Korean (native), English (C2), French (C1)</div>
          <div><span className="font-medium text-[var(--site-text)]">Programming:</span> Python, C++, JavaScript/TypeScript</div>
          <div><span className="font-medium text-[var(--site-text)]">Hardware:</span> ESP32, Arduino, CAD (Fusion 360)</div>
          <div><span className="font-medium text-[var(--site-text)]">Tools:</span> Git, Notion, GoodNotes, Linux CLI</div>
        </div>
      </ResumeSection>
    </div>
  )
}
