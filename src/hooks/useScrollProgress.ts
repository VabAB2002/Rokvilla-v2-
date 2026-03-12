'use client'

import { useState, useEffect, useRef } from 'react'

interface UseScrollProgressReturn {
  readonly activeIndex: number
}

/**
 * Tracks which scroll-snap child is most visible using IntersectionObserver.
 * No scroll event listeners — lightweight and battery-friendly.
 *
 * **Assumption: children are static.** The observer snapshots the container's
 * children on mount. If items are added/removed after mount, the hook will
 * not re-observe — remount the container (change its `key`) to reset.
 */
export function useScrollProgress(
  containerRef: { readonly current: HTMLElement | null },
): UseScrollProgressReturn {
  const [activeIndex, setActiveIndex] = useState(0)
  // Track intersection ratios per child index
  const ratiosRef = useRef<ReadonlyArray<number>>([])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const children = Array.from(container.children) as HTMLElement[]
    if (children.length === 0) return

    // Initialise ratio array
    ratiosRef.current = new Array(children.length).fill(0) as number[]

    const observer = new IntersectionObserver(
      (entries) => {
        // Build a new ratios array (immutable update)
        const next = [...ratiosRef.current]
        for (const entry of entries) {
          const index = children.indexOf(entry.target as HTMLElement)
          if (index !== -1) {
            next[index] = entry.intersectionRatio
          }
        }
        ratiosRef.current = next

        // Active = child with highest intersection ratio
        let maxRatio = -1
        let maxIndex = 0
        for (let i = 0; i < next.length; i++) {
          if (next[i] > maxRatio) {
            maxRatio = next[i]
            maxIndex = i
          }
        }
        setActiveIndex(maxIndex)
      },
      {
        root: container,
        threshold: [0, 0.25, 0.5, 0.75, 1.0],
      },
    )

    for (const child of children) {
      observer.observe(child)
    }

    return () => observer.disconnect()
  }, [containerRef])

  return { activeIndex }
}
