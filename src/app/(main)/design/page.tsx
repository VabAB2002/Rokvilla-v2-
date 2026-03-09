import type { Metadata } from 'next'
import { DesignHero } from '@/components/design/DesignHero'
import { ProcessSection } from '@/components/design/ProcessSection'
import { ConsultationForm } from '@/components/design/ConsultationForm'
import { DocketsSection } from '@/components/design/DocketsSection'
import { TestimonialsSection } from '@/components/design/TestimonialsSection'
import { FAQSection } from '@/components/design/FAQSection'

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
      <TestimonialsSection />
      <FAQSection />
    </>
  )
}
