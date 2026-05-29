import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { ThemeProvider, THEME_INIT_SCRIPT } from '@/components/shared/ThemeProvider'
import { PageTransition } from '@/components/shared/PageTransition'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { LightboxProvider } from '@/components/shared/Lightbox'
import { DesignToolbar } from '@/components/customization/DesignToolbar'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: {
    default: 'Seunghyun Kang',
    template: '%s | Seunghyun Kang',
  },
  description:
    'Portfolio and learning journal of Seunghyun Kang, an engineering student exploring science, mathematics, and technology through hands-on projects.',
  openGraph: {
    title: 'Seunghyun Kang',
    description:
      'Portfolio and learning journal of Seunghyun Kang — engineering student, builder, learner.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <LightboxProvider>
            <Navbar />
            <PageTransition>
              {/* pb-16 on mobile to clear the fixed bottom nav */}
              <main className="pb-16 md:pb-0">{children}</main>
            </PageTransition>
            <div className="hidden md:block"><Footer /></div>
            <DesignToolbar />
          </LightboxProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
