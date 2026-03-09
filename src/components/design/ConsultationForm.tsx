'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Button } from '@/components/ui/Button'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { EASE_OUT_EXPO } from '@/lib/motion'

/* ── Types ── */

interface FormFields {
  readonly name: string
  readonly email: string
  readonly phone: string
  readonly category: string
  readonly consultationType: string
  readonly message: string
  readonly privacy: boolean
}

type FormErrors = Partial<Record<keyof FormFields, string>>

const INITIAL_FIELDS: FormFields = {
  name: '',
  email: '',
  phone: '',
  category: '',
  consultationType: 'in-person',
  message: '',
  privacy: false,
}

/* ── Validation ── */

function validateForm(fields: FormFields): FormErrors {
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
  if (!fields.privacy) errors.privacy = 'You must agree to the privacy policy'

  return errors
}

/* ── Input component ── */

function FormInput({
  label,
  name,
  type = 'text',
  value,
  error,
  placeholder,
  onChange,
}: {
  readonly label: string
  readonly name: string
  readonly type?: string
  readonly value: string
  readonly error?: string
  readonly placeholder?: string
  readonly onChange: (name: string, value: string) => void
}) {
  return (
    <div>
      <label
        htmlFor={`form-${name}`}
        className="mb-1.5 block font-body text-[13px] font-medium uppercase tracking-[0.06em] text-slate"
      >
        {label}
      </label>
      <input
        id={`form-${name}`}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(name, e.target.value)}
        aria-invalid={!!error}
        aria-describedby={error ? `form-${name}-error` : undefined}
        className={`w-full rounded-[2px] border bg-white px-4 py-3 font-body text-sm text-obsidian placeholder:text-stone/50 transition-colors duration-200 focus:outline-none focus:ring-1 ${
          error
            ? 'border-terracotta-deep focus:border-terracotta-deep focus:ring-terracotta-deep/30'
            : 'border-limestone focus:border-terracotta focus:ring-terracotta/30'
        }`}
      />
      {error && (
        <p id={`form-${name}-error`} role="alert" className="mt-1 font-body text-xs text-terracotta-deep">{error}</p>
      )}
    </div>
  )
}

/* ── Main component ── */

