export interface FormFields {
  readonly name: string
  readonly email: string
  readonly phone: string
  readonly category: string
  readonly consultationType: string
  readonly location: string
  readonly message: string
  readonly privacy: boolean
}

export type FormErrors = Partial<Record<keyof FormFields, string>>

export const INITIAL_FIELDS: FormFields = {
  name: '',
  email: '',
  phone: '',
  category: '',
  consultationType: '',
  location: '',
  message: '',
  privacy: false,
}

export function validateForm(fields: FormFields): FormErrors {
  const errors: FormErrors = {}

  if (!fields.name.trim()) errors.name = 'Name is required'
  if (!fields.email.trim()) {
    errors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = 'Enter a valid email address'
  }
  if (!fields.phone.trim()) {
    errors.phone = 'Phone number is required'
  } else if (!/^[+\d][\d\s-]{7,15}$/.test(fields.phone)) {
    errors.phone = 'Enter a valid phone number'
  }
  if (!fields.category) errors.category = 'Select a category'
  if (!fields.consultationType) errors.consultationType = 'Select a consultation type'
  if (!fields.location) errors.location = 'Select a location'
  if (!fields.privacy) errors.privacy = 'You must agree to the privacy policy'

  return errors
}
