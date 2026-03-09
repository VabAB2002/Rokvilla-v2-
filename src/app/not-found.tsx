import Link from 'next/link'

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
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-[2px] border-[1.5px] border-transparent bg-terracotta px-8 py-3.5 font-body text-[13px] font-medium uppercase tracking-[0.12em] text-bone transition-all duration-200 hover:bg-terracotta-deep"
        >
          Back to Home
        </Link>
        <Link
          href="/#services"
          className="inline-flex items-center justify-center gap-2 rounded-[2px] border-[1.5px] border-obsidian bg-transparent px-8 py-3.5 font-body text-[13px] font-medium uppercase tracking-[0.12em] text-obsidian transition-all duration-200 hover:bg-obsidian hover:text-bone"
        >
          Our Services
        </Link>
      </div>
    </div>
  )
}
