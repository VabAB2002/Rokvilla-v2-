import type { ServiceType } from './questionnaire'

export interface Service {
  readonly id: ServiceType
  readonly title: string
  readonly description: string
  readonly icon: string
  readonly href: string
  readonly image: string
}
