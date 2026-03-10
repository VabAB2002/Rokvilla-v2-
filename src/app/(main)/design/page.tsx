import type { Metadata } from 'next'
import { DesignHero } from '@/components/design/DesignHero'
import { ProcessSection } from '@/components/design/ProcessSection'
import { ConsultationForm } from '@/components/shared/ConsultationForm'
import { DocketsSection } from '@/components/design/DocketsSection'
import { TestimonialsSection } from '@/components/shared/TestimonialsSection'
import { FAQSection } from '@/components/shared/FAQSection'
import { DESIGN_TESTIMONIALS, DESIGN_FAQS, FAQ_CATEGORIES } from '@/lib/constants/design'

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
      <ConsultationForm />
      <DocketsSection />
      <TestimonialsSection testimonials={DESIGN_TESTIMONIALS} />
      <FAQSection
        faqs={DESIGN_FAQS}
        categories={FAQ_CATEGORIES}
        subtitle="Everything you need to know about our design services"
      />
    </>
  )
}
