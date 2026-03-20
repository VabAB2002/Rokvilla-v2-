'use client'

import { useId } from 'react'
import * as m from 'framer-motion/m'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useInView } from '@/hooks/useInView'
import { useIsLowPowerDevice } from '@/hooks/useIsLowPowerDevice'
import { EASE_OUT_QUART } from '@/lib/motion'
import type { Variants } from 'framer-motion'

/* ── Grid dot positions (sparse architectural grid) ── */
const GRID_DOTS = [
  [120, 80], [240, 80], [360, 80], [480, 80], [600, 80],
  [720, 80], [840, 80], [960, 80], [1080, 80], [1200, 80], [1320, 80],
  [120, 200], [240, 200], [480, 200], [720, 200], [960, 200], [1200, 200],
  [120, 320], [360, 320], [600, 320], [840, 320], [1080, 320], [1320, 320],
  [240, 440], [480, 440], [720, 440], [960, 440], [1200, 440],
  [120, 560], [360, 560], [600, 560], [840, 560], [1080, 560],
  [240, 680], [480, 680], [720, 680], [960, 680], [1200, 680],
  [120, 800], [360, 800], [600, 800], [840, 800], [1080, 800],
] as const

/* ── Construction guide lines ── */
const CONSTRUCTION_LINES = [
  { x1: 0, y1: 300, x2: 1440, y2: 300 },
  { x1: 0, y1: 500, x2: 1440, y2: 500 },
  { x1: 0, y1: 700, x2: 1440, y2: 700 },
  { x1: 500, y1: 0, x2: 500, y2: 900 },
  { x1: 800, y1: 0, x2: 800, y2: 900 },
  { x1: 1100, y1: 0, x2: 1100, y2: 900 },
  { x1: 500, y1: 100, x2: 1200, y2: 800 },
] as const

/* ── Animation factories ── */
function makeLayerContainer(reduced: boolean, delayStart: number, stagger: number) {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduced ? 0 : stagger,
        delayChildren: reduced ? 0 : delayStart,
      },
    },
  }
}

function makeDetailVariants(reduced: boolean): Variants {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: reduced ? 0.2 : 1.2, ease: EASE_OUT_QUART },
    },
  }
}

function makeDrawVariants(reduced: boolean): Variants {
  if (reduced) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.2 } },
    }
  }
  return {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay: i * 0.4, type: 'spring', duration: 2, bounce: 0 },
        opacity: { delay: i * 0.4, duration: 0.01 },
      },
    }),
  }
}

