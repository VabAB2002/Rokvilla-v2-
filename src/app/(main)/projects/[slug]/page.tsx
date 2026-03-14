import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { PROJECTS, getProjectBySlug } from '@/lib/constants/projects'
import { ProjectDetailHero } from '@/components/projects/ProjectDetailHero'
import { ProjectVisionSection } from '@/components/projects/ProjectVisionSection'
import { ProjectBentoGallery } from '@/components/projects/ProjectBentoGallery'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildBreadcrumbSchema } from '@/lib/seo/schemas'
import { SITE_URL } from '@/lib/seo/constants'

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
      images: [{ url: new URL(project.heroImage, SITE_URL).href }],
    },
  }
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) notFound()

  return (
    <main>
      <JsonLd
        schema={buildBreadcrumbSchema([
          { name: 'Home', url: SITE_URL },
          { name: 'Projects', url: `${SITE_URL}/projects` },
          { name: project.name, url: `${SITE_URL}/projects/${project.slug}` },
        ])}
      />
      <ProjectDetailHero project={project} />
      <ProjectVisionSection project={project} />
      <ProjectBentoGallery
        images={project.galleryImages}
        projectName={project.name}
      />
    </main>
  )
}