export function ConsultationForm() {
  const reducedMotion = useReducedMotion()
  const [fields, setFields] = useState<FormFields>(INITIAL_FIELDS)
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)

  const handleChange = useCallback((name: string, value: string) => {
    setFields((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => {
      if (!prev[name as keyof FormFields]) return prev
      const { [name as keyof FormFields]: _, ...rest } = prev
      return rest
    })
  }, [])

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      const validationErrors = validateForm(fields)
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors)
        return
      }
      setSubmitted(true)
      setFields(INITIAL_FIELDS)
      setErrors({})
    },
    [fields],
  )

  return (
    <section
      id="consultation"
      aria-labelledby="consultation-heading"
      className="bg-white py-24 md:py-32 lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12 xl:px-16">
        {/* Header */}
        <AnimatedSection className="text-center">
          <h2
            id="consultation-heading"
            className="font-display text-3xl font-medium text-obsidian md:text-4xl lg:text-5xl"
          >
            You Dream. We Deliver.
          </h2>
          <p className="mt-3 font-body text-base tracking-wide text-slate md:text-lg">
            Ready to build your dream home? Schedule a free consultation today and begin
            the journey of turning your dream into reality.
          </p>
        </AnimatedSection>

        {/* Form */}
        <AnimatedSection delay={0.15} className="mt-14">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reducedMotion ? 0.15 : 0.5, ease: EASE_OUT_EXPO }}
                className="mx-auto max-w-xl rounded-[4px] border border-limestone/60 bg-parchment p-12 text-center"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-terracotta/10">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-terracotta"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <h3 className="font-display text-2xl font-medium text-obsidian">
                  Thank You!
                </h3>
                <p className="mt-2 font-body text-sm text-slate">
                  We&apos;ve received your consultation request. Our team will reach
                  out within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-6 font-body text-[13px] uppercase tracking-[0.08em] text-terracotta transition-colors hover:text-terracotta-deep"
                >
                  Submit Another Request
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onSubmit={handleSubmit}
                noValidate
                className="mx-auto max-w-3xl rounded-[4px] border border-limestone/60 bg-parchment p-8 md:p-12"
              >
                {/* Row 1: Name, Email, Phone */}
                <div className="grid gap-5 md:grid-cols-3">
                  <FormInput
                    label="Name"
                    name="name"
                    value={fields.name}
                    error={errors.name}
                    placeholder="Your name"
                    onChange={handleChange}
                  />
                  <FormInput
                    label="Email"
                    name="email"
                    type="email"
                    value={fields.email}
                    error={errors.email}
                    placeholder="you@example.com"
                    onChange={handleChange}
                  />
                  <FormInput
                    label="Phone"
                    name="phone"
                    type="tel"
                    value={fields.phone}
                    error={errors.phone}
                    placeholder="+91 98765 43210"
                    onChange={handleChange}
                  />
                </div>

                {/* Row 2: Category */}
                <div className="mt-5">
                  <label
                    htmlFor="form-category"
                    className="mb-1.5 block font-body text-[13px] font-medium uppercase tracking-[0.06em] text-slate"
                  >
                    Category
                  </label>
                  <select
                    id="form-category"
                    name="category"
                    value={fields.category}
                    onChange={(e) => handleChange('category', e.target.value)}
                    aria-invalid={!!errors.category}
                    aria-describedby={errors.category ? 'form-category-error' : undefined}
                    className={`w-full rounded-[2px] border bg-white px-4 py-3 font-body text-sm text-obsidian transition-colors duration-200 focus:outline-none focus:ring-1 ${
                      errors.category
                        ? 'border-terracotta-deep focus:border-terracotta-deep focus:ring-terracotta-deep/30'
                        : 'border-limestone focus:border-terracotta focus:ring-terracotta/30'
                    }`}
                  >
                    <option value="">Select a category</option>
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="interior">Interior</option>
                  </select>
                  {errors.category && (
                    <p id="form-category-error" role="alert" className="mt-1 font-body text-xs text-terracotta-deep">
                      {errors.category}
                    </p>
                  )}
                </div>

                {/* Row 3: Consultation type */}
                <fieldset className="mt-5">
                  <legend className="mb-2 font-body text-[13px] font-medium uppercase tracking-[0.06em] text-slate">
                    Consultation Type
                  </legend>
                  <div className="flex gap-6">
                    {(['in-person', 'virtual'] as const).map((type) => (
                      <label key={type} className="flex cursor-pointer items-center gap-2">
                        <input
                          type="radio"
                          name="consultationType"
                          value={type}
                          checked={fields.consultationType === type}
                          onChange={(e) =>
                            handleChange('consultationType', e.target.value)
                          }
                          className="h-4 w-4 accent-terracotta"
                        />
                        <span className="font-body text-sm text-obsidian">
                          {type === 'in-person' ? 'In Person' : 'Virtual'}
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                {/* Row 4: Message */}
                <div className="mt-5">
                  <label
                    htmlFor="form-message"
                    className="mb-1.5 block font-body text-[13px] font-medium uppercase tracking-[0.06em] text-slate"
                  >
                    Message (optional)
                  </label>
                  <textarea
                    id="form-message"
                    name="message"
                    rows={4}
                    value={fields.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    placeholder="Tell us about your project..."
                    className="w-full resize-none rounded-[2px] border border-limestone bg-white px-4 py-3 font-body text-sm text-obsidian placeholder:text-stone/50 transition-colors duration-200 focus:border-terracotta focus:outline-none focus:ring-1 focus:ring-terracotta/30"
                  />
                </div>

                {/* Privacy checkbox */}
                <div className="mt-5">
                  <label htmlFor="form-privacy" className="flex cursor-pointer items-start gap-2.5">
                    <input
                      id="form-privacy"
                      name="privacy"
                      type="checkbox"
                      checked={fields.privacy}
                      onChange={(e) =>
                        setFields((prev) => ({ ...prev, privacy: e.target.checked }))
                      }
                      aria-invalid={!!errors.privacy}
                      aria-describedby={errors.privacy ? 'form-privacy-error' : undefined}
                      className="mt-0.5 h-4 w-4 accent-terracotta"
                    />
                    <span className="font-body text-xs text-slate">
                      I agree to the Privacy Policy and Terms &amp; Conditions
                    </span>
                  </label>
                  {errors.privacy && (
                    <p id="form-privacy-error" role="alert" className="mt-1 font-body text-xs text-terracotta-deep">
                      {errors.privacy}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <div className="mt-8">
                  <Button variant="primary" type="submit" fullWidth>
                    Book a Meeting
                  </Button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </AnimatedSection>
      </div>
    </section>
  )
}
