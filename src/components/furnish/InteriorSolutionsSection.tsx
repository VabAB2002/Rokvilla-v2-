'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { EASE_OUT_EXPO } from '@/lib/motion'

/* ── Solution items ── */

interface SolutionItem {
  readonly id: string
  readonly label: string
  readonly image: string
}

const SOLUTIONS: ReadonlyArray<SolutionItem> = [
  { id: 'modular-kitchen', label: 'Modular Kitchen', image: '/images/furnish/solution-modular-kitchen.png' },
  { id: 'storage-wardrobe', label: 'Storage and Wardrobe', image: '/images/furnish/solution-storage-wardrobe.png' },
  { id: 'crockery-units', label: 'Crockery Units', image: '/images/furnish/solution-crockery-units.png' },
  { id: 'space-saving', label: 'Space Saving Furniture', image: '/images/furnish/solution-space-saving.png' },
  { id: 'tv-units', label: 'TV Units', image: '/images/furnish/solution-tv-units.png' },
  { id: 'study-tables', label: 'Study Tables', image: '/images/furnish/solution-study-tables.png' },
  { id: 'false-ceiling', label: 'False Ceiling', image: '/images/furnish/solution-false-ceiling.png' },
  { id: 'lights', label: 'Lights', image: '/images/furnish/solution-lights.png' },
  { id: 'wallpaper', label: 'Wallpaper', image: '/images/furnish/solution-wallpaper.png' },
  { id: 'wall-paint', label: 'Wall Paint', image: '/images/furnish/solution-wall-paint.png' },
  { id: 'bathroom', label: 'Bathroom', image: '/images/furnish/solution-bathroom.png' },
  { id: 'pooja-unit', label: 'Pooja Unit', image: '/images/furnish/solution-pooja-unit.png' },
  { id: 'foyer-designs', label: 'Foyer Designs', image: '/images/furnish/solution-foyer-designs.png' },
  { id: 'movable-furniture', label: 'Movable Furniture', image: '/images/furnish/solution-movable-furniture.png' },
  { id: 'kids-bedroom', label: 'Kids Bedroom', image: '/images/furnish/solution-kids-bedroom.png' },
] as const

/* ── Item card ── */

function SolutionCard({ item }: { readonly item: SolutionItem }) {
  return (
    <div className="group flex flex-col items-center gap-4 text-center">
      <div className="w-full max-w-[160px]">
        <Image
          src={item.image}
          alt={item.label}
          width={480}
          height={480}
          className="h-auto w-full"
        />
      </div>
      <span className="max-w-[140px] font-display text-sm font-medium leading-snug text-obsidian/80 transition-colors duration-300 group-hover:text-terracotta">
        {item.label}
      </span>
    </div>
  )
}

/* ── Section ── */

export function InteriorSolutionsSection() {
  const reduced = useReducedMotion()
  /* Faster stagger (0.06s) for 15 items so the cascade doesn't feel sluggish */
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: reduced ? 0 : 0.06 } },
  }

  const itemVariants = {
    hidden: reduced ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: reduced ? 0.15 : 0.45, ease: EASE_OUT_EXPO },
    },
  }

  return (
    <section
      aria-labelledby="interior-solutions-heading"
      className="bg-white py-12 md:py-32 lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12 xl:px-16">
        {/* Heading */}
        <AnimatedSection className="text-center">
          <h2
            id="interior-solutions-heading"
            className="font-display text-3xl font-medium text-obsidian md:text-4xl lg:text-5xl"
          >
            End-to-End Interior Solutions
          </h2>
          <p className="mt-3 font-body text-base tracking-wide text-slate md:text-lg">
            Complete interior solutions for every room
          </p>
        </AnimatedSection>

        {/* Grid of solution items */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
        >
          {SOLUTIONS.map((item) => (
            <motion.div key={item.id} variants={itemVariants}>
              <SolutionCard item={item} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
