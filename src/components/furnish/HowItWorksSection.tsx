'use client'

import { motion } from 'framer-motion'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { makeStaggerContainerVariants } from '@/lib/motion'
import { FURNISH_STEPS } from '@/lib/constants/furnish'

export function HowItWorksSection() {
  const reducedMotion = useReducedMotion()
  const containerVariants = makeStaggerContainerVariants(reducedMotion)

  return (
    <section
      aria-labelledby="how-it-works-heading"
      className="bg-white py-24 md:py-32 lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12 xl:px-16">
        {/* Header */}
        <AnimatedSection className="text-center">
          <h2
            id="how-it-works-heading"
            className="font-display text-3xl font-medium text-obsidian md:text-4xl lg:text-5xl"
          >
            How Does This Work?
          </h2>
        </AnimatedSection>

        {/* Steps */}
        <AnimatedSection delay={0.15} className="mt-16 md:mt-20">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="relative grid gap-12 md:grid-cols-3 md:gap-8"
          >
            {/* Connecting line — desktop only */}
            <div
              className="pointer-events-none absolute left-[16.67%] right-[16.67%] top-10 hidden h-px bg-limestone md:block"
              aria-hidden="true"
            />

            {FURNISH_STEPS.map((step) => (
              <motion.div
                key={step.number}
                variants={{
                  hidden: reducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="relative flex flex-col items-center text-center"
              >
                {/* Number circle */}
                <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-terracotta bg-white">
                  <span className="font-display text-2xl font-medium text-terracotta">
                    {step.number}
                  </span>
                </div>

                {/* Title */}
                <h3 className="mt-6 font-display text-xl font-medium text-obsidian md:text-2xl">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="mt-3 max-w-xs font-body text-sm leading-relaxed text-slate">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  )
}
