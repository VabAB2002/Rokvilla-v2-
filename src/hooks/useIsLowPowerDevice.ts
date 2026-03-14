'use client'

import { useSyncExternalStore } from 'react'

type NetworkConnection = {
  saveData?: boolean
  effectiveType?: string
  addEventListener?: (type: string, listener: () => void) => void
  removeEventListener?: (type: string, listener: () => void) => void
}

function getConnection(): NetworkConnection | undefined {
  return (navigator as Navigator & { connection?: NetworkConnection }).connection
}

function getSnapshot(): boolean {
  const conn = getConnection()
  return (
    conn?.saveData === true ||
    conn?.effectiveType === '2g' ||
    conn?.effectiveType === 'slow-2g'
  )
}

function getServerSnapshot(): boolean {
  return false
}

function subscribe(callback: () => void): () => void {
  const conn = getConnection()
  conn?.addEventListener?.('change', callback)
  return () => conn?.removeEventListener?.('change', callback)
}

/**
 * Detects constrained network/power conditions by checking:
 * - navigator.connection.saveData — user opted into data saving
 * - effectiveType is '2g' or 'slow-2g' — very slow network
 *
 * Uses useSyncExternalStore for hydration-safe reads (no post-hydration re-render).
 */
export function useIsLowPowerDevice(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
