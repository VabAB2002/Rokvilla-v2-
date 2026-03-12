'use client'

import { useSyncExternalStore } from 'react'

const QUERY = '(pointer: coarse)'

function subscribe(callback: () => void) {
  const mql = window.matchMedia(QUERY)
  mql.addEventListener('change', callback)
  return () => mql.removeEventListener('change', callback)
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches
}

function getServerSnapshot() {
  return false
}

/**
 * Detects coarse-pointer (touch) devices via the CSS media query
 * `(pointer: coarse)` and reacts to changes (e.g. convertible laptops).
 *
 * SSR-safe: defaults to false on the server.
 * Uses `useSyncExternalStore` to match the project convention (see `useReducedMotion`).
 */
export function useTouchDevice(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
