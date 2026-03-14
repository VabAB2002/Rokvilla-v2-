'use client'

import { useRef, useState, useCallback } from 'react'
import Tilt from 'react-parallax-tilt'
import * as m from 'framer-motion/m'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useIsLowPowerDevice } from '@/hooks/useIsLowPowerDevice'

interface PricingBadgeProps {
  readonly price: string
  readonly label?: string
  readonly className?: string
}

/**
 * 3D interactive pricing badge with tilt, spotlight, rotating border beam,
 * and depth-layered typography. Desktop: mouse-follow tilt + spotlight.
 * Mobile: touch-drag tilt + idle float animation.
 */
export function PricingBadge({
  price,
  label = 'per sq. ft.',
  className = '',
}: PricingBadgeProps) {
  const reducedMotion = useReducedMotion()
  const isLowPower = useIsLowPowerDevice()
  const cardRef = useRef<HTMLDivElement>(null)
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setSpotlightPos({ x, y })
  }, [])

  const skipEffects = reducedMotion || isLowPower

  return (
    <m.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={
        skipEffects
          ? { duration: 0.15 }
          : { type: 'spring', stiffness: 200, damping: 20, delay: 0.9 }
      }
      className={className}
    >
      <Tilt
        tiltMaxAngleX={skipEffects ? 0 : 15}
        tiltMaxAngleY={skipEffects ? 0 : 15}
        perspective={800}
        glareEnable={!skipEffects}
        glareMaxOpacity={0.12}
        glarePosition="all"
        glareBorderRadius="16px"
        transitionSpeed={1200}
        gyroscope={false}
        className="relative"
      >
        <div
          ref={cardRef}
          onMouseMove={skipEffects ? undefined : handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="pricing-badge-wrapper relative overflow-hidden rounded-2xl p-[2px]"
        >
          {/* Rotating border beam */}
          <div
            className={`absolute inset-0 rounded-2xl ${skipEffects ? '' : 'animate-border-rotate'}`}
            style={{
              background: skipEffects
                ? 'linear-gradient(135deg, rgba(238,119,7,0.3), rgba(238,119,7,0.1))'
                : `conic-gradient(from var(--border-angle, 0deg), rgba(238,119,7,0.02) 0%, rgba(238,119,7,0.5) 25%, rgba(238,119,7,0.02) 50%, rgba(238,119,7,0.5) 75%, rgba(238,119,7,0.02) 100%)`,
            }}
            aria-hidden="true"
          />

          {/* Inner card */}
          <div className="relative rounded-[14px] bg-white/95 px-7 py-5 backdrop-blur-lg md:px-9 md:py-6">
            {/* Spotlight overlay — desktop only */}
            {!skipEffects && (
              <div
                className="pointer-events-none absolute inset-0 rounded-[14px] transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle 120px at ${spotlightPos.x}% ${spotlightPos.y}%, rgba(238,119,7,0.1) 0%, transparent 70%)`,
                  opacity: isHovered ? 1 : 0,
                }}
                aria-hidden="true"
              />
            )}

            {/* Content with depth layers via translateZ */}
            <div className="relative flex flex-col items-center" style={{ transformStyle: 'preserve-3d' }}>
              {/* Top label — depth layer 1 */}
              <span
                className="font-accent text-[10px] uppercase tracking-[0.2em] text-obsidian/45 md:text-[11px]"
                style={skipEffects ? undefined : { transform: 'translateZ(20px)' }}
              >
                Starting at just
              </span>

              {/* Price — depth layer 2 (foremost) */}
              <span
                className={`mt-1.5 font-display text-4xl font-semibold md:text-5xl ${
                  skipEffects
                    ? 'text-terracotta'
                    : 'bg-gradient-to-r from-terracotta via-[#ff9a3c] to-terracotta bg-clip-text text-transparent animate-text-shimmer'
                }`}
                style={skipEffects ? undefined : { transform: 'translateZ(50px)' }}
              >
                &#8377;{price}
              </span>

              {/* Bottom label — depth layer 1 */}
              <span
                className="mt-1 font-accent text-[10px] uppercase tracking-[0.2em] text-obsidian/45 md:text-[11px]"
                style={skipEffects ? undefined : { transform: 'translateZ(20px)' }}
              >
                {label}
              </span>
            </div>
          </div>
        </div>
      </Tilt>
    </m.div>
  )
}

/**
 * Mobile variant: horizontal layout with idle float animation.
 * Touch-tilt enabled, no spotlight.
 */
export function PricingBadgeMobile({
  price,
  label = 'per sq. ft.',
  className = '',
}: PricingBadgeProps) {
  const reducedMotion = useReducedMotion()
  const isLowPower = useIsLowPowerDevice()
  const skipEffects = reducedMotion || isLowPower

  return (
    <m.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={
        skipEffects
          ? { duration: 0.15 }
          : { type: 'spring', stiffness: 200, damping: 20 }
      }
      className={className}
    >
      {/* Idle float wrapper */}
      <m.div
        animate={
          skipEffects
            ? undefined
            : { y: [0, -5, 0] }
        }
        transition={
          skipEffects
            ? undefined
            : { duration: 3, repeat: Infinity, ease: 'easeInOut' }
        }
      >
        <Tilt
          tiltMaxAngleX={skipEffects ? 0 : 10}
          tiltMaxAngleY={skipEffects ? 0 : 10}
          perspective={600}
          glareEnable={!skipEffects}
          glareMaxOpacity={0.1}
          glarePosition="all"
          glareBorderRadius="12px"
          transitionSpeed={1200}
          gyroscope={false}
        >
          <div className="relative overflow-hidden rounded-xl p-[1.5px]">
            {/* Rotating border beam */}
            <div
              className={`absolute inset-0 rounded-xl ${skipEffects ? '' : 'animate-border-rotate'}`}
              style={{
                background: skipEffects
                  ? 'linear-gradient(135deg, rgba(238,119,7,0.25), rgba(238,119,7,0.08))'
                  : `conic-gradient(from var(--border-angle, 0deg), rgba(238,119,7,0.02) 0%, rgba(238,119,7,0.4) 25%, rgba(238,119,7,0.02) 50%, rgba(238,119,7,0.4) 75%, rgba(238,119,7,0.02) 100%)`,
              }}
              aria-hidden="true"
            />

            {/* Inner card */}
            <div className="relative flex items-center gap-3 rounded-[10px] bg-white/95 px-5 py-3 backdrop-blur-lg">
              {/* Price */}
              <span
                className={`font-display text-3xl font-semibold ${
                  skipEffects
                    ? 'text-terracotta'
                    : 'bg-gradient-to-r from-terracotta via-[#ff9a3c] to-terracotta bg-clip-text text-transparent animate-text-shimmer'
                }`}
              >
                &#8377;{price}
              </span>

              {/* Labels */}
              <div className="flex flex-col">
                <span className="font-accent text-[11px] uppercase tracking-[0.14em] text-obsidian/55">
                  {label}
                </span>
                <span className="font-body text-[10px] text-obsidian/35">
                  Starting price
                </span>
              </div>
            </div>
          </div>
        </Tilt>
      </m.div>
    </m.div>
  )
}
