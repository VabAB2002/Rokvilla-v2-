'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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

/* ── Helpers ── */

function formatPrice(rate: number, unit: PricingUnit): string {
  const r = `₹${rate.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`
  switch (unit) {
    case 'sqft':
      return `${r} / Sqft`
    case 'room':
      return `${r} / Room`
    case 'unit':
      return `${r} / Unit`
  }
}

/* ── Main Section ── */

export function DocketsSection() {
  const reduced = useReducedMotion()
  const [active, setActive] = useState(PRICING_CATEGORIES[0].id)

  const handleChange = useCallback((id: string) => {
    setActive(id)
  }, [])

  const rates = PRICING_RATES[active]
  const activeCategory = PRICING_CATEGORIES.find((c) => c.id === active)

  return (
    <section
      id="dockets"
      aria-labelledby="dockets-heading"
      className="bg-parchment py-24 md:py-32 lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12 xl:px-16">
        {/* Header */}
        <AnimatedSection className="text-center">
          <h2
            id="dockets-heading"
            className="font-display text-2xl font-medium uppercase text-obsidian md:text-3xl lg:text-4xl"
          >
            Architectural Drawing Services
          </h2>
          <p className="mt-3 font-body text-base tracking-wide text-slate md:text-lg">
            Transparent pricing for every project type
          </p>
        </AnimatedSection>

        {/* Category Filter Tabs */}
        <AnimatedSection delay={0.15} className="mt-12">
          <div
            role="tablist"
            aria-label="Project categories"
            className="flex flex-wrap justify-center gap-2"
          >
            {PRICING_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                id={`tab-${cat.id}`}
                type="button"
                role="tab"
                aria-selected={active === cat.id}
                aria-label={cat.label}
                onClick={() => handleChange(cat.id)}
                className={`shrink-0 rounded-[2px] border px-4 py-2.5 min-h-[44px] inline-flex items-center font-body text-[12px] uppercase tracking-[0.08em] transition-all duration-200 md:px-5 md:text-[13px] ${
                  active === cat.id
                    ? 'border-terracotta bg-terracotta text-bone'
                    : 'border-limestone text-slate hover:border-obsidian/30 hover:text-obsidian'
                }`}
              >
                <span aria-hidden="true" className="hidden md:inline">{cat.label}</span>
                <span aria-hidden="true" className="md:hidden">{cat.shortLabel}</span>
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Pricing Table */}
        <AnimatedSection delay={0.25} className="mt-10">
          <div className="mx-auto max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                role="tabpanel"
                aria-labelledby={`tab-${active}`}
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, y: -12 }}
                transition={{ duration: reduced ? 0.1 : 0.3, ease: EASE_OUT_QUART }}
              >
                {/* Category heading */}
                <h3 className="font-display text-xl font-medium italic text-obsidian md:text-2xl">
                  {activeCategory?.label}
                </h3>
                <div className="mt-3 h-px bg-limestone/60" />

                {/* Table — no column headers, self-explanatory */}
                <table className="mt-1 w-full">
                  <tbody>
                    {PRICING_SERVICES.map((service, i) => (
                      <tr
                        key={service.id}
                        className={`border-b border-limestone/25 transition-colors duration-150 hover:bg-limestone/15 ${
                          i % 2 === 0 ? 'bg-transparent' : 'bg-white/60'
                        }`}
                      >
                        <td className="py-3.5 pr-4 font-body text-sm text-obsidian md:text-[15px]">
                          {service.name}
                        </td>
                        <td className="whitespace-nowrap py-3.5 pl-4 text-right font-display text-sm font-medium text-obsidian md:text-base">
                          {formatPrice(rates[service.id] ?? 0, service.unit)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            </AnimatePresence>
          </div>
        </AnimatedSection>

        {/* CTA */}
        <AnimatedSection delay={0.35} className="mt-14 text-center">
          <Button variant="primary" href="#consultation">
            Get a Custom Quote
          </Button>
        </AnimatedSection>
      </div>
    </section>
  )
}
