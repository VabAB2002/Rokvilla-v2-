'use client'

import { motion } from 'framer-motion'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { ButtonDark } from '@/components/ui/Button'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { makeStaggerContainerVariants } from '@/lib/motion'
import { PLATFORM_RATINGS } from '@/lib/constants/build'

/* ── Star icon ── */

function StarIcon({ className }: { readonly className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}

/* ── Rating badge ── */

function RatingBadge({
  platform,
  rating,
  reviewCount,
}: {
  readonly platform: string
  readonly rating: string
  readonly reviewCount: string
}) {
  return (
    <div
      className="rounded-[4px] border border-white/10 bg-white/5 px-5 py-4 text-center backdrop-blur-sm"
      aria-label={`${platform}: ${rating} out of 5 stars, ${reviewCount}`}
    >
      <span className="block font-body text-[11px] font-medium uppercase tracking-[0.1em] text-stone">
        {platform}
      </span>
      <div className="mt-1.5 flex items-center justify-center gap-1.5">
        <StarIcon className="text-brass" />
        <span className="font-display text-2xl font-medium text-bone" aria-hidden="true">
          {rating}
        </span>
      </div>
      <span className="mt-1 block font-body text-[11px] text-stone/70" aria-hidden="true">
        {reviewCount}
      </span>
    </div>
  )
}

/* ── Main Section ── */

export function ConstructionCTASection() {
  const reducedMotion = useReducedMotion()
  const containerVariants = makeStaggerContainerVariants(reducedMotion)

  return (
    <section
      aria-labelledby="build-cta-heading"
      className="bg-obsidian py-12 md:py-32 lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12 xl:px-16">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
          {/* Left column — text */}
          <div className="flex-1">
            <AnimatedSection>
              <span className="mb-4 block font-accent text-[13px] uppercase tracking-[0.18em] text-terracotta md:text-[15px]">
                Build With Confidence
              </span>
              <h2
                id="build-cta-heading"
                className="font-display text-3xl font-medium text-bone md:text-4xl lg:text-5xl"
              >
                Hire the Best House Construction Service
              </h2>
              <p className="mt-4 max-w-lg font-body text-base leading-relaxed text-stone md:text-lg">
                Trusted by homeowners across Karnataka. See what platforms say about our work.
              </p>
              <div className="mt-8">
                <ButtonDark variant="primary" href="#consultation">
                  Start Your Project
                </ButtonDark>
              </div>
            </AnimatedSection>
          </div>

          {/* Right column — rating badges */}
          <div className="flex-1 lg:max-w-md">
            <AnimatedSection delay={0.15}>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                className="grid grid-cols-2 gap-4"
              >
                {PLATFORM_RATINGS.map((r) => (
                  <motion.div
                    key={r.id}
                    variants={{
                      hidden: reducedMotion
                        ? { opacity: 0 }
                        : { opacity: 0, y: 16 },
                      visible: { opacity: 1, y: 0 },
                    }}
                  >
                    <RatingBadge
                      platform={r.platform}
                      rating={r.rating}
                      reviewCount={r.reviewCount}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  )
}
