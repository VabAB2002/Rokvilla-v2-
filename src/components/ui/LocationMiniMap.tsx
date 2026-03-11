'use client'

import { useRef, useEffect, useState } from 'react'
import type { Location } from '@/types/location'
import { MAPBOX_STYLE, MAP_MINI_ZOOM } from '@/lib/mapbox'

interface LocationMiniMapProps {
  readonly location: Location
}

export function LocationMiniMap({ location }: LocationMiniMapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const [hasError, setHasError] = useState(false)

  // Inject Mapbox CSS once (shared guard across all instances)
  useEffect(() => {
    const MAPBOX_CSS_ID = 'mapbox-gl-css'
    if (!document.getElementById(MAPBOX_CSS_ID)) {
      const link = document.createElement('link')
      link.id = MAPBOX_CSS_ID
      link.rel = 'stylesheet'
      link.href = 'https://api.mapbox.com/mapbox-gl-js/v3.9.4/mapbox-gl.css'
      document.head.appendChild(link)
    }
  }, [])

  // Lazy init map only when card is visible (IntersectionObserver)
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
    if (!token || token === 'your_mapbox_token_here') {
      setHasError(true)
      return
    }

    let map: mapboxgl.Map | null = null
    let observer: IntersectionObserver | null = null
    let cancelled = false

    async function initMap() {
      try {
        const mapboxgl = (await import('mapbox-gl')).default
        if (cancelled) return
        mapboxgl.accessToken = token!

        map = new mapboxgl.Map({
          container: containerRef.current!,
          style: MAPBOX_STYLE,
          center: [location.lng, location.lat],
          zoom: MAP_MINI_ZOOM,
          attributionControl: false,
          interactive: false,
        })

        // Terracotta marker
        const markerEl = document.createElement('div')
        markerEl.innerHTML = `
          <svg width="24" height="32" viewBox="0 0 28 38" fill="none">
            <path d="M14 0C6.268 0 0 6.268 0 14c0 10.5 14 24 14 24s14-13.5 14-24C28 6.268 21.732 0 14 0z" fill="#EE7707"/>
            <circle cx="14" cy="14" r="6" fill="#FFFFFF"/>
          </svg>
        `

        new mapboxgl.Marker(markerEl)
          .setLngLat([location.lng, location.lat])
          .addTo(map)

        mapRef.current = map
      } catch {
        setHasError(true)
      }
    }

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          initMap()
          observer?.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    observer.observe(containerRef.current)

    return () => {
      cancelled = true
      observer?.disconnect()
      map?.remove()
      mapRef.current = null
    }
  }, [location.lat, location.lng])

  if (hasError) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-parchment">
        <p className="font-body text-xs text-stone">Map unavailable</p>
      </div>
    )
  }

  return <div ref={containerRef} className="h-full w-full" />
}
