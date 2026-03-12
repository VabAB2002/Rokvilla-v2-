'use client'

import { useState, type ComponentType } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Button } from '@/components/ui/Button'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { EASE_OUT_QUART } from '@/lib/motion'
import {
  PACKAGE_TYPES,
  type PackageTypeId,
  type ComparisonCellValue,
  type ComparisonRow,
  type ComparisonCategory,
  type PackageTier,
} from '@/lib/constants/build-packages'
import {
  ShieldCheck,
  Hammer,
  Box,
  Mountain,
  Layers,
  FlaskConical,
  MoveVertical,
  Bug,
  LayoutGrid,
  Droplets,
  Pipette,
  Wrench,
  Bath,
  Zap,
  PanelTop,
  Columns2,
  Lightbulb,
  AppWindow,
  DoorOpen,
  DoorClosed,
  Frame,
  Sparkles,
  Paintbrush,
  PaintBucket,
  Sofa,
  BedDouble,
  Footprints,
  Sun,
  ArrowUpRight,
  Car,
  Cable,
  ToggleRight,
  BatteryCharging,
  PlugZap,
  Plug,
  Container,
  Waves,
  Fence,
  Grid3x3,
  Flame,
  AirVent,
  ArrowUpDown,
  Smartphone,
  ScanEye,
  Settings,
  Camera,
  ShieldAlert,
  ParkingCircle,
  Bell,
  Fingerprint,
  MonitorSmartphone,
  Check,
  X,
  Minus,
  Circle,
} from 'lucide-react'

/* ── Icon lookup ── */

type IconProps = { readonly size?: number; readonly className?: string }

const ICON_MAP: Readonly<Record<string, ComponentType<IconProps>>> = {
  ShieldCheck,
  Hammer,
  Box,
  Mountain,
  Layers,
  FlaskConical,
  MoveVertical,
  Bug,
  LayoutGrid,
  Droplets,
  Pipette,
  Wrench,
  Bath,
  Zap,
  PanelTop,
  Columns2,
  Lightbulb,
  AppWindow,
  DoorOpen,
  DoorClosed,
  Frame,
  Sparkles,
  Paintbrush,
  PaintBucket,
  Sofa,
  BedDouble,
  Footprints,
  Sun,
  ArrowUpRight,
  Car,
  Cable,
  ToggleRight,
  BatteryCharging,
  PlugZap,
  Plug,
  Container,
  Waves,
  Fence,
  Grid3x3,
  Flame,
  AirVent,
  ArrowUpDown,
  Smartphone,
  ScanEye,
  Settings,
  Camera,
  ShieldAlert,
  ParkingCircle,
  Bell,
  Fingerprint,
  MonitorSmartphone,
}

function RowIcon({ name }: { readonly name: string }) {
  const IconComponent = ICON_MAP[name] ?? Circle
  return (
    <div
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-terracotta/8 md:h-9 md:w-9"
      aria-hidden="true"
    >
      <IconComponent size={15} className="text-terracotta md:h-[17px] md:w-[17px]" />
    </div>
  )
}

/* ── Difference detection ── */

function hasDistinctValues(row: ComparisonRow): boolean {
  const first = row.values[0]
  return row.values.some((v) => v !== first)
}

/* ── Cell renderer ── */

function CellValue({ value }: { readonly value: ComparisonCellValue }) {
  if (value === true) {
    return (
      <span className="inline-flex items-center justify-center">
        <Check size={18} className="text-green-600" strokeWidth={2.5} />
      </span>
    )
  }
  if (value === false) {
    return (
      <span className="inline-flex items-center justify-center">
        <X size={16} className="text-stone/40" strokeWidth={2} />
      </span>
    )
  }
  if (value === null) {
    return (
      <span className="inline-flex items-center justify-center">
        <Minus size={14} className="text-stone/25" />
      </span>
    )
  }
  return (
    <span className="font-body text-[13px] leading-relaxed text-slate md:text-sm">
      {value}
    </span>
  )
}

/* ── Formatting ── */

const INR_FORMAT = new Intl.NumberFormat('en-IN')

/* ── Animation variants ── */

function makeRowContainerVariants(reduced: boolean): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: reduced ? 0 : 0.03 },
    },
  }
}

function makeRowItemVariants(reduced: boolean): Variants {
  return {
    hidden: reduced ? { opacity: 0 } : { opacity: 0, y: 6 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduced ? 0.1 : 0.25, ease: EASE_OUT_QUART },
    },
  }
}

/* ── Category block ── */

