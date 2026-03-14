import type { Location } from '@/types/location'

export const LOCATIONS: ReadonlyArray<Location> = [
  {
    id: 'hubli',
    city: 'Hubballi',
    address: 'Rokvilla Design & Build Co, 20, Hubballi, Karnataka 580031',
    phone: '+91 78992 32229',
    phone2: '+91 78992 42229',
    email: 'hubli@rokvilla.com',
    lat: 15.3647,
    lng: 75.1240,
  },
  {
    id: 'dharwad',
    city: 'Dharwad',
    address: '14th B Sub Main, Navodaya Nagar, Dharwad, Karnataka 580003',
    phone: '+91 78992 32229',
    phone2: '+91 78992 42229',
    email: 'dharwad@rokvilla.com',
    lat: 15.4589,
    lng: 75.0078,
  },
  {
    id: 'ballari',
    city: 'Ballari',
    address: 'Vishnu Nagar, Gandhi Nagar, Ballari, Karnataka 583103',
    phone: '+91 78992 32229',
    phone2: '+91 78992 42229',
    email: 'ballari@rokvilla.com',
    lat: 15.1602,
    lng: 76.9469,
  },
] as const
