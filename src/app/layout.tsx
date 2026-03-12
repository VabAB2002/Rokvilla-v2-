import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Cormorant_SC, DM_Sans } from 'next/font/google'
import './globals.css'

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '500'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant-garamond',
  display: 'optional',
  adjustFontFallback: true,
  fallback: ['Georgia', 'serif'],
})

const cormorantSC = Cormorant_SC({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-cormorant-sc',
  display: 'optional',
  adjustFontFallback: true,
  fallback: ['Georgia', 'serif'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-sans',
  display: 'optional',
  adjustFontFallback: true,
  fallback: ['system-ui', 'sans-serif'],
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0F0D0B',
}

export const metadata: Metadata = {
  title: {
    default: 'RokVilla | Premium Architecture & Construction',
    template: '%s | RokVilla',
  },
  description:
    'RokVilla crafts premium residential, commercial and interior spaces in Hubli, Dharwad and Ballari, Karnataka.',
  keywords: [
    'architecture',
    'construction',
    'interior design',
    'Hubli',
    'Dharwad',
    'Ballari',
    'Karnataka',
    'RokVilla',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'RokVilla',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${cormorantGaramond.variable} ${cormorantSC.variable} ${dmSans.variable} antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:rounded focus:bg-terracotta focus:px-4 focus:py-2 focus:font-body focus:text-sm focus:text-bone focus:shadow-lg"
        >
          Skip to main content
        </a>
        <div id="main-content">{children}</div>
      </body>
    </html>
  )
}
