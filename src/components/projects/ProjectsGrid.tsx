'use client'

import { useState, useMemo, useDeferredValue, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { ProjectCardLink } from '@/components/projects/ProjectCardLink'
import {
  ProjectsFilterBar,
  type FilterCategory,
  type FilterLocation,
  type SortOrder,
} from '@/components/projects/ProjectsFilterBar'
import { ProjectsEmptyState } from '@/components/projects/ProjectsEmptyState'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { makeFadeUpVariants, TRANSITION_SMOOTH, EASE_OUT_EXPO } from '@/lib/motion'
import type { Project } from '@/types/project'

interface ProjectsGridProps {
  readonly projects: ReadonlyArray<Project>
}

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<FilterCategory>('all')
  const [location, setLocation] = useState<FilterLocation>('all')
  const [sortOrder, setSortOrder] = useState<SortOrder>('year-desc')
  const reducedMotion = useReducedMotion()
  const fadeVariants = makeFadeUpVariants(reducedMotion)

  const deferredSearch = useDeferredValue(search.trim().toLowerCase())

  const filtered = useMemo(() => {
    let result = [...projects]

    if (deferredSearch) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(deferredSearch) ||
          p.description.toLowerCase().includes(deferredSearch),
      )
    }

    if (category !== 'all') {
      result = result.filter((p) => p.category === category)
    }

    if (location !== 'all') {
      result = result.filter((p) => p.location === location)
    }

    return sortOrder === 'alpha'
      ? [...result].sort((a, b) => a.name.localeCompare(b.name))
      : [...result].sort((a, b) => b.year - a.year)
  }, [projects, deferredSearch, category, location, sortOrder])

  const filterKey = `${deferredSearch}-${category}-${location}-${sortOrder}`

  const handleReset = useCallback(() => {
    setSearch('')
    setCategory('all')
    setLocation('all')
    setSortOrder('year-desc')
  }, [])

  return (
    <section className="bg-white pb-24 md:pb-32 lg:pb-36">
      {/* Filter bar — contained */}
      <div className="mx-auto max-w-7xl px-6 md:px-12 xl:px-16">
        <AnimatedSection delay={0.1}>
          <ProjectsFilterBar
            search={search}
            category={category}
            location={location}
            sortOrder={sortOrder}
            matchCount={filtered.length}
            onSearchChange={setSearch}
            onCategoryChange={setCategory}
            onLocationChange={setLocation}
            onSortChange={setSortOrder}
          />
        </AnimatedSection>
      </div>

      {/* Grid — edge-to-edge like homepage */}
      <div className="mt-10">
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ProjectsEmptyState onReset={handleReset} />
            </motion.div>
          ) : (
            <motion.div
              key={filterKey}
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
              transition={{
                duration: reducedMotion ? 0.15 : 0.35,
                ease: EASE_OUT_EXPO,
              }}
              className="flex flex-wrap justify-center gap-3 md:gap-4"
            >
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  variants={fadeVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{
                    ...TRANSITION_SMOOTH,
                    delay: reducedMotion ? 0 : i * 0.06,
                  }}
                  className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-11px)]"
                >
                  <ProjectCardLink project={project} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
