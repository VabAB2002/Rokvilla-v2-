/* ═══════════════════════════════════════════════
   RokVilla Build Page — Constants & Data
   ═══════════════════════════════════════════════ */

import type { Testimonial } from './design'

/* ── Build Steps ── */

export interface BuildStep {
  readonly number: string
  readonly title: string
  readonly description: string
  readonly href: string
}

export const BUILD_STEPS: ReadonlyArray<BuildStep> = [
  {
    number: '01',
    title: 'Choose Any Package',
    description:
      'Browse our construction packages — from essential builds to premium luxury homes — and pick the tier that fits your vision and budget.',
    href: '#packages',
  },
  {
    number: '02',
    title: 'Review & Compare',
    description:
      'Compare what each package includes, from structural specs to finishing materials, so you can make an informed decision.',
    href: '#packages',
  },
  {
    number: '03',
    title: 'Fill Form & Connect With Us',
    description:
      'Submit your details and our team will reach out to schedule a free site visit and personalised cost estimate.',
    href: '#consultation',
  },
] as const

/* ── Build Phase Groups (detailed journey after connecting) ── */

export interface BuildPhaseSubStep {
  readonly id: string
  readonly title: string
  readonly description: string
  readonly iconPath: string
}

export interface BuildPhaseGroup {
  readonly id: string
  readonly phaseLabel: string
  readonly phaseNumber: string
  readonly illustrationSrc: string
  readonly illustrationAlt: string
  readonly steps: ReadonlyArray<BuildPhaseSubStep>
}

export const BUILD_PHASE_GROUPS: ReadonlyArray<BuildPhaseGroup> = [
  {
    id: 'phase-getting-started',
    phaseLabel: 'Getting Started',
    phaseNumber: 'Phase 01',
    illustrationSrc: '/images/build/build-phase-getting-started.png',
    illustrationAlt: 'Architect and client reviewing site plans at a table',
    steps: [
      {
        id: 'gs-1',
        title: 'Fill a Short Form',
        description:
          'Share your requirements in a quick form — our team calls you back within 24 hours to get things moving.',
        iconPath:
          'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2',
      },
      {
        id: 'gs-2',
        title: 'Meet Your Expert Team',
        description:
          'Sit down with our architect and construction expert to discuss your vision, preferences, and receive an initial estimate.',
        iconPath:
          'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
      },
      {
        id: 'gs-3',
        title: 'Site Survey & Drawings',
        description:
          'We visit your plot, run soil tests, and produce detailed architectural drawings and 3D models for your approval.',
        iconPath:
          'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7',
      },
    ],
  },
  {
    id: 'phase-building',
    phaseLabel: 'Building Your Dream',
    phaseNumber: 'Phase 02',
    illustrationSrc: '/images/build/build-phase-construction.png',
    illustrationAlt: 'Construction site with house frame rising and scaffolding',
    steps: [
      {
        id: 'bd-1',
        title: 'Sign a Transparent Contract',
        description:
          'Lock in clear timelines and a milestone-based payment schedule — no hidden clauses, full transparency from day one.',
        iconPath: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
      },
      {
        id: 'bd-2',
        title: 'Construction Begins',
        description:
          'Your dedicated crew breaks ground with daily quality checks, 470+ checkpoints, and real-time progress updates you can track.',
        iconPath:
          'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
      },
      {
        id: 'bd-3',
        title: 'Home Handover',
        description:
          'After final inspections, we hand over your completed home — backed by a 10-year structural warranty and full documentation.',
        iconPath:
          'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
      },
    ],
  },
] as const

/* ── Package Comparison ──
   Moved to build-packages.ts for better file organization.
   Import types and data from '@/lib/constants/build-packages'. */

/* ── Build Key Features ── */

export interface BuildKeyFeature {
  readonly id: string
  readonly title: string
  readonly description: string
  readonly icon: string
}

