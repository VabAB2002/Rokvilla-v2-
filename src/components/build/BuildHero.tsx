'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { makeHeroContainerVariants, makeHeroItemVariants } from '@/lib/motion'

export function BuildHero() {
  const reducedMotion = useReducedMotion()
  const containerVariants = makeHeroContainerVariants(reducedMotion)
  const itemVariants = makeHeroItemVariants(reducedMotion)

  return (
    <section aria-label="Build hero" className="relative h-dvh min-h-[600px] overflow-hidden bg-white">
      {/* Background illustration */}
      <div className="absolute inset-0">
        <Image
          src="/images/Gemini_Generated_Image_26aklo26aklo26ak.png"
          alt="Construction illustration showing a building in progress"
          fill
          priority
          className="object-contain object-right-bottom"
          sizes="100vw"
        />
      </div>

      {/* Gradient overlay for text readability */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to right, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.7) 45%, rgba(255,255,255,0.1) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex h-full items-end pb-24 md:items-center md:pb-0">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-3xl lg:max-w-4xl"
          >
            {/* Overline */}
            <motion.span
              variants={itemVariants}
              className="mb-5 block font-accent text-[13px] uppercase tracking-[0.18em] text-terracotta"
            >
              Construction Services
            </motion.span>

            {/* Heading */}
            <motion.h1
              variants={itemVariants}
              className="font-display text-[clamp(3rem,7vw,7rem)] font-light leading-[0.9] text-obsidian whitespace-pre-line"
            >
              {"Let's Build\nSomething\nRok-Solid"}
            </motion.h1>

            {/* Body */}
            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-md font-body text-base leading-relaxed text-slate md:text-lg"
            >
              From foundation to finish — construction packages that deliver
              quality, transparency, and a 10-year warranty on every home we build.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4"
            >
              <Button variant="primary" href="#packages" className="w-full sm:w-auto">
                View Packages
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
          className="text-obsidian/30"
          aria-hidden="true"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </motion.svg>
      </motion.div>
    </section>
  )
}
