'use client'

import { useSyncExternalStore } from 'react'

export interface ScrollState {
  scrollY: number
  direction: 'up' | 'down' | null
  isScrolled: boolean
}

const SCROLL_DELTA = 5
const IDLE_TIMEOUT = 150
/** scrollY threshold above which `isScrolled` becomes true */
const SCROLLED_THRESHOLD = 80

let state: ScrollState = { scrollY: 0, direction: null, isScrolled: false }
let lastScrollY = 0
let idleTimer: ReturnType<typeof setTimeout> | null = null
const listeners = new Set<() => void>()

function notify() {
  listeners.forEach((l) => l())
}

function handleScroll() {
  const currentY = window.scrollY
  const delta = currentY - lastScrollY

  if (Math.abs(delta) < SCROLL_DELTA) return

  const next: ScrollState = {
    scrollY: currentY,
    direction: delta > 0 ? 'down' : 'up',
    isScrolled: currentY > SCROLLED_THRESHOLD,
  }

  if (
    next.scrollY === state.scrollY &&
    next.direction === state.direction &&
    next.isScrolled === state.isScrolled
  )
    return

  lastScrollY = currentY
  state = next
  notify()

  if (idleTimer) clearTimeout(idleTimer)
  idleTimer = setTimeout(() => {
    state = { ...state, direction: null }
    notify()
    idleTimer = null
  }, IDLE_TIMEOUT)
}

function subscribe(callback: () => void) {
  if (listeners.size === 0) {
    window.addEventListener('scroll', handleScroll, { passive: true })
  }
  listeners.add(callback)
  return () => {
    listeners.delete(callback)
    if (listeners.size === 0) {
      window.removeEventListener('scroll', handleScroll)
      if (idleTimer) {
        clearTimeout(idleTimer)
        idleTimer = null
      }
    }
  }
}

function getSnapshot() {
  return state
}

function getServerSnapshot(): ScrollState {
  return { scrollY: 0, direction: null, isScrolled: false }
}

export function useScrollState() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
