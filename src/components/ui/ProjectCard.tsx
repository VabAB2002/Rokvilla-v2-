'use client'

import Image from 'next/image'
import * as m from 'framer-motion/m'
import { EASE_OUT_QUART } from '@/lib/motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useTouchDevice } from '@/hooks/useTouchDevice'

export interface ProjectCardData {
  readonly name: string
  readonly category: string
  readonly image: string
}

interface ProjectCardProps {
  readonly project: ProjectCardData
  readonly heightClass: string
}

export function ProjectCard({ project, heightClass }: ProjectCardProps) {
  const reducedMotion = useReducedMotion()
  const isTouch = useTouchDevice()

  return (
    <m.div
      className="group relative cursor-pointer overflow-hidden rounded-sm"
      initial="rest"
      whileHover={reducedMotion || isTouch ? undefined : 'hover'}
      whileTap={reducedMotion ? undefined : 'hover'}
    >
      <div className={`relative overflow-hidden ${heightClass}`}>
        {/* Image with scale on hover/tap */}
        <m.div
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
        </m.div>

        {/* Vignette — darkened edges all around */}
        <div
          className="pointer-events-none absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.4)]"
          aria-hidden="true"
        />

        {/* Bottom gradient overlay with text and arrow */}
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-obsidian/80 via-obsidian/40 to-transparent px-6 pb-2 pt-16">
          <div>
            <span className="font-accent text-[13px] uppercase tracking-[0.14em] text-bone/90">
              {project.category}
            </span>
            <h3 className="mt-0.5 font-display text-lg font-medium text-bone md:text-xl">
              {project.name}
            </h3>
          </div>
          <span
            className="mb-1 text-xl text-bone transition-transform duration-300 ease-out group-hover:translate-x-1"
            aria-hidden="true"
          >
            &rarr;
          </span>
        </div>
      </div>
    </m.div>
  )
}
