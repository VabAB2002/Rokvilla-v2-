'use client'

import { motion } from 'framer-motion'
import { VideoBackground } from '@/components/ui/VideoBackground'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { makeHeroContainerVariants, makeHeroItemVariants } from '@/lib/motion'

export function HeroSection() {
  const reducedMotion = useReducedMotion()
  const containerVariants = makeHeroContainerVariants(reducedMotion)
  const itemVariants = makeHeroItemVariants(reducedMotion)

  return (
    <section aria-label="Hero" className="relative h-dvh min-h-[600px] overflow-hidden">
      <VideoBackground
        imageSrc="/images/home/hero-fallback.jpg"
        imageAlt="RokVilla architecture showcase — Cedar Homestore at dusk"
      />

      {/* Content */}
      <div className="relative z-10 flex h-full items-end pb-24 md:items-center md:pb-0">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-2xl lg:max-w-3xl"
          >
            {/* Overline */}
            <motion.span
              variants={itemVariants}
              className="mb-6 block font-accent text-[13px] uppercase tracking-[0.18em] text-brass-light"
            >
              Architecture &amp; Construction
            </motion.span>

            {/* Heading */}
            <motion.h1
              variants={itemVariants}
              className="font-display text-[clamp(3.5rem,8vw,7.5rem)] font-light leading-[0.9] text-bone whitespace-pre-line"
            >
              {'Built to\nEndure.'}
            </motion.h1>

            {/* Body */}
            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-md font-body text-base leading-relaxed text-stone md:text-lg"
            >
              Premium residential, commercial, and interior spaces — crafted with precision across Karnataka.
            </motion.p>


          </motion.div>
        </div>
      </div>

      {/* Down arrow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reducedMotion ? 0 : 1.5, duration: reducedMotion ? 0.2 : 0.6 }}
        className="absolute inset-x-0 bottom-8 z-10 flex justify-center"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-bounce-gentle text-bone/70"
          aria-hidden="true"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </motion.div>
    </section>
  )
}
