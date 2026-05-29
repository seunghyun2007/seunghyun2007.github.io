'use client'

import { useState } from 'react'

// TODO: Replace with your actual Formspree endpoint from https://formspree.io
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/placeholder'

type Status = 'idle' | 'submitting' | 'success' | 'error'

export function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })

      if (res.ok) {
        setStatus('success')
        setName('')
        setEmail('')
        setMessage('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const inputClass =
    'w-full px-4 py-2.5 text-sm rounded-md border border-[var(--site-border)] bg-white/70 dark:bg-white/5 text-[var(--site-text)] placeholder:text-[var(--site-text-soft)] focus:outline-none focus:border-[var(--site-accent)] transition-colors'

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="block text-sm font-medium text-[var(--site-text)] mb-1.5">
          Name
        </label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--site-text)] mb-1.5">
          Email
        </label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--site-text)] mb-1.5">
          Message
        </label>
        <textarea
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="What's on your mind?"
          className={`${inputClass} resize-none`}
        />
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="px-6 py-2.5 text-sm font-semibold rounded-md bg-[var(--site-accent)] text-[var(--site-text)] hover:bg-[var(--site-accent-soft-2)] disabled:opacity-60 transition-colors"
      >
        {status === 'submitting' ? 'Sending...' : 'Send message'}
      </button>

      {status === 'success' && (
        <p className="text-sm text-green-600 dark:text-green-400">
          Message sent! I&apos;ll get back to you soon.
        </p>
      )}
      {status === 'error' && (
        <p className="text-sm text-red-600 dark:text-red-400">
          Something went wrong. Try emailing me directly at ph3749205@gmail.com.
        </p>
      )}
    </form>
  )
}
