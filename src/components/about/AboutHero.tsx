'use client'

import Image from 'next/image'

export function AboutHero() {
  return (
    <section aria-label="About hero" className="relative min-h-dvh overflow-hidden">
      <Image
        src="/00 FINISHED/09 ASHOK RESIDENCE/09_ASHOK RESIDENCE_01.jpg"
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
        priority
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-void/50" />
      <div className="relative z-10 flex min-h-dvh flex-col items-center justify-center text-center px-6">
        <h1 className="font-display font-bold uppercase leading-[0.85] text-[clamp(4rem,12vw,10rem)] text-bone">
          ROKVILLA
        </h1>
        <p className="font-display font-light leading-snug mt-4 text-[clamp(1.5rem,3vw,3rem)] text-bone/80">
          Built to Endure.
        </p>
        <p className="font-body text-base md:text-lg mt-3 text-bone/60">
          Architecture studio in Karnataka.
        </p>
      </div>
    </section>
  )
}
