'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { makeFadeUpVariants } from '@/lib/motion'

export function ConsultationPhoto() {
  const reduced = useReducedMotion()
  const variants = makeFadeUpVariants(reduced)

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className="relative w-full max-w-[400px]"
    >
      <Image
        src="/images/design/consultation-illustration.png"
        alt="From dream sketch to finished home — RokVilla consultation"
        width={1400}
        height={800}
        className="h-auto w-full object-contain"
        sizes="400px"
      />
    </motion.div>
  )
}
