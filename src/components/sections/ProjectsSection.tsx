'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { PROJECTS } from '@/lib/constants/projects'
import { fadeUpVariants, TRANSITION_SMOOTH, EASE_OUT_EXPO } from '@/lib/motion'
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

  const filteredProjects = useMemo(
    () =>
      activeTab === 'all'
        ? PROJECTS
        : PROJECTS.filter((p) => p.category === activeTab),
    [activeTab],
  )

  return (
    <section id="projects" aria-labelledby="projects-heading" className="bg-parchment py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Section header */}
        <AnimatedSection>
          <span className="font-accent text-[13px] uppercase tracking-[0.18em] text-terracotta">
            Projects
          </span>
          <h2 id="projects-heading" className="mt-4 font-display text-4xl font-medium text-obsidian md:text-5xl">
            From Home to Industries
          </h2>
        </AnimatedSection>

        {/* Filter tabs */}
        <AnimatedSection delay={0.15} className="mt-12">
          <div className="flex flex-wrap gap-2">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-[2px] border px-5 py-2 font-body text-[13px] uppercase tracking-[0.08em] transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'border-terracotta bg-terracotta text-bone'
                    : 'border-limestone text-slate hover:border-obsidian/30 hover:text-obsidian'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Project grid */}
        <div className="mt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
              className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filteredProjects.map((project, i) => (
                <motion.div
                  key={project.id}
                  variants={fadeUpVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ ...TRANSITION_SMOOTH, delay: i * 0.08 }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
