'use client'

import { useRef, useCallback, useState, useEffect } from 'react'
import Image from 'next/image'
import * as m from 'framer-motion/m'
import { AnimatePresence } from 'framer-motion'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { ScrollIndicatorDots } from '@/components/ui/ScrollIndicatorDots'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useTouchDevice } from '@/hooks/useTouchDevice'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import { makeStaggerContainerVariants, EASE_OUT_QUART } from '@/lib/motion'
import { DESIGN_THEMES } from '@/lib/constants/furnish'
import { X } from 'lucide-react'

/* ── Lightbox overlay ── */

function ThemeLightbox({
  theme,
  onClose,
  reducedMotion,
}: {
  readonly theme: (typeof DESIGN_THEMES)[number]
  readonly onClose: () => void
  readonly reducedMotion: boolean
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reducedMotion ? 0.1 : 0.3 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-obsidian/90 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${theme.title} design style`}
    >
      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
        aria-label="Close"
      >
        <X size={20} />
      </button>

      {/* Expanded card */}
      <m.div
        layoutId={`theme-card-${theme.id}`}
        className="relative mx-4 w-full max-w-3xl overflow-hidden rounded-xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        transition={{ duration: reducedMotion ? 0.15 : 0.5, ease: EASE_OUT_QUART }}
      >
        <div className="relative aspect-[16/10]">
          <Image
            src={theme.image}
            alt={`${theme.title} interior design style`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 95vw, 768px"
            priority
          />
        </div>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-obsidian/90 via-obsidian/50 to-transparent px-6 pb-6 pt-24">
          <h3 className="font-display text-xl font-medium text-bone md:text-2xl">
            {theme.title}
          </h3>
        </div>
      </m.div>
    </m.div>
  )
}

/* ── Shared theme card inner content ── */

function ThemeCardContent({
  theme,
  reducedMotion,
  isTouch,
  onClick,
}: {
  readonly theme: (typeof DESIGN_THEMES)[number]
  readonly reducedMotion: boolean
  readonly isTouch: boolean
  readonly onClick: () => void
}) {
  return (
    <m.div
      layoutId={`theme-card-${theme.id}`}
      className="relative aspect-[4/3] cursor-pointer overflow-hidden"
      onClick={onClick}
      transition={{ duration: reducedMotion ? 0.15 : 0.5, ease: EASE_OUT_QUART }}
    >
      <m.div
        whileHover={isTouch || reducedMotion ? undefined : { scale: 1.04 }}
        transition={{ duration: 0.6, ease: EASE_OUT_QUART }}
        className="h-full w-full"
      >
        <Image
          src={theme.image}
          alt={`${theme.title} interior design style`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 85vw, 33vw"
        />
      </m.div>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-obsidian/90 via-obsidian/50 to-transparent px-4 pb-4 pt-20 md:px-5 md:pb-5 md:pt-24">
        <h3 className="font-display text-base font-medium text-bone md:text-lg">
          {theme.title}
        </h3>
      </div>
    </m.div>
  )
}

export function DesignThemesSection() {
  const reducedMotion = useReducedMotion()
  const isTouch = useTouchDevice()
  const containerVariants = makeStaggerContainerVariants(reducedMotion)
  const mobileScrollRef = useRef<HTMLDivElement>(null)
  const { activeIndex } = useScrollProgress(mobileScrollRef)
  const [selectedTheme, setSelectedTheme] = useState<(typeof DESIGN_THEMES)[number] | null>(null)

  const scrollToIndex = useCallback((index: number) => {
    const container = mobileScrollRef.current
    if (!container) return
    const child = container.children[index] as HTMLElement | undefined
    child?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }, [])

  const closeLightbox = useCallback(() => setSelectedTheme(null), [])

  return (
    <>
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
              Design Styles
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
                  <ThemeCardContent
                    theme={theme}
                    reducedMotion={reducedMotion}
                    isTouch={isTouch}
                    onClick={() => setSelectedTheme(theme)}
                  />
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
          <m.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="mx-auto hidden max-w-7xl md:grid md:grid-cols-3 md:gap-4 md:px-12 xl:px-16"
          >
            {DESIGN_THEMES.map((theme) => (
              <m.div
                key={theme.id}
                variants={{
                  hidden: reducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="group relative overflow-hidden rounded-[4px]"
              >
                <ThemeCardContent
                  theme={theme}
                  reducedMotion={reducedMotion}
                  isTouch={isTouch}
                  onClick={() => setSelectedTheme(theme)}
                />
              </m.div>
            ))}
          </m.div>
        </AnimatedSection>
      </section>

      {/* Lightbox overlay — rendered outside section for proper z-index stacking */}
      <AnimatePresence>
        {selectedTheme && (
          <ThemeLightbox
            key={selectedTheme.id}
            theme={selectedTheme}
            onClose={closeLightbox}
            reducedMotion={reducedMotion}
          />
        )}
      </AnimatePresence>
    </>
  )
}
