'use client'

import { useRef } from 'react'
import * as m from 'framer-motion/m'
import {
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from 'framer-motion'
import Image from 'next/image'
import { TIMELINE_ENTRIES, type TimelineEntry } from '@/lib/constants/about'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/* ── TimelineRow ───────────────────────────────────────────────── */

interface TimelineRowProps {
  readonly entry: TimelineEntry
  readonly index: number
  readonly isLast: boolean
  readonly reducedMotion: boolean
}

function TimelineRow({ entry, index, isLast, reducedMotion }: TimelineRowProps) {
  const rowRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(rowRef, { once: true, margin: '-30% 0px' })

  const dotActive = reducedMotion ? true : isInView

  return (
    <div ref={rowRef} className="relative flex gap-6 md:gap-10 pb-16 md:pb-20 last:pb-0">
      {/* Left: dot + connecting line */}
      <div className="relative flex flex-col items-center w-12 md:w-16 shrink-0">
        <div
          className={[
            'h-3 w-3 rounded-full transition-colors duration-700 mt-1 shrink-0 z-10',
            dotActive
              ? 'bg-terracotta shadow-[0_0_8px_rgba(238,119,7,0.4)]'
              : 'bg-limestone/60',
          ].join(' ')}
        />
        {!isLast && (
          <div className="flex-1 w-px bg-limestone/30 mt-2" />
        )}
      </div>

      {/* Right: content */}
      <div className="flex-1 pt-0.5">
        <AnimatedSection delay={index * 0.1}>
          <span className="font-accent text-[11px] uppercase tracking-[0.16em] text-terracotta">
            {entry.year}
          </span>
          <h3 className="font-display text-xl md:text-2xl font-medium text-obsidian mt-1">
            {entry.title}
          </h3>
          <p className="font-body text-base leading-relaxed text-slate mt-2">
            {entry.description}
          </p>
          {entry.imageSrc && (
            <div className="mt-4 relative aspect-[16/9] w-full max-w-md overflow-hidden rounded-sm">
              <Image
                src={entry.imageSrc}
                alt={entry.imageAlt ?? ''}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 448px"
              />
            </div>
          )}
        </AnimatedSection>
      </div>
    </div>
  )
}

/* ── AboutTimeline ─────────────────────────────────────────────── */

export function AboutTimeline() {
  const reducedMotion = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  })

  const rawBeam = useTransform(scrollYProgress, [0, 1], [0, 1])
  const springBeam = useSpring(rawBeam, { stiffness: 500, damping: 90 })
  const beamProgress = reducedMotion ? rawBeam : springBeam

  return (
    <section
      className="bg-white py-12 md:py-32 lg:py-36"
      aria-labelledby="timeline-heading"
    >
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <AnimatedSection>
            <p className="font-accent text-[13px] uppercase tracking-[0.18em] text-terracotta">
              Our Journey
            </p>
            <h2
              id="timeline-heading"
              className="font-display text-3xl md:text-4xl lg:text-5xl font-medium text-obsidian mt-3"
            >
              Five Years of Building Karnataka
            </h2>
          </AnimatedSection>
        </div>

        {/* Timeline body */}
        <div ref={containerRef} className="relative pl-0 md:pl-2">
          {/* Tracing beam — desktop only, hidden when reduced motion */}
          {!reducedMotion && (
            <m.div
              style={{ scaleY: beamProgress }}
              className="absolute left-[23px] md:left-[31px] top-0 bottom-0 w-[2px] origin-top bg-gradient-to-b from-terracotta via-terracotta-deep to-transparent hidden md:block pointer-events-none"
              aria-hidden="true"
            />
          )}

          {/* Background track line — desktop only */}
          <div
            className="absolute left-[23px] md:left-[31px] top-0 bottom-0 w-px bg-limestone/30 hidden md:block pointer-events-none"
            aria-hidden="true"
          />

          {/* Entries */}
          {TIMELINE_ENTRIES.map((entry, index) => (
            <TimelineRow
              key={entry.id}
              entry={entry}
              index={index}
              isLast={index === TIMELINE_ENTRIES.length - 1}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
