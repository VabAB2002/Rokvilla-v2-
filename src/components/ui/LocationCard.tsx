'use client'

import { motion } from 'framer-motion'
import { LocationMiniMap } from '@/components/ui/LocationMiniMap'
import { EASE_OUT_QUART } from '@/lib/motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useTouchDevice } from '@/hooks/useTouchDevice'
import type { Location } from '@/types/location'

interface LocationCardProps {
  readonly location: Location
}

export function LocationCard({ location }: LocationCardProps) {
  const reducedMotion = useReducedMotion()
  const isTouch = useTouchDevice()
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address)}`

  return (
    <a href={directionsUrl} target="_blank" rel="noopener noreferrer">
      <motion.div
        className="group relative cursor-pointer overflow-hidden rounded-sm"
        initial="rest"
        whileHover={reducedMotion || isTouch ? undefined : 'hover'}
        whileTap={reducedMotion ? undefined : 'hover'}
      >
        {/* Map — compact on mobile, proportional on desktop */}
        <div className="relative h-56 overflow-hidden md:h-auto md:aspect-[3/2]">
          <motion.div
            className="h-full w-full"
            variants={{
              rest: { scale: 1 },
              hover: { scale: 1.04, transition: { duration: 0.6, ease: EASE_OUT_QUART } },
            }}
          >
            <LocationMiniMap location={location} />
          </motion.div>

          {/* Vignette — darkened edges all around */}
          <div
            className="pointer-events-none absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.4)]"
            aria-hidden="true"
          />

          {/* Bottom gradient overlay with text */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-obsidian/80 via-obsidian/40 to-transparent p-6 pt-16">
            <h3 className="font-display text-xl font-medium text-bone md:text-2xl">
              {location.city}
            </h3>
            <p className="mt-2 font-body text-[13px] font-medium uppercase tracking-[0.08em] text-bone/75">
              Get Directions &rarr;
            </p>
          </div>
        </div>
      </motion.div>
    </a>
  )
}
