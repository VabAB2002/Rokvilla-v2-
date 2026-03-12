import type { ProjectCategory, LocationCity } from './questionnaire'

export interface Project {
  readonly id: string
  readonly slug: string
  readonly name: string
  readonly category: ProjectCategory
  readonly location: LocationCity
  readonly image: string
  readonly description: string
  readonly year: number
  readonly heroImage: string
  readonly heroVideo?: string
  readonly galleryImages: ReadonlyArray<string>
  readonly vision: string
  readonly builtUpArea?: string
  readonly plotSize?: string
  readonly floors?: string
  readonly style?: string
}
