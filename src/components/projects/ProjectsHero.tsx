import { AnimatedSection } from '@/components/ui/AnimatedSection'

interface ProjectsHeroProps {
  readonly totalCount: number
}

export function ProjectsHero({ totalCount }: ProjectsHeroProps) {
  return (
    <section className="bg-white pt-32 pb-16 md:pt-36 md:pb-20">
      <div className="mx-auto max-w-7xl px-6 md:px-12 xl:px-16">
        <AnimatedSection>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <span className="font-accent text-[13px] uppercase tracking-[0.18em] text-terracotta">
                Portfolio
              </span>
              <h1 className="mt-3 font-display text-4xl font-medium text-obsidian md:text-5xl lg:text-6xl">
                Our Projects
              </h1>
              <p className="mt-3 font-body text-base tracking-wide text-stone md:text-lg">
                From Home to Industries
              </p>
            </div>
            <span className="font-display text-2xl font-light tabular-nums text-obsidian/40 md:text-3xl">
              {totalCount} Projects
            </span>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
