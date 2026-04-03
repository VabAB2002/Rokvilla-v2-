import type { Metadata } from 'next'
import { AboutHero } from '@/components/about/AboutHero'
import { AboutStats } from '@/components/about/AboutStats'
import { AboutTeam } from '@/components/about/AboutTeam'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildBreadcrumbSchema } from '@/lib/seo/schemas'
import { SITE_URL } from '@/lib/seo/constants'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Meet the team behind RokVilla — a Karnataka architecture studio that designs, builds, and furnishes premium residential and commercial spaces.',
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    title: 'About RokVilla | Architecture Studio in Karnataka',
    url: `${SITE_URL}/about`,
    description:
      'Meet the team behind RokVilla — a Karnataka architecture studio that designs, builds, and furnishes premium residential and commercial spaces.',
  },
}

export default function AboutPage() {
  return (
    <>
      <JsonLd
        schema={[
          buildBreadcrumbSchema([
            { name: 'Home', url: SITE_URL },
            { name: 'About', url: `${SITE_URL}/about` },
          ]),
        ]}
      />
      <AboutHero />
      <div className="cv-auto"><AboutStats /></div>
      <div className="cv-auto"><AboutTeam /></div>
    </>
  )
}
