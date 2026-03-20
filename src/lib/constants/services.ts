import type { Service } from '@/types/service'

export const SERVICES: ReadonlyArray<Service> = [
  {
    id: 'design',
    title: 'Design',
    description: 'Architectural Excellence',
    icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
    href: '/design',
    image: '/services/design-card.jpg',
  },
  {
    id: 'build',
    title: 'Build Packages',
    description: 'Quality Construction',
    icon: 'M3 21h18M3 7v1a3 3 0 006 0V7m0 0V7a3 3 0 016 0v1m0-1V7a3 3 0 016 0v1M6 21V10m6 11V10m6 11V10',
    href: '/build',
    image: '/services/build.jpg',
  },
  {
    id: 'furnish',
    title: 'Furnish',
    description: 'Complete Décor',
    icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
    href: '/furnish',
    image: '/services/furnish-card.jpg',
  },
] as const
