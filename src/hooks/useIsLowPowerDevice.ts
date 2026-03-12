'use client'

import { useState, useEffect } from 'react'

/**
 * Detects constrained network/power conditions by checking explicit user
 * or network signals:
 * - navigator.connection.saveData — user opted into data saving
 * - effectiveType is '2g' or 'slow-2g' — very slow network
 *
 * Returns true if any condition indicates a constrained device.
 * SSR-safe: defaults to false on the server.
 *
 * **Note:** Hardware signals (deviceMemory, hardwareConcurrency) are
 * intentionally omitted — their thresholds overlap with mainstream
 * mid-range devices and would incorrectly flag most mobile users.
 */
export function useIsLowPowerDevice(): boolean {
  const [isLowPower, setIsLowPower] = useState(false)

  useEffect(() => {
    const nav = navigator as Navigator & {
      connection?: {
        saveData?: boolean
        effectiveType?: string
      }
    }

    const saveData = nav.connection?.saveData === true
    const slowNetwork =
      nav.connection?.effectiveType === '2g' ||
      nav.connection?.effectiveType === 'slow-2g'

    setIsLowPower(saveData || slowNetwork)
  }, [])

  return isLowPower
}
