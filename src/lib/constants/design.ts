/* ═══════════════════════════════════════════════
   RokVilla Design Page — Constants & Data
   ═══════════════════════════════════════════════ */

/* ── Process Steps ── */

export interface ProcessStep {
  readonly number: string
  readonly title: string
  readonly description: string
  readonly href: string
}

export const DESIGN_STEPS: ReadonlyArray<ProcessStep> = [
  {
    number: '01',
    title: 'Go Through Our Projects',
    description:
      'Browse our portfolio of residential, commercial, and interior projects to find inspiration for your vision.',
    href: '#design-projects',
  },
  {
    number: '02',
    title: 'Choose Your Design Service',
    description:
      'Select the type of architectural or interior design service that fits your project requirements.',
    href: '#dockets',
  },
  {
    number: '03',
    title: 'Connect With Us',
    description:
      'Schedule a free consultation and let our team turn your dream into a detailed, buildable design.',
    href: '#consultation',
  },
] as const

/* ── Docket Tiers ── */

export interface DocketTier {
  readonly id: string
  readonly name: string
  readonly tagline: string
  readonly inclusions: ReadonlyArray<string>
  readonly highlighted: boolean
}

export const DESIGN_DOCKETS: ReadonlyArray<DocketTier> = [
  {
    id: 'basic',
    name: 'Basic Docket',
    tagline: 'Essential drawings to get started',
    inclusions: [
      'Floor plans (all levels)',
      'Two exterior elevations',
      'Basic site plan',
      'Area statement',
      '2 revision rounds',
    ],
    highlighted: false,
  },
  {
    id: 'standard',
    name: 'Standard Docket',
    tagline: 'Complete working drawings for construction',
    inclusions: [
      'Everything in Basic',
      'All four elevations',
      'Section drawings',
      'Structural layout',
      'Electrical & plumbing layout',
      'Door & window schedule',
      '4 revision rounds',
    ],
    highlighted: true,
  },
  {
    id: 'premium',
    name: 'Premium Docket',
    tagline: 'Full documentation with 3D visualization',
    inclusions: [
      'Everything in Standard',
      '3D exterior renders (4 views)',
      'Interior walkthrough views',
      'Detailed BOQ estimation',
      'Landscape plan',
      'Construction supervision notes',
      'Unlimited revisions',
    ],
    highlighted: false,
  },
] as const

/* ── Testimonials ── */

export interface Testimonial {
  readonly id: string
  readonly name: string
  readonly initials: string
  readonly projectType: string
  readonly location: string
  readonly quote: string
  readonly rating: number
}

export const DESIGN_TESTIMONIALS: ReadonlyArray<Testimonial> = [
  {
    id: 'test-1',
    name: 'Rajesh Kulkarni',
    initials: 'RK',
    projectType: 'Residential',
    location: 'Hubli',
    quote:
      'RokVilla transformed our vague ideas into a stunning home design. Their attention to vastu compliance while keeping the aesthetics modern was impressive.',
    rating: 5,
  },
  {
    id: 'test-2',
    name: 'Priya Deshpande',
    initials: 'PD',
    projectType: 'Interior',
    location: 'Dharwad',
    quote:
      'The interior design for our apartment exceeded all expectations. Every corner feels intentional, from the custom joinery to the lighting plan.',
    rating: 5,
  },
  {
    id: 'test-3',
    name: 'Mahesh Patil',
    initials: 'MP',
    projectType: 'Commercial',
    location: 'Hubli',
    quote:
      'Our showroom design by RokVilla increased foot traffic by 40%. The spatial planning and facade design completely stand out on the street.',
    rating: 5,
  },
  {
    id: 'test-4',
    name: 'Anita Hegde',
    initials: 'AH',
    projectType: 'Residential',
    location: 'Ballari',
    quote:
      'From the first sketch to final drawings, the team was incredibly responsive. They balanced our budget constraints without compromising the design quality.',
    rating: 5,
  },
  {
    id: 'test-5',
    name: 'Vinay Joshi',
    initials: 'VJ',
    projectType: 'Residential',
    location: 'Dharwad',
    quote:
      'What sets RokVilla apart is their construction-aware design approach. The drawings were so detailed that our contractor had zero ambiguity during execution.',
    rating: 5,
  },
  {
    id: 'test-6',
    name: 'Sneha Naik',
    initials: 'SN',
    projectType: 'Interior',
    location: 'Hubli',
    quote:
      'They designed our café interior with a perfect blend of warmth and modern edge. Customers constantly compliment the space — it speaks for itself.',
    rating: 5,
  },
] as const

