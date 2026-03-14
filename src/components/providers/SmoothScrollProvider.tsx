'use client'

import { type ReactNode, useEffect, useRef } from 'react'
import { ReactLenis, type LenisRef } from 'lenis/react'
import { cancelFrame, frame } from 'framer-motion'
import { ScrollTrigger } from '@/lib/gsap-config'

export function SmoothScrollProvider({ children }: { readonly children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null)

  useEffect(() => {
    const maybeLenis = lenisRef.current?.lenis
    if (!maybeLenis) return
    // After the guard, lenis is guaranteed non-null — capture for closures
    const lenisInstance: NonNullable<typeof maybeLenis> = maybeLenis

    // Lenis scroll events keep ScrollTrigger positions in sync
    const onScroll = () => ScrollTrigger.update()
    lenisInstance.on('scroll', onScroll)

    // Framer Motion's frame scheduler drives Lenis (single RAF loop)
    function update({ timestamp }: { timestamp: number }) {
      lenisInstance.raf(timestamp)
    }
    frame.update(update, true)

    return () => {
      lenisInstance.off('scroll', onScroll)
      cancelFrame(update)
    }
  }, [])

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        autoRaf: false,
        lerp: 0.1,
        syncTouch: false,
      }}
    >
      {children}
    </ReactLenis>
  )
}
