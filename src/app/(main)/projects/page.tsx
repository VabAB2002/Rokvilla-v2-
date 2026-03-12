import type { Metadata } from 'next'
import { ProjectsHero } from '@/components/projects/ProjectsHero'
import { ProjectsGrid } from '@/components/projects/ProjectsGrid'
import { PROJECTS } from '@/lib/constants/projects'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Explore our portfolio of residential, commercial, and interior projects across Hubli, Dharwad, and Ballari.',
}

export default function ProjectsPage() {
  return (
    <main>
      <ProjectsHero totalCount={PROJECTS.length} />
      <ProjectsGrid projects={PROJECTS} />
    </main>
  )
}