export const BUILD_KEY_FEATURES: ReadonlyArray<BuildKeyFeature> = [
  {
    id: 'feat-inhouse',
    title: 'Inhouse Architects, Interior Designer, Project Coordinators',
    description:
      'Our entire design and execution team is in-house — no outsourcing, no gaps in communication, just seamless end-to-end ownership of your project.',
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
  },
  {
    id: 'feat-estimation',
    title: 'Free Estimation & Costing',
    description:
      'Get a detailed material-wise cost estimate at no charge. You know exactly what you are paying for before a single rupee is spent.',
    icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z',
  },
  {
    id: 'feat-vastu',
    title: 'Vastu Compliant Designing',
    description:
      'Every layout is thoughtfully aligned with Vastu Shastra principles so your home feels balanced, positive, and harmonious from day one.',
    icon: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9',
  },
  {
    id: 'feat-free-drawings',
    title: 'Free Architectural Design & Drawings if Construction Contract Signed',
    description:
      'Sign a construction contract with us and receive complete architectural design drawings at no additional cost — a significant value addition.',
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  },
  {
    id: 'feat-daily-updates',
    title: 'Daily Site Updates',
    description:
      'Stay informed every step of the way with daily progress photos and updates from the construction site, directly to your phone.',
    icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9',
  },
  {
    id: 'feat-warranty',
    title: '10 Years Warranty on Construction',
    description:
      'Our structures come with an industry-leading 10-year warranty — built to endure, backed by our commitment to quality and durability.',
    icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z',
  },
] as const

/* ── Platform Ratings ── */

export interface PlatformRating {
  readonly id: string
  readonly platform: string
  readonly rating: string
  readonly reviewCount: string
}

export const PLATFORM_RATINGS: ReadonlyArray<PlatformRating> = [
  { id: 'google', platform: 'Google', rating: '4.9', reviewCount: '200+ reviews' },
  { id: 'justdial', platform: 'JustDial', rating: '4.8', reviewCount: '150+ reviews' },
  { id: 'sulekha', platform: 'Sulekha', rating: '4.7', reviewCount: '100+ reviews' },
  { id: 'urbanclap', platform: 'UrbanCompany', rating: '4.8', reviewCount: '120+ reviews' },
] as const

/* ── Build Testimonials ── */

export const BUILD_TESTIMONIALS: ReadonlyArray<Testimonial> = [
  {
    id: 'build-test-1',
    name: 'Ramesh Hiremath',
    initials: 'RH',
    projectType: 'Residential Construction',
    location: 'Hubli',
    quote:
      'RokVilla built our 3BHK home from foundation to finish in just 8 months. The quality of the RCC frame and plastering is exceptional — our structural engineer was genuinely impressed.',
    rating: 5,
  },
  {
    id: 'build-test-2',
    name: 'Savita Gowda',
    initials: 'SG',
    projectType: 'Luxury Villa',
    location: 'Bengaluru',
    quote:
      'We chose the Signature package and every detail exceeded our expectations. The imported marble work, the smart home integration, the finish quality — it truly feels like a luxury build.',
    rating: 5,
  },
  {
    id: 'build-test-3',
    name: 'Prakash Shetty',
    initials: 'PS',
    projectType: 'Residential Construction',
    location: 'Dharwad',
    quote:
      'Daily site updates kept us informed throughout. We were relocating from Mumbai and never felt disconnected from the progress. Zero cost overruns — exactly what was quoted.',
    rating: 5,
  },
  {
    id: 'build-test-4',
    name: 'Lakshmi Devi',
    initials: 'LD',
    projectType: 'Residential Construction',
    location: 'Ballari',
    quote:
      'The free architectural drawings saved us lakhs. The Vastu-compliant layout feels right, and the 10-year warranty gives us complete peace of mind about the structure.',
    rating: 5,
  },
  {
    id: 'build-test-5',
    name: 'Anil Patil',
    initials: 'AP',
    projectType: 'Commercial Construction',
    location: 'Hubli',
    quote:
      'They handled our commercial showroom construction professionally from start to finish. The project coordination was seamless and they delivered ahead of schedule.',
    rating: 5,
  },
] as const

