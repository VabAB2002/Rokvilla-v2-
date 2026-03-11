'use client'

import { motion } from 'framer-motion'
import {
  CookingPot,
  DoorClosed,
  Wine,
  Minimize2,
  Tv,
  BookOpen,
  LampCeiling,
  Lightbulb,
  Wallpaper,
  PaintRoller,
  Bath,
  Flame,
  DoorOpen,
  Armchair,
  BedDouble,
  type LucideIcon,
} from 'lucide-react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { EASE_OUT_EXPO } from '@/lib/motion'

/* ── Solution items ── */

interface SolutionItem {
  readonly id: string
  readonly label: string
  readonly icon: LucideIcon
}

const SOLUTIONS: ReadonlyArray<SolutionItem> = [
  { id: 'modular-kitchen', label: 'Modular Kitchen', icon: CookingPot },
  { id: 'storage-wardrobe', label: 'Storage and Wardrobe', icon: DoorClosed },
  { id: 'crockery-units', label: 'Crockery Units', icon: Wine },
  { id: 'space-saving', label: 'Space Saving Furniture', icon: Minimize2 },
  { id: 'tv-units', label: 'TV Units', icon: Tv },
  { id: 'study-tables', label: 'Study Tables', icon: BookOpen },
  { id: 'false-ceiling', label: 'False Ceiling', icon: LampCeiling },
  { id: 'lights', label: 'Lights', icon: Lightbulb },
  { id: 'wallpaper', label: 'Wallpaper', icon: Wallpaper },
  { id: 'wall-paint', label: 'Wall Paint', icon: PaintRoller },
  { id: 'bathroom', label: 'Bathroom', icon: Bath },
  { id: 'pooja-unit', label: 'Pooja Unit', icon: Flame },
  { id: 'foyer-designs', label: 'Foyer Designs', icon: DoorOpen },
  { id: 'movable-furniture', label: 'Movable Furniture', icon: Armchair },
  { id: 'kids-bedroom', label: 'Kids Bedroom', icon: BedDouble },
] as const

/* ── Item card ── */

function SolutionCard({ item }: { readonly item: SolutionItem }) {
  const Icon = item.icon

  return (
    <div className="group flex flex-col items-center gap-3 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-limestone/50 bg-parchment transition-all duration-300 group-hover:border-terracotta/30 group-hover:bg-terracotta/[0.06] group-hover:shadow-sm">
        <Icon
          size={28}
          strokeWidth={1.4}
          className="text-obsidian/70 transition-colors duration-300 group-hover:text-terracotta"
          aria-hidden="true"
        />
      </div>
      <span className="max-w-[120px] font-body text-[13px] leading-snug text-obsidian/80 transition-colors duration-300 group-hover:text-obsidian">
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
      className="bg-white py-24 md:py-32 lg:py-36"
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
