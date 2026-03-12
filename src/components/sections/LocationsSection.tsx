'use client'

import { useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { LocationCard } from '@/components/ui/LocationCard'
import { ScrollIndicatorDots } from '@/components/ui/ScrollIndicatorDots'
import { LOCATIONS } from '@/lib/constants/locations'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import { makeStaggerContainerVariants, makeFadeUpVariants, TRANSITION_SMOOTH } from '@/lib/motion'

export function LocationsSection() {
  const reducedMotion = useReducedMotion()
  const staggerVariants = makeStaggerContainerVariants(reducedMotion)
  const fadeVariants = makeFadeUpVariants(reducedMotion)
  const mobileScrollRef = useRef<HTMLDivElement>(null)
  const { activeIndex } = useScrollProgress(mobileScrollRef)

  const scrollToIndex = useCallback((index: number) => {
    const container = mobileScrollRef.current
    if (!container) return
    const child = container.children[index] as HTMLElement | undefined
    child?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
  }, [])

  return (
    <section id="locations" aria-labelledby="locations-heading" className="bg-white py-24 md:py-32 lg:py-36">
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

      {/* Cards — edge-to-edge */}
      <div className="mt-16 px-3 md:px-4">
        {/* Mobile: horizontal scroll carousel */}
        <div className="md:hidden">
          <div
            ref={mobileScrollRef}
            role="region"
            aria-label="Locations"
            className="flex gap-3 snap-x snap-mandatory overflow-x-auto no-scrollbar pb-4"
          >
            {LOCATIONS.map((location) => (
              <div key={location.id} className="w-[85vw] max-w-[340px] shrink-0 snap-start">
                <LocationCard location={location} />
              </div>
            ))}
          </div>
          <ScrollIndicatorDots
            count={LOCATIONS.length}
            activeIndex={activeIndex}
            onDotClick={scrollToIndex}
            className="mt-2"
          />
        </div>

        {/* Desktop: staggered grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerVariants}
          className="hidden gap-3 md:grid md:grid-cols-3 md:gap-4"
        >
          {LOCATIONS.map((location, i) => (
            <motion.div
              key={location.id}
              variants={fadeVariants}
              transition={{ ...TRANSITION_SMOOTH, delay: reducedMotion ? 0 : i * 0.12 }}
            >
              <LocationCard location={location} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
