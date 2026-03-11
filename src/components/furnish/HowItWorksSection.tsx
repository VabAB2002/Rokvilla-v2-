'use client'

import { motion } from 'framer-motion'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { makeStaggerContainerVariants } from '@/lib/motion'
import { FURNISH_STEPS } from '@/lib/constants/furnish'
import { BrowseInteriorsScene } from './illustrations/BrowseInteriorsScene'
import { ChooseThemeScene } from './illustrations/ChooseThemeScene'
import { ConnectFurnishScene } from './illustrations/ConnectFurnishScene'

const SCENES: ReadonlyArray<React.ComponentType> = [
  BrowseInteriorsScene,
  ChooseThemeScene,
  ConnectFurnishScene,
]

export function HowItWorksSection() {
  const reduced = useReducedMotion()
  const containerVariants = makeStaggerContainerVariants(reduced)

  const itemVariants = {
    hidden: reduced ? { opacity: 0 } : { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section
      aria-labelledby="how-it-works-heading"
      className="bg-white py-24 md:py-32 lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12 xl:px-16">
        {/* Header */}
        <AnimatedSection className="text-center">
          <span className="mb-4 block font-accent text-[13px] uppercase tracking-[0.18em] text-terracotta md:text-[15px]">
            How It Works
          </span>
          <h2
            id="how-it-works-heading"
            className="font-display text-3xl font-medium text-obsidian md:text-4xl lg:text-5xl"
          >
            Three Steps to Your Dream Interior
          </h2>
        </AnimatedSection>

        {/* Steps grid */}
        <AnimatedSection delay={0.15} className="mt-16 md:mt-20">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="relative grid gap-16 md:grid-cols-3 md:gap-8"
          >
            {/* Horizontal dashed connector — desktop only */}
            <div
              className="pointer-events-none absolute left-[16.67%] right-[16.67%] top-[calc(120px+1.75rem)] hidden border-t-2 border-dashed border-limestone md:block"
              aria-hidden="true"
            />

            {FURNISH_STEPS.map((step, i) => {
              const Scene = SCENES[i]
              const isLast = i === FURNISH_STEPS.length - 1

              return (
                <motion.div
                  key={step.number}
                  variants={itemVariants}
                  className="relative flex flex-col items-center text-center"
                >
                  {/* Illustration */}
                  <div className="mb-6 w-full max-w-[240px]">
                    <Scene />
                  </div>

                  {/* Numbered node circle */}
                  <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-terracotta shadow-sm">
                    <span className="font-display text-lg font-medium text-white">
                      {step.number}
                    </span>
                  </div>

                  {/* Vertical dashed connector — mobile only */}
                  {!isLast && (
                    <div
                      className="my-2 h-10 border-l-2 border-dashed border-limestone md:hidden"
                      aria-hidden="true"
                    />
                  )}

                  {/* Title with link */}
                  <h3 className="mt-5 font-display text-xl font-medium text-obsidian md:text-2xl">
                    <a
                      href={step.href}
                      className="group inline-flex items-center gap-2 transition-colors duration-200 hover:text-terracotta"
                    >
                      {step.title}
                      <span
                        className="inline-block text-sm text-terracotta opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-70"
                        aria-hidden="true"
                      >
                        &rarr;
                      </span>
                    </a>
                  </h3>

                  {/* Description */}
                  <p className="mt-3 max-w-xs font-body text-sm leading-relaxed text-slate">
                    {step.description}
                  </p>
                </motion.div>
              )
            })}
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  )
}
