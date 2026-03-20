import type { Metadata } from 'next'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: '404 — Page Not Found',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-white px-6">
      {/* Large number */}
      <span className="font-accent text-[120px] font-light leading-none text-limestone/60 md:text-[180px]">
        404
      </span>

      <h1 className="mt-4 font-display text-3xl font-medium text-obsidian md:text-4xl">
        Page Not Found
      </h1>

      <p className="mt-4 max-w-md text-center font-body text-base leading-relaxed text-slate">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
        Let&apos;s get you back on track.
      </p>

      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Button href="/" variant="primary">Back to Home</Button>
        <Button href="/#services" variant="secondary">Our Services</Button>
      </div>
    </div>
  )
}
