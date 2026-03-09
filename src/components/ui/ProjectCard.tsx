'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import type { Project } from '@/types/project'
import { glassOverlayVariants, glassContentVariants, EASE_OUT_QUART } from '@/lib/motion'

interface ProjectCardProps {
  readonly project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      className="group relative cursor-pointer overflow-hidden rounded-[4px] shadow-card transition-shadow duration-300 hover:shadow-card-hover"
      initial="rest"
      whileHover="hover"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {/* Image with scale on hover */}
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

        {/* Glassmorphism overlay */}
        <motion.div
          className="absolute inset-x-0 bottom-0 flex h-full flex-col justify-end border-t border-white/10 bg-obsidian/50 p-5 backdrop-blur-md"
          variants={glassOverlayVariants}
        >
          <motion.span
            className="font-accent text-[11px] uppercase tracking-[0.14em] text-bone/60"
            variants={glassContentVariants}
          >
            {project.category}
          </motion.span>
          <motion.h3
            className="mt-1 font-display text-xl font-medium text-bone"
            variants={glassContentVariants}
          >
            {project.name}
          </motion.h3>
        </motion.div>
      </div>
    </motion.div>
  )
}
