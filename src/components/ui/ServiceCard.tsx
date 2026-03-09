'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import type { Service } from '@/types/service'
import { EASE_OUT_QUART } from '@/lib/motion'

interface ServiceCardProps {
  readonly service: Service
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <motion.div
      className="group relative cursor-pointer overflow-hidden rounded-[4px]"
      initial="rest"
      whileHover="hover"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {/* Image with scale on hover */}
        <motion.div
          className="h-full w-full"
          variants={{
            rest: { scale: 1 },
            hover: { scale: 1.04, transition: { duration: 0.6, ease: EASE_OUT_QUART } },
          }}
        >
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </motion.div>

        {/* Always-visible gradient overlay with text */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-obsidian/80 via-obsidian/40 to-transparent p-6 pt-16">
          <h3 className="font-display text-2xl font-medium text-bone">
            {service.title}
          </h3>
          <p className="mt-2 font-body text-sm leading-relaxed text-bone/75">
            {service.description}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
