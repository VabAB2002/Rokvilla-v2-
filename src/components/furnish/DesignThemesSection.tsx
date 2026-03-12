'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { makeStaggerContainerVariants, EASE_OUT_QUART } from '@/lib/motion'
import { DESIGN_THEMES } from '@/lib/constants/furnish'

export function DesignThemesSection() {
  const reducedMotion = useReducedMotion()
  const containerVariants = makeStaggerContainerVariants(reducedMotion)

  return (
    <section
      id="design-themes"
      aria-labelledby="design-themes-heading"
      className="bg-white py-24 md:py-32 lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12 xl:px-16">
        <AnimatedSection className="text-center">
          <h2
            id="design-themes-heading"
            className="font-display text-3xl font-medium text-obsidian md:text-4xl lg:text-5xl"
          >
            Design Themes
          </h2>
          <p className="mt-3 font-body text-base tracking-wide text-slate md:text-lg">
            Explore curated interior styles tailored to your lifestyle
          </p>
        </AnimatedSection>
      </div>

      {/* Theme cards — edge-to-edge */}
      <AnimatedSection delay={0.15} className="mt-14">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="flex gap-3 overflow-x-auto scroll-snap-x no-scrollbar px-3 pb-4 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:px-4"
        >
          {DESIGN_THEMES.map((theme) => (
            <motion.div
              key={theme.id}
              variants={{
                hidden: reducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0 },
              }}
              className="group relative w-[85vw] max-w-[400px] shrink-0 scroll-snap-start overflow-hidden rounded-[4px] md:w-auto md:max-w-none"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.6, ease: EASE_OUT_QUART }}
                  className="h-full w-full"
                >
                  <Image
                    src={theme.image}
                    alt={`${theme.title} interior design theme`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 85vw, 33vw"
                  />
                </motion.div>

                {/* Gradient overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-obsidian/80 via-obsidian/40 to-transparent p-5 pt-16">
                  <h3 className="font-display text-lg font-medium text-bone">
                    {theme.title}
                  </h3>
                  <p className="mt-1 font-body text-xs leading-relaxed text-bone/60">
                    {theme.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatedSection>
    </section>
  )
}
