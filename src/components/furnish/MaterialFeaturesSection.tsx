'use client'

import { motion } from 'framer-motion'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { makeStaggerContainerVariants } from '@/lib/motion'
import { MATERIAL_FEATURES } from '@/lib/constants/furnish'
import { WetAreasScene } from './illustrations/WetAreasScene'
import { DryAreasScene } from './illustrations/DryAreasScene'
import { ShutterScene } from './illustrations/ShutterScene'
import { HingesScene } from './illustrations/HingesScene'

const SCENES: ReadonlyArray<React.ComponentType> = [
  WetAreasScene,
  DryAreasScene,
  ShutterScene,
  HingesScene,
]

export function MaterialFeaturesSection() {
  const reduced = useReducedMotion()
  const containerVariants = makeStaggerContainerVariants(reduced)

  const itemVariants = {
    hidden: reduced ? { opacity: 0 } : { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section
      aria-labelledby="furnish-materials-heading"
      className="bg-white py-12 md:py-32 lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12 xl:px-16">
        {/* Heading */}
        <AnimatedSection className="text-center">
          <span className="mb-4 block font-accent text-[13px] uppercase tracking-[0.18em] text-terracotta md:text-[15px]">
            Material Features
          </span>
          <h2
            id="furnish-materials-heading"
            className="font-display text-3xl font-medium text-obsidian md:text-4xl lg:text-5xl"
          >
            Premium Materials, Lasting Quality
          </h2>
          <p className="mt-3 font-body text-base tracking-wide text-slate md:text-lg">
            Every surface, every hinge — built to endure
          </p>
        </AnimatedSection>

        {/* Materials grid */}
        <AnimatedSection delay={0.15} className="mt-16 md:mt-20">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="relative grid grid-cols-2 gap-8 md:grid-cols-4"
          >
            {MATERIAL_FEATURES.map((mat, i) => {
              const Scene = SCENES[i]

              return (
                <motion.div
                  key={mat.id}
                  variants={itemVariants}
                  className="relative flex flex-col items-center text-center"
                >
                  {/* Illustration */}
                  <div className="mb-6 w-full max-w-[180px]">
                    <Scene />
                  </div>

                  {/* Area title */}
                  <h3 className="mt-5 max-w-xs font-display text-lg font-medium leading-snug text-obsidian md:text-xl">
                    {mat.area}
                  </h3>

                  {/* Material name */}
                  <p className="mt-1.5 font-body text-sm font-semibold text-terracotta">
                    {mat.material}
                  </p>

                  {/* Description */}
                  <p className="mt-2 max-w-xs font-body text-sm leading-relaxed text-slate">
                    {mat.description}
                  </p>
                </motion.div>
              )
            })}
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  )
}
