'use client'

import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { ProjectCard, type ProjectCardData } from '@/components/ui/ProjectCard'
import { CarouselTrack } from '@/components/ui/CarouselTrack'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useCarousel, useVisibleCount } from '@/hooks/useCarousel'
import { EASE_OUT_EXPO } from '@/lib/motion'

type BaseItem = ProjectCardData & { readonly id: string }

interface FilterTab {
  readonly id: string
  readonly label: string
}

interface ProjectsCarouselSectionProps {
  readonly items: ReadonlyArray<BaseItem>
  readonly tabs: ReadonlyArray<FilterTab>
  readonly heading?: string
  readonly subtitle?: string
  readonly sectionId?: string
  readonly viewAllHref?: string | null
  readonly matchesTab?: (item: BaseItem, tabId: string) => boolean
}

const GAP_MOBILE = 12
const GAP_DESKTOP = 16

const defaultMatchesTab = (item: BaseItem, tabId: string): boolean =>
  item.category === tabId

export function ProjectsCarouselSection({
  items,
  tabs,
  heading = 'Projects',
  subtitle = 'Browse our portfolio',
  sectionId = 'projects',
  viewAllHref = null,
  matchesTab = defaultMatchesTab,
}: ProjectsCarouselSectionProps) {
  const [activeTab, setActiveTab] = useState<string>(tabs[0]?.id ?? 'all')
  const reducedMotion = useReducedMotion()
  const visibleCount = useVisibleCount()

  const filteredProjects = useMemo(
    () =>
      activeTab === 'all'
        ? items
        : items.filter((p) => matchesTab(p, activeTab)),
    [activeTab, items, matchesTab],
  )

  const gap = visibleCount === 1 ? GAP_MOBILE : GAP_DESKTOP

  const carousel = useCarousel({
    count: filteredProjects.length,
    visibleCount,
  })

  // Reset carousel position when filter changes
  useEffect(() => {
    carousel.goTo(0)
  }, [activeTab, carousel.goTo])

  const headingId = `${sectionId}-heading`

  return (
    <section id={sectionId} aria-labelledby={headingId} className="bg-white py-12 md:py-32 lg:py-36">
      {/* Header + tabs */}
      <div className="mx-auto max-w-7xl px-6 md:px-12 xl:px-16">
        <AnimatedSection className="text-center">
          <h2 id={headingId} className="font-display text-3xl font-medium uppercase text-obsidian md:text-4xl lg:text-5xl">
            {heading}
          </h2>
          <p className="mt-3 font-body text-base tracking-wide text-slate md:text-lg">
            {subtitle}
          </p>
        </AnimatedSection>

        {/* Filter tabs */}
        <AnimatedSection delay={0.15} className="mt-12">
          <div className="flex justify-center gap-2 overflow-x-auto no-scrollbar">
            {tabs.map((tab) => (
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

      {/* Carousel */}
      <div className="mx-auto mt-10 max-w-7xl px-6 md:px-12 xl:px-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: reducedMotion ? 0.1 : 0.25, ease: EASE_OUT_EXPO }}
          >
            <CarouselTrack
              currentIndex={carousel.currentIndex}
              visibleCount={visibleCount}
              totalCount={filteredProjects.length}
              canGoPrev={carousel.canGoPrev}
              canGoNext={carousel.canGoNext}
              goPrev={carousel.goPrev}
              goNext={carousel.goNext}
              goTo={carousel.goTo}
              onDragEnd={carousel.onDragEnd}
              dotCount={carousel.dotCount}
              gap={gap}
            >
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="shrink-0"
                  style={{
                    width: `calc((100% - ${(visibleCount - 1) * gap}px) / ${visibleCount})`,
                  }}
                >
                  <ProjectCard project={project} />
                </div>
              ))}
            </CarouselTrack>
          </motion.div>
        </AnimatePresence>

        {/* View all link */}
        {viewAllHref != null && (
          <div className="mt-14 flex flex-col items-center gap-3">
            <Link
              href={viewAllHref}
              className="group inline-flex items-center gap-3 border border-obsidian/15 px-8 py-3 font-accent text-[12px] uppercase tracking-[0.18em] text-obsidian/80 transition-all duration-300 hover:border-terracotta hover:text-terracotta"
            >
              View All Projects
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                &rarr;
              </span>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
