'use client'

import { motion } from 'framer-motion'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { LocationCard } from '@/components/ui/LocationCard'
import { LOCATIONS } from '@/lib/constants/locations'
import { staggerContainerVariants, fadeUpVariants, TRANSITION_SMOOTH } from '@/lib/motion'

export function LocationsSection() {
  return (
    <section id="locations" aria-labelledby="locations-heading" className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Section header */}
        <AnimatedSection>
          <span className="font-accent text-[13px] uppercase tracking-[0.18em] text-terracotta">
            Locations
          </span>
          <h2 id="locations-heading" className="mt-4 font-display text-4xl font-medium text-obsidian md:text-5xl">
            Where We Build
          </h2>
        </AnimatedSection>

        {/* Location cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainerVariants}
          className="mt-16 grid gap-8 md:grid-cols-3"
        >
          {LOCATIONS.map((location, i) => (
            <motion.div
              key={location.id}
              variants={fadeUpVariants}
              transition={{ ...TRANSITION_SMOOTH, delay: i * 0.12 }}
            >
              <LocationCard location={location} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
