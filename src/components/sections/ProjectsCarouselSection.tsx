'use client'

import { useState, useMemo, useEffect, useRef, useCallback } from 'react'
import * as m from 'framer-motion/m'
import { AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { ProjectCard, type ProjectCardData } from '@/components/ui/ProjectCard'
import { CarouselTrack } from '@/components/ui/CarouselTrack'
import { ScrollIndicatorDots } from '@/components/ui/ScrollIndicatorDots'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useCarousel, useVisibleCount } from '@/hooks/useCarousel'
import { useScrollProgress } from '@/hooks/useScrollProgress'
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

  // Mobile scroll-snap tracking
  const scrollRef = useRef<HTMLDivElement>(null)
  const { activeIndex } = useScrollProgress(scrollRef)

  const handleDotClick = useCallback((index: number) => {
    const container = scrollRef.current
    if (!container) return
    const child = container.children[index] as HTMLElement | undefined
    child?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }, [])

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
        <AnimatedSection delay={0.15} className="mt-10 hidden md:mt-12 md:block">
          <div className="flex justify-center gap-2 md:gap-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`shrink-0 rounded-full border px-4 md:px-5 min-h-[40px] md:min-h-[44px] inline-flex items-center font-body text-[12px] md:text-[13px] uppercase tracking-[0.08em] transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'border-2 border-terracotta/40 bg-terracotta/[0.15] backdrop-blur-sm text-terracotta font-semibold shadow-sm'
                    : 'border-terracotta/20 bg-terracotta/[0.06] backdrop-blur-sm text-slate font-normal hover:border-terracotta/[0.35] hover:bg-terracotta/10 hover:text-obsidian'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </AnimatedSection>
      </div>

      {/* Mobile: scroll-snap carousel */}
      <div className="mt-10 md:hidden">
        <div
          ref={scrollRef}
          className="flex gap-2 overflow-x-auto snap-x snap-mandatory no-scrollbar px-[10vw] pb-2"
        >
          {items.map((project) => (
            <div
              key={project.id}
              className="w-[78vw] max-w-[340px] shrink-0 snap-center"
            >
              <ProjectCard project={project} heightClass="h-56" />
            </div>
          ))}
        </div>
        <ScrollIndicatorDots
          count={items.length}
          activeIndex={activeIndex}
          onDotClick={handleDotClick}
          className="mt-4"
        />
      </div>

      {/* Desktop: CarouselTrack */}
      <div className="mx-auto mt-10 hidden max-w-7xl px-6 md:block md:px-12 xl:px-16">
        <AnimatePresence mode="wait">
          <m.div
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
                  <ProjectCard project={project} heightClass="h-56 md:h-80" />
                </div>
              ))}
            </CarouselTrack>
          </m.div>
        </AnimatePresence>
      </div>

      {/* View all link */}
      {viewAllHref != null && (
        <div className="mx-auto mt-14 flex max-w-7xl flex-col items-center gap-3 px-6 md:px-12 xl:px-16">
          <Link
            href={viewAllHref}
            className="group inline-flex items-center gap-3 rounded-full border-[1.5px] border-terracotta/30 bg-terracotta/[0.07] backdrop-blur-sm px-8 py-3 font-accent text-[12px] uppercase tracking-[0.18em] text-terracotta transition-all duration-300 hover:border-terracotta/50 hover:bg-terracotta/[0.12]"
          >
            View All Projects
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
              &rarr;
            </span>
          </Link>
        </div>
      )}
    </section>
  )
}
