/* ── Team Members ── */

export interface TeamMember {
  readonly id: string
  readonly name: string
  readonly title: string
  readonly bio: string
  readonly photoSrc: string
  readonly photoAlt: string
}

export const TEAM_MEMBERS: ReadonlyArray<TeamMember> = [
  {
    id: 'founder-1',
    name: 'Ar. Channarajayya',
    title: 'Co-Founder',
    bio: 'Channarajayya studied architecture twice over — diploma first, then a full degree. He\u2019s the one making sure every line on the drawing actually works on site.',
    photoSrc: '/ROKVILLA PROFILE/5.jpg',
    photoAlt: 'Portrait of Ar. Channarajayya, Co-Founder of RokVilla',
  },
  {
    id: 'founder-2',
    name: 'Ar. Ritika',
    title: 'Co-Founder',
    bio: 'Ritika handles the interiors — she did her Bachelor\u2019s in Architecture and then a Master\u2019s in Interior Design. If a room feels right when you walk in, that\u2019s usually her doing.',
    photoSrc: '/ROKVILLA PROFILE/6.jpg',
    photoAlt: 'Portrait of Ar. Ritika, Co-Founder of RokVilla',
  },
  {
    id: 'founder-3',
    name: 'Ar. Sujay SK',
    title: 'Co-Founder',
    bio: 'Sujay knows construction inside out. Diploma in Architecture, years on actual sites. He\u2019s the reason things get built the way they were designed — no shortcuts.',
    photoSrc: '/ROKVILLA PROFILE/7.jpg',
    photoAlt: 'Portrait of Ar. Sujay SK, Co-Founder of RokVilla',
  },
] as const

/* ── Timeline Entries ── */

export interface TimelineEntry {
  readonly id: string
  readonly year: string
  readonly title: string
  readonly description: string
  readonly imageSrc?: string
  readonly imageAlt?: string
}

export const TIMELINE_ENTRIES: ReadonlyArray<TimelineEntry> = [
  {
    id: 't1',
    year: '2021',
    title: 'RokVilla Founded',
    description:
      'Studio opens in Hubballi with a clear mission — design, build, and furnish spaces that stand the test of time.',
    imageSrc: '/00 FINISHED/14 ROKVILLA OFFICE/14_ROKVILLA OFFICE_01.jpg',
    imageAlt: 'RokVilla studio interior in Hubballi',
  },
  {
    id: 't2',
    year: '2022',
    title: 'First Major Residences',
    description:
      'Sripradha and Sri Ganesha Residence delivered — establishing a reputation for quality craftsmanship in residential architecture.',
    imageSrc: '/00 FINISHED/01 SRIPRADHA/HERO IMAGE_01_SRIPRADHA.jpg',
    imageAlt: 'Sripradha residence exterior',
  },
  {
    id: 't3',
    year: '2023',
    title: 'Commercial Expansion',
    description:
      'Cedar Homestore and Spectrum Industry completed — broadening the portfolio into commercial and industrial design.',
    imageSrc:
      '/00 FINISHED/11 CEDAR HOMESTORE/HERO IMAGE_CEDAR HOMESTORE_11.jpg',
    imageAlt: 'Cedar Homestore showroom facade',
  },
  {
    id: 't4',
    year: '2024',
    title: 'Multi-City Growth',
    description:
      'Operations expand to Dharwad and Ballari with Ashok Residence, Pavan VJ, and Raj Residence — taking the studio beyond Hubballi.',
    imageSrc: '/00 FINISHED/09 ASHOK RESIDENCE/09_ASHOK RESIDENCE_01.jpg',
    imageAlt: 'Ashok Residence exterior',
  },
  {
    id: 't5',
    year: '2025',
    title: 'Design. Build. Furnish.',
    description:
      'Full end-to-end studio — 15+ projects delivered across residential, commercial, interior, and infrastructure.',
    imageSrc: '/00 FINISHED/07 PAVAN VJ /HERO IMAGE_PAVAN VJ_07.jpg',
    imageAlt: 'Pavan VJ residence exterior',
  },
] as const
