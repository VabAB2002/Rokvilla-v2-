import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Cormorant_SC, DM_Sans } from 'next/font/google'
import './globals.css'

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant-garamond',
  display: 'swap',
})

const cormorantSC = Cormorant_SC({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-cormorant-sc',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-dm-sans',
  display: 'swap',
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
        <main>{children}</main>
      </body>
    </html>
  )
}
