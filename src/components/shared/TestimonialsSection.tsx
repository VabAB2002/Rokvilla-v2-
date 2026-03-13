'use client'

import { useRef, useCallback } from 'react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { ScrollFadeContainer } from '@/components/ui/ScrollFadeContainer'
import { ScrollIndicatorDots } from '@/components/ui/ScrollIndicatorDots'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import type { Testimonial } from '@/lib/constants/design'

/* ── Props ── */

interface TestimonialsSectionProps {
  readonly testimonials: ReadonlyArray<Testimonial>
  readonly title?: string
  readonly subtitle?: string
}

/* ── Star icon ── */
function StarIcon() {
  return (
    <svg
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
    <div className="w-[85vw] max-w-[360px] shrink-0 snap-start rounded-[4px] border border-limestone/60 bg-white p-6 shadow-card md:p-8">
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
      <div className="mt-4 flex gap-0.5">
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

/* ── Main section ── */
export function TestimonialsSection({
  testimonials,
  title,
  subtitle = 'What our clients say about working with us',
}: TestimonialsSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const { activeIndex } = useScrollProgress(scrollRef)

  const scrollToIndex = useCallback((index: number) => {
    const container = scrollRef.current
    if (!container) return
    const child = container.children[index] as HTMLElement | undefined
    child?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
  }, [])

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="bg-white py-12 md:py-32 lg:py-36"
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

      {/* Horizontal scroll carousel */}
      <AnimatedSection delay={0.15} className="mt-14">
        <div className="overflow-hidden">
          <ScrollFadeContainer
            scrollRef={scrollRef}
            scrollClassName="flex gap-4 snap-x snap-mandatory overflow-x-auto no-scrollbar px-6 pb-4 md:gap-6 md:px-12 xl:px-16"
            role="region"
            ariaLabel="Client testimonials"
          >
            {testimonials.map((t) => (
              <TestimonialCard key={t.id} testimonial={t} />
            ))}
          </ScrollFadeContainer>
        </div>
        <ScrollIndicatorDots
          count={testimonials.length}
          activeIndex={activeIndex}
          onDotClick={scrollToIndex}
          className="mt-4 md:hidden"
        />
      </AnimatedSection>
    </section>
  )
}
