'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence, type Transition } from 'framer-motion'
import { Check, X, Minus, ChevronDown } from 'lucide-react'
import type {
  PackageTier,
  ComparisonCategory,
  ComparisonCellValue,
} from '@/lib/constants/build-packages'

/* ── Props ── */

interface PackageCardViewProps {
  readonly tiers: ReadonlyArray<PackageTier>
  readonly categories: ReadonlyArray<ComparisonCategory>
  readonly activeLabel: string
}

/* ── Formatting ── */

const INR_FORMAT = new Intl.NumberFormat('en-IN')

/* ── Animation variants ── */

const collapseTransition: Transition = { duration: 0.25, ease: [0.4, 0, 0.2, 1] }

/* ── Cell value renderer ── */

function CellValue({ value }: { readonly value: ComparisonCellValue }) {
  if (value === true) {
    return (
      <span role="img" aria-label="Included">
        <Check size={16} className="text-green-600" strokeWidth={2.5} aria-hidden="true" />
      </span>
    )
  }
  if (value === false) {
    return (
      <span role="img" aria-label="Not included">
        <X size={14} className="text-stone/40" strokeWidth={2} aria-hidden="true" />
      </span>
    )
  }
  if (value === null) {
    return (
      <span role="img" aria-label="Not applicable">
        <Minus size={12} className="text-stone/25" aria-hidden="true" />
      </span>
    )
  }
  return (
    <span className="font-body text-[12px] leading-snug text-slate">
      {value}
    </span>
  )
}

/* ── Accordion category section ── */

interface CategoryAccordionProps {
  readonly category: ComparisonCategory
  readonly tierIndex: number
  readonly isOpen: boolean
  readonly onToggle: (id: string) => void
}

function CategoryAccordion({ category, tierIndex, isOpen, onToggle }: CategoryAccordionProps) {
  const headerId = `cat-${category.id}-header`
  const contentId = `cat-${category.id}-content`

  return (
    <div className="mb-3 last:mb-0">
      {/* Accordion header — full-width tap target */}
      <button
        id={headerId}
        type="button"
        onClick={() => onToggle(category.id)}
        aria-expanded={isOpen}
        aria-controls={contentId}
        className="flex w-full items-center justify-between gap-2 rounded-md border-l-[3px] border-terracotta bg-parchment/60 px-3 py-2.5 text-left transition-colors active:bg-parchment/80"
      >
        <span className="font-display text-[11px] font-semibold uppercase tracking-widest text-obsidian">
          {category.name}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 flex items-center text-stone"
        >
          <ChevronDown size={14} aria-hidden="true" />
        </motion.div>
      </button>

      {/* Collapsible content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={contentId}
            role="region"
            aria-labelledby={headerId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={collapseTransition}
            style={{ overflow: 'hidden' }}
          >
            <div className="pt-2 pb-1">
              {category.rows.map((row, rowIdx) => {
                const value = row.values[tierIndex] ?? null
                const isLast = rowIdx === category.rows.length - 1
                return (
                  <div
                    key={row.id}
                    className={[
                      'flex items-start justify-between gap-3 py-2',
                      isLast ? '' : 'border-b border-limestone/10',
                    ].join(' ').trim()}
                  >
                    {/* Feature name + subtitle stacked */}
                    <div className="min-w-0 flex-1">
                      <p className="font-body text-[13px] font-medium leading-snug text-obsidian">
                        {row.feature}
                      </p>
                      {row.subtitle && (
                        <p className="mt-0.5 font-body text-[11px] leading-snug text-stone/60">
                          {row.subtitle}
                        </p>
                      )}
                    </div>
                    {/* Value */}
                    <span className="shrink-0 pt-0.5 text-right">
                      <CellValue value={value} />
                    </span>
                  </div>
                )
              })}

              {/* Category footnote */}
              {category.footnote && (
                <p className="mt-1 pb-1 font-body text-[10px] italic text-stone/60">
                  {category.footnote}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ── Single package card ── */

interface PackageCardProps {
  readonly tier: PackageTier
  readonly tierIndex: number
  readonly categories: ReadonlyArray<ComparisonCategory>
}

function PackageCard({ tier, tierIndex, categories }: PackageCardProps) {
  // First category expanded by default.
  // NOTE: useState initialiser only runs on mount. This component must be
  // re-mounted (via parent key) when the package type changes so the
  // expanded state resets to the first category.
  const [expanded, setExpanded] = useState<ReadonlySet<string>>(
    () => new Set(categories.length > 0 ? [categories[0].id] : [])
  )

  const toggle = useCallback((id: string) => {
    setExpanded(prev => {
      const ids = [...prev]
      return new Set(prev.has(id) ? ids.filter(x => x !== id) : [...ids, id])
    })
  }, [])

  return (
    <article
      className="w-[85vw] max-w-[340px] shrink-0 scroll-snap-align-start snap-start rounded-[8px] border border-limestone/30 bg-white shadow-card"
      aria-label={`${tier.name} package`}
    >
      {/* Card header */}
      <div className="border-b border-limestone/20 bg-parchment px-6 py-5 rounded-t-[8px]">
        <h3 className="font-display text-xl font-medium text-obsidian">
          {tier.name}
        </h3>
        <p className="mt-1 font-body text-sm text-terracotta">
          ₹{INR_FORMAT.format(tier.pricePerSqft)}{' '}
          <span className="text-stone">per sqft</span>
        </p>
      </div>

      {/* Accordion sections */}
      <div className="px-5 py-3">
        {categories.map((category) => (
          <CategoryAccordion
            key={category.id}
            category={category}
            tierIndex={tierIndex}
            isOpen={expanded.has(category.id)}
            onToggle={toggle}
          />
        ))}
      </div>
    </article>
  )
}

/* ── Main component ── */

export function PackageCardView({
  tiers,
  categories,
  activeLabel,
}: PackageCardViewProps) {
  return (
    <div>
      {/* Scrollable card strip */}
      <div
        className="flex items-start gap-4 overflow-x-auto snap-x snap-mandatory pb-2 no-scrollbar"
        role="group"
        aria-label={`${activeLabel} package comparison cards`}
      >
        {tiers.map((tier, index) => (
          <PackageCard
            key={tier.id}
            tier={tier}
            tierIndex={index}
            categories={categories}
          />
        ))}
      </div>

      {/* Swipe hint */}
      <p className="mt-3 text-center font-body text-xs text-stone">
        ← Swipe to compare →
      </p>
    </div>
  )
}
