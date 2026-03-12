import type { Metadata } from 'next'
import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { DesignHero } from '@/components/design/DesignHero'
import { ProcessSection } from '@/components/design/ProcessSection'
import { ConsultationPhoto } from '@/components/design/ConsultationPhoto'
import { DocketsSection } from '@/components/design/DocketsSection'
import { TestimonialsSection } from '@/components/shared/TestimonialsSection'
import { DESIGN_TESTIMONIALS, DESIGN_FAQS, FAQ_CATEGORIES } from '@/lib/constants/design'

const ConsultationForm = dynamic(
  () => import('@/components/shared/ConsultationForm').then(m => m.ConsultationForm)
)

const FAQSection = dynamic(
  () => import('@/components/shared/FAQSection').then(m => m.FAQSection)
)

export const metadata: Metadata = {
  title: 'Design — RokVilla',
  description:
    'From concept to blueprint — architectural designs that balance aesthetics, function, and budget. Browse our projects, choose your service, and connect with us.',
}

export default function DesignPage() {
  return (
    <>
      <DesignHero />
      <ProcessSection />
      <Suspense fallback={<div className="min-h-[400px]" />}>
        <ConsultationForm
          layout="split"
          illustration={<ConsultationPhoto />}
          sectionClassName="relative overflow-hidden bg-white py-24 md:py-32 lg:py-36"
        />
      </Suspense>
      <DocketsSection />
      <TestimonialsSection testimonials={DESIGN_TESTIMONIALS} />
      <Suspense fallback={<div className="min-h-[300px]" />}>
        <FAQSection
          faqs={DESIGN_FAQS}
          categories={FAQ_CATEGORIES}
          subtitle="Everything you need to know about our design services"
          sectionClassName="bg-white py-24 md:py-32 lg:py-36"
        />
      </Suspense>
    </>
  )
}
