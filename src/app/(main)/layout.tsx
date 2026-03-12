import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { FloatingCTAs } from '@/components/layout/FloatingCTAs'
import { BottomActionStrip } from '@/components/layout/BottomActionStrip'
import { MotionProvider } from '@/components/layout/MotionProvider'

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <MotionProvider>
      <Navigation />
      <main className="pb-20 lg:pb-0">{children}</main>
      <Footer />
      <FloatingCTAs />
      <BottomActionStrip />
    </MotionProvider>
  )
}
