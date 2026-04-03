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

/* ── About Stats ── */

export interface AboutStat {
  readonly id: string
  readonly value: number
  readonly suffix: string
  readonly label: string
}

export const ABOUT_STATS: ReadonlyArray<AboutStat> = [
  { id: 'stat-projects', value: 50, suffix: '+', label: 'Projects Delivered' },
  { id: 'stat-cities', value: 4, suffix: '', label: 'Cities Across Karnataka' },
  { id: 'stat-services', value: 3, suffix: '', label: 'Core Services' },
  { id: 'stat-clients', value: 200, suffix: '+', label: 'Happy Clients' },
] as const
