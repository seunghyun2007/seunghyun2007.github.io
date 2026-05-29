import type { Metadata } from 'next'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { ContactForm } from '@/components/contact/ContactForm'
import { CopyButton } from '@/components/contact/CopyButton'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Seunghyun Kang.',
}

const SOCIAL = [
  {
    label: 'Email',
    value: 'ph3749205@gmail.com',
    href: 'mailto:ph3749205@gmail.com',
  },
  {
    label: 'GitHub',
    value: 'github.com/seunghyun2007',
    href: 'https://github.com/seunghyun2007',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/seunghyun-kang-176898281',
    href: 'https://www.linkedin.com/in/seunghyun-kang-176898281/',
  },
]

export default function ContactPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <SectionHeader
        title="Contact"
        intro="If you'd like to talk about projects, ideas, or opportunities, I'd be happy to hear from you."
      />

      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Form */}
        <div>
          <ContactForm />
        </div>

        {/* Social links + portrait */}
        <div className="flex flex-col gap-8">
          <ul className="space-y-4">
            {SOCIAL.map(({ label, value, href }) => (
              <li key={label} className="flex items-center gap-3">
                <span className="text-sm font-semibold text-[var(--site-text-soft)] w-16 flex-shrink-0">
                  {label}:
                </span>
                <a
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--site-text)] hover:text-[var(--site-bordeaux)] transition-colors truncate"
                >
                  {value}
                </a>
                <CopyButton text={href.startsWith('mailto') ? value : href} />
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-2">
            <img
              src="/assets/face4.jpeg"
              alt="Portrait of Seunghyun"
              className="w-full aspect-[3/4] object-cover object-top"
            />
            <p className="text-xs text-[var(--site-text-soft)]">
              You can probably guess what my favorite fruit is from this picture.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
