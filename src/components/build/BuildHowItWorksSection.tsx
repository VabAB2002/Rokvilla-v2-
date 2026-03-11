'use client'

import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { BUILD_PHASE_GROUPS } from '@/lib/constants/build'
import { OverviewSteps } from './how-it-works/OverviewSteps'
import { PhaseConnector } from './how-it-works/PhaseConnector'
import { PhaseGroup } from './how-it-works/PhaseGroup'

export function BuildHowItWorksSection() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="build-how-it-works-heading"
      className="bg-white py-24 md:py-32 lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12 xl:px-16">
        {/* Section header */}
        <AnimatedSection className="text-center">
          <span className="mb-4 block font-accent text-[13px] uppercase tracking-[0.18em] text-terracotta md:text-[15px]">
            How Does This Work?
          </span>
          <h2
            id="build-how-it-works-heading"
            className="font-display text-3xl font-medium text-obsidian md:text-4xl lg:text-5xl"
          >
            From Choosing a Package
            <br className="hidden md:block" />
            {' '}to Handing Over Your Keys
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-body text-base leading-relaxed text-slate">
            Three simple choices, then a personal journey — guided by our team every step of the way.
          </p>
        </AnimatedSection>

        {/* Tier 1: Overview steps with illustrations */}
        <AnimatedSection delay={0.15} className="mt-16 md:mt-20">
          <OverviewSteps />
        </AnimatedSection>

        {/* Bridge connector */}
        <PhaseConnector />

        {/* Tier 2 & 3: Phase groups */}
        <div className="space-y-20 md:space-y-28 lg:space-y-36">
          {BUILD_PHASE_GROUPS.map((group, i) => (
            <AnimatedSection key={group.id} delay={0.1}>
              <PhaseGroup group={group} reversed={i % 2 !== 0} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
