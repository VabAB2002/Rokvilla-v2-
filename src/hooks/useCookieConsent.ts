'use client'

import { useState, useCallback, useEffect } from 'react'

const STORAGE_KEY = 'rokvilla-cookie-consent'

export function useCookieConsent(): {
  readonly hasConsented: boolean | null
  readonly accept: () => void
} {
  const [hasConsented, setHasConsented] = useState<boolean | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    setHasConsented(stored === 'true')
  }, [])

  const accept = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, 'true')
    setHasConsented(true)
  }, [])

  return { hasConsented, accept }
}
