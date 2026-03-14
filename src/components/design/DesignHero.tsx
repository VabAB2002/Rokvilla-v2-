'use client'

import Image from 'next/image'
import designBlueprintImage from '../../../public/images/design/design-blueprint.jpg'
import * as m from 'framer-motion/m'
import { Button } from '@/components/ui/Button'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useIsLowPowerDevice } from '@/hooks/useIsLowPowerDevice'
import { makeHeroContainerVariants, makeHeroItemVariants } from '@/lib/motion'

export function DesignHero() {
  const reducedMotion = useReducedMotion()
  const isLowPower = useIsLowPowerDevice()
  const containerVariants = makeHeroContainerVariants(reducedMotion)
  const itemVariants = makeHeroItemVariants(reducedMotion)

  return (
    <section aria-label="Design hero" className="relative overflow-hidden bg-white md:h-dvh md:min-h-[600px]">
      {/* Blueprint image — stacked on mobile, absolute-right on desktop */}
      <div className="relative h-[45vh] min-h-[260px] md:absolute md:inset-y-0 md:-right-[10%] md:left-[40%] md:h-auto md:min-h-0">
        <Image
          src={designBlueprintImage}
          alt=""
          fill
          priority
          placeholder="blur"
          className="object-contain object-center md:object-right"
          sizes="(max-width: 768px) 100vw, 75vw"
        />
        {/* Soft fade at image bottom — mobile only */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white to-transparent md:hidden" />
      </div>

      {/* Gradient overlay for text readability — desktop only */}
      <div
        className="absolute inset-0 hidden md:block"
        style={{
          background:
            'linear-gradient(to right, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.75) 35%, rgba(255,255,255,0.2) 65%, rgba(255,255,255,0) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 -mt-16 px-6 pb-12 md:mt-0 md:flex md:h-full md:items-center md:px-12 md:pb-0">
        <div className="mx-auto w-full max-w-7xl">
          <m.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-2xl lg:max-w-3xl"
          >
            {/* Overline */}
            <m.span
              variants={itemVariants}
              className="mb-6 block font-accent text-[13px] uppercase tracking-[0.18em] text-brass md:text-[15px]"
            >
              Design Services
            </m.span>

            {/* Heading */}
            <m.h1
              variants={itemVariants}
              className="font-display text-[clamp(3rem,7vw,7rem)] font-light leading-[0.9] text-void whitespace-pre-line"
            >
              {"From Blueprint\nto Reality"}
            </m.h1>

            {/* Body */}
            <m.p
              variants={itemVariants}
              className="mt-6 max-w-md font-body text-base leading-relaxed text-graphite md:text-lg"
            >
              From concept sketches to construction-ready blueprints — architectural
              designs that balance aesthetics, function, and budget.
            </m.p>

            {/* CTAs */}
            <m.div
              variants={itemVariants}
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4"
            >
              <Button variant="primary" href="#design-projects" className="w-full sm:w-auto">
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
        transition={{ delay: reducedMotion ? 0 : 1.2, duration: reducedMotion ? 0.2 : 0.6 }}
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
          className={`${!reducedMotion && !isLowPower ? 'animate-bounce-gentle' : ''} text-stone`}
          aria-hidden="true"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </m.div>
    </section>
  )
}
