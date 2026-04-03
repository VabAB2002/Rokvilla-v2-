import type { Metadata } from 'next'
import { ProjectsHero } from '@/components/projects/ProjectsHero'
import { SITE_URL } from '@/lib/seo/constants'
import { ProjectsGrid } from '@/components/projects/ProjectsGrid'
import { PROJECTS } from '@/lib/constants/projects'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Explore our portfolio of residential, commercial, and interior projects across Hubballi, Dharwad, Ballari, and Bijapur.',
  alternates: { canonical: `${SITE_URL}/projects` },
  openGraph: {
    title: 'Portfolio | RokVilla',
    url: `${SITE_URL}/projects`,
    description:
      'Explore our portfolio of residential, commercial, and interior projects across Hubballi, Dharwad, Ballari, and Bijapur.',
  },
}

export default function ProjectsPage() {
  return (
    <>
      <ProjectsHero totalCount={PROJECTS.length} />
      <ProjectsGrid projects={PROJECTS} />
    </>
  )
}
