'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { ScrollIndicatorDots } from '@/components/ui/ScrollIndicatorDots'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useCarousel } from '@/hooks/useCarousel'
import { makeStaggerContainerVariants, makeCarouselTransition, EASE_OUT_EXPO } from '@/lib/motion'
import { BUILD_KEY_FEATURES } from '@/lib/constants/build'
import { InhouseTeamBuildScene } from './illustrations/InhouseTeamBuildScene'
import { FreeEstimationBuildScene } from './illustrations/FreeEstimationBuildScene'
import { FreeDrawingsBuildScene } from './illustrations/FreeDrawingsBuildScene'
import { DailyUpdatesBuildScene } from './illustrations/DailyUpdatesBuildScene'
import { VastuBuildScene } from './illustrations/VastuBuildScene'
import { WarrantyBuildScene } from './illustrations/WarrantyBuildScene'

const SCENES: ReadonlyArray<React.ComponentType> = [
  InhouseTeamBuildScene,
  FreeEstimationBuildScene,
  VastuBuildScene,
  FreeDrawingsBuildScene,
  DailyUpdatesBuildScene,
  WarrantyBuildScene,
]

/** Split 6 features into 2 rows of 3 for the desktop grid */
const ROW_1_FEATURES = BUILD_KEY_FEATURES.slice(0, 3)
const ROW_2_FEATURES = BUILD_KEY_FEATURES.slice(3, 6)
const ROW_1_SCENES = SCENES.slice(0, 3)
const ROW_2_SCENES = SCENES.slice(3, 6)

/** Fraction of container width each card occupies (leaves peek gap) */
const CARD_WIDTH_RATIO = 0.84
const CARD_GAP = 16

/* ── Row of 3 features (desktop only) ── */

function FeatureRow({
  features,
  scenes,
  reduced,
}: {
  readonly features: ReadonlyArray<(typeof BUILD_KEY_FEATURES)[number]>
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
      className="grid grid-cols-3 gap-8"
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

/* ── Mobile overrides for long titles ── */

const MOBILE_TITLES: Readonly<Record<string, string>> = {
  'feat-inhouse': 'In-House Expert Team',
  'feat-free-drawings': 'Free Design & Drawings',
}

/* ── Mobile swipe carousel ── */

function MobileFeatureCarousel({ reduced }: { readonly reduced: boolean }) {
  const { currentIndex, goTo, onDragEnd, dotCount } = useCarousel({
    count: BUILD_KEY_FEATURES.length,
    visibleCount: 1,
  })

  const viewportRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(0)

  useEffect(() => {
    const el = viewportRef.current
    if (!el) return
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width)
      }
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const cardWidth = containerWidth > 0 ? containerWidth * CARD_WIDTH_RATIO : 0
  const trackOffset = -(currentIndex * (cardWidth + CARD_GAP))
  const maxDrag = -((BUILD_KEY_FEATURES.length - 1) * (cardWidth + CARD_GAP))

  return (
    <div className="mt-10 md:hidden" role="region" aria-label="Key features carousel">
      <div ref={viewportRef} className="overflow-hidden">
        <motion.div
          drag="x"
          dragConstraints={{ left: maxDrag, right: 0 }}
          dragElastic={reduced ? 0 : 0.08}
          onDragEnd={onDragEnd}
          animate={{ x: trackOffset }}
          transition={makeCarouselTransition(reduced)}
          className="flex cursor-grab active:cursor-grabbing"
          style={{ gap: CARD_GAP }}
        >
          {BUILD_KEY_FEATURES.map((feature, i) => {
            const Scene = SCENES[i]

            return (
              <div
                key={feature.id}
                className="shrink-0"
                style={{ width: cardWidth || `${CARD_WIDTH_RATIO * 100}%` }}
              >
                <div className="flex h-[320px] flex-col rounded-2xl border border-limestone/40 bg-white px-5 pb-6 pt-7 shadow-[0_2px_16px_rgba(0,0,0,0.06)]">
                  {/* Illustration — fixed height for consistency */}
                  <div className="mx-auto mb-4 flex h-[130px] w-full max-w-[160px] shrink-0 items-center justify-center">
                    <Scene />
                  </div>

                  {/* Title */}
                  <h3 className="line-clamp-2 font-display text-base font-medium leading-snug text-obsidian">
                    {MOBILE_TITLES[feature.id] ?? feature.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 line-clamp-3 font-body text-sm leading-relaxed text-slate">
                    {feature.description}
                  </p>
                </div>
              </div>
            )
          })}
        </motion.div>
      </div>

      {/* Dot indicators */}
      <ScrollIndicatorDots
        count={dotCount}
        activeIndex={currentIndex}
        onDotClick={goTo}
        className="mt-6"
      />

      {/* Screen reader live region */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {`Showing feature ${currentIndex + 1} of ${BUILD_KEY_FEATURES.length}`}
      </div>
    </div>
  )
}

/* ── Section ── */

export function BuildKeyFeaturesSection() {
  const reduced = useReducedMotion()

  return (
    <section
      aria-labelledby="build-key-features-heading"
      className="bg-white py-12 md:py-32 lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12 xl:px-16">
        {/* Heading */}
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

        {/* Mobile: swipeable carousel */}
        <MobileFeatureCarousel reduced={reduced} />

        {/* Desktop: 2×3 grid */}
        <div className="mt-16 hidden md:block">
          <FeatureRow features={ROW_1_FEATURES} scenes={ROW_1_SCENES} reduced={reduced} />
        </div>
        <div className="mt-20 hidden md:block">
          <FeatureRow features={ROW_2_FEATURES} scenes={ROW_2_SCENES} reduced={reduced} />
        </div>
      </div>
    </section>
  )
}
