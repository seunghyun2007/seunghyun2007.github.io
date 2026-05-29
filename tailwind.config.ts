import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    screens: {
      sm: '375px',
      md: '768px',
      lg: '1280px',
    },
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        border: 'var(--border)',
        ring: 'var(--ring)',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        // Site design tokens
        site: {
          accent: 'var(--site-accent)',
          'accent-soft': 'var(--site-accent-soft)',
          'accent-soft-2': 'var(--site-accent-soft-2)',
          bg: 'var(--site-bg)',
          text: 'var(--site-text)',
          'text-soft': 'var(--site-text-soft)',
          bordeaux: 'var(--site-bordeaux)',
          border: 'var(--site-border)',
        },
      },
      borderRadius: {
        lg: '18px',
        md: '12px',
        sm: '8px',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      boxShadow: {
        soft: '0 12px 30px rgba(15, 23, 42, 0.06)',
        'card-hover': '0 16px 30px rgba(15, 23, 42, 0.08)',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config
