import type { LocationCity } from './questionnaire'

export interface Location {
  readonly id: LocationCity
  readonly city: string
  readonly address: string
  readonly phone: string
  readonly email: string
  readonly lat: number
  readonly lng: number
}
