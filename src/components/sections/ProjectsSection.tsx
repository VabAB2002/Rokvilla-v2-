'use client'

import { useState, useMemo, useRef, useCallback } from 'react'
import * as m from 'framer-motion/m'
import { AnimatePresence } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap-config'
import Link from 'next/link'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { ProjectCardLink } from '@/components/projects/ProjectCardLink'
import { ScrollIndicatorDots } from '@/components/ui/ScrollIndicatorDots'
import { HOMEPAGE_PROJECTS } from '@/lib/constants/projects'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import { makeFadeUpVariants, TRANSITION_SMOOTH, EASE_OUT_EXPO } from '@/lib/motion'
import type { ProjectCategory } from '@/types/questionnaire'

type FilterTab = 'all' | ProjectCategory

const TABS: ReadonlyArray<{ readonly id: FilterTab; readonly label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'residential', label: 'Residential' },
  { id: 'commercial', label: 'Commercial' },
  { id: 'interior', label: 'Interior' },
  { id: 'industry', label: 'Industry' },
] as const

export function ProjectsSection() {
  const [activeTab, setActiveTab] = useState<FilterTab>('all')
  const reducedMotion = useReducedMotion()
  const fadeVariants = makeFadeUpVariants(reducedMotion)
  const scrollRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const { activeIndex } = useScrollProgress(scrollRef)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo('.projects-heading', {
        y: 40,
      }, {
        y: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: '.projects-heading',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    })
    return () => mm.revert()
  }, { scope: sectionRef })

  const handleDotClick = useCallback((index: number) => {
    const container = scrollRef.current
    if (!container) return
    const child = container.children[index] as HTMLElement | undefined
    child?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }, [])

  const filteredProjects = useMemo(
    () =>
      activeTab === 'all'
        ? HOMEPAGE_PROJECTS
        : HOMEPAGE_PROJECTS.filter((p) => p.category === activeTab),
    [activeTab],
  )

  return (
    <section ref={sectionRef} id="projects" aria-labelledby="projects-heading" className="bg-white py-12 md:py-32 lg:py-36">
      {/* Header + tabs — contained */}
      <div className="mx-auto max-w-7xl px-6 md:px-12 xl:px-16">
        <div className="projects-heading">
          <AnimatedSection className="text-center">
            <h2 id="projects-heading" className="font-display text-3xl font-medium uppercase text-obsidian md:text-4xl lg:text-5xl">
              Projects
            </h2>
            <p className="mt-3 font-body text-base tracking-wide text-slate md:text-lg">
              From Home to Industries
            </p>
          </AnimatedSection>
        </div>

        {/* Filter tabs — desktop only */}
        <AnimatedSection delay={0.15} className="mt-10 hidden md:block md:mt-12">
          <div className="flex justify-center gap-2 md:gap-3">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`shrink-0 rounded-full border px-4 md:px-5 min-h-[44px] inline-flex items-center font-body text-[12px] md:text-[13px] uppercase tracking-[0.08em] transition-all duration-200 ${
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

      {/* Mobile project cards — horizontal scroll snap */}
      <div className="mt-10 md:hidden">
        <div
          ref={scrollRef}
          className="flex gap-2 overflow-x-auto snap-x snap-mandatory no-scrollbar px-[10vw] pb-2"
        >
          {HOMEPAGE_PROJECTS.map((project) => (
            <div
              key={project.id}
              className="w-[78vw] max-w-[340px] shrink-0 snap-center"
            >
              <ProjectCardLink project={project} heightClass="h-56" />
            </div>
          ))}
        </div>
        <ScrollIndicatorDots
          count={HOMEPAGE_PROJECTS.length}
          activeIndex={activeIndex}
          onDotClick={handleDotClick}
          className="mt-4"
        />
      </div>

      {/* Desktop project cards — flex wrap grid */}
      <div className="mt-10 hidden md:block">
        <AnimatePresence mode="wait">
          <m.div
            key={activeTab}
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
            transition={{ duration: reducedMotion ? 0.15 : 0.35, ease: EASE_OUT_EXPO }}
            className="flex flex-row flex-wrap justify-center gap-3"
          >
            {filteredProjects.map((project, i) => (
              <m.div
                key={project.id}
                variants={fadeVariants}
                initial="hidden"
                animate="visible"
                transition={{ ...TRANSITION_SMOOTH, delay: reducedMotion ? 0 : i * 0.08 }}
                className="w-[calc(50%-6px)] lg:w-[calc(33.333%-8px)]"
              >
                <ProjectCardLink project={project} heightClass="h-80" />
              </m.div>
            ))}
          </m.div>
        </AnimatePresence>
      </div>

      {/* Show more */}
      <div className="mx-auto mt-14 flex max-w-7xl flex-col items-center gap-3 px-6 md:px-12 xl:px-16">
        <Link
          href="/projects"
          className="group inline-flex items-center gap-3 rounded-full border-[1.5px] border-terracotta/30 bg-terracotta/[0.07] backdrop-blur-sm px-8 py-3 font-accent text-[12px] uppercase tracking-[0.18em] text-terracotta transition-all duration-300 hover:border-terracotta/50 hover:bg-terracotta/[0.12]"
        >
          View All Projects
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
            &rarr;
          </span>
        </Link>
      </div>
    </section>
  )
}