export function BlueprintBackground() {
  const id = useId()
  const grainId = `blueprint-grain-${id}`
  const reduced = useReducedMotion()
  const { ref: containerRef, inView } = useInView<HTMLDivElement>({ rootMargin: '-100px', once: true })
  const isLowPower = useIsLowPowerDevice()
  const detailVariants = makeDetailVariants(reduced)
  const draw = makeDrawVariants(reduced)
  const animateState = inView && !isLowPower ? 'visible' : 'hidden'

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {/* ══ Background: Grid dots + Construction lines ══ */}
      <m.svg
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        initial="hidden"
        animate={animateState}
        aria-hidden="true"
      >
        <m.g variants={makeLayerContainer(reduced, 0, 0.02)}>
          {GRID_DOTS.map(([cx, cy]) => (
            <m.circle
              key={`${cx}-${cy}`}
              cx={cx}
              cy={cy}
              r={1.2}
              className="fill-limestone"
              variants={detailVariants}
            />
          ))}
        </m.g>
        <m.g variants={makeLayerContainer(reduced, 0.3, 0.06)}>
          {CONSTRUCTION_LINES.map((line, i) => (
            <m.line
              key={i}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              className="stroke-limestone"
              strokeWidth={0.3}
              strokeDasharray="3 5"
              variants={detailVariants}
            />
          ))}
        </m.g>
      </m.svg>

      {/* ══ Front Elevation: Modern 2-Storey L-Shaped Villa ══ */}
      <div className="absolute -top-[5%] -bottom-[5%] right-0 w-[62%] flex items-center justify-end pr-[1%]">
        <m.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 720 450"
          className="w-[92%] h-auto"
          aria-hidden="true"
        >
          {/* Layer 1: Ground + Plinth */}
          <m.g
            stroke="#9E9182"
            strokeWidth={1}
            strokeLinecap="round"
            fill="none"
            initial="hidden"
            animate={animateState}
            variants={makeLayerContainer(reduced, 0, 0.08)}
          >
            <m.path custom={0} variants={draw} d="M 30 395 L 690 395" strokeDasharray="4 6" />
            <m.path custom={0.2} variants={draw} d="M 135 375 L 585 375" />
            <m.path custom={0.4} variants={draw} d="M 135 360 L 585 360" />
            <m.path custom={0.6} variants={draw} d="M 135 375 L 135 360" />
            <m.path custom={0.8} variants={draw} d="M 585 375 L 585 360" />
          </m.g>

          {/* Layer 2: Building Walls */}
          <m.g
            stroke="#5C5248"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial="hidden"
            animate={animateState}
            variants={makeLayerContainer(reduced, reduced ? 0 : 0.4, 0.05)}
          >
            {/* Left block outline */}
            <m.path custom={1.0} variants={draw} d="M 135 360 L 135 143" />
            <m.path custom={1.1} variants={draw} d="M 135 143 L 405 143" />
            <m.path custom={1.2} variants={draw} d="M 405 143 L 405 260" />
            <m.path custom={1.3} variants={draw} d="M 135 170 L 405 170" strokeWidth={1.5} />

            {/* Right block outline */}
            <m.path custom={1.4} variants={draw} d="M 405 233 L 585 233" />
            <m.path custom={1.5} variants={draw} d="M 585 233 L 585 360" />

            {/* Building base */}
            <m.path custom={1.6} variants={draw} d="M 135 360 L 585 360" />

            {/* FF floor line (shared) */}
            <m.path custom={1.8} variants={draw} d="M 135 260 L 585 260" strokeWidth={1.5} />
          </m.g>

          {/* Layer 3: Windows + Doors */}
          <m.g
            stroke="#8A7E72"
            strokeWidth={1.2}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial="hidden"
            animate={animateState}
            variants={makeLayerContainer(reduced, reduced ? 0 : 0.9, 0.04)}
          >
            {/* GF — Large picture window (3 panes) */}
            <m.path custom={2.2} variants={draw} d="M 170 290 L 260 290 L 260 353 L 170 353 Z" />
            <m.path custom={2.3} variants={draw} d="M 200 290 L 200 353" />
            <m.path custom={2.3} variants={draw} d="M 230 290 L 230 353" />
            <m.path custom={2.35} variants={draw} d="M 168 353 L 262 353" strokeWidth={2} />

            {/* GF — Entrance door */}
            <m.path custom={2.4} variants={draw} d="M 350 297 L 386 297 L 386 360 L 350 360 Z" />
            <m.path custom={2.5} variants={draw} d="M 340 290 L 396 290" strokeWidth={1.5} />
            <m.path custom={2.5} variants={draw} d="M 340 293 L 396 293" strokeWidth={0.8} />

            {/* GF — Garage door (right block) */}
            <m.path custom={2.6} variants={draw} d="M 430 288 L 520 288 L 520 360 L 430 360 Z" />
            <m.path custom={2.7} variants={draw} d="M 430 306 L 520 306 M 430 324 L 520 324 M 430 342 L 520 342" />

            {/* GF — Utility window (right block) */}
            <m.path custom={2.8} variants={draw} d="M 545 310 L 572 310 L 572 340 L 545 340 Z" />

            {/* FF — Bedroom window 1 */}
            <m.path custom={2.9} variants={draw} d="M 170 190 L 215 190 L 215 240 L 170 240 Z" />

            {/* FF — Bedroom window 2 */}
            <m.path custom={3.0} variants={draw} d="M 260 190 L 305 190 L 305 240 L 260 240 Z" />

            {/* FF — Balcony door */}
            <m.path custom={3.1} variants={draw} d="M 340 185 L 390 185 L 390 240 L 340 240 Z" />

            {/* Balcony slab */}
            <m.path custom={3.2} variants={draw} d="M 330 260 L 400 260" strokeWidth={2} />
            <m.path custom={3.2} variants={draw} d="M 330 264 L 400 264" strokeWidth={0.8} />
            {/* Railing top rail */}
            <m.path custom={3.3} variants={draw} d="M 330 237 L 400 237" />
            {/* Railing verticals */}
            <m.path custom={3.35} variants={draw} d="M 330 237 L 330 260 M 348 237 L 348 260 M 365 237 L 365 260 M 382 237 L 382 260 M 400 237 L 400 260" />
          </m.g>

          {/* Layer 4: Roof & Structural Details */}
          <m.g
            stroke="#5C5248"
            strokeWidth={1}
            strokeLinecap="round"
            fill="none"
            initial="hidden"
            animate={animateState}
            variants={makeLayerContainer(reduced, reduced ? 0 : 1.4, 0.05)}
          >
            <m.path custom={3.5} variants={draw} d="M 135 174 L 405 174" strokeWidth={0.8} />
            <m.path custom={3.6} variants={draw} d="M 405 264 L 585 264" strokeWidth={0.8} />
            <m.path custom={3.7} variants={draw} d="M 133 141 L 407 141" strokeWidth={0.5} />
            <m.path custom={3.75} variants={draw} d="M 403 231 L 587 231" strokeWidth={0.5} />
            <m.path custom={3.8} variants={draw} d="M 135 367 L 585 367" strokeWidth={0.6} />
            <m.path custom={3.9} variants={draw} d="M 342 293 L 342 297 M 394 293 L 394 297" strokeWidth={0.8} />
          </m.g>

          {/* Layer 5: Trees + Ground */}
          <m.g
            stroke="#9E9182"
            strokeWidth={1}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial="hidden"
            animate={animateState}
            variants={makeLayerContainer(reduced, reduced ? 0 : 1.7, 0.04)}
          >
            {/* Left tree trunk */}
            <m.path custom={4.2} variants={draw} d="M 60 375 L 60 280" strokeWidth={1.5} />
            {/* Left tree canopy */}
            <m.path custom={4.4} variants={draw} d="M 15 230 A 45 55 0 0 0 105 230 A 45 55 0 0 0 15 230" />

            {/* Right tree trunk */}
            <m.path custom={4.6} variants={draw} d="M 660 375 L 660 300" strokeWidth={1.5} />
            {/* Right tree canopy */}
            <m.path custom={4.8} variants={draw} d="M 625 260 A 35 45 0 0 0 695 260 A 35 45 0 0 0 625 260" />

            {/* Driveway edges */}
            <m.path custom={5.0} variants={draw} d="M 340 395 L 345 375 M 400 395 L 395 375" strokeWidth={0.8} />

            {/* Grass hatch marks */}
            <m.path custom={5.2} variants={draw} d="M 90 395 L 92 388 M 110 395 L 112 388 M 475 395 L 477 388 M 500 395 L 502 388 M 610 395 L 612 388 M 635 395 L 637 388" strokeWidth={0.6} />
          </m.g>

          {/* Layer 6: Annotations */}
          <m.g
            initial="hidden"
            animate={animateState}
            variants={makeLayerContainer(reduced, reduced ? 0 : 2.3, 0.06)}
          >
            {/* Width dimension */}
            <m.path custom={5.8} variants={draw} d="M 135 420 L 585 420 M 135 415 L 135 425 M 585 415 L 585 425" stroke="#B8942A" strokeWidth={0.8} fill="none" strokeLinecap="round" />
            <m.text variants={detailVariants} x="360" y="435" textAnchor="middle" fill="#B8942A" fontSize="9" stroke="none">
              {'15.0 m'}
            </m.text>

            {/* Height dimension */}
            <m.path custom={6.2} variants={draw} d="M 115 143 L 115 360 M 110 143 L 120 143 M 110 360 L 120 360" stroke="#B8942A" strokeWidth={0.8} fill="none" strokeLinecap="round" />
            <m.text variants={detailVariants} x="100" y="255" textAnchor="middle" fill="#B8942A" fontSize="9" stroke="none" transform="rotate(-90, 100, 255)">
              {'7.2 m'}
            </m.text>

            {/* Floor level callout */}
            <m.path custom={6.5} variants={draw} d="M 118 260 L 135 260" stroke="#B8942A" strokeWidth={0.6} fill="none" strokeLinecap="round" />
            <m.text variants={detailVariants} x="116" y="263" textAnchor="end" fill="#B8942A" fontSize="7" stroke="none">
              {'FF +3.3'}
            </m.text>

            {/* Ground level marker */}
            <m.text variants={detailVariants} x="145" y="390" textAnchor="start" fill="#B8942A" fontSize="7" stroke="none">
              {'+0.00'}
            </m.text>
          </m.g>
        </m.svg>
      </div>

      {/* Gradient overlay — fades blueprint toward left for text readability */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to right, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.7) 30%, rgba(255,255,255,0.15) 60%, rgba(255,255,255,0) 100%)',
        }}
      />

      {/* Grain texture */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay">
        <svg width="100%" height="100%" aria-hidden="true">
          <filter id={grainId}>
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter={`url(#${grainId})`} />
        </svg>
      </div>
    </div>
  )
}
