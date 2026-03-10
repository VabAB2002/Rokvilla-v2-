'use client'

import { motion } from 'framer-motion'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { makeStaggerContainerVariants } from '@/lib/motion'
import { MATERIAL_FEATURES } from '@/lib/constants/furnish'

export function MaterialFeaturesSection() {
  const reducedMotion = useReducedMotion()
  const containerVariants = makeStaggerContainerVariants(reducedMotion)

  return (
    <section
      aria-labelledby="materials-heading"
      className="bg-parchment py-24 md:py-32 lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12 xl:px-16">
        <AnimatedSection className="text-center">
          <h2
            id="materials-heading"
            className="font-display text-3xl font-medium text-obsidian md:text-4xl lg:text-5xl"
          >
            Material Features
          </h2>
          <p className="mt-3 font-body text-base tracking-wide text-slate md:text-lg">
            Premium materials for lasting quality and durability
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.15} className="mt-14">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {MATERIAL_FEATURES.map((mat) => (
              <motion.div
                key={mat.id}
                variants={{
                  hidden: reducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="rounded-[4px] border border-limestone/60 bg-white p-6 text-center md:p-8"
              >
                {/* Icon */}
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-terracotta/10">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-terracotta"
                    aria-hidden="true"
                  >
                    <path d={mat.icon} />
                  </svg>
                </div>

                {/* Area label */}
                <h3 className="mt-5 font-display text-lg font-medium text-obsidian">
                  {mat.area}
                </h3>

                {/* Material name */}
                <p className="mt-1 font-body text-sm font-semibold text-terracotta">
                  {mat.material}
                </p>

                {/* Brand */}
                {mat.brand && (
                  <p className="mt-1 font-accent text-[11px] uppercase tracking-[0.12em] text-stone">
                    from {mat.brand}
                  </p>
                )}

                {/* Description */}
                <p className="mt-3 font-body text-xs leading-relaxed text-slate">
                  {mat.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  )
}
