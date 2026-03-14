'use client'

import { useMemo, useRef, useEffect, useCallback } from 'react'
import {
  useMotionValue,
  animate,
  type PanInfo,
  type AnimationPlaybackControls,
} from 'framer-motion'
import * as m from 'framer-motion/m'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { useInView } from '@/hooks/useInView'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import type { Testimonial } from '@/lib/constants/design'

/* ── Props ── */

interface TestimonialsSectionProps {
  readonly testimonials: ReadonlyArray<Testimonial>
  readonly title?: string
  readonly subtitle?: string
}

/* ── Constants ── */

const ROW_1_DURATION = 40
const ROW_2_DURATION = 45
const DRAG_ELASTIC = 0.08

/* ── Helpers ── */

/** Floor-based modulo that always returns a value in [0, m). */
function floorMod(n: number, m: number): number {
  return ((n % m) + m) % m
}

/* ── Star icon ── */

function StarIcon() {
  return (
    <svg
      aria-hidden="true"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="text-brass"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}

/* ── Testimonial card ── */

function TestimonialCard({
  testimonial,
}: {
  readonly testimonial: Testimonial
}) {
  return (
    <div className="w-[300px] shrink-0 rounded-[4px] border border-limestone/60 bg-white p-6 shadow-card select-none md:w-[340px] md:p-8">
      {/* Avatar + meta */}
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-limestone/40">
          <span className="font-accent text-sm tracking-wider text-slate">
            {testimonial.initials}
          </span>
        </div>
        <div>
          <p className="font-body text-sm font-medium text-obsidian">
            {testimonial.name}
          </p>
          <p className="font-body text-xs text-stone">
            {testimonial.projectType} &middot; {testimonial.location}
          </p>
        </div>
      </div>

      {/* Stars */}
      <div
        className="mt-4 flex gap-0.5"
        role="img"
        aria-label={`${testimonial.rating} out of 5 stars`}
      >
        {Array.from({ length: testimonial.rating }, (_, i) => (
          <StarIcon key={i} />
        ))}
      </div>

      {/* Quote */}
      <blockquote className="mt-4 font-display text-base italic leading-relaxed text-slate md:text-lg">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>
    </div>
  )
}

/* ── Edge mask ── */

function EdgeMask({ side }: { readonly side: 'left' | 'right' }) {
  const gradient =
    side === 'left'
      ? 'linear-gradient(to right, var(--color-parchment), transparent)'
      : 'linear-gradient(to left, var(--color-parchment), transparent)'

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute top-0 z-10 h-full w-16 md:w-40"
      style={{
        [side]: 0,
        background: gradient,
      }}
    />
  )
}

/* ── useMarqueeRow hook ── */