function CategoryBlock({
  category,
  colCount,
  rowItemVariants,
  highlightDiffs,
}: {
  readonly category: ComparisonCategory
  readonly colCount: number
  readonly rowItemVariants: Variants
  readonly highlightDiffs: boolean
}) {
  return (
    <>
      {/* Category header */}
      <motion.tr variants={rowItemVariants}>
        <td
          colSpan={colCount}
          className="border-b border-limestone/30 bg-parchment px-6 py-4 md:px-8"
        >
          <h3 className="font-display text-base font-medium uppercase tracking-wide text-obsidian md:text-lg">
            {category.name}
          </h3>
          {category.subtitle && (
            <p className="mt-0.5 font-body text-xs text-stone">
              {category.subtitle}
            </p>
          )}
        </td>
      </motion.tr>

      {/* Rows */}
      {category.rows.map((row, i) => (
        <ComparisonTableRow
          key={row.id}
          row={row}
          isLast={i === category.rows.length - 1 && !category.footnote}
          variants={rowItemVariants}
          highlightDiffs={highlightDiffs}
        />
      ))}

      {/* Footnote */}
      {category.footnote && (
        <motion.tr variants={rowItemVariants}>
          <td
            colSpan={colCount}
            className="border-b border-limestone/30 px-6 py-2 md:px-8"
          >
            <p className="font-body text-[11px] italic text-stone/70">
              {category.footnote}
            </p>
          </td>
        </motion.tr>
      )}
    </>
  )
}

/* ── Single row ── */

function ComparisonTableRow({
  row,
  isLast,
  variants,
  highlightDiffs,
}: {
  readonly row: ComparisonRow
  readonly isLast: boolean
  readonly variants: Variants
  readonly highlightDiffs: boolean
}) {
  const isDiff = highlightDiffs && hasDistinctValues(row)
  const isDimmed = highlightDiffs && !hasDistinctValues(row)

  return (
    <motion.tr
      variants={variants}
      className={`group transition-all duration-200 hover:bg-parchment ${
        !isLast ? 'border-b border-limestone/15' : 'border-b border-limestone/30'
      } ${isDiff ? 'bg-terracotta/[0.04]' : ''} ${isDimmed ? 'opacity-40' : ''}`}
    >
      {/* Feature name (sticky) */}
      <td
        className={`sticky left-0 z-10 border-r border-limestone/20 py-3 pl-6 pr-4 transition-all duration-200 group-hover:bg-parchment md:pl-8 ${
          isDiff ? 'border-l-2 border-l-terracotta/40 bg-terracotta/[0.04]' : 'bg-white'
        }`}
      >
        <div className="flex items-center gap-3">
          <RowIcon name={row.icon} />
          <div className="min-w-0">
            <span className="block font-body text-[13px] font-medium text-obsidian md:text-sm">
              {row.feature}
            </span>
            {row.subtitle && (
              <span className="block font-body text-[11px] leading-snug text-stone md:text-xs">
                {row.subtitle}
              </span>
            )}
          </div>
        </div>
      </td>

      {/* Package value cells — dynamic from values array */}
      {row.values.map((val, i) => (
        <td key={i} className="px-3 py-3 text-center align-middle md:px-5">
          <CellValue value={val} />
        </td>
      ))}
    </motion.tr>
  )
}

/* ── Type toggle ── */