/* ── Build FAQs ── */

export type BuildFAQCategory = 'packages' | 'pricing' | 'process' | 'warranty'

export const BUILD_FAQ_CATEGORIES: ReadonlyArray<{
  readonly id: BuildFAQCategory
  readonly label: string
}> = [
  { id: 'packages', label: 'Packages' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'process', label: 'Process' },
  { id: 'warranty', label: 'Warranty' },
] as const

export interface BuildFAQItem {
  readonly id: string
  readonly category: BuildFAQCategory
  readonly question: string
  readonly answer: string
}

export const BUILD_FAQS: ReadonlyArray<BuildFAQItem> = [
  {
    id: 'build-faq-1',
    category: 'packages',
    question: "What's covered in each construction package?",
    answer:
      'Every package comes with the materials and labour needed to build your home, along with end-to-end project management, a dedicated on-site engineer, a mobile app for real-time project tracking, and a 10-year structural warranty plus a 1-year warranty on materials. For a detailed breakdown of inclusions, refer to the comparison table above.',
  },
  {
    id: 'build-faq-2',
    category: 'packages',
    question: 'How do the packages differ from one another?',
    answer:
      'The core differences come down to material quality — brands of cement and steel, underground and overhead tank capacities, and the wallet amounts allocated for tiles, granite, kitchen and bathroom fittings, paint finishes, doors, windows, and electrical switches.',
  },
  {
    id: 'build-faq-3',
    category: 'packages',
    question: 'Is it possible to customise a package?',
    answer:
      'Absolutely. Each package includes a fixed wallet amount for items such as tiles, fittings, and finishes. Speak with your Technical Consultant to explore the customisation options available for your project.',
  },
  {
    id: 'build-faq-4',
    category: 'packages',
    question: 'Do I get to choose my own fittings?',
    answer:
      'Yes — you will have a selection of fittings to pick from, so you can choose options that match your personal style and budget.',
  },
  {
    id: 'build-faq-5',
    category: 'pricing',
    question: 'What exactly is a wallet amount?',
    answer:
      'A wallet amount is a pre-allocated budget built into your package, which you can spend on items like tiles, doors, and fittings. If you opt for selections that exceed the wallet amount, the difference is payable separately.',
  },
  {
    id: 'build-faq-6',
    category: 'pricing',
    question: 'Are the listed prices inclusive of GST?',
    answer: 'Yes, all prices shown are inclusive of GST.',
  },
  {
    id: 'build-faq-7',
    category: 'pricing',
    question: 'Are there any hidden charges I should know about?',
    answer:
      'None at all. Every expense is transparently documented in the contract before construction begins, so you will know the full cost upfront with no surprises along the way.',
  },
  {
    id: 'build-faq-8',
    category: 'packages',
    question: 'Is the compound wall part of the package?',
    answer:
      'Since not every home requires a compound wall — and some may only need it on two or three sides — we offer it as an optional add-on. This way, only clients who need it pay for it, keeping costs fair for everyone.',
  },
  {
    id: 'build-faq-9',
    category: 'process',
    question: 'Does Rokvilla handle building approvals?',
    answer:
      'Rokvilla facilitates the approval process through experienced Construction Professionals on our platform. While we are not directly involved in the approvals, our partners work closely with you to ensure a completely hassle-free experience from start to finish.',
  },
  {
    id: 'build-faq-10',
    category: 'warranty',
    question: 'What warranty do I get on the completed work?',
    answer:
      'We stand behind every project with a 10-year warranty on the structure of your home and a 1-year warranty on finishing work. Any warranties on fittings and furnishings are honoured directly by their respective manufacturers and suppliers.',
  },
] as const
