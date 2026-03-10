'use client'

import { motion } from 'framer-motion'
import { VideoBackground } from '@/components/ui/VideoBackground'
import { ButtonDark } from '@/components/ui/Button'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { makeHeroContainerVariants, makeHeroItemVariants } from '@/lib/motion'

export function FurnishHero() {
  const reducedMotion = useReducedMotion()
  const containerVariants = makeHeroContainerVariants(reducedMotion)
  const itemVariants = makeHeroItemVariants(reducedMotion)

  return (
    <section aria-label="Furnish hero" className="relative h-dvh min-h-[600px] overflow-hidden">
      <VideoBackground
        imageSrc="/00 FINISHED/14 ROKVILLA OFFICE/14_ROKVILLA OFFICE_01.jpg"
        imageAlt="RokVilla interior furnishing — modern living space with premium materials"
      />

      <div className="relative z-10 flex h-full items-end pb-24 md:items-center md:pb-0">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-2xl lg:max-w-3xl"
          >
            <motion.span
              variants={itemVariants}
              className="mb-6 block font-accent text-[13px] uppercase tracking-[0.18em] text-brass-light"
            >
              Furnishing Services
            </motion.span>

            <motion.h1
              variants={itemVariants}
              className="font-display text-[clamp(3rem,7vw,7rem)] font-light leading-[0.9] text-bone whitespace-pre-line"
            >
              {"Let's Furnish\nYour Rok-Villa"}
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-md font-body text-base leading-relaxed text-stone md:text-lg"
            >
              End-to-end interior furnishing with premium materials, expert
              craftsmanship, and a 10-year warranty on all woodwork.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4"
            >
              <ButtonDark variant="primary" href="#furnish-projects" className="w-full sm:w-auto">
                Browse Projects
              </ButtonDark>
              <ButtonDark variant="secondary" href="#consultation" className="w-full sm:w-auto">
                Book Consultation
              </ButtonDark>
            </motion.div>
          </motion.div>
        </div>
      </div>

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
