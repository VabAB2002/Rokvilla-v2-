'use client'

import { LazyMotion, domAnimation } from 'framer-motion'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { FloatingCTAs } from '@/components/layout/FloatingCTAs'

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <LazyMotion features={domAnimation} strict>
      <Navigation />
      {children}
      <Footer />
      <FloatingCTAs />
    </LazyMotion>
  )
}
