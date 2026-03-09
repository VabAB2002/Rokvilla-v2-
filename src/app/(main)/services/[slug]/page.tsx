import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { SERVICES } from '@/lib/constants/services'

interface ServicePageProps {
  readonly params: Promise<{ slug: string }>
}

function getService(slug: string) {
  return SERVICES.find((s) => s.id === slug)
}

export async function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.id }))
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params
  const service = getService(slug)
  if (!service) return {}

  return {
    title: service.title,
    description: service.description,
  }
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params
  const service = getService(slug)

  if (!service) notFound()

  return (
    <div className="pt-24">
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-12">
        <span className="font-accent text-[13px] uppercase tracking-[0.18em] text-terracotta">
          Services
        </span>
        <h1 className="mt-4 font-display text-4xl font-medium text-obsidian md:text-5xl lg:text-6xl">
          {service.title}
        </h1>
        <p className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-slate">
          {service.description}
        </p>
      </section>
    </div>
  )
}
