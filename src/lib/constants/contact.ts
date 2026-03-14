export const PHONE_NUMBER = '+917899232229'
export const PHONE_NUMBER_2 = '+917899242229'
export const PHONE_DISPLAY = '+91 78992 32229'
export const PHONE_DISPLAY_2 = '+91 78992 42229'
export const EMAIL = 'home@rokvilla.com'
export const ADDRESS = 'Hubballi, Karnataka'
export const WHATSAPP_URL = `https://wa.me/${PHONE_NUMBER.replace('+', '')}`
export const WHATSAPP_URL_2 = `https://wa.me/${PHONE_NUMBER_2.replace('+', '')}`
export const CALL_URL = `tel:${PHONE_NUMBER}`
export const CALL_URL_2 = `tel:${PHONE_NUMBER_2}`

export const SOCIAL_LINKS = [
  {
    label: 'Instagram',
    href: 'https://instagram.com/rokvilla',
    icon: 'M16 4H8a4 4 0 00-4 4v8a4 4 0 004 4h8a4 4 0 004-4V8a4 4 0 00-4-4z M12 15a3 3 0 110-6 3 3 0 010 6z M16.5 7.5h.01',
  },
  {
    label: 'Facebook',
    href: 'https://facebook.com/rokvilla',
    icon: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z',
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/company/rokvilla',
    icon: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6z M2 9h4v12H2z M4 6a2 2 0 110-4 2 2 0 010 4z',
  },
] as const
