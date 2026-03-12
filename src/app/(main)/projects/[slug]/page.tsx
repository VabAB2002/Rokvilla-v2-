import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { PROJECTS, getProjectBySlug } from '@/lib/constants/projects'
import { ProjectDetailHero } from '@/components/projects/ProjectDetailHero'
import { ProjectVisionSection } from '@/components/projects/ProjectVisionSection'
import { ProjectBentoGallery } from '@/components/projects/ProjectBentoGallery'

interface ProjectPageProps {
  readonly params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return {}

  return {
    title: project.name,
    description: project.vision,
    openGraph: {
      images: [{ url: project.heroImage }],
    },
  }
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) notFound()

  return (
    <main>
      <ProjectDetailHero project={project} />
      <ProjectVisionSection project={project} />
      <ProjectBentoGallery
        images={project.galleryImages}
        projectName={project.name}
      />
    </main>
  )
}
