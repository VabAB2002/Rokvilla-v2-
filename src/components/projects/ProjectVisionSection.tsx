import { AnimatedSection } from '@/components/ui/AnimatedSection'
import type { Project } from '@/types/project'

interface ProjectVisionSectionProps {
  readonly project: Project
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function ProjectVisionSection({ project }: ProjectVisionSectionProps) {
  return (
    <section className="bg-parchment py-24 md:py-32 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-12 xl:px-16">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[2fr_1fr] lg:gap-20">
          {/* Vision text */}
          <AnimatedSection>
            <span className="font-accent text-[13px] uppercase tracking-[0.18em] text-terracotta">
              The Vision
            </span>
            <p className="mt-6 font-display text-xl font-light leading-relaxed text-obsidian md:text-2xl">
              {project.vision}
            </p>
            <p className="mt-6 font-body text-base leading-relaxed text-slate">
              {project.description}
            </p>
          </AnimatedSection>

          {/* Facts & Figures */}
          <AnimatedSection delay={0.15}>
            <span className="font-accent text-[13px] uppercase tracking-[0.18em] text-terracotta">
              Facts &amp; Figures
            </span>
            <dl className="mt-6 flex flex-col">
              {[
                { label: 'Category', value: capitalize(project.category) },
                { label: 'Location', value: capitalize(project.location) },
                { label: 'Year', value: String(project.year) },
                { label: 'Built-up Area', value: project.builtUpArea },
                { label: 'Plot Size', value: project.plotSize },
                { label: 'Floors', value: project.floors },
                { label: 'Style', value: project.style },
              ]
                .filter((f) => f.value)
                .map((fact) => (
                  <div
                    key={fact.label}
                    className="border-b border-obsidian/8 py-4 first:pt-0"
                  >
                    <dt className="font-accent text-[11px] uppercase tracking-[0.15em] text-stone">
                      {fact.label}
                    </dt>
                    <dd className="mt-1 font-display text-xl text-obsidian">
                      {fact.value}
                    </dd>
                  </div>
                ))}
            </dl>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
