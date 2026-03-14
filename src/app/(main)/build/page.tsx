import type { Metadata } from 'next'
import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { BuildHero } from '@/components/build/BuildHero'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildServiceSchema, buildBreadcrumbSchema } from '@/lib/seo/schemas'
import { SITE_URL } from '@/lib/seo/constants'
import { BuildHowItWorksSection } from '@/components/build/BuildHowItWorksSection'
import { BuildKeyFeaturesSection } from '@/components/build/BuildKeyFeaturesSection'
import { ConsultationPhoto } from '@/components/design/ConsultationPhoto'
import { TestimonialsSection } from '@/components/shared/TestimonialsSection'
import { BuildProjectsWrapper } from '@/components/build/BuildProjectsWrapper'
import { SectionErrorBoundary } from '@/components/error/SectionErrorBoundary'
import {
  BUILD_TESTIMONIALS,
  BUILD_FAQS,
  BUILD_FAQ_CATEGORIES,
} from '@/lib/constants/build'

const ConstructionPackagesSection = dynamic(
  () => import('@/components/build/ConstructionPackagesSection').then(m => m.ConstructionPackagesSection)
)

const ConsultationForm = dynamic(
  () => import('@/components/shared/ConsultationForm').then(m => m.ConsultationForm)
)

const FAQSection = dynamic(
  () => import('@/components/shared/FAQSection').then(m => m.FAQSection)
)

export const metadata: Metadata = {
  title: 'Build — RokVilla',
  description:
    'From foundation to finish — construction packages with transparent pricing, daily site updates, and a 10-year warranty. Choose your package and build your dream home.',
  openGraph: {
    url: `${SITE_URL}/build`,
    description:
      'From foundation to finish — construction packages with transparent pricing, daily site updates, and a 10-year warranty. Choose your package and build your dream home.',
  },
}

export default function BuildPage() {
  return (
    <>
      <JsonLd
        schema={[
          buildServiceSchema('Construction', 'From foundation to finish — construction packages with transparent pricing, daily site updates, and a 10-year warranty.', `${SITE_URL}/build`),
          buildBreadcrumbSchema([
            { name: 'Home', url: SITE_URL },
            { name: 'Build', url: `${SITE_URL}/build` },
          ]),
        ]}
      />
      <BuildHero />
      <div className="cv-auto"><BuildHowItWorksSection /></div>
      <div className="cv-auto">
        <SectionErrorBoundary name="construction-packages">
          <Suspense fallback={<div className="min-h-[600px]" />}>
            <ConstructionPackagesSection />
          </Suspense>
        </SectionErrorBoundary>
      </div>
      <div className="cv-auto"><BuildKeyFeaturesSection /></div>
      <div className="cv-auto">
        <SectionErrorBoundary name="build-consultation-form">
          <Suspense fallback={<div className="min-h-[400px]" />}>
            <ConsultationForm
              layout="split"
              illustration={<ConsultationPhoto />}
              sectionClassName="relative overflow-hidden bg-white py-12 md:py-32 lg:py-36"
            />
          </Suspense>
        </SectionErrorBoundary>
      </div>
      <div className="cv-auto"><TestimonialsSection testimonials={BUILD_TESTIMONIALS} /></div>
      <div className="cv-auto"><BuildProjectsWrapper /></div>
      <div className="cv-auto">
        <SectionErrorBoundary name="build-faq">
          <Suspense fallback={<div className="min-h-[300px]" />}>
            <FAQSection
              faqs={BUILD_FAQS}
              categories={BUILD_FAQ_CATEGORIES}
              subtitle="Everything you need to know about our construction services"
              sectionClassName="bg-white py-12 md:py-32 lg:py-36"
            />
          </Suspense>
        </SectionErrorBoundary>
      </div>
    </>
  )
}
