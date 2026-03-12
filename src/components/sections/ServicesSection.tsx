'use client'

import { useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { ServiceCard } from '@/components/ui/ServiceCard'
import { ScrollIndicatorDots } from '@/components/ui/ScrollIndicatorDots'
import { SERVICES } from '@/lib/constants/services'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import { makeStaggerContainerVariants, makeFadeUpVariants, TRANSITION_SMOOTH } from '@/lib/motion'

export function ServicesSection() {
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

      {/* Cards — flush edge-to-edge, no gaps */}
      <div className="mt-16">
        {/* Mobile: horizontal scroll carousel */}
        <div className="md:hidden">
          <div
            ref={mobileScrollRef}
            role="region"
            aria-label="Services"
            className="flex snap-x snap-mandatory overflow-x-auto no-scrollbar"
          >
            {SERVICES.map((service) => (
              <div key={service.id} className="w-[85vw] shrink-0 snap-start">
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
          <ScrollIndicatorDots
            count={SERVICES.length}
            activeIndex={activeIndex}
            onDotClick={scrollToIndex}
            className="mt-4"
          />
        </div>

        {/* Desktop: staggered grid — no gaps */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerVariants}
          className="hidden md:grid md:grid-cols-3 md:gap-4"
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
      </div>
    </section>
  )
}
