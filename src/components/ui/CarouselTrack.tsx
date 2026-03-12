'use client'

import { useRef, useState, useEffect, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { makeCarouselTransition } from '@/lib/motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/* ── Chevron SVG ── */

function ChevronLeft() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ChevronRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* ── Types ── */

interface CarouselTrackProps {
  readonly currentIndex: number
  readonly visibleCount: number
  readonly totalCount: number
  readonly canGoPrev: boolean
  readonly canGoNext: boolean
  readonly goPrev: () => void
  readonly goNext: () => void
  readonly goTo: (i: number) => void
  readonly onDragEnd: (_e: MouseEvent | TouchEvent | PointerEvent, info: import('framer-motion').PanInfo) => void
  readonly dotCount: number
  readonly gap: number
  readonly children: ReactNode
  readonly ariaLabel?: string
}

/* ── Component ── */

export function CarouselTrack({
  currentIndex,
  visibleCount,
  totalCount,
  canGoPrev,
  canGoNext,
  goPrev,
  goNext,
  goTo,
  onDragEnd,
  dotCount,
  gap,
  children,
  ariaLabel = 'Content carousel',
}: CarouselTrackProps) {
  const reducedMotion = useReducedMotion()
  const viewportRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(0)

  // Measure container width
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

  const cardWidth = containerWidth > 0
    ? (containerWidth - (visibleCount - 1) * gap) / visibleCount
    : 0

  const trackOffset = -(currentIndex * (cardWidth + gap))
  const maxDrag = -((dotCount - 1) * (cardWidth + gap))

  const needsCarousel = dotCount > 1

  return (
    <div
      className="group relative"
      role="region"
      aria-label={ariaLabel}
    >
      {/* Clip area */}
      <div ref={viewportRef} className="overflow-hidden">
        <motion.div
          drag={needsCarousel ? 'x' : false}
          dragConstraints={{ left: maxDrag, right: 0 }}
          dragElastic={reducedMotion ? 0 : 0.08}
          onDragEnd={onDragEnd}
          animate={{ x: trackOffset }}
          transition={makeCarouselTransition(reducedMotion)}
          className={`flex ${needsCarousel ? 'cursor-grab active:cursor-grabbing' : ''}`}
          style={{ gap }}
        >
          {children}
        </motion.div>
      </div>

      {/* Prev arrow */}
      {needsCarousel && (
        <button
          type="button"
          onClick={goPrev}
          disabled={!canGoPrev}
          aria-label="Previous project"
          className={`absolute top-1/2 -translate-y-1/2 left-2 lg:-left-5 z-10
            flex h-12 w-12 items-center justify-center rounded-full
            border border-limestone bg-bone/90 backdrop-blur-sm
            transition-all duration-200
            lg:opacity-0 lg:group-hover:opacity-100
            ${canGoPrev
              ? 'hover:border-terracotta hover:text-terracotta text-obsidian'
              : 'opacity-30 cursor-not-allowed text-stone'
            }
            focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2`}
        >
          <ChevronLeft />
        </button>
      )}

      {/* Next arrow */}
      {needsCarousel && (
        <button
          type="button"
          onClick={goNext}
          disabled={!canGoNext}
          aria-label="Next project"
          className={`absolute top-1/2 -translate-y-1/2 right-2 lg:-right-5 z-10
            flex h-12 w-12 items-center justify-center rounded-full
            border border-limestone bg-bone/90 backdrop-blur-sm
            transition-all duration-200
            lg:opacity-0 lg:group-hover:opacity-100
            ${canGoNext
              ? 'hover:border-terracotta hover:text-terracotta text-obsidian'
              : 'opacity-30 cursor-not-allowed text-stone'
            }
            focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2`}
        >
          <ChevronRight />
        </button>
      )}

      {/* Dot indicators */}
      {dotCount > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2" role="tablist" aria-label="Carousel position">
          {Array.from({ length: dotCount }, (_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === currentIndex}
              aria-label={`Go to slide ${i + 1} of ${dotCount}`}
              onClick={() => goTo(i)}
              className="relative flex min-h-[44px] min-w-[44px] items-center justify-center p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:rounded-full"
            >
              <motion.span
                layout
                className={`block h-1.5 rounded-full transition-colors duration-200 ${
                  i === currentIndex ? 'bg-terracotta w-4' : 'bg-limestone w-1.5'
                }`}
                transition={reducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 400, damping: 30 }}
              />
            </button>
          ))}
        </div>
      )}

      {/* Live region for screen readers */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {`Showing projects ${currentIndex + 1} to ${Math.min(currentIndex + visibleCount, totalCount)} of ${totalCount}`}
      </div>
    </div>
  )
}
