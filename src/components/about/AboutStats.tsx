'use client'

import * as m from 'framer-motion/m'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useInView } from '@/hooks/useInView'
import { useCountUp } from '@/hooks/useCountUp'
import { makeStaggerContainerVariants, makeFadeUpVariants, TRANSITION_SMOOTH } from '@/lib/motion'
import { ABOUT_STATS, type AboutStat } from '@/lib/constants/about'

/* ── Single stat card ── */

interface StatCardProps {
  readonly stat: AboutStat
  readonly index: number
  readonly inView: boolean
  readonly reducedMotion: boolean
}

function StatCard({ stat, index, inView, reducedMotion }: StatCardProps) {
  const count = useCountUp({
    target: stat.value,
    enabled: inView,
    reducedMotion,
  })

  return (
    <m.div
      variants={makeFadeUpVariants(reducedMotion)}
      transition={{ ...TRANSITION_SMOOTH, delay: reducedMotion ? 0 : index * 0.12 }}
      className="flex flex-col items-center text-center py-6 md:border-l md:border-limestone/30 md:first:border-l-0 md:py-0"
    >
      <span className="font-display text-4xl font-medium tabular-nums text-obsidian md:text-5xl lg:text-6xl">
        {count}
        {stat.suffix && <span className="text-terracotta">{stat.suffix}</span>}
      </span>
      <span className="mt-3 font-accent text-[11px] uppercase tracking-[0.16em] text-slate">
        {stat.label}
      </span>
    </m.div>
  )
}

/* ── AboutStats section ── */

export function AboutStats() {
  const reducedMotion = useReducedMotion()
  const { ref: gridRef, inView } = useInView({ rootMargin: '-80px', once: true })
  const staggerVariants = makeStaggerContainerVariants(reducedMotion)

  return (
    <section className="bg-white py-12 md:py-32 lg:py-36" aria-labelledby="stats-heading">
      <div className="mx-auto max-w-7xl px-6 md:px-12 xl:px-16">
        {/* Header */}
        <div className="mb-16 text-center md:mb-24">
          <AnimatedSection>
            <p className="font-accent text-[13px] uppercase tracking-[0.18em] text-terracotta">
              Our Impact
            </p>
            <h2
              id="stats-heading"
              className="mt-3 font-display text-3xl font-medium text-obsidian md:text-4xl lg:text-5xl"
            >
              Building Karnataka
            </h2>
          </AnimatedSection>
        </div>

        {/* Stats grid */}
        <m.div
          ref={gridRef}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerVariants}
          className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-0"
        >
          {ABOUT_STATS.map((stat, i) => (
            <StatCard
              key={stat.id}
              stat={stat}
              index={i}
              inView={inView}
              reducedMotion={reducedMotion}
            />
          ))}
        </m.div>
      </div>
    </section>
  )
}
