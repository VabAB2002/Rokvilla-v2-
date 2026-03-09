'use client'

import { useState, useEffect, useRef } from 'react'

/**
 * Returns whether the nav should be hidden (user scrolling down)
 * and whether the page is scrolled past a threshold.
 */
export function useScrollDirection(hideThreshold = 80, scrollDelta = 10) {
  const [isHidden, setIsHidden] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY

      // Always show near top of page
      if (currentY < hideThreshold) {
        setIsHidden(false)
        lastScrollY.current = currentY
        return
      }

      const diff = currentY - lastScrollY.current

      if (diff > scrollDelta) {
        // Scrolling down
        setIsHidden(true)
        lastScrollY.current = currentY
      } else if (diff < -scrollDelta) {
        // Scrolling up
        setIsHidden(false)
        lastScrollY.current = currentY
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [hideThreshold, scrollDelta])

  return isHidden
}
