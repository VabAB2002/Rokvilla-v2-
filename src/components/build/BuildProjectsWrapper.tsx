'use client'

import { ProjectsCarouselSection } from '@/components/sections/ProjectsCarouselSection'
import { PROJECTS } from '@/lib/constants/projects'
import type { ProjectCardData } from '@/components/ui/ProjectCard'

type BaseItem = ProjectCardData & { readonly id: string }

const BUILD_ITEMS: ReadonlyArray<BaseItem> = PROJECTS.map((p) => ({
  id: p.id,
  name: p.name,
  category: p.category,
  image: p.image,
}))

const BUILD_TABS = [
  { id: 'all', label: 'All' },
  { id: 'residential', label: 'Residential' },
  { id: 'commercial', label: 'Commercial' },
  { id: 'interior', label: 'Interior' },
  { id: 'industry', label: 'Industry' },
] as const

export function BuildProjectsWrapper() {
  return (
    <ProjectsCarouselSection
      items={BUILD_ITEMS}
      tabs={BUILD_TABS}
      heading="Projects"
      subtitle="From Home to Industries"
      sectionId="projects"
      viewAllHref="/projects"
    />
  )
}