function useMarqueeRow(
  direction: 'left' | 'right',
  duration: number,
  inView: boolean,
  reducedMotion: boolean,
) {
  const trackRef = useRef<HTMLDivElement>(null)
  const trackSetWidth = useRef(0)
  const x = useMotionValue(0)
  const controlsRef = useRef<AnimationPlaybackControls | null>(null)
  const isDragging = useRef(false)
  const inViewRef = useRef(inView)
  const reducedRef = useRef(reducedMotion)

  // Keep refs in sync with latest props
  inViewRef.current = inView
  reducedRef.current = reducedMotion

  // Measure one set width (track has 3 copies)
  useEffect(() => {
    const el = trackRef.current
    if (!el) return

    const measure = () => {
      const w = el.scrollWidth / 3
      const prev = trackSetWidth.current
      trackSetWidth.current = w

      // Restart animation if width changed and we're visible
      if (w > 0 && w !== prev && inViewRef.current && !reducedRef.current && !isDragging.current) {
        stopLoop()
        startLoop()
      }
    }

    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const stopLoop = useCallback(() => {
    controlsRef.current?.stop()
    controlsRef.current = null
  }, [])

  const startLoop = useCallback(() => {
    const w = trackSetWidth.current
    if (w === 0 || reducedRef.current) return

    const current = x.get()
    // Normalize into [-w, 0) using floor-based modulo
    const normalized = -(floorMod(-current, w))

    if (direction === 'left') {
      x.set(normalized)
      controlsRef.current = animate(x, normalized - w, {
        duration,
        ease: 'linear',
        repeat: Infinity,
        repeatType: 'loop',
      })
    } else {
      x.set(normalized)
      controlsRef.current = animate(x, normalized + w, {
        duration,
        ease: 'linear',
        repeat: Infinity,
        repeatType: 'loop',
      })
    }
  }, [x, direction, duration])

  // React to viewport visibility
  useEffect(() => {
    if (!inView || reducedMotion || isDragging.current) {
      stopLoop()
      return
    }
    startLoop()
    return stopLoop
  }, [inView, reducedMotion, startLoop, stopLoop])

  // Drag handlers
  const onDragStart = useCallback(() => {
    isDragging.current = true
    stopLoop()
  }, [stopLoop])

  const onDragEnd = useCallback(
    (_e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      isDragging.current = false

      const velocity = info.velocity.x
      const current = x.get()
      const w = trackSetWidth.current

      // Clamp momentum target to ±2 set widths to prevent extreme overshoot
      const maxOffset = w > 0 ? w * 2 : 1000
      const rawTarget = current + velocity * 0.15
      const target = Math.max(current - maxOffset, Math.min(current + maxOffset, rawTarget))

      controlsRef.current = animate(x, target, {
        type: 'spring',
        stiffness: 400,
        damping: 40,
        velocity,
        onComplete: () => {
          if (inViewRef.current && !reducedRef.current) {
            startLoop()
          }
        },
      })
    },
    [x, startLoop],
  )

  return { trackRef, x, onDragStart, onDragEnd }
}

/* ── MarqueeRow ── */

function MarqueeRow({
  items,
  direction,
  duration,
  inView,
  reducedMotion,
}: {
  readonly items: ReadonlyArray<Testimonial>
  readonly direction: 'left' | 'right'
  readonly duration: number
  readonly inView: boolean
  readonly reducedMotion: boolean
}) {
  const tripled = useMemo(
    () => [...items, ...items, ...items],
    [items],
  )

  const { trackRef, x, onDragStart, onDragEnd } = useMarqueeRow(
    direction,
    duration,
    inView,
    reducedMotion,
  )

  if (reducedMotion) {
    return (
      <div className="flex gap-5 overflow-x-auto px-6 pb-4 no-scrollbar md:gap-6 md:px-12">
        {items.map((t) => (
          <TestimonialCard key={t.id} testimonial={t} />
        ))}
      </div>
    )
  }

  return (
    <m.div
      ref={trackRef}
      style={{ x }}
      drag="x"
      dragElastic={DRAG_ELASTIC}
      dragMomentum={false}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      className="flex cursor-grab gap-5 active:cursor-grabbing md:gap-6"
    >
      {tripled.map((t, i) => (
        <TestimonialCard
          key={`${t.id}-${i % 3}`}
          testimonial={t}
        />
      ))}
    </m.div>
  )
}

/* ── Main section ── */

export function TestimonialsSection({
  testimonials,
  title,
  subtitle = 'What our clients say about working with us',
}: TestimonialsSectionProps) {
  const reducedMotion = useReducedMotion()
  const { ref: sectionRef, inView } = useInView({ rootMargin: '-20% 0px' })

  const { row1, row2 } = useMemo(() => {
    const mid = Math.ceil(testimonials.length / 2)
    return {
      row1: testimonials.slice(0, mid),
      row2: testimonials.slice(mid),
    }
  }, [testimonials])

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      aria-labelledby="testimonials-heading"
      className="bg-parchment py-12 md:py-32 lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12 xl:px-16">
        <AnimatedSection className="text-center">
          <h2
            id="testimonials-heading"
            className="font-display text-3xl font-medium text-obsidian md:text-4xl lg:text-5xl"
          >
            {title ?? (
              <>
                The Voices{' '}
                <span className="italic text-terracotta">Behind</span>
              </>
            )}
          </h2>
          <p className="mt-3 font-body text-base leading-relaxed tracking-wide text-slate md:text-lg">
            {subtitle}
          </p>
        </AnimatedSection>
      </div>

      {/* Screen-reader-only: full testimonial list (not tripled) */}
      <ul className="sr-only" role="list">
        {testimonials.map((t) => (
          <li key={t.id}>
            <p>
              {t.quote} — {t.name}, {t.projectType}, {t.location}
            </p>
          </li>
        ))}
      </ul>

      {/* Marquee rows */}
      <div aria-hidden="true" className="mt-14 flex flex-col gap-5 md:gap-6">
        {row1.length > 0 && (
          <div className="relative overflow-hidden">
            <EdgeMask side="left" />
            <EdgeMask side="right" />
            <MarqueeRow
              items={row1}
              direction="left"
              duration={ROW_1_DURATION}
              inView={inView}
              reducedMotion={reducedMotion}
            />
          </div>
        )}
        {row2.length > 0 && (
          <div className="relative overflow-hidden">
            <EdgeMask side="left" />
            <EdgeMask side="right" />
            <MarqueeRow
              items={row2}
              direction="right"
              duration={ROW_2_DURATION}
              inView={inView}
              reducedMotion={reducedMotion}
            />
          </div>
        )}
      </div>
    </section>
  )
}
