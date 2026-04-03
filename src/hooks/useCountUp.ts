'use client'

import { useEffect, useState } from 'react'
import { useMotionValue, useSpring } from 'framer-motion'

interface UseCountUpOptions {
  readonly target: number
  readonly enabled: boolean
  readonly reducedMotion: boolean
}

export function useCountUp({ target, enabled, reducedMotion }: UseCountUpOptions): number {
  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, { stiffness: 50, damping: 30, restDelta: 0.5 })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (reducedMotion) {
      motionValue.set(target)
      setDisplay(target)
      return
    }
    if (enabled) {
      motionValue.set(target)
    }
  }, [enabled, target, motionValue, reducedMotion])

  useEffect(() => {
    const unsubscribe = spring.on('change', (v) => setDisplay(Math.round(v)))
    return unsubscribe
  }, [spring])

  return display
}
