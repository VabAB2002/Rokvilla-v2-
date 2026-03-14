'use client'

import { useRef, useCallback } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { ScrollIndicatorDots } from '@/components/ui/ScrollIndicatorDots'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useTouchDevice } from '@/hooks/useTouchDevice'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import { makeStaggerContainerVariants, EASE_OUT_QUART } from '@/lib/motion'
import { DESIGN_THEMES } from '@/lib/constants/furnish'

/* ── Shared theme card inner content ── */
function ThemeCardContent({
  theme,
  reducedMotion,
  isTouch,
}: {
  readonly theme: (typeof DESIGN_THEMES)[number]
  readonly reducedMotion: boolean
  readonly isTouch: boolean
}) {
  return (
    <div className="relative aspect-[4/3] overflow-hidden">
      <motion.div
        whileHover={isTouch || reducedMotion ? undefined : { scale: 1.04 }}
        transition={{ duration: 0.6, ease: EASE_OUT_QUART }}
        className="h-full w-full"
      >
        <Image
          src={theme.image}
          alt={`${theme.title} interior design theme`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 85vw, 33vw"
        />
      </motion.div>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-obsidian/80 via-obsidian/40 to-transparent p-5 pt-16">
        <h3 className="font-display text-lg font-medium text-bone">
          {theme.title}
        </h3>
        <p className="mt-1 hidden truncate font-body text-xs leading-relaxed text-bone/60 md:block">
          {theme.description}
        </p>
      </div>
    </div>
  )
}

export function DesignThemesSection() {
  const reducedMotion = useReducedMotion()
  const isTouch = useTouchDevice()
  const containerVariants = makeStaggerContainerVariants(reducedMotion)
  const mobileScrollRef = useRef<HTMLDivElement>(null)
  const { activeIndex } = useScrollProgress(mobileScrollRef)

  const scrollToIndex = useCallback((index: number) => {
    const container = mobileScrollRef.current
    if (!container) return
    const child = container.children[index] as HTMLElement | undefined
    child?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }, [])

  return (
    <section
      id="design-themes"
      aria-labelledby="design-themes-heading"
      className="bg-white py-12 md:py-32 lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12 xl:px-16">
        <AnimatedSection className="text-center">
          <h2
            id="design-themes-heading"
            className="font-display text-3xl font-medium text-obsidian md:text-4xl lg:text-5xl"
          >
            Design Themes
          </h2>
          <p className="mt-3 font-body text-base tracking-wide text-slate md:text-lg">
            Explore curated interior styles tailored to your lifestyle
          </p>
        </AnimatedSection>
      </div>

      {/* Theme cards */}
      <AnimatedSection delay={0.15} className="mt-14">
        {/* Mobile: horizontal scroll carousel */}
        <div className="md:hidden">
          <div
            ref={mobileScrollRef}
            className="flex gap-2 overflow-x-auto snap-x snap-mandatory no-scrollbar px-[10vw] pb-2"
          >
            {DESIGN_THEMES.map((theme) => (
              <div
                key={theme.id}
                className="group relative w-[78vw] max-w-[340px] shrink-0 snap-center overflow-hidden rounded-[4px]"
              >
                <ThemeCardContent theme={theme} reducedMotion={reducedMotion} isTouch={isTouch} />
              </div>
            ))}
          </div>
          <ScrollIndicatorDots
            count={DESIGN_THEMES.length}
            activeIndex={activeIndex}
            onDotClick={scrollToIndex}
            className="mt-4"
          />
        </div>

        {/* Desktop: staggered grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mx-auto hidden max-w-7xl md:grid md:grid-cols-3 md:gap-4 md:px-12 xl:px-16"
        >
          {DESIGN_THEMES.map((theme) => (
            <motion.div
              key={theme.id}
              variants={{
                hidden: reducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0 },
              }}
              className="group relative overflow-hidden rounded-[4px]"
            >
              <ThemeCardContent theme={theme} reducedMotion={reducedMotion} isTouch={isTouch} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatedSection>
    </section>
  )
}
