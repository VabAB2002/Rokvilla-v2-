'use client'

import Link from 'next/link'
import { ProjectCard } from '@/components/ui/ProjectCard'
import type { Project } from '@/types/project'

interface ProjectCardLinkProps {
  readonly project: Project
  readonly heightClass: string
}

export function ProjectCardLink({ project, heightClass }: ProjectCardLinkProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="block rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
    >
      <ProjectCard project={project} heightClass={heightClass} />
    </Link>
  )
}
