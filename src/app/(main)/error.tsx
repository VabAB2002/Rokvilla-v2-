'use client'

import { useEffect } from 'react'
import * as Sentry from '@sentry/nextjs'
import { Button } from '@/components/ui/Button'

export default function Error({
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
    <section className="flex min-h-[60vh] flex-col items-center justify-center px-6">
      <span className="font-accent text-[80px] font-light leading-none text-limestone/60">!</span>
      <h1 className="mt-4 font-display text-3xl font-medium text-obsidian md:text-4xl">
        Something went wrong
      </h1>
      <p className="mt-4 max-w-md text-center font-body text-base leading-relaxed text-slate">
        We&apos;ve been notified and are looking into it. Please try again.
      </p>
      <div className="mt-8">
        <Button onClick={reset} variant="primary">Try Again</Button>
      </div>
    </section>
  )
}
