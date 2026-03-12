'use client'

import {
  PRICING_CATEGORIES,
  PRICING_SERVICES,
  PRICING_RATES,
  type PricingUnit,
  type PricingServiceId,
} from '@/lib/constants/design'

/* ── Formatting ── */

const INR_FORMAT = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 })

const UNIT_LABELS: Readonly<Record<PricingUnit, string>> = {
  sqft: '/sqft',
  unit: '/unit',
}

/* ── Price chip ── */

interface PriceChipProps {
  readonly label: string
  readonly rate: number
  readonly unit: PricingUnit
}

function PriceChip({ label, rate, unit }: PriceChipProps) {
  return (
    <span className="inline-flex items-baseline gap-1 rounded-full border border-limestone/30 bg-parchment px-3 py-1 text-xs font-body">
      <span className="text-stone">{label}</span>
      <span className="font-display text-[13px] font-medium text-obsidian">
        ₹{INR_FORMAT.format(rate)}
      </span>
      <span className="text-stone/60">{UNIT_LABELS[unit]}</span>
    </span>
  )
}

/* ── Service card ── */

interface ServiceCardProps {
  readonly serviceId: PricingServiceId
  readonly serviceName: string
  readonly unit: PricingUnit
}

function ServiceCard({ serviceId, serviceName, unit }: ServiceCardProps) {
  return (
    <div className="rounded-[6px] border border-limestone/30 bg-white p-4">
      {/* Service name */}
      <p className="font-body text-[13px] font-semibold text-obsidian">
        {serviceName}
      </p>

      {/* Price chips per category */}
      <div className="mt-2.5 flex flex-wrap gap-2">
        {PRICING_CATEGORIES.map((cat) => {
          const rate = PRICING_RATES[cat.id][serviceId] ?? 0
          return (
            <PriceChip
              key={cat.id}
              label={cat.shortLabel}
              rate={rate}
              unit={unit}
            />
          )
        })}
      </div>
    </div>
  )
}

/* ── Main component ── */

export function MobilePricingList() {
  return (
    <div className="space-y-3" role="list" aria-label="Pricing services">
      {PRICING_SERVICES.map((service) => (
        <div key={service.id} role="listitem">
          <ServiceCard
            serviceId={service.id}
            serviceName={service.name}
            unit={service.unit}
          />
        </div>
      ))}
    </div>
  )
}
