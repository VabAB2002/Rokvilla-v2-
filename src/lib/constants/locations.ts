import type { Location } from '@/types/location'

// REPLACE_ME: Update with actual addresses, phone, and email
export const LOCATIONS: ReadonlyArray<Location> = [
  {
    id: 'hubli',
    city: 'Hubli',
    address: '123 Vidyanagar, Hubli - 580021, Karnataka',
    phone: '+91 00000 00000',
    email: 'hubli@rokvilla.com',
    lat: 15.3647,
    lng: 75.1240,
  },
  {
    id: 'dharwad',
    city: 'Dharwad',
    address: '456 Saptapur, Dharwad - 580001, Karnataka',
    phone: '+91 00000 00000',
    email: 'dharwad@rokvilla.com',
    lat: 15.4589,
    lng: 75.0078,
  },
  {
    id: 'ballari',
    city: 'Ballari',
    address: '789 Gandhi Nagar, Ballari - 583101, Karnataka',
    phone: '+91 00000 00000',
    email: 'ballari@rokvilla.com',
    lat: 15.1394,
    lng: 76.9214,
  },
] as const
