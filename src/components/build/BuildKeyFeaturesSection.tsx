'use client'

import { motion } from 'framer-motion'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { makeStaggerContainerVariants } from '@/lib/motion'
import { BUILD_KEY_FEATURES } from '@/lib/constants/build'

export function BuildKeyFeaturesSection() {
  const reducedMotion = useReducedMotion()
  const containerVariants = makeStaggerContainerVariants(reducedMotion)

  return (
    <section
      aria-labelledby="build-key-features-heading"
      className="bg-white py-24 md:py-32 lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12 xl:px-16">
        <AnimatedSection className="text-center">
          <h2
            id="build-key-features-heading"
            className="font-display text-3xl font-medium text-obsidian md:text-4xl lg:text-5xl"
          >
            Key Features
          </h2>
          <p className="mt-3 font-body text-base tracking-wide text-slate md:text-lg">
            Why families across Karnataka trust RokVilla to build their homes
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.15} className="mt-14">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {BUILD_KEY_FEATURES.map((feature) => (
              <motion.div
                key={feature.id}
                variants={{
                  hidden: reducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="group rounded-[4px] border border-terracotta/20 bg-terracotta/10 p-6 transition-shadow duration-300 hover:shadow-card-hover md:p-8"
              >
                {/* Icon */}
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-terracotta/15">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-terracotta"
                    aria-hidden="true"
                  >
                    <path d={feature.icon} />
                  </svg>
                </div>

                {/* Title */}
                <h3 className="mt-4 font-display text-lg font-medium leading-snug text-obsidian">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="mt-2 font-body text-sm leading-relaxed text-slate">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  )
}
