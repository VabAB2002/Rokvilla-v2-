'use client'

import Image from 'next/image'
import * as m from 'framer-motion/m'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { makeStaggerContainerVariants } from '@/lib/motion'
import type { BuildPhaseGroup } from '@/lib/constants/build'

interface PhaseGroupProps {
  readonly group: BuildPhaseGroup
  readonly reversed: boolean
}

export function PhaseGroup({ group, reversed }: PhaseGroupProps) {
  const reduced = useReducedMotion()
  const containerVariants = makeStaggerContainerVariants(reduced)

  const subStepVariants = {
    hidden: reduced
      ? { opacity: 0 }
      : { opacity: 0, x: reversed ? 20 : -20 },
    visible: { opacity: 1, x: 0 },
  }

  return (
    <div
      className={`flex flex-col gap-12 md:gap-16 lg:gap-24 md:flex-row md:items-center ${
        reversed ? 'md:flex-row-reverse' : ''
      }`}
    >
      {/* Illustration side — after content on mobile (order-2), before on desktop (md:order-none) */}
      <div className="order-2 flex justify-center md:order-none md:w-[42%]">
        <div className="relative w-full max-w-[300px] lg:max-w-[400px]">
          {/* Parchment halo behind illustration */}
          <div
            className="absolute -inset-6 rounded-full bg-parchment/60"
            aria-hidden="true"
          />
          <Image
            src={group.illustrationSrc}
            alt={group.illustrationAlt}
            width={480}
            height={480}
            className="relative h-auto w-full"
          />
        </div>
      </div>

      {/* Content side — first on mobile (order-1) */}
      <div className="order-1 md:order-none md:w-[58%]">
        {/* Phase overline */}
        <span className="font-accent text-[11px] uppercase tracking-[0.2em] text-terracotta">
          {group.phaseNumber}
        </span>

        {/* Phase title */}
        <h3 className="mt-2 font-display text-2xl font-medium text-obsidian md:text-3xl">
          {group.phaseLabel}
        </h3>

        {/* Separator */}
        <div className="mt-5 h-px w-12 bg-limestone" aria-hidden="true" />

        {/* Sub-steps stack */}
        <m.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-8 space-y-0"
        >
          {group.steps.map((step, i) => {
            const isLast = i === group.steps.length - 1

            return (
              <div key={step.id}>
                <m.div
                  variants={subStepVariants}
                  className="flex gap-4"
                >
                  {/* Step number pill */}
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-terracotta/40 bg-terracotta/[0.08]">
                    <span className="font-accent text-[11px] text-terracotta">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-display text-base font-medium text-obsidian md:text-lg">
                      {step.title}
                    </h4>
                    <p className="mt-1 font-body text-sm leading-relaxed text-slate">
                      {step.description}
                    </p>
                  </div>
                </m.div>

                {/* Vertical dashed connector between sub-steps */}
                {!isLast && (
                  <div
                    className="ml-4 h-5 w-0 border-l border-dashed border-limestone/60"
                    aria-hidden="true"
                  />
                )}
              </div>
            )
          })}
        </m.div>
      </div>
    </div>
  )
}
