'use client'

import { motion } from 'framer-motion'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { ServiceCard } from '@/components/ui/ServiceCard'
import { SERVICES } from '@/lib/constants/services'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { makeStaggerContainerVariants, makeFadeUpVariants, TRANSITION_SMOOTH } from '@/lib/motion'

export function ServicesSection() {
  const reducedMotion = useReducedMotion()
  const staggerVariants = makeStaggerContainerVariants(reducedMotion)
  const fadeVariants = makeFadeUpVariants(reducedMotion)

  return (
    <section id="services" aria-labelledby="services-heading" className="bg-white py-24 md:py-32 lg:py-36">
      {/* Section header — contained */}
      <div className="mx-auto max-w-7xl px-6 md:px-12 xl:px-16">
        <AnimatedSection className="text-center">
          <h2 id="services-heading" className="font-display text-3xl font-medium uppercase text-obsidian md:text-4xl lg:text-5xl">
            Services
          </h2>
          <p className="mt-3 font-body text-base tracking-wide text-slate md:text-lg">
            From Design to Completion
          </p>
        </AnimatedSection>
      </div>

      {/* Cards */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={staggerVariants}
        className="mx-auto mt-16 flex max-w-7xl flex-col gap-4 px-6 md:grid md:grid-cols-3 md:gap-4 md:px-12 xl:px-16"
      >
        {SERVICES.map((service, i) => (
          <motion.div
            key={service.id}
            variants={fadeVariants}
            transition={{ ...TRANSITION_SMOOTH, delay: reducedMotion ? 0 : i * 0.12 }}
          >
            <ServiceCard service={service} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
