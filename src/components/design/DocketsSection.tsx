'use client'

import { motion } from 'framer-motion'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Button } from '@/components/ui/Button'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { makeFadeUpVariants, makeStaggerContainerVariants, TRANSITION_SMOOTH } from '@/lib/motion'
import { DESIGN_DOCKETS } from '@/lib/constants/design'

export function DocketsSection() {
  const reducedMotion = useReducedMotion()
  const staggerVariants = makeStaggerContainerVariants(reducedMotion)
  const fadeVariants = makeFadeUpVariants(reducedMotion)

  return (
    <section
      id="dockets"
      aria-labelledby="dockets-heading"
      className="bg-parchment py-24 md:py-32 lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12 xl:px-16">
        {/* Header */}
        <AnimatedSection className="text-center">
          <h2
            id="dockets-heading"
            className="font-display text-2xl font-medium uppercase text-obsidian md:text-3xl lg:text-4xl"
          >
            In Need of Architectural / Construction Drawings?
          </h2>
          <p className="mt-3 font-body text-base tracking-wide text-slate md:text-lg">
            Check Out Our Dockets &amp; Pricing
          </p>
        </AnimatedSection>

        {/* Tier cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerVariants}
          className="mt-14 grid gap-6 md:grid-cols-3 md:gap-8"
        >
          {DESIGN_DOCKETS.map((tier, i) => (
            <motion.div
              key={tier.id}
              variants={fadeVariants}
              transition={{
                ...TRANSITION_SMOOTH,
                delay: reducedMotion ? 0 : i * 0.12,
              }}
              className={`relative flex flex-col rounded-[4px] border bg-white p-8 shadow-card transition-shadow duration-300 hover:shadow-card-hover ${
                tier.highlighted
                  ? 'border-terracotta'
                  : 'border-limestone/60'
              }`}
            >
              {/* Highlighted badge */}
              {tier.highlighted && (
                <span className="absolute -top-3 left-8 rounded-[2px] bg-terracotta px-3 py-1 font-body text-[11px] font-medium uppercase tracking-[0.1em] text-bone">
                  Most Popular
                </span>
              )}

              {/* Tier name */}
              <h3 className="font-display text-xl font-medium text-obsidian md:text-2xl">
                {tier.name}
              </h3>
              <p className="mt-1 font-body text-sm text-slate">
                {tier.tagline}
              </p>

              {/* Inclusions */}
              <ul className="mt-6 flex-1 space-y-3">
                {tier.inclusions.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mt-0.5 shrink-0 text-terracotta"
                      aria-hidden="true"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    <span className="font-body text-sm text-slate">{item}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="mt-8">
                <Button
                  variant={tier.highlighted ? 'primary' : 'secondary'}
                  href="#consultation"
                  fullWidth
                >
                  Enquire Now
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
