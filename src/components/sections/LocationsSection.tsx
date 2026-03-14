'use client'

import * as m from 'framer-motion/m'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { LocationCard } from '@/components/ui/LocationCard'
import { LOCATIONS } from '@/lib/constants/locations'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { makeStaggerContainerVariants, makeFadeUpVariants, TRANSITION_SMOOTH } from '@/lib/motion'

export function LocationsSection() {
  const reducedMotion = useReducedMotion()
  const staggerVariants = makeStaggerContainerVariants(reducedMotion)
  const fadeVariants = makeFadeUpVariants(reducedMotion)

  return (
    <section id="locations" aria-labelledby="locations-heading" className="bg-white py-12 md:py-32 lg:py-36">
      {/* Section header — contained */}
      <div className="mx-auto max-w-7xl px-6 md:px-12 xl:px-16">
        <AnimatedSection className="text-center">
          <h2 id="locations-heading" className="font-display text-3xl font-medium uppercase text-obsidian md:text-4xl lg:text-5xl">
            Locations
          </h2>
          <p className="mt-3 font-body text-base tracking-wide text-slate md:text-lg">
            Where We Build
          </p>
        </AnimatedSection>
      </div>

      {/* Mobile cards — stacked column */}
      <m.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={staggerVariants}
        className="mx-auto mt-16 flex max-w-7xl flex-col gap-4 px-6 md:hidden"
      >
        {LOCATIONS.map((location, i) => (
          <m.div
            key={location.id}
            variants={fadeVariants}
            transition={{ ...TRANSITION_SMOOTH, delay: reducedMotion ? 0 : i * 0.12 }}
          >
            <LocationCard location={location} heightClass="h-56" />
          </m.div>
        ))}
      </m.div>

      {/* Desktop cards — 3-column grid */}
      <m.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={staggerVariants}
        className="mt-16 hidden md:grid md:grid-cols-3 md:gap-4 md:px-4"
      >
        {LOCATIONS.map((location, i) => (
          <m.div
            key={location.id}
            variants={fadeVariants}
            transition={{ ...TRANSITION_SMOOTH, delay: reducedMotion ? 0 : i * 0.12 }}
          >
            <LocationCard location={location} heightClass="h-80" />
          </m.div>
        ))}
      </m.div>
    </section>
  )
}
