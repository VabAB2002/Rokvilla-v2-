import { ScrollFilmMobile } from './ScrollFilmMobile'
import { ScrollFilmDesktop } from './ScrollFilmDesktop'

export function ScrollFilmSection() {
  return (
    <section
      aria-label="Our approach — Design, Build, Furnish"
      className="bg-void py-20 md:py-0"
    >
      {/* Section header — mobile only */}
      <div className="mb-12 px-6 md:hidden">
        <span className="mb-3 block font-accent text-[11px] uppercase tracking-[0.25em] text-brass-light">
          Our Approach
        </span>
        <h2 className="font-display text-[clamp(2rem,6vw,3rem)] font-light leading-[0.95] text-bone">
          Design. Build. Furnish.
        </h2>
      </div>

      <ScrollFilmMobile />
      <ScrollFilmDesktop />
    </section>
  )
}
