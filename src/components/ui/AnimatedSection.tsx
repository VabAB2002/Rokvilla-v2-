'use client'

import { type ReactNode } from 'react'
import * as m from 'framer-motion/m'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { EASE_OUT_EXPO } from '@/lib/motion'

interface AnimatedSectionProps {
  readonly children: ReactNode
  readonly className?: string
  readonly delay?: number
}

export function AnimatedSection({
  children,
  className = '',
  delay = 0,
}: AnimatedSectionProps) {
  const reducedMotion = useReducedMotion()

  return (
    <m.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px 0px' }}
      transition={{
        duration: reducedMotion ? 0.1 : 0.7,
        delay,
        ease: EASE_OUT_EXPO,
      }}
      className={className}
    >
      {children}
    </m.div>
  )
}
