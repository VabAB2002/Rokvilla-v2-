'use client'

import { type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { makeFadeUpVariants, TRANSITION_SMOOTH, EASE_OUT_QUART } from '@/lib/motion'

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
  const variants = makeFadeUpVariants(reducedMotion)
  const transition = reducedMotion
    ? { duration: 0.15, ease: EASE_OUT_QUART }
    : { ...TRANSITION_SMOOTH, delay }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={variants}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  )
}
