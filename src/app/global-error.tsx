'use client'

import * as Sentry from '@sentry/nextjs'
import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  readonly error: Error & { digest?: string }
  readonly reset: () => void
}) {
  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return (
    <html lang="en">
      <body>
        <div className="flex min-h-dvh flex-col items-center justify-center bg-white px-6">
          <h2 className="text-2xl font-medium" style={{ color: '#1C1916' }}>
            Something went wrong
          </h2>
          <p className="mt-2 text-sm" style={{ color: '#5C5248' }}>
            We have been notified and are looking into it.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-6 rounded-full px-8 py-3 text-sm font-medium uppercase tracking-wider text-white"
            style={{ backgroundColor: '#ee7707' }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}
