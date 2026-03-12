'use client'

import Image from 'next/image'
import furnishHeroImage from '../../../public/images/furnish/furnish-hero-bg.png'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { makeHeroContainerVariants, makeHeroItemVariants } from '@/lib/motion'

export function FurnishHero() {
  const reducedMotion = useReducedMotion()
  const containerVariants = makeHeroContainerVariants(reducedMotion)
  const itemVariants = makeHeroItemVariants(reducedMotion)

  return (
    <section
      aria-label="Furnish hero"
      className="relative h-dvh min-h-[600px] overflow-hidden bg-white"
    >
      {/* Background illustration — anchored right, full height */}
      <div className="absolute inset-0">
        <Image
          src={furnishHeroImage}
          alt="Interior design sketch — living room with sofa, dining table, and shelving"
          fill
          priority
          fetchPriority="high"
          quality={90}
          placeholder="blur"
          className="object-contain object-[center_bottom] md:object-[right_center]"
          sizes="100vw"
        />
      </div>

      {/* Text — left-aligned, vertically centered */}
      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-lg lg:max-w-xl"
          >
            <motion.span
              variants={itemVariants}
              className="mb-5 block font-accent text-[13px] uppercase tracking-[0.18em] text-terracotta"
            >
              Furnishing Services
            </motion.span>

            <motion.h1
              variants={itemVariants}
              className="font-display text-[clamp(2.8rem,6vw,5.5rem)] font-light leading-[0.95] text-obsidian"
            >
              From Concept
              <br />
              to Comfort
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-5 max-w-sm font-body text-base leading-relaxed text-slate md:text-lg"
            >
              Thoughtfully designed interiors that bring your vision to life.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4"
            >
              <Button variant="primary" href="#furnish-projects" className="w-full sm:w-auto">
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
          className={`${reducedMotion ? '' : 'animate-bounce-gentle'} text-slate/50`}
          aria-hidden="true"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </motion.div>
    </section>
  )
}