/* ── FAQ Items ── */

export type FAQCategory = 'design' | 'process' | 'pricing' | 'timeline'

export interface FAQItem {
  readonly id: string
  readonly category: FAQCategory
  readonly question: string
  readonly answer: string
}

export const FAQ_CATEGORIES: ReadonlyArray<{
  readonly id: FAQCategory
  readonly label: string
}> = [
  { id: 'design', label: 'Design' },
  { id: 'process', label: 'Process' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'timeline', label: 'Timeline' },
] as const

export const DESIGN_FAQS: ReadonlyArray<FAQItem> = [
  {
    id: 'faq-1',
    category: 'design',
    question: 'What is included in a residential design package?',
    answer:
      'Our residential design packages include site analysis, conceptual design, floor plans, elevations, section drawings, and 3D visualisations. Premium packages also include interior layout, landscape design, and a detailed bill of quantities.',
  },
  {
    id: 'faq-2',
    category: 'design',
    question: 'Do you incorporate Vastu principles in your designs?',
    answer:
      'Yes, we integrate Vastu Shastra principles into our designs upon request. Our architects balance traditional Vastu guidelines with contemporary design aesthetics to create spaces that are both compliant and visually striking.',
  },
  {
    id: 'faq-3',
    category: 'design',
    question: 'Can you design for plots with irregular shapes or constraints?',
    answer:
      'Absolutely. We specialise in maximising potential on challenging plots — narrow frontages, irregular shapes, sloped terrain, and corner sites. Our design approach turns constraints into unique architectural features.',
  },
  {
    id: 'faq-4',
    category: 'process',
    question: 'How does the design consultation process work?',
    answer:
      'It starts with a free initial consultation where we understand your requirements, budget, and vision. We then present a conceptual design within 2 weeks, followed by iterative refinement based on your feedback until you are fully satisfied.',
  },
  {
    id: 'faq-5',
    category: 'process',
    question: 'How many revision rounds are included?',
    answer:
      'The number of revision rounds depends on your chosen docket. Basic includes 2 rounds, Standard includes 4, and Premium offers unlimited revisions. Each round covers changes to layout, elevations, and material specifications.',
  },
  {
    id: 'faq-6',
    category: 'pricing',
    question: 'How is the design fee calculated?',
    answer:
      'Design fees are typically calculated per square foot of built-up area and vary by project complexity. We provide a detailed fee breakdown during the initial consultation so there are no surprises. Fees cover all drawings, renders, and site visits.',
  },
  {
    id: 'faq-7',
    category: 'pricing',
    question: 'Is the consultation fee deducted from the project cost?',
    answer:
      'The initial consultation is completely free with no obligations. If you proceed with our design services, we provide a transparent quotation based on your specific project scope and requirements.',
  },
  {
    id: 'faq-8',
    category: 'timeline',
    question: 'How long does a complete design take?',
    answer:
      'A typical residential design takes 4–8 weeks from the first meeting to final construction drawings. This includes conceptual design (1–2 weeks), client revisions (1–2 weeks), and detailed working drawings (2–4 weeks). Commercial projects may take longer.',
  },
  {
    id: 'faq-9',
    category: 'timeline',
    question: 'Can the design process be expedited for urgent projects?',
    answer:
      'Yes, we offer an expedited design track for time-sensitive projects. With dedicated resources and streamlined review cycles, we can compress timelines by up to 40% while maintaining our quality standards.',
  },
  {
    id: 'faq-10',
    category: 'process',
    question: 'Do you provide construction supervision after design completion?',
    answer:
      'Yes, we offer optional construction supervision services to ensure the built outcome matches the design intent. This includes periodic site visits, material verification, and coordination with contractors throughout the construction phase.',
  },
] as const

/* ── Stats ── */

export interface Stat {
  readonly value: number
  readonly suffix: string
  readonly label: string
}

export const DESIGN_STATS: ReadonlyArray<Stat> = [
  { value: 50, suffix: '+', label: 'Projects Delivered' },
  { value: 100, suffix: '%', label: 'Quality Assurance' },
  { value: 0, suffix: '%', label: 'Cost Overrun' },
] as const
