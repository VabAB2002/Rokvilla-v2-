'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { PROJECTS } from '@/lib/constants/projects'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { makeFadeUpVariants, TRANSITION_SMOOTH, EASE_OUT_EXPO } from '@/lib/motion'
import type { ProjectCategory } from '@/types/questionnaire'

type FilterTab = 'all' | ProjectCategory

const TABS: ReadonlyArray<{ readonly id: FilterTab; readonly label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'residential', label: 'Residential' },
  { id: 'commercial', label: 'Commercial' },
  { id: 'interior', label: 'Interior' },
] as const

export function ProjectsSection() {
  const [activeTab, setActiveTab] = useState<FilterTab>('all')
  const reducedMotion = useReducedMotion()
  const fadeVariants = makeFadeUpVariants(reducedMotion)

  const filteredProjects = useMemo(
    () =>
      activeTab === 'all'
        ? PROJECTS
        : PROJECTS.filter((p) => p.category === activeTab),
    [activeTab],
  )

  return (
    <section id="projects" aria-labelledby="projects-heading" className="bg-white py-24 md:py-32 lg:py-36">
      {/* Header + tabs — contained */}
      <div className="mx-auto max-w-7xl px-6 md:px-12 xl:px-16">
        <AnimatedSection className="text-center">
          <h2 id="projects-heading" className="font-display text-3xl font-medium uppercase text-obsidian md:text-4xl lg:text-5xl">
            Projects
          </h2>
          <p className="mt-3 font-body text-base tracking-wide text-slate md:text-lg">
            From Home to Industries
          </p>
        </AnimatedSection>

        {/* Filter tabs — horizontal scroll on mobile */}
        <AnimatedSection delay={0.15} className="mt-12">
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`shrink-0 rounded-[2px] border px-5 min-h-[44px] inline-flex items-center font-body text-[13px] uppercase tracking-[0.08em] transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'border-terracotta bg-terracotta text-bone'
                    : 'border-limestone text-slate hover:border-obsidian/30 hover:text-obsidian active:text-obsidian'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </AnimatedSection>
      </div>

      {/* Project grid — edge-to-edge */}
      <div className="mt-10 px-3 md:px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
            transition={{ duration: reducedMotion ? 0.15 : 0.35, ease: EASE_OUT_EXPO }}
            className="grid gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-3"
          >
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.id}
                variants={fadeVariants}
                initial="hidden"
                animate="visible"
                transition={{ ...TRANSITION_SMOOTH, delay: reducedMotion ? 0 : i * 0.08 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
