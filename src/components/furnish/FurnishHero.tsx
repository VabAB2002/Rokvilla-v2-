'use client'

import Image from 'next/image'
import furnishHeroImage from '../../../public/images/furnish/furnish-hero-bg.png'
import * as m from 'framer-motion/m'
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
      className="relative overflow-hidden bg-white md:h-dvh md:min-h-[600px]"
    >
      {/* Background illustration — stacked on mobile, absolute on desktop */}
      <div className="relative h-[45vh] min-h-[260px] md:absolute md:inset-0 md:h-auto md:min-h-0">
        <Image
          src={furnishHeroImage}
          alt="Interior design sketch — living room with sofa, dining table, and shelving"
          fill
          priority
          quality={90}
          placeholder="blur"
          className="object-contain object-center md:object-[right_center]"
          sizes="(max-width: 768px) 100vw, 100vw"
        />
        {/* Soft fade at image bottom — mobile only */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white to-transparent md:hidden" />
      </div>

      {/* Content */}
      <div className="relative z-10 -mt-16 px-6 pb-12 md:mt-0 md:flex md:h-full md:items-center md:px-12 md:pb-0">
        <div className="mx-auto w-full max-w-7xl">
          <m.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-lg lg:max-w-xl"
          >
            <m.span
              variants={itemVariants}
              className="mb-5 block font-accent text-[13px] uppercase tracking-[0.18em] text-terracotta"
            >
              Furnishing Services
            </m.span>

            <m.h1
              variants={itemVariants}
              className="font-display text-[clamp(2.8rem,6vw,5.5rem)] font-light leading-[0.95] text-obsidian"
            >
              From Concept
              <br />
              to Comfort
            </m.h1>

            <m.p
              variants={itemVariants}
              className="mt-5 max-w-sm font-body text-base leading-relaxed text-slate md:text-lg"
            >
              Thoughtfully designed interiors that bring your vision to life.
            </m.p>

            <m.div
              variants={itemVariants}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4"
            >
              <Button variant="primary" href="#furnish-projects" className="w-full sm:w-auto">
                Browse Projects
              </Button>
              <Button variant="secondary" href="#consultation" className="w-full sm:w-auto">
                Book Consultation
              </Button>
            </m.div>
          </m.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reducedMotion ? 0 : 1.5, duration: reducedMotion ? 0.2 : 0.6 }}
        className="absolute inset-x-0 bottom-8 z-10 hidden justify-center md:flex"
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
      </m.div>
    </section>
  )
}
