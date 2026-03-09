'use client'

import { type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { fadeUpVariants, TRANSITION_SMOOTH } from '@/lib/motion'

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
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={fadeUpVariants}
      transition={{ ...TRANSITION_SMOOTH, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
