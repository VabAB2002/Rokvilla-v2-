import { INITIAL_FIELDS, validateForm } from '@/lib/validation/consultationForm'
import type { FormFields } from '@/lib/validation/consultationForm'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const VALID_FIELDS: FormFields = {
  name: 'Jane Doe',
  email: 'jane@example.com',
  phone: '+12345678901',
  category: 'residential',
  consultationType: 'online',
  location: 'zurich',
  message: '',
  privacy: true,
}

// ---------------------------------------------------------------------------
// INITIAL_FIELDS
// ---------------------------------------------------------------------------

describe('INITIAL_FIELDS', () => {
  it('has empty string for name', () => {
    expect(INITIAL_FIELDS.name).toBe('')
  })

  it('has empty string for email', () => {
    expect(INITIAL_FIELDS.email).toBe('')
  })

  it('has empty string for phone', () => {
    expect(INITIAL_FIELDS.phone).toBe('')
  })

  it('has empty string for category', () => {
    expect(INITIAL_FIELDS.category).toBe('')
  })

  it('has empty string for consultationType', () => {
    expect(INITIAL_FIELDS.consultationType).toBe('')
  })

  it('has empty string for location', () => {
    expect(INITIAL_FIELDS.location).toBe('')
  })

  it('has empty string for message', () => {
    expect(INITIAL_FIELDS.message).toBe('')
  })

  it('has false for privacy', () => {
    expect(INITIAL_FIELDS.privacy).toBe(false)
  })
})

// ---------------------------------------------------------------------------
// validateForm – all fields empty
// ---------------------------------------------------------------------------

describe('validateForm – all fields empty (INITIAL_FIELDS)', () => {
  const errors = validateForm(INITIAL_FIELDS)

  it('returns error for name', () => {
    expect(errors.name).toBe('Name is required')
  })

  it('returns error for email', () => {
    expect(errors.email).toBe('Email is required')
  })

  it('returns error for phone', () => {
    expect(errors.phone).toBe('Phone number is required')
  })

  it('returns error for category', () => {
    expect(errors.category).toBe('Select a category')
  })

  it('returns error for consultationType', () => {
    expect(errors.consultationType).toBe('Select a consultation type')
  })

  it('returns error for location', () => {
    expect(errors.location).toBe('Select a location')
  })

  it('returns error for privacy', () => {
    expect(errors.privacy).toBe('You must agree to the privacy policy')
  })
})

// ---------------------------------------------------------------------------
// validateForm – fully valid form
// ---------------------------------------------------------------------------

describe('validateForm – fully valid form', () => {
  const errors = validateForm(VALID_FIELDS)

  it('returns no errors', () => {
    expect(errors).toEqual({})
  })
})

// ---------------------------------------------------------------------------
// validateForm – message field is NOT required
// ---------------------------------------------------------------------------

describe('validateForm – message field', () => {
  it('does not produce an error when message is empty', () => {
    const errors = validateForm({ ...VALID_FIELDS, message: '' })
    expect(errors.message).toBeUndefined()
  })

  it('does not produce an error when message has content', () => {
    const errors = validateForm({ ...VALID_FIELDS, message: 'Hello' })
    expect(errors.message).toBeUndefined()
  })
})

// ---------------------------------------------------------------------------
// validateForm – email validation
// ---------------------------------------------------------------------------

describe('validateForm – email validation', () => {
  it('accepts a standard email address', () => {
    const errors = validateForm({ ...VALID_FIELDS, email: 'user@domain.com' })
    expect(errors.email).toBeUndefined()
  })

  it('rejects email without @', () => {
    const errors = validateForm({ ...VALID_FIELDS, email: 'invalidemail.com' })
    expect(errors.email).toBe('Enter a valid email address')
  })

  it('rejects email without domain', () => {
    const errors = validateForm({ ...VALID_FIELDS, email: 'user@' })
    expect(errors.email).toBe('Enter a valid email address')
  })

  it('rejects email without TLD', () => {
    const errors = validateForm({ ...VALID_FIELDS, email: 'user@domain' })
    expect(errors.email).toBe('Enter a valid email address')
  })

  it('rejects email with spaces', () => {
    const errors = validateForm({ ...VALID_FIELDS, email: 'us er@domain.com' })
    expect(errors.email).toBe('Enter a valid email address')
  })

  it('rejects empty email string', () => {
    const errors = validateForm({ ...VALID_FIELDS, email: '' })
    expect(errors.email).toBe('Email is required')
  })

  it('rejects whitespace-only email', () => {
    const errors = validateForm({ ...VALID_FIELDS, email: '   ' })
    expect(errors.email).toBe('Email is required')
  })
})

// ---------------------------------------------------------------------------
// validateForm – phone validation
// ---------------------------------------------------------------------------

describe('validateForm – phone validation', () => {
  it('accepts a valid international phone number', () => {
    const errors = validateForm({ ...VALID_FIELDS, phone: '+12345678901' })
    expect(errors.phone).toBeUndefined()
  })

  it('accepts a digit-only phone number of sufficient length', () => {
    const errors = validateForm({ ...VALID_FIELDS, phone: '012345678' })
    expect(errors.phone).toBeUndefined()
  })

  it('accepts a phone number with spaces and dashes', () => {
    const errors = validateForm({ ...VALID_FIELDS, phone: '+1 234-567-8901' })
    expect(errors.phone).toBeUndefined()
  })

  it('rejects an empty phone string', () => {
    const errors = validateForm({ ...VALID_FIELDS, phone: '' })
    expect(errors.phone).toBe('Phone number is required')
  })

  it('rejects whitespace-only phone', () => {
    const errors = validateForm({ ...VALID_FIELDS, phone: '   ' })
    expect(errors.phone).toBe('Phone number is required')
  })

  it('rejects a phone number that is too short', () => {
    const errors = validateForm({ ...VALID_FIELDS, phone: '+123' })
    expect(errors.phone).toBe('Enter a valid phone number')
  })

  it('rejects a phone number containing letters', () => {
    const errors = validateForm({ ...VALID_FIELDS, phone: 'abcdefghij' })
    expect(errors.phone).toBe('Enter a valid phone number')
  })
})

// ---------------------------------------------------------------------------
// validateForm – edge cases
// ---------------------------------------------------------------------------

describe('validateForm – edge cases', () => {
  it('rejects whitespace-only name', () => {
    const errors = validateForm({ ...VALID_FIELDS, name: '   ' })
    expect(errors.name).toBe('Name is required')
  })

  it('accepts name with leading/trailing spaces that has actual content', () => {
    const errors = validateForm({ ...VALID_FIELDS, name: '  Jane  ' })
    expect(errors.name).toBeUndefined()
  })

  it('returns only the relevant error when a single field is invalid', () => {
    const errors = validateForm({ ...VALID_FIELDS, category: '' })
    expect(Object.keys(errors)).toEqual(['category'])
  })

  it('accumulates multiple errors for multiple invalid fields', () => {
    const errors = validateForm({ ...VALID_FIELDS, name: '', email: 'bad' })
    expect(errors.name).toBe('Name is required')
    expect(errors.email).toBe('Enter a valid email address')
  })

  it('privacy false produces error even when all other fields are valid', () => {
    const errors = validateForm({ ...VALID_FIELDS, privacy: false })
    expect(errors.privacy).toBe('You must agree to the privacy policy')
  })

  it('returns empty errors object when privacy is true and all fields valid', () => {
    const errors = validateForm({ ...VALID_FIELDS, privacy: true })
    expect(errors).toEqual({})
  })
})
