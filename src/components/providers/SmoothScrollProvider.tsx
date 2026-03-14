'use client'

import { type ReactNode, useCallback } from 'react'
import { ReactLenis } from 'lenis/react'
import { ScrollTrigger } from '@/lib/gsap-config'
import { useIsLowPowerDevice } from '@/hooks/useIsLowPowerDevice'

export function SmoothScrollProvider({ children }: { readonly children: ReactNode }) {
  const isLowPower = useIsLowPowerDevice()

  // Keep GSAP ScrollTrigger positions in sync with Lenis scroll
  const handleScroll = useCallback(() => {
    ScrollTrigger.update()
  }, [])

  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        lerp: isLowPower ? 1 : 0.1,
        syncTouch: false,
      }}
      onScroll={handleScroll}
    >
      {children}
    </ReactLenis>
  )
}
