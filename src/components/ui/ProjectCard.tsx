'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import type { Project } from '@/types/project'
import { EASE_OUT_QUART } from '@/lib/motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface ProjectCardProps {
  readonly project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const reducedMotion = useReducedMotion()

  return (
    <motion.div
      className="group relative cursor-pointer overflow-hidden rounded-[4px] shadow-card transition-shadow duration-300 hover:shadow-card-hover"
      initial="rest"
      whileHover={reducedMotion ? undefined : 'hover'}
      whileTap={reducedMotion ? undefined : 'hover'}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {/* Image with scale on hover/tap */}
        <motion.div
          className="h-full w-full"
          variants={{
            rest: { scale: 1 },
            hover: { scale: 1.04, transition: { duration: 0.6, ease: EASE_OUT_QUART } },
          }}
        >
          <Image
            src={project.image}
            alt={project.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </motion.div>

        {/* Always-visible gradient overlay with text */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-obsidian/80 via-obsidian/40 to-transparent p-5 pt-16">
          <span className="font-accent text-[11px] uppercase tracking-[0.14em] text-bone/60">
            {project.category}
          </span>
          <h3 className="mt-1 font-display text-lg font-medium text-bone md:text-xl">
            {project.name}
          </h3>
        </div>
      </div>
    </motion.div>
  )
}
