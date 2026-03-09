import { LocationMiniMap } from '@/components/ui/LocationMiniMap'
import type { Location } from '@/types/location'

interface LocationCardProps {
  readonly location: Location
}

export function LocationCard({ location }: LocationCardProps) {
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address)}`

  return (
    <div className="overflow-hidden rounded-[4px] border border-limestone/60 bg-white">
      {/* Map */}
      <div className="relative h-40 overflow-hidden sm:h-48">
        <LocationMiniMap location={location} />
      </div>

      {/* City name + directions */}
      <div className="px-6 py-4">
        <h3 className="font-display text-xl font-medium text-obsidian">
          {location.city}
        </h3>
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex min-h-[44px] items-center gap-2 font-body text-[13px] font-medium uppercase tracking-[0.08em] text-slate transition-colors duration-200 hover:text-terracotta active:text-terracotta"
        >
          Get Directions &rarr;
        </a>
      </div>
    </div>
  )
}