function PackageTypeToggle({
  activeId,
  onSelect,
}: {
  readonly activeId: PackageTypeId
  readonly onSelect: (id: PackageTypeId) => void
}) {
  return (
    <div className="mt-8 flex justify-center">
      <div className="inline-flex rounded-full bg-limestone/20 p-1 shadow-inner">
        {PACKAGE_TYPES.map((pt) => (
          <button
            key={pt.id}
            type="button"
            onClick={() => onSelect(pt.id)}
            className={`relative min-h-[44px] rounded-full px-6 py-3 transition-colors duration-200 ${
              activeId === pt.id ? 'text-bone' : 'text-slate hover:text-obsidian'
            }`}
          >
            {activeId === pt.id && (
              <motion.span
                layoutId="pkg-pill"
                className="absolute inset-0 rounded-full bg-terracotta shadow-md"
                style={{ borderRadius: 9999 }}
                transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
              />
            )}
            <span className="relative z-10 block font-body text-[13px] font-medium uppercase tracking-[0.08em]">
              {pt.label}
            </span>
            <span className="relative z-10 mt-0.5 block font-body text-[11px] tracking-[0.04em] opacity-80">
              starts at ₹{INR_FORMAT.format(pt.startingPrice)} per sqft
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

/* ── Tier header ── */

function TierHeaders({ tiers }: { readonly tiers: ReadonlyArray<PackageTier> }) {
  return (
    <thead>
      <tr className="border-b border-limestone/30">
        <th
          scope="col"
          className="sticky left-0 z-10 border-r border-limestone/20 bg-white py-5 pl-6 pr-4 text-left md:pl-8"
        >
          <span className="font-body text-xs uppercase tracking-[0.08em] text-stone">
            Feature
          </span>
        </th>
        {tiers.map((tier) => (
          <th key={tier.id} scope="col" className="px-3 py-5 text-center md:px-5">
            <span className="block font-display text-lg font-medium text-obsidian md:text-xl">
              {tier.name}
            </span>
            <span className="mt-1 block font-body text-xs text-stone md:text-sm">
              ₹{INR_FORMAT.format(tier.pricePerSqft)} per sqft
            </span>
          </th>
        ))}
      </tr>
    </thead>
  )
}

/* ── Main Section ── */

export function ConstructionPackagesSection() {
  const [activeTypeId, setActiveTypeId] = useState<PackageTypeId>('homes')
  const [highlightDiffs, setHighlightDiffs] = useState(false)
  const reduced = useReducedMotion()
  const rowContainerVariants = makeRowContainerVariants(reduced)
  const rowItemVariants = makeRowItemVariants(reduced)

  const activeType = PACKAGE_TYPES.find((t) => t.id === activeTypeId) ?? PACKAGE_TYPES[0]
  const { tiers, categories } = activeType
  const colCount = tiers.length + 1

  return (
    <section
      id="packages"
      aria-labelledby="packages-heading"
      className="bg-white py-24 md:py-32 lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12 xl:px-16">
        {/* Header */}
        <AnimatedSection className="text-center">
          <span className="mb-4 block font-accent text-[13px] uppercase tracking-[0.18em] text-terracotta md:text-[15px]">
            Construction Packages
          </span>
          <h2
            id="packages-heading"
            className="font-display text-3xl font-medium text-obsidian md:text-4xl lg:text-5xl"
          >
            Compare Packages
          </h2>
          <p className="mt-4 font-body text-base leading-relaxed text-slate md:text-lg">
            Choose between Homes and Luxury Homes to find your perfect fit.
          </p>

          {/* Type toggle */}
          <PackageTypeToggle
            activeId={activeTypeId}
            onSelect={(id) => {
              setActiveTypeId(id)
              setHighlightDiffs(false)
            }}
          />

          {/* Highlight differences toggle */}
          <div className="mt-5 flex items-center justify-center gap-3">
            <span className="font-body text-[13px] tracking-[0.04em] text-slate">
              Highlight Differences
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={highlightDiffs}
              aria-label="Highlight differences between packages"
              onClick={() => setHighlightDiffs((prev) => !prev)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-300 ${
                highlightDiffs ? 'bg-terracotta' : 'bg-limestone/40'
              }`}
            >
              <motion.span
                layout
                className="pointer-events-none block h-5 w-5 rounded-full bg-white shadow-sm"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                style={{ marginLeft: highlightDiffs ? 22 : 2 }}
              />
            </button>
          </div>
        </AnimatedSection>

        {/* Comparison Table — keyed by type for clean re-mount */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTypeId}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: reduced ? 0.1 : 0.3, ease: EASE_OUT_QUART }}
            className="mt-12"
          >
            <div className="mx-auto overflow-x-auto rounded-[4px] border border-limestone/40 bg-white shadow-card no-scrollbar">
              <table
                className="w-full min-w-[800px]"
                aria-label={`${activeType.label} package comparison`}
              >
                <TierHeaders tiers={tiers} />

                {/* Per-category tbody for viewport-based stagger animation */}
                {categories.map((category) => (
                  <motion.tbody
                    key={category.id}
                    variants={rowContainerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                  >
                    <CategoryBlock
                      category={category}
                      colCount={colCount}
                      rowItemVariants={rowItemVariants}
                      highlightDiffs={highlightDiffs}
                    />
                  </motion.tbody>
                ))}
              </table>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Footer CTA */}
        <AnimatedSection delay={0.3} className="mt-12 text-center">
          <Button variant="primary" href="#consultation">
            Get a Custom Quote
          </Button>
          <p className="mt-4 font-body text-xs tracking-wide text-stone">
            Prices are indicative and may vary by project scope.
          </p>
        </AnimatedSection>
      </div>
    </section>
  )
}
