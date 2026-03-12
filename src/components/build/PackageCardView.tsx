'use client'

import { Check, X, Minus } from 'lucide-react'
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

/* ── Single package card ── */

interface PackageCardProps {
  readonly tier: PackageTier
  readonly tierIndex: number
  readonly categories: ReadonlyArray<ComparisonCategory>
}

function PackageCard({ tier, tierIndex, categories }: PackageCardProps) {
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

      {/* Feature rows */}
      <div className="px-6 py-4">
        {categories.map((category) => (
          <div key={category.id} className="mb-4 last:mb-0">
            {/* Category label */}
            <p className="mb-2 font-display text-[11px] font-medium uppercase tracking-[0.1em] text-stone">
              {category.name}
            </p>

            {/* Rows */}
            <div className="space-y-2.5">
              {category.rows.map((row) => {
                const value = row.values[tierIndex] ?? null
                return (
                  <div
                    key={row.id}
                    className="flex items-start justify-between gap-3"
                  >
                    <span className="font-body text-[12px] leading-snug text-obsidian">
                      {row.feature}
                      {row.subtitle && (
                        <span className="ml-1 text-stone/60">({row.subtitle})</span>
                      )}
                    </span>
                    <span className="shrink-0 pt-0.5">
                      <CellValue value={value} />
                    </span>
                  </div>
                )
              })}
            </div>

            {/* Category footnote */}
            {category.footnote && (
              <p className="mt-1.5 font-body text-[10px] italic text-stone/60">
                {category.footnote}
              </p>
            )}
          </div>
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
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 no-scrollbar"
        role="region"
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
