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
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Error | RokVilla</title>
      </head>
      <body>
        <div
          style={{
            display: 'flex',
            minHeight: '100dvh',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 1.5rem',
            fontFamily: 'system-ui, sans-serif',
            backgroundColor: '#FFFFFF',
          }}
        >
          <h2 style={{ fontSize: '1.5rem', fontWeight: 500, color: '#1C1916' }}>
            Something went wrong
          </h2>
          <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#5C5248' }}>
            We have been notified and are looking into it.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: '1.5rem',
              borderRadius: '9999px',
              padding: '0.75rem 2rem',
              fontSize: '0.875rem',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: '#FFFFFF',
              backgroundColor: '#ee7707',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}
