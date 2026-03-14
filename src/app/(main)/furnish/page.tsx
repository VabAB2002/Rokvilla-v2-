import type { Metadata } from 'next'
import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { FurnishHero } from '@/components/furnish/FurnishHero'
import { HowItWorksSection } from '@/components/furnish/HowItWorksSection'
import { FurnishProjectsWrapper } from '@/components/furnish/FurnishProjectsWrapper'
import { InteriorSolutionsSection } from '@/components/furnish/InteriorSolutionsSection'
import { DesignThemesSection } from '@/components/furnish/DesignThemesSection'
import { KeyFeaturesSection } from '@/components/furnish/KeyFeaturesSection'
import { MaterialFeaturesSection } from '@/components/furnish/MaterialFeaturesSection'
import { ConsultationPhoto } from '@/components/design/ConsultationPhoto'
import { TestimonialsSection } from '@/components/shared/TestimonialsSection'
import { SectionErrorBoundary } from '@/components/error/SectionErrorBoundary'
import {
  FURNISH_TESTIMONIALS,
  FURNISH_FAQS,
  FURNISH_FAQ_CATEGORIES,
} from '@/lib/constants/furnish'

const ConsultationForm = dynamic(
  () => import('@/components/shared/ConsultationForm').then(m => m.ConsultationForm)
)

const FAQSection = dynamic(
  () => import('@/components/shared/FAQSection').then(m => m.FAQSection)
)

export const metadata: Metadata = {
  title: 'Furnish — RokVilla',
  description:
    'End-to-end interior furnishing with premium materials, expert craftsmanship, and a 10-year warranty. Browse projects, explore design themes, and book a free consultation.',
}

export default function FurnishPage() {
  return (
    <>
      <FurnishHero />
      <div className="cv-auto"><HowItWorksSection /></div>
      <div className="cv-auto"><FurnishProjectsWrapper /></div>
      <div className="cv-auto"><InteriorSolutionsSection /></div>
      <div className="cv-auto"><DesignThemesSection /></div>
      <div className="cv-auto"><KeyFeaturesSection /></div>
      <div className="cv-auto"><MaterialFeaturesSection /></div>
      <div className="cv-auto">
        <SectionErrorBoundary name="furnish-consultation-form">
          <Suspense fallback={<div className="min-h-[400px]" />}>
            <ConsultationForm
              layout="split"
              illustration={<ConsultationPhoto />}
              sectionClassName="relative overflow-hidden bg-white py-12 md:py-32 lg:py-36"
            />
          </Suspense>
        </SectionErrorBoundary>
      </div>
      <div className="cv-auto"><TestimonialsSection testimonials={FURNISH_TESTIMONIALS} /></div>
      <div className="cv-auto">
        <SectionErrorBoundary name="furnish-faq">
          <Suspense fallback={<div className="min-h-[300px]" />}>
            <FAQSection
              faqs={FURNISH_FAQS}
              categories={FURNISH_FAQ_CATEGORIES}
              subtitle="Everything you need to know about our furnishing services"
              sectionClassName="bg-white py-12 md:py-32 lg:py-36"
            />
          </Suspense>
        </SectionErrorBoundary>
      </div>
    </>
  )
}
