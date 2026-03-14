import { PROJECTS } from './projects'

export interface GalleryItem {
  readonly id: string
  readonly name: string
  readonly subtitle: string
  readonly image: string
  readonly href: string
}

const GALLERY_IDS = [
  'sripradha',
  'raj-residence',
  'cedar-homestore',
  'spectrum-industry',
  'pavan-vj',
] as const

export const GALLERY_PROJECTS: ReadonlyArray<GalleryItem> = GALLERY_IDS.map(
  (id) => {
    const project = PROJECTS.find((p) => p.id === id)
    if (!project) {
      throw new Error(`[gallery] project "${id}" not found in PROJECTS`)
    }
    return {
      id: project.id,
      name: project.name,
      subtitle: `${project.builtUpArea} · ${project.location.charAt(0).toUpperCase() + project.location.slice(1)} · ${project.year}`,
      image: project.heroImage,
      href: `/projects/${project.slug}`,
    }
  },
)
