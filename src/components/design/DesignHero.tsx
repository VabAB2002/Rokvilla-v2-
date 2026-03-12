'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { makeHeroContainerVariants, makeHeroItemVariants } from '@/lib/motion'

export function DesignHero() {
  const reducedMotion = useReducedMotion()
  const containerVariants = makeHeroContainerVariants(reducedMotion)
  const itemVariants = makeHeroItemVariants(reducedMotion)

  return (
    <section aria-label="Design hero" className="relative h-dvh min-h-[600px] overflow-hidden bg-white">
      {/* Blueprint background image — pushed right so text has clear space */}
      <div className="absolute inset-y-0 -right-[10%] left-[35%] md:left-[40%]">
        <Image
          src="/images/design/design-blueprint.jpg"
          alt=""
          fill
          priority
          className="object-contain object-right"
          sizes="75vw"
        />
      </div>

      {/* Gradient overlay for text readability */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to right, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.75) 35%, rgba(255,255,255,0.2) 65%, rgba(255,255,255,0) 100%)',
        }}
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
              className="mb-6 block font-accent text-[13px] uppercase tracking-[0.18em] text-brass md:text-[15px]"
            >
              Design Services
            </motion.span>

            {/* Heading */}
            <motion.h1
              variants={itemVariants}
              className="font-display text-[clamp(3rem,7vw,7rem)] font-light leading-[0.9] text-void whitespace-pre-line"
            >
              {"From Blueprint\nto Reality"}
            </motion.h1>

            {/* Body */}
            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-md font-body text-base leading-relaxed text-graphite md:text-lg"
            >
              From concept sketches to construction-ready blueprints — architectural
              designs that balance aesthetics, function, and budget.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4"
            >
              <Button variant="primary" href="#design-projects" className="w-full sm:w-auto">
                Browse Projects
              </Button>
              <Button variant="secondary" href="#consultation" className="w-full sm:w-auto">
                Book Consultation
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reducedMotion ? 0 : 1.2, duration: reducedMotion ? 0.2 : 0.6 }}
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
          className="animate-bounce-gentle text-stone"
          aria-hidden="true"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </motion.div>
    </section>
  )
}
