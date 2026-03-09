'use client'

import { motion } from 'framer-motion'
import { LocationMiniMap } from '@/components/ui/LocationMiniMap'
import type { Location } from '@/types/location'
import { glassOverlayVariants, glassContentVariants } from '@/lib/motion'

interface LocationCardProps {
  readonly location: Location
}

export function LocationCard({ location }: LocationCardProps) {
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`

  return (
    <motion.div
      className="relative cursor-pointer overflow-hidden rounded-[4px] border border-limestone/60 bg-white"
      initial="rest"
      whileHover="hover"
    >
      {/* Map */}
      <div className="relative h-48 overflow-hidden">
        <LocationMiniMap location={location} />

        {/* Glassmorphism overlay */}
        <motion.div
          className="absolute inset-x-0 bottom-0 flex h-full flex-col justify-end border-t border-white/10 bg-obsidian/50 p-6 backdrop-blur-md"
          variants={glassOverlayVariants}
        >
          <motion.h3
            className="font-display text-2xl font-medium text-bone"
            variants={glassContentVariants}
          >
            {location.city}
          </motion.h3>
          <motion.a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-2 font-body text-[13px] font-medium uppercase tracking-[0.08em] text-bone/70 transition-colors duration-200 hover:text-bone"
            variants={glassContentVariants}
          >
            Get Directions &rarr;
          </motion.a>
        </motion.div>
      </div>

      {/* City name strip (visible at rest) */}
      <div className="px-6 py-4">
        <h3 className="font-display text-xl font-medium text-obsidian">
          {location.city}
        </h3>
      </div>
    </motion.div>
  )
}
