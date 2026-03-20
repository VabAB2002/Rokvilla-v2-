'use client'

import { useRef, useCallback, useEffect } from 'react'
import Image from 'next/image'
import * as m from 'framer-motion/m'
import { useMotionValue, useMotionTemplate, useSpring } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useIsLowPowerDevice } from '@/hooks/useIsLowPowerDevice'
import { makeHeroContainerVariants, makeHeroItemVariants } from '@/lib/motion'

/* ── Shared text content ── */

interface TextContentProps {
  readonly headingClass: string
  readonly subtitleClass: string
  readonly captionClass: string
}

function TextContent({ headingClass, subtitleClass, captionClass }: TextContentProps) {
  return (
    <div className="flex flex-col items-center text-center px-6">
      <h1
        className={`font-display font-bold uppercase leading-[0.85] text-[clamp(4rem,12vw,10rem)] ${headingClass}`}
      >
        ROKVILLA
      </h1>
      <p
        className={`font-display font-light leading-snug mt-4 text-[clamp(1.5rem,3vw,3rem)] ${subtitleClass}`}
      >
        Built to Endure.
      </p>
      <p className={`font-body text-base md:text-lg mt-3 ${captionClass}`}>
        Architecture studio in Karnataka.
      </p>
    </div>
  )
}

/* ── Main hero ── */

const MASK_RADIUS = 200

export function AboutHero() {
  const reducedMotion = useReducedMotion()
  const isLowPower = useIsLowPowerDevice()
  const sectionRef = useRef<HTMLElement>(null)

  const containerVariants = makeHeroContainerVariants(reducedMotion)
  const itemVariants = makeHeroItemVariants(reducedMotion)

  // Cursor tracking with spring smoothing
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const maskR = useMotionValue(0)
  const springConfig = { stiffness: 300, damping: 40 }
  const smoothX = useSpring(mouseX, reducedMotion ? { stiffness: 1000, damping: 100 } : springConfig)
  const smoothY = useSpring(mouseY, reducedMotion ? { stiffness: 1000, damping: 100 } : springConfig)

  // CSS radial-gradient mask that follows the cursor
  const maskImage = useMotionTemplate`radial-gradient(circle ${maskR}px at ${smoothX}px ${smoothY}px, black 80%, transparent 100%)`

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      mouseX.set(e.clientX - rect.left)
      mouseY.set(e.clientY - rect.top)
    },
    [mouseX, mouseY],
  )

  // Center the mask and grow it on mount
  useEffect(() => {
    if (typeof window === 'undefined') return
    const w = window.innerWidth
    const h = window.innerHeight
    mouseX.set(w / 2)
    mouseY.set(h / 2)
    // Grow mask radius after entrance animation
    const timer = setTimeout(() => maskR.set(MASK_RADIUS), reducedMotion ? 100 : 800)
    return () => clearTimeout(timer)
  }, [mouseX, mouseY, maskR, reducedMotion])

  return (
    <section
      ref={sectionRef}
      aria-label="About hero"
      className="relative min-h-dvh overflow-hidden cursor-crosshair"
      onMouseMove={handleMouseMove}
    >
      {/* Layer 1: Default (white bg, dark text) — always visible */}
      <m.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="absolute inset-0 z-0 flex items-center justify-center bg-white"
      >
        <m.div variants={itemVariants}>
          <TextContent
            headingClass="text-obsidian"
            subtitleClass="text-slate"
            captionClass="text-stone"
          />
        </m.div>
      </m.div>

      {/* Layer 2: Reveal (photo bg, light text) — masked by cursor circle */}
      <m.div
        className="absolute inset-0 z-10 flex items-center justify-center"
        style={{
          WebkitMaskImage: maskImage,
          maskImage: maskImage,
        }}
      >
        {/* Background photo */}
        <Image
          src="/00 FINISHED/09 ASHOK RESIDENCE/09_ASHOK RESIDENCE_01.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          aria-hidden="true"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-void/50" />
        {/* Light text on photo */}
        <div className="relative z-10">
          <TextContent
            headingClass="text-bone"
            subtitleClass="text-bone/80"
            captionClass="text-bone/60"
          />
        </div>
      </m.div>

      {/* Scroll indicator — desktop only */}
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reducedMotion ? 0.3 : 1.6, duration: reducedMotion ? 0.2 : 0.6 }}
        className="absolute inset-x-0 bottom-8 z-20 hidden justify-center md:flex"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`${!reducedMotion && !isLowPower ? 'animate-bounce-gentle' : ''} text-stone`}
          aria-hidden="true"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </m.div>
    </section>
  )
}
