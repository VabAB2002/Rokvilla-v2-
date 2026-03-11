'use client'

import { motion } from 'framer-motion'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { makeStaggerContainerVariants, EASE_OUT_EXPO } from '@/lib/motion'
import { MATERIAL_FEATURES } from '@/lib/constants/furnish'

/** Zero-padded step number (01, 02, …) */
function stepLabel(index: number): string {
  return String(index + 1).padStart(2, '0')
}

/* ── Material card ── */

function MaterialCard({
  material,
  index,
  isLast,
}: {
  readonly material: (typeof MATERIAL_FEATURES)[number]
  readonly index: number
  readonly isLast: boolean
}) {
  return (
    <div className="group flex flex-col items-center text-center">
      {/* Icon in tinted circle */}
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-terracotta/[0.06] ring-1 ring-terracotta/10 transition-transform duration-300 group-hover:scale-105">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-8 w-8 text-terracotta"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d={material.icon} />
        </svg>
      </div>

      {/* Numbered circle — connector line runs through this */}
      <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-terracotta shadow-sm">
        <span className="font-display text-lg font-medium text-white">
          {stepLabel(index)}
        </span>
      </div>

      {/* Vertical dashed connector — mobile only */}
      {!isLast && (
        <div
          className="my-2 h-10 border-l-2 border-dashed border-limestone md:hidden"
          aria-hidden="true"
        />
      )}

      {/* Area title */}
      <h3 className="mt-5 max-w-xs font-display text-lg font-medium leading-snug text-obsidian md:text-xl">
        {material.area}
      </h3>

      {/* Material name + brand accent */}
      <p className="mt-1.5 font-body text-sm font-semibold text-terracotta">
        {material.material}
        {material.brand && (
          <span className="font-normal text-stone"> · {material.brand}</span>
        )}
      </p>

      {/* Description */}
      <p className="mt-2 max-w-xs font-body text-sm leading-relaxed text-slate">
        {material.description}
      </p>
    </div>
  )
}

/* ── Section ── */

export function MaterialFeaturesSection() {
  const reduced = useReducedMotion()
  const containerVariants = makeStaggerContainerVariants(reduced)

  const itemVariants = {
    hidden: reduced ? { opacity: 0 } : { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduced ? 0.15 : 0.6, ease: EASE_OUT_EXPO },
    },
  }

  return (
    <section
      aria-labelledby="furnish-materials-heading"
      className="bg-white py-24 md:py-32 lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12 xl:px-16">
        {/* Heading */}
        <AnimatedSection className="text-center">
          <h2
            id="furnish-materials-heading"
            className="font-display text-3xl font-medium text-obsidian md:text-4xl lg:text-5xl"
          >
            Material Features
          </h2>
          <p className="mt-3 font-body text-base tracking-wide text-slate md:text-lg">
            Premium materials for lasting quality and durability
          </p>
        </AnimatedSection>

        {/* Single row of 4 materials */}
        <div className="mt-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="relative grid gap-16 md:grid-cols-4 md:gap-8"
          >
            {/* Horizontal dashed connector — desktop only
                icon h-20 (80px) + mb-6 (24px) + half h-14 (28px) = 132px
                4 cols → center of col 1 at 12.5%, center of col 4 at 87.5% */}
            <div
              className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-[132px] hidden border-t-2 border-dashed border-limestone md:block"
              aria-hidden="true"
            />

            {MATERIAL_FEATURES.map((mat, i) => (
              <motion.div key={mat.id} variants={itemVariants}>
                <MaterialCard
                  material={mat}
                  index={i}
                  isLast={i === MATERIAL_FEATURES.length - 1}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
