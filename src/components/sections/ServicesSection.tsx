'use client'

import { motion } from 'framer-motion'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { ServiceCard } from '@/components/ui/ServiceCard'
import { SERVICES } from '@/lib/constants/services'
import { staggerContainerVariants, fadeUpVariants, TRANSITION_SMOOTH } from '@/lib/motion'

export function ServicesSection() {
  return (
    <section id="services" aria-labelledby="services-heading" className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Section header */}
        <AnimatedSection className="text-center">
          <h2 id="services-heading" className="font-display text-4xl font-medium uppercase text-obsidian md:text-5xl">
            Services
          </h2>
          <p className="mt-3 font-body text-base tracking-wide text-slate md:text-lg">
            From Design to Completion
          </p>
        </AnimatedSection>

        {/* Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainerVariants}
          className="mt-16 grid gap-8 md:grid-cols-3"
        >
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.id}
              variants={fadeUpVariants}
              transition={{ ...TRANSITION_SMOOTH, delay: i * 0.12 }}
            >
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
