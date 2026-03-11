'use client'

import { motion } from 'framer-motion'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { makeStaggerContainerVariants, EASE_OUT_EXPO } from '@/lib/motion'
import { KEY_FEATURES } from '@/lib/constants/furnish'

/** Split 6 features into 2 rows of 3 for the desktop grid */
const ROW_1 = KEY_FEATURES.slice(0, 3)
const ROW_2 = KEY_FEATURES.slice(3, 6)

/** Zero-padded step number (01, 02, …) */
function stepLabel(index: number): string {
  return String(index + 1).padStart(2, '0')
}

/* ── Feature card ── */

function FeatureCard({
  feature,
  index,
  isLast,
}: {
  readonly feature: (typeof KEY_FEATURES)[number]
  readonly index: number
  readonly isLast: boolean
}) {
  return (
    <div className="group flex flex-col items-center text-center">
      {/* Icon in tinted circle */}
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-terracotta/[0.06] ring-1 ring-terracotta/10 transition-transform duration-300 group-hover:scale-105">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-8 w-8 text-terracotta"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d={feature.icon} />
        </svg>
      </div>

      {/* Numbered circle — connector line runs through this */}
      <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-terracotta shadow-sm">
        <span className="font-display text-lg font-medium text-white">
          {stepLabel(index)}
        </span>
      </div>

      {/* Vertical dashed connector — mobile only */}
      {!isLast && (
        <div
          className="my-2 h-10 border-l-2 border-dashed border-limestone md:hidden"
          aria-hidden="true"
        />
      )}

      {/* Title */}
      <h3 className="mt-5 max-w-xs font-display text-lg font-medium leading-snug text-obsidian md:text-xl">
        {feature.title}
      </h3>

      {/* Description */}
      <p className="mt-2 max-w-xs font-body text-sm leading-relaxed text-slate">
        {feature.description}
      </p>
    </div>
  )
}

/* ── Row of 3 features with horizontal connector ── */

function FeatureRow({
  features,
  startIndex,
  reduced,
}: {
  readonly features: ReadonlyArray<(typeof KEY_FEATURES)[number]>
  readonly startIndex: number
  readonly reduced: boolean
}) {
  const containerVariants = makeStaggerContainerVariants(reduced)

  const itemVariants = {
    hidden: reduced ? { opacity: 0 } : { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduced ? 0.15 : 0.6, ease: EASE_OUT_EXPO },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className="relative grid gap-16 md:grid-cols-3 md:gap-8"
    >
      {/* Horizontal dashed connector — desktop only
          icon h-20 (80px) + mb-6 (24px) + half h-14 (28px) = 132px */}
      <div
        className="pointer-events-none absolute left-[16.67%] right-[16.67%] top-[132px] hidden border-t-2 border-dashed border-limestone md:block"
        aria-hidden="true"
      />

      {features.map((feature, i) => (
        <motion.div key={feature.id} variants={itemVariants}>
          <FeatureCard
            feature={feature}
            index={startIndex + i}
            isLast={i === features.length - 1}
          />
        </motion.div>
      ))}
    </motion.div>
  )
}

/* ── Section ── */

export function KeyFeaturesSection() {
  const reduced = useReducedMotion()

  return (
    <section
      aria-labelledby="furnish-key-features-heading"
      className="bg-white py-24 md:py-32 lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12 xl:px-16">
        {/* Heading */}
        <AnimatedSection className="text-center">
          <h2
            id="furnish-key-features-heading"
            className="font-display text-3xl font-medium text-obsidian md:text-4xl lg:text-5xl"
          >
            Key Features
          </h2>
          <p className="mt-3 font-body text-base tracking-wide text-slate md:text-lg">
            Why families across Karnataka trust RokVilla with their homes
          </p>
        </AnimatedSection>

        {/* Row 1: Features 01–03 */}
        <div className="mt-16">
          <FeatureRow features={ROW_1} startIndex={0} reduced={reduced} />
        </div>

        {/* Inter-row connector — mobile only */}
        <div className="flex justify-center py-4 md:hidden" aria-hidden="true">
          <div className="h-10 border-l-2 border-dashed border-limestone" />
        </div>

        {/* Row 2: Features 04–06 */}
        <div className="mt-4 md:mt-20">
          <FeatureRow features={ROW_2} startIndex={3} reduced={reduced} />
        </div>
      </div>
    </section>
  )
}
