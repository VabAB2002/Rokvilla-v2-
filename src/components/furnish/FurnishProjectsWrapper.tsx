'use client'

import { useCallback } from 'react'
import { ProjectsSection } from '@/components/sections/ProjectsSection'
import { FURNISH_PROJECTS, ROOM_CATEGORIES } from '@/lib/constants/furnish'
import type { ProjectCardData } from '@/components/ui/ProjectCard'

type BaseItem = ProjectCardData & { readonly id: string }

/* Map furnish data → BaseItem shape for ProjectsSection */
const FURNISH_ITEMS: ReadonlyArray<BaseItem> = FURNISH_PROJECTS.map((p) => ({
  id: p.id,
  name: p.title,
  category: p.category,
  image: p.image,
}))

/* Lookup table: project id → room tags (for multi-category filtering) */
const ROOMS_BY_ID = new Map(
  FURNISH_PROJECTS.map((p) => [p.id, p.rooms]),
)

/* Strip icons — ProjectsSection uses plain text tabs to match the build page */
const FURNISH_TABS = ROOM_CATEGORIES.map((c) => ({
  id: c.id,
  label: c.label,
}))

export function FurnishProjectsWrapper() {
  const matchesTab = useCallback(
    (item: BaseItem, tabId: string) =>
      ROOMS_BY_ID.get(item.id)?.includes(tabId) ?? false,
    [],
  )

  return (
    <ProjectsSection
      items={FURNISH_ITEMS}
      tabs={FURNISH_TABS}
      heading="Our Projects"
      subtitle="End-to-End Interior Solutions"
      sectionId="furnish-projects"
      viewAllHref={null}
      matchesTab={matchesTab}
    />
  )
}
