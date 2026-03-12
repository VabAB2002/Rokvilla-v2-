import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { FloatingCTAs } from '@/components/layout/FloatingCTAs'
import { MotionProvider } from '@/components/layout/MotionProvider'

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <MotionProvider>
      <Navigation />
      {children}
      <Footer />
      <FloatingCTAs />
    </MotionProvider>
  )
}
