'use client'

import * as m from 'framer-motion/m'
import { type Variants } from 'framer-motion'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Button } from '@/components/ui/Button'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { EASE_OUT_QUART } from '@/lib/motion'
import {
  PRICING_CATEGORIES,
  PRICING_SERVICES,
  PRICING_RATES,
  type PricingUnit,
} from '@/lib/constants/design'
import { MobilePricingList } from './MobilePricingList'

/* ── Row stagger variants ── */

function makeRowContainerVariants(reduced: boolean): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: reduced ? 0 : 0.04 },
    },
  }
}

function makeRowItemVariants(reduced: boolean): Variants {
  return {
    hidden: reduced ? { opacity: 0 } : { opacity: 0, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduced ? 0.1 : 0.3, ease: EASE_OUT_QUART },
    },
  }
}

/* ── Formatting ── */

const INR_FORMAT = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 })

const UNIT_LABELS: Readonly<Record<PricingUnit, string>> = {
  sqft: '/ sqft',
  unit: '/ unit',
}

/* ── Main Section ── */

export function DocketsSection() {
  const reduced = useReducedMotion()
  const rowContainerVariants = makeRowContainerVariants(reduced)
  const rowItemVariants = makeRowItemVariants(reduced)

  return (
    <section
      id="dockets"
      aria-labelledby="dockets-heading"
      className="bg-white py-12 md:py-32 lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12 xl:px-16">
        {/* Header */}
        <AnimatedSection className="text-center">
          <span className="mb-4 block font-accent text-[13px] uppercase tracking-[0.18em] text-terracotta md:text-[15px]">
            Looking for Drawings Only?
          </span>
          <h2
            id="dockets-heading"
            className="font-display text-3xl font-medium text-obsidian md:text-4xl lg:text-5xl"
          >
            Architectural &amp; Good for Construction Drawings
          </h2>
          <p className="mt-4 font-body text-base leading-relaxed text-slate md:text-lg">
            Transparent, per-unit rates across all project types.
          </p>
        </AnimatedSection>

        {/* Comparison — mobile list + desktop table */}
        <AnimatedSection delay={0.15} className="mt-12">
          {/* Mobile: vertical card list */}
          <div className="sm:hidden">
            <MobilePricingList />
          </div>

          {/* Desktop: full table */}
          <div className="hidden sm:block">
          <div className="mx-auto max-w-5xl overflow-x-auto rounded-[4px] border border-limestone/40 bg-white shadow-card no-scrollbar">
            <table className="w-full min-w-[640px]">
              {/* Column Headers */}
              <thead>
                <tr className="border-b border-limestone/30">
                  <th className="sticky left-0 z-10 border-r border-limestone/20 bg-white py-4 pl-6 pr-4 text-left font-display text-sm font-medium text-stone md:pl-8 md:text-base">
                    Service
                  </th>
                  {PRICING_CATEGORIES.map((cat) => (
                    <th
                      key={cat.id}
                      className="px-3 py-4 text-center font-body text-xs uppercase tracking-[0.08em] text-slate md:px-4"
                    >
                      <span className="hidden lg:inline">{cat.label}</span>
                      <span className="lg:hidden">{cat.shortLabel}</span>
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Service Rows */}
              <m.tbody
                variants={rowContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
              >
                {PRICING_SERVICES.map((service, i) => {
                  const isLast = i === PRICING_SERVICES.length - 1

                  return (
                    <m.tr
                      key={service.id}
                      variants={rowItemVariants}
                      className={`group transition-colors duration-150 hover:bg-parchment ${
                        !isLast ? 'border-b border-limestone/15' : ''
                      }`}
                    >
                      {/* Service name + icon (sticky on mobile scroll) */}
                      <td className="sticky left-0 z-10 border-r border-limestone/20 bg-white py-3 pl-6 pr-4 transition-colors duration-150 group-hover:bg-parchment md:pl-8">
                        <div className="flex items-center gap-3">
                          <div
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-terracotta/8 md:h-9 md:w-9"
                            aria-hidden="true"
                          >
                            <svg
                              width="15"
                              height="15"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-terracotta md:h-[17px] md:w-[17px]"
                            >
                              <path d={service.iconPath} />
                            </svg>
                          </div>
                          <span className="font-body text-[13px] text-obsidian md:text-sm">
                            {service.name}
                          </span>
                        </div>
                      </td>

                      {/* Price cells for each category */}
                      {PRICING_CATEGORIES.map((cat) => {
                        const rate = PRICING_RATES[cat.id][service.id] ?? 0

                        return (
                          <td
                            key={cat.id}
                            className="px-3 py-3 text-center md:px-4"
                          >
                            <span className="font-display text-sm font-medium text-obsidian md:text-base">
                              ₹{INR_FORMAT.format(rate)}
                            </span>
                            <span className="ml-0.5 font-body text-xs text-stone">
                              {UNIT_LABELS[service.unit]}
                            </span>
                          </td>
                        )
                      })}
                    </m.tr>
                  )
                })}
              </m.tbody>
            </table>
          </div>
          </div>
        </AnimatedSection>

        {/* CTA */}
        <AnimatedSection delay={0.3} className="mt-12 text-center">
          <Button variant="primary" href="#consultation">
            Get a Custom Quote
          </Button>
          <p className="mt-4 font-body text-xs tracking-wide text-stone">
            Prices are indicative. Final quote based on project scope.
          </p>
        </AnimatedSection>
      </div>
    </section>
  )
}
