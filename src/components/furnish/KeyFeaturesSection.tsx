'use client'

import { motion } from 'framer-motion'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { makeStaggerContainerVariants, EASE_OUT_EXPO } from '@/lib/motion'
import { KEY_FEATURES } from '@/lib/constants/furnish'
import { InhouseTeamScene } from './illustrations/InhouseTeamScene'
import { FreeEstimationScene } from './illustrations/FreeEstimationScene'
import { VastuScene } from './illustrations/VastuScene'
import { FreeDrawingsScene } from './illustrations/FreeDrawingsScene'
import { DailyUpdatesScene } from './illustrations/DailyUpdatesScene'
import { WarrantyScene } from './illustrations/WarrantyScene'

const SCENES: ReadonlyArray<React.ComponentType> = [
  InhouseTeamScene,
  FreeEstimationScene,
  VastuScene,
  FreeDrawingsScene,
  DailyUpdatesScene,
  WarrantyScene,
]

/** Split 6 features into 2 rows of 3 for the desktop grid */
const ROW_1_FEATURES = KEY_FEATURES.slice(0, 3)
const ROW_2_FEATURES = KEY_FEATURES.slice(3, 6)
const ROW_1_SCENES = SCENES.slice(0, 3)
const ROW_2_SCENES = SCENES.slice(3, 6)

/* ── Row of 3 features ── */

function FeatureRow({
  features,
  scenes,
  reduced,
}: {
  readonly features: ReadonlyArray<(typeof KEY_FEATURES)[number]>
  readonly scenes: ReadonlyArray<React.ComponentType>
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
      className="grid grid-cols-2 gap-8 md:grid-cols-3"
    >
      {features.map((feature, i) => {
        const Scene = scenes[i]

        return (
          <motion.div
            key={feature.id}
            variants={itemVariants}
            className="flex flex-col items-center text-center"
          >
            {/* Illustration */}
            <div className="mb-6 w-full max-w-[200px]">
              <Scene />
            </div>

            {/* Title */}
            <h3 className="mt-2 max-w-xs font-display text-lg font-medium leading-snug text-obsidian md:text-xl">
              {feature.title}
            </h3>

            {/* Description */}
            <p className="mt-2 max-w-xs font-body text-sm leading-relaxed text-slate">
              {feature.description}
            </p>
          </motion.div>
        )
      })}
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

        {/* Row 1 */}
        <div className="mt-16">
          <FeatureRow features={ROW_1_FEATURES} scenes={ROW_1_SCENES} reduced={reduced} />
        </div>

        {/* Row 2 */}
        <div className="mt-8 md:mt-20">
          <FeatureRow features={ROW_2_FEATURES} scenes={ROW_2_SCENES} reduced={reduced} />
        </div>
      </div>
    </section>
  )
}
