'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Service } from '@/types/service'
import { EASE_OUT_QUART } from '@/lib/motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useTouchDevice } from '@/hooks/useTouchDevice'

interface ServiceCardProps {
  readonly service: Service
  readonly heightClass: string
}

export function ServiceCard({ service, heightClass }: ServiceCardProps) {
  const reducedMotion = useReducedMotion()
  const isTouch = useTouchDevice()

  return (
    <Link href={service.href}>
      <motion.div
        className="group relative cursor-pointer overflow-hidden rounded-sm"
        initial="rest"
        whileHover={reducedMotion || isTouch ? undefined : 'hover'}
        whileTap={reducedMotion ? undefined : 'hover'}
      >
        <div className={`relative overflow-hidden ${heightClass}`}>
          {/* Image with scale on hover/tap */}
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
              sizes="(max-width: 767px) 80vw, (max-width: 1024px) 50vw, 33vw"
            />
          </motion.div>

          {/* Vignette — darkened edges all around */}
          <div
            className="pointer-events-none absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.4)]"
            aria-hidden="true"
          />

          {/* Bottom gradient overlay with text and arrow */}
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-obsidian/80 via-obsidian/40 to-transparent px-6 pb-3 pt-16">
            <div>
              <h3 className="font-display text-xl font-medium text-bone md:text-2xl">
                {service.title}
              </h3>
              <p className="mt-1 font-body text-[15px] leading-relaxed text-bone/90">
                {service.description}
              </p>
            </div>
            <span
              className="mb-1 text-xl text-bone transition-transform duration-300 ease-out group-hover:translate-x-1"
              aria-hidden="true"
            >
              &rarr;
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
