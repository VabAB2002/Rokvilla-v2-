import type { Location } from '@/types/location'
import { LOCATIONS } from './constants/locations'

export const MAPBOX_STYLE = 'mapbox://styles/mapbox/light-v11'

export const MAP_DEFAULT_CENTER = {
  latitude: 15.32,
  longitude: 75.65,
} as const

export const MAP_DEFAULT_ZOOM = 8.2
export const MAP_MINI_ZOOM = 13

export function getMapBounds(locations: ReadonlyArray<Location>) {
  const lats = locations.map((l) => l.lat)
  const lngs = locations.map((l) => l.lng)

  return {
    sw: { lat: Math.min(...lats) - 0.2, lng: Math.min(...lngs) - 0.2 },
    ne: { lat: Math.max(...lats) + 0.2, lng: Math.max(...lngs) + 0.2 },
  }
}

export const mapLocations = LOCATIONS
