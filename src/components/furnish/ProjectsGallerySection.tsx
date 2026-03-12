'use client'

import { useState, useMemo, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { EASE_OUT_QUART } from '@/lib/motion'
import { ROOM_CATEGORIES, FURNISH_PROJECTS } from '@/lib/constants/furnish'

export function ProjectsGallerySection() {
  const reducedMotion = useReducedMotion()
  const [activeFilter, setActiveFilter] = useState('all')

  const filteredProjects = useMemo(
    () =>
      activeFilter === 'all'
        ? FURNISH_PROJECTS
        : FURNISH_PROJECTS.filter((p) => p.rooms.includes(activeFilter)),
    [activeFilter],
  )

  const handleFilter = useCallback((id: string) => {
    setActiveFilter(id)
  }, [])

  return (
    <section
      id="furnish-projects"
      aria-labelledby="furnish-projects-heading"
      className="bg-white py-12 md:py-32 lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12 xl:px-16">
        {/* Header */}
        <AnimatedSection className="text-center">
          <h2
            id="furnish-projects-heading"
            className="font-display text-3xl font-medium text-obsidian md:text-4xl lg:text-5xl"
          >
            Our Projects
          </h2>
          <p className="mt-3 font-body text-base tracking-wide text-slate md:text-lg">
            End-to-End Interior Solutions
          </p>
        </AnimatedSection>

        {/* Filter tabs */}
        <AnimatedSection delay={0.15} className="mt-12">
          <div className="flex flex-wrap justify-center gap-3">
            {ROOM_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleFilter(cat.id)}
                className={`inline-flex items-center gap-2 rounded-[2px] border px-4 min-h-[44px] font-body text-[12px] uppercase tracking-[0.08em] transition-all duration-200 ${
                  activeFilter === cat.id
                    ? 'border-terracotta bg-terracotta text-bone'
                    : 'border-limestone text-slate hover:border-obsidian/30 hover:text-obsidian'
                }`}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d={cat.icon} />
                </svg>
                {cat.label}
              </button>
            ))}
          </div>
        </AnimatedSection>
      </div>

      {/* Project cards — edge-to-edge on mobile */}
      <AnimatedSection delay={0.25} className="mt-14">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: reducedMotion ? 0.1 : 0.25, ease: EASE_OUT_QUART }}
            className="flex gap-3 overflow-x-auto scroll-snap-x no-scrollbar px-3 pb-4 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:px-4"
          >
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group relative w-[85vw] max-w-[400px] shrink-0 scroll-snap-start overflow-hidden rounded-[4px] md:w-auto md:max-w-none"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <motion.div
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.6, ease: EASE_OUT_QUART }}
                    className="h-full w-full"
                  >
                    <Image
                      src={project.image}
                      alt={`${project.title} — ${project.category}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 85vw, 33vw"
                    />
                  </motion.div>

                  {/* Gradient overlay */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-obsidian/80 via-obsidian/40 to-transparent p-5 pt-16">
                    <span className="font-accent text-[11px] uppercase tracking-[0.14em] text-bone/60">
                      {project.category}
                    </span>
                    <h3 className="font-display text-lg font-medium text-bone">
                      {project.title}
                    </h3>
                    <p className="mt-0.5 font-body text-xs text-bone/50">
                      {project.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </AnimatedSection>
    </section>
  )
}
