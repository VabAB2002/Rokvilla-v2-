'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { EASE_OUT_EXPO } from '@/lib/motion'
import { DESIGN_STEPS } from '@/lib/constants/design'

/* ── Timeline dot with single pulse ── */
function TimelineDot({
  inView,
  reduced,
}: {
  readonly inView: boolean
  readonly reduced: boolean
}) {
  return (
    <span className="relative flex h-3 w-3 items-center justify-center">
      {/* Pulse ring — fires once when dot enters view */}
      {inView && !reduced && (
        <motion.span
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="absolute inset-0 rounded-full bg-terracotta/30"
          aria-hidden="true"
        />
      )}
      {/* Dot */}
      <motion.span
        initial={reduced ? undefined : { scale: 0 }}
        animate={inView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
        className="relative h-3 w-3 rounded-full border-2 border-terracotta bg-white"
      />
    </span>
  )
}

/* ── Single step row ── */
function StepItem({
  step,
  index,
  reduced,
}: {
  readonly step: (typeof DESIGN_STEPS)[number]
  readonly index: number
  readonly reduced: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const isLeft = index % 2 === 0

  const content = (
    <motion.a
      href={step.href}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: EASE_OUT_EXPO, delay: 0.15 }}
      className="group block"
    >
      <span className="font-display text-[3.5rem] font-extralight leading-none tracking-tight text-limestone/60 md:text-[5rem]">
        {step.number}
      </span>
      <h3 className="mt-1 font-display text-lg font-medium text-obsidian transition-colors duration-200 group-hover:text-terracotta md:text-xl">
        {step.title}
        <span
          className="ml-2 inline-block text-terracotta/0 transition-all duration-200 group-hover:translate-x-1 group-hover:text-terracotta/70"
          aria-hidden="true"
        >
          &rarr;
        </span>
      </h3>
      <p
        className={[
          'mt-2 max-w-[300px] font-body text-sm leading-relaxed text-slate',
          isLeft ? 'md:ml-auto' : '',
        ].join(' ')}
      >
        {step.description}
      </p>
    </motion.a>
  )

  return (
    <div ref={ref} className="relative">
      {/* Dot — sits on the vertical line */}
      <div
        className="absolute left-[6px] top-3 z-10 md:left-1/2 md:-translate-x-1/2"
        aria-hidden="true"
      >
        <TimelineDot inView={isInView} reduced={reduced} />
      </div>

      {/* Horizontal connector — desktop only (callout line from dot to content) */}
      <div
        className={[
          'pointer-events-none absolute top-[17px] hidden h-px bg-limestone/30 md:block',
          isLeft
            ? 'right-1/2 mr-[6px] w-[calc(2rem-6px)]'
            : 'left-1/2 ml-[6px] w-[calc(2rem-6px)]',
        ].join(' ')}
        aria-hidden="true"
      />

      {/* Content — mobile: always right; desktop: alternates */}
      <div
        className={[
          'pl-10',
          'md:pl-0 md:w-[calc(50%-2rem)]',
          isLeft ? 'md:text-right' : 'md:ml-auto',
        ].join(' ')}
      >
        {content}
      </div>
    </div>
  )
}

/* ── Main section ── */
export function ProcessSection() {
  const reducedMotion = useReducedMotion()
  const timelineRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 0.75', 'end 0.5'],
  })

  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="bg-white py-24 md:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12 xl:px-16">
        {/* Header */}
        <AnimatedSection className="text-center">
          <h2
            id="process-heading"
            className="font-accent text-[15px] uppercase tracking-[0.2em] text-terracotta md:text-base"
          >
            How Does This Work?
          </h2>
          <p className="mt-3 font-body text-base tracking-wide text-slate md:text-lg">
            Three simple steps to your dream design
          </p>
        </AnimatedSection>

        {/* Timeline */}
        <div ref={timelineRef} className="relative mt-16 md:mt-24">
          {/* Vertical line — left on mobile, centered on desktop */}
          <div
            className="absolute left-3 top-0 bottom-0 w-px bg-limestone/30 md:left-1/2"
            aria-hidden="true"
          >
            <motion.div
              style={{
                scaleY: reducedMotion ? 1 : lineScaleY,
                transformOrigin: 'top',
              }}
              className="h-full w-full bg-terracotta/50"
            />
          </div>

          {/* Steps */}
          <div className="space-y-16 md:space-y-28">
            {DESIGN_STEPS.map((step, i) => (
              <StepItem
                key={step.number}
                step={step}
                index={i}
                reduced={reducedMotion}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
