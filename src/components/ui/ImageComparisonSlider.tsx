'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import Image from 'next/image'

interface ImageComparisonSliderProps {
  readonly beforeSrc: string
  readonly beforeAlt: string
  readonly afterSrc: string
  readonly afterAlt: string
  readonly initialPosition?: number
  readonly enableLerp?: boolean
  readonly lerpFactor?: number
  readonly handleAriaLabel?: string
  readonly className?: string
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

export function ImageComparisonSlider({
  beforeSrc,
  beforeAlt,
  afterSrc,
  afterAlt,
  initialPosition = 50,
  enableLerp = true,
  lerpFactor = 0.08,
  handleAriaLabel,
  className = '',
}: ImageComparisonSliderProps) {
  const safeInitialPosition = clamp(initialPosition, 0, 100)
  const [position, setPosition] = useState(safeInitialPosition)
  const [showHint, setShowHint] = useState(true)

  const containerRef = useRef<HTMLDivElement>(null)
  const positionRef = useRef(safeInitialPosition)
  const targetPositionRef = useRef(safeInitialPosition)
  const isDraggingRef = useRef(false)
  const rafIdRef = useRef<number | null>(null)

  // Detect touch device for hint text
  const [isTouch, setIsTouch] = useState(false)
  useEffect(() => {
    setIsTouch(window.matchMedia('(pointer: coarse)').matches)
  }, [])

  // Auto-hide hint after 2.5s
  useEffect(() => {
    const timer = setTimeout(() => setShowHint(false), 2500)
    return () => clearTimeout(timer)
  }, [])

  // Cleanup RAF on unmount
  useEffect(() => {
    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current)
        rafIdRef.current = null
      }
    }
  }, [])

  const startLerpLoop = useCallback(() => {
    if (!enableLerp || rafIdRef.current !== null) return

    function tick() {
      const current = positionRef.current
      const target = targetPositionRef.current
      const delta = target - current

      if (Math.abs(delta) < 0.05) {
        rafIdRef.current = null
        return
      }

      const next = current + delta * lerpFactor
      positionRef.current = next
      setPosition(next)
      rafIdRef.current = requestAnimationFrame(tick)
    }

    rafIdRef.current = requestAnimationFrame(tick)
  }, [enableLerp, lerpFactor])

  const computePosition = useCallback(
    (clientX: number): number => {
      const container = containerRef.current
      if (!container) return positionRef.current

      const rect = container.getBoundingClientRect()
      return clamp(((clientX - rect.left) / rect.width) * 100, 0, 100)
    },
    []
  )

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      isDraggingRef.current = true
      setShowHint(false)
      ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)

      const newPos = computePosition(e.clientX)

      if (enableLerp) {
        targetPositionRef.current = newPos
        startLerpLoop()
      } else {
        positionRef.current = newPos
        targetPositionRef.current = newPos
        setPosition(newPos)
      }
    },
    [computePosition, enableLerp, startLerpLoop]
  )

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDraggingRef.current) return

      const newPos = computePosition(e.clientX)

      if (enableLerp) {
        targetPositionRef.current = newPos
        startLerpLoop()
      } else {
        positionRef.current = newPos
        targetPositionRef.current = newPos
        setPosition(newPos)
      }
    },
    [computePosition, enableLerp, startLerpLoop]
  )

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    isDraggingRef.current = false
    try {
      ;(e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId)
    } catch {
      // Pointer may already be released on cancel
    }
  }, [])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const STEP = 5
      let newPos = positionRef.current

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowUp':
          newPos = clamp(positionRef.current + STEP, 0, 100)
          break
        case 'ArrowLeft':
        case 'ArrowDown':
          newPos = clamp(positionRef.current - STEP, 0, 100)
          break
        case 'Home':
          newPos = 0
          break
        case 'End':
          newPos = 100
          break
        default:
          return
      }

      e.preventDefault()

      if (enableLerp) {
        targetPositionRef.current = newPos
        startLerpLoop()
      } else {
        positionRef.current = newPos
        targetPositionRef.current = newPos
        setPosition(newPos)
      }
    },
    [enableLerp, startLerpLoop]
  )

  const roundedPosition = +position.toFixed(2)
  const ariaLabel = handleAriaLabel ?? `Compare: ${beforeAlt} with ${afterAlt}`

  return (
    <div
      ref={containerRef}
      className={`relative h-full w-full overflow-hidden select-none ${className}`}
      style={{ touchAction: 'none' }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {/* After image — sketch (base layer, always fully visible) */}
      <div className="absolute inset-0">
        <Image
          src={afterSrc}
          alt={afterAlt}
          fill
          priority
          quality={85}
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Before image — real photo (clipped from right) */}
      <div
        className="absolute inset-0"
        style={{
          clipPath: `inset(0 ${(100 - roundedPosition).toFixed(2)}% 0 0)`,
          willChange: isDraggingRef.current ? 'clip-path' : 'auto',
        }}
      >
        <Image
          src={beforeSrc}
          alt={beforeAlt}
          fill
          priority
          fetchPriority="high"
          quality={85}
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 z-[2]"
        style={{
          left: `${roundedPosition}%`,
          width: '2px',
          transform: 'translateX(-1px)',
          backgroundColor: '#FFFFFF',
          boxShadow: '0 0 5px rgba(0, 0, 0, 0.7)',
        }}
      />

      {/* Handle */}
      <div
        role="slider"
        tabIndex={0}
        aria-valuenow={Math.round(position)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuetext={`${Math.round(position)}% — before and after comparison`}
        aria-label={ariaLabel}
        className="absolute z-[3] flex items-center justify-center rounded-full border-2 border-white bg-white/20 backdrop-blur-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        style={{
          left: `${roundedPosition}%`,
          top: '50%',
          width: '44px',
          height: '44px',
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)',
          cursor: 'ew-resize',
        }}
        onKeyDown={handleKeyDown}
      >
        {/* Left/right chevrons */}
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M7 4L3 10L7 16" />
          <path d="M13 4L17 10L13 16" />
        </svg>
      </div>

      {/* Hint label */}
      {showHint && (
        <div
          className="absolute inset-x-0 bottom-24 z-[4] flex justify-center md:bottom-12"
          aria-hidden="true"
        >
          <span className="rounded-full bg-black/50 px-4 py-2 font-body text-sm text-white/90 backdrop-blur-sm">
            {isTouch ? 'Swipe to compare' : 'Drag to compare'}
          </span>
        </div>
      )}
    </div>
  )
}
