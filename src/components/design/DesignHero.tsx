'use client'

import { motion } from 'framer-motion'
import { VideoBackground } from '@/components/ui/VideoBackground'
import { ButtonDark } from '@/components/ui/Button'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { makeHeroContainerVariants, makeHeroItemVariants } from '@/lib/motion'

export function DesignHero() {
  const reducedMotion = useReducedMotion()
  const containerVariants = makeHeroContainerVariants(reducedMotion)
  const itemVariants = makeHeroItemVariants(reducedMotion)

  return (
    <section aria-label="Design hero" className="relative h-dvh min-h-[600px] overflow-hidden">
      <VideoBackground
        imageSrc="/00 FINISHED/01 SRIPRADHA/HERO IMAGE_01_SRIPRADHA.png"
        imageAlt="Sripradha residence — contemporary architectural design by RokVilla"
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
              Design Services
            </motion.span>

            {/* Heading */}
            <motion.h1
              variants={itemVariants}
              className="font-display text-[clamp(3rem,7vw,7rem)] font-light leading-[0.9] text-bone whitespace-pre-line"
            >
              {"Let's Design\nSomething Truly\nRok-Smart"}
            </motion.h1>

            {/* Body */}
            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-md font-body text-base leading-relaxed text-stone md:text-lg"
            >
              From concept sketches to construction-ready blueprints — architectural
              designs that balance aesthetics, function, and budget.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4"
            >
              <ButtonDark variant="primary" href="#design-projects" className="w-full sm:w-auto">
                Browse Projects
              </ButtonDark>
              <ButtonDark variant="secondary" href="#consultation" className="w-full sm:w-auto">
                Book Consultation
              </ButtonDark>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reducedMotion ? 0 : 1.5, duration: reducedMotion ? 0.2 : 0.6 }}
        className="absolute inset-x-0 bottom-8 z-10 flex justify-center"
      >
        <motion.svg
          animate={reducedMotion ? undefined : { y: [0, 6, 0] }}
          transition={
            reducedMotion ? undefined : { duration: 1.2, repeat: Infinity, ease: 'easeInOut' }
          }
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-bone/70"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </motion.svg>
      </motion.div>
    </section>
  )
}
