'use client'

import { useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { EASE_OUT_QUART } from '@/lib/motion'
import {
  PRICING_CATEGORIES,
  PRICING_SERVICES,
  PRICING_RATES,
  type PricingUnit,
  type PricingServiceId,
  type PricingService,
} from '@/lib/constants/design'

/* ── Formatting ── */

const INR_FORMAT = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 })

const UNIT_LABELS: Readonly<Record<PricingUnit, string>> = {
  sqft: '/ sqft',
  unit: '/ unit',
}

/* ── Service grouping (UI concern, not domain data) ── */

interface ServiceGroup {
  readonly label: string
  readonly serviceIds: ReadonlyArray<PricingServiceId>
}

const SERVICE_GROUPS: ReadonlyArray<ServiceGroup> = [
  {
    label: 'Plans & Drawings',
    serviceIds: ['floor-plans', 'wall-marking-2d', 'electrical-plumbing', 'site-measured'],
  },
  {
    label: '3D Visualisation',
    serviceIds: ['3d-exterior', '3d-basic-interior', '3d-luxury-interior'],
  },
  {
    label: 'Walkthroughs',
    serviceIds: ['walkthrough-basic', 'walkthrough-luxury'],
  },
  {
    label: 'Documentation',
    serviceIds: ['furniture-working', 'boq'],
  },
]

/* ── Tab display labels (friendly words, no symbols) ── */

interface TabDisplay {
  readonly title: string
  readonly dimension: string
}

const TAB_DISPLAY: Readonly<Record<string, TabDisplay>> = {
  'small-residential': { title: 'Residential', dimension: "up to 30' × 50'" },
  'large-residential': { title: 'Residential', dimension: "40' × 60' & above" },
  'commercial-small': { title: 'Commercial', dimension: 'below 5,000 sqft' },
  'commercial-large': { title: 'Commercial', dimension: '5,000 sqft & above' },
}

/* ── Lookup map (module-level, static data) ── */

const SERVICES_MAP = new Map<string, PricingService>(
  PRICING_SERVICES.map((s) => [s.id, s]),
)

/* ── Service row ── */

function ServiceRow({
  service,
  rate,
  isLast,
}: {
  readonly service: PricingService
  readonly rate: number
  readonly isLast: boolean
}) {
  return (
    <div
      role="listitem"
      className={`flex min-h-[48px] items-center gap-3 py-3 transition-colors duration-150 active:bg-parchment/60 ${
        !isLast ? 'border-b border-limestone/20' : ''
      }`}
    >
      {/* Icon */}
      <div
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-terracotta/8"
        aria-hidden="true"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-terracotta"
        >
          <path d={service.iconPath} />
        </svg>
      </div>

      {/* Name */}
      <span className="flex-1 font-body text-[14px] leading-snug text-obsidian">
        {service.shortName}
      </span>

      {/* Price + unit */}
      <span className="shrink-0 text-right">
        <span className="font-display text-base font-semibold text-obsidian">
          ₹{INR_FORMAT.format(rate)}
        </span>
        <span className="ml-0.5 font-body text-[11px] text-stone">
          {UNIT_LABELS[service.unit]}
        </span>
      </span>
    </div>
  )
}

/* ── Main component ── */

export function MobilePricingList() {
  const reduced = useReducedMotion()
  const [activeCategoryId, setActiveCategoryId] = useState(PRICING_CATEGORIES[0].id)
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map())

  const handleCategoryChange = useCallback((catId: string) => {
    setActiveCategoryId(catId)
  }, [])

  const handleTabKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>) => {
      const ids = PRICING_CATEGORIES.map((c) => c.id)
      const currentIdx = ids.indexOf(activeCategoryId)
      let nextIdx = -1

      if (e.key === 'ArrowRight') {
        nextIdx = (currentIdx + 1) % ids.length
      } else if (e.key === 'ArrowLeft') {
        nextIdx = (currentIdx - 1 + ids.length) % ids.length
      } else if (e.key === 'Home') {
        nextIdx = 0
      } else if (e.key === 'End') {
        nextIdx = ids.length - 1
      }

      if (nextIdx >= 0) {
        e.preventDefault()
        const nextId = ids[nextIdx]
        handleCategoryChange(nextId)
        const btn = tabRefs.current.get(nextId)
        btn?.focus()
        btn?.scrollIntoView({ behavior: 'smooth', inline: 'nearest', block: 'nearest' })
      }
    },
    [activeCategoryId, handleCategoryChange],
  )

  const rates = PRICING_RATES[activeCategoryId]

  return (
    <div>
      {/* Category tabs */}
      <div
        role="tablist"
        aria-label="Pricing category"
        className="flex gap-2 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-1"
      >
        {PRICING_CATEGORIES.map((cat) => {
          const isActive = activeCategoryId === cat.id
          return (
            <button
              key={cat.id}
              ref={(el) => {
                if (el) tabRefs.current.set(cat.id, el)
              }}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls="pricing-panel"
              id={`pricing-tab-${cat.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={(e) => {
                handleCategoryChange(cat.id)
                e.currentTarget.scrollIntoView({
                  behavior: 'smooth',
                  inline: 'nearest',
                  block: 'nearest',
                })
              }}
              onKeyDown={handleTabKeyDown}
              className={`snap-start shrink-0 rounded-2xl min-h-[52px] px-4 py-2 inline-flex flex-col items-center justify-center text-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta ${
                isActive
                  ? 'border-2 border-terracotta/40 bg-terracotta/[0.15] backdrop-blur-sm text-terracotta font-semibold shadow-sm'
                  : 'border border-terracotta/20 bg-terracotta/[0.06] backdrop-blur-sm text-slate font-normal hover:border-terracotta/[0.35] hover:bg-terracotta/10'
              }`}
            >
              <span className={`font-body text-[12px] uppercase tracking-[0.06em] leading-tight ${
                isActive ? 'text-terracotta' : 'text-slate'
              }`}>
                {TAB_DISPLAY[cat.id]?.title ?? cat.shortLabel}
              </span>
              <span className={`font-body text-[10px] leading-tight mt-0.5 ${
                isActive ? 'text-terracotta/70' : 'text-stone'
              }`}>
                {TAB_DISPLAY[cat.id]?.dimension ?? ''}
              </span>
            </button>
          )
        })}
      </div>

      {/* Service list panel */}
      <div
        id="pricing-panel"
        role="tabpanel"
        aria-labelledby={`pricing-tab-${activeCategoryId}`}
        className="mt-5 rounded-[6px] border border-limestone/30 bg-white px-4"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategoryId}
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -6 }}
            transition={{ duration: reduced ? 0.1 : 0.22, ease: EASE_OUT_QUART }}
          >
            <div role="list" aria-label="Pricing services">
              {SERVICE_GROUPS.map((group, groupIdx) => (
                <div key={group.label} className={groupIdx > 0 ? 'mt-4' : ''}>
                  {/* Group header */}
                  <div className="border-b border-limestone/30 pb-1 pt-4">
                    <span className="font-accent text-[10px] uppercase tracking-[0.14em] text-stone">
                      {group.label}
                    </span>
                  </div>

                  {/* Service rows */}
                  {group.serviceIds.map((serviceId, i) => {
                    const service = SERVICES_MAP.get(serviceId)
                    if (!service) return null

                    return (
                      <ServiceRow
                        key={serviceId}
                        service={service}
                        rate={rates[serviceId] ?? 0}
                        isLast={i === group.serviceIds.length - 1}
                      />
                    )
                  })}
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
