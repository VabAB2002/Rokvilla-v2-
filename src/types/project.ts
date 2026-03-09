import type { ProjectCategory, LocationCity } from './questionnaire'

export interface Project {
  readonly id: string
  readonly name: string
  readonly category: ProjectCategory
  readonly location: LocationCity
  readonly image: string
  readonly description: string
  readonly year: number
}
