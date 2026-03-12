'use client'

import { type ReactNode, useState, useCallback, useId, useRef, useEffect } from 'react'
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
  readonly location: string
  readonly message: string
  readonly privacy: boolean
}

type FormErrors = Partial<Record<keyof FormFields, string>>

const INITIAL_FIELDS: FormFields = {
  name: '',
  email: '',
  phone: '',
  category: '',
  consultationType: '',
  location: '',
  message: '',
  privacy: false,
}

const CONSULTATION_TYPES = [
  { value: 'in-person', label: 'In Person' },
  { value: 'virtual', label: 'Virtual' },
] as const


const DEFAULT_CATEGORIES: ReadonlyArray<{ readonly value: string; readonly label: string }> = [
  { value: 'residential', label: 'Residential' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'interior', label: 'Interior' },
]

interface ConsultationFormProps {
  readonly title?: string
  readonly subtitle?: string
  readonly categories?: ReadonlyArray<{ readonly value: string; readonly label: string }>
  readonly layout?: 'centered' | 'split'
  readonly illustration?: ReactNode
  readonly contactEmail?: string
  readonly contactPhone?: string
  readonly sectionClassName?: string
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
  if (!fields.consultationType) errors.consultationType = 'Select a consultation type'
  if (!fields.location) errors.location = 'Select a location'
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
  autoComplete,
  required,
  idPrefix,
}: {
  readonly label: string
  readonly name: string
  readonly type?: string
  readonly value: string
  readonly error?: string
  readonly placeholder?: string
  readonly onChange: (name: string, value: string) => void
  readonly autoComplete?: string
  readonly required?: boolean
  readonly idPrefix: string
}) {
  const inputId = `${idPrefix}-${name}`
  const errorId = `${inputId}-error`
  return (
    <div>
      <label
        htmlFor={inputId}
        className="mb-1.5 block font-body text-[13px] font-medium uppercase tracking-[0.06em] text-slate"
      >
        {label}
      </label>
      <input
        id={inputId}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(name, e.target.value)}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        autoComplete={autoComplete}
        aria-required={required}
        inputMode={name === 'phone' ? 'tel' : undefined}
        autoCapitalize={type === 'email' ? 'none' : undefined}
        className={`min-h-[52px] w-full rounded-[2px] border bg-white px-4 py-3 font-body text-base text-obsidian placeholder:text-stone/50 transition-colors duration-200 focus:outline-none focus:ring-1 ${
          error
            ? 'border-terracotta-deep focus:border-terracotta-deep focus:ring-terracotta-deep/30'
            : 'border-limestone focus:border-terracotta focus:ring-terracotta/30'
        }`}
      />
      {error && (
        <p id={errorId} role="alert" className="mt-1 font-body text-xs text-terracotta-deep">{error}</p>
      )}
    </div>
  )
}

/* ── Custom select component ── */

interface SelectOption {
  readonly value: string
  readonly label: string
}

function FormSelect({
  label,
  name,
  value,
  error,
  placeholder,
  options,
  onChange,
  required,
  idPrefix,
}: {
  readonly label: string
  readonly name: string
  readonly value: string
  readonly error?: string
  readonly placeholder: string
  readonly options: ReadonlyArray<SelectOption>
  readonly onChange: (name: string, value: string) => void
  readonly required?: boolean
  readonly idPrefix: string
}) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const triggerId = `${idPrefix}-${name}`
  const listboxId = `${triggerId}-listbox`
  const errorId = `${triggerId}-error`

  const selectedLabel = options.find((o) => o.value === value)?.label ?? ''

  // Close on outside click
  useEffect(() => {
    if (!open) return
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        return
      }
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        setOpen((prev) => !prev)
        return
      }
      if (!open) return
      const currentIndex = options.findIndex((o) => o.value === value)
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        const next = Math.min(currentIndex + 1, options.length - 1)
        onChange(name, options[next].value)
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        const prev = Math.max(currentIndex - 1, 0)
        onChange(name, options[prev].value)
      }
    },
    [open, value, options, onChange, name],
  )

  return (
    <div ref={containerRef}>
      <label
        htmlFor={triggerId}
        className="mb-1.5 block font-body text-[13px] font-medium uppercase tracking-[0.06em] text-slate"
      >
        {label}
      </label>
      <div className="relative">
        {/* Trigger button */}
        <button
          id={triggerId}
          type="button"
          role="combobox"
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-controls={listboxId}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          aria-required={required}
          onClick={() => setOpen((prev) => !prev)}
          onKeyDown={handleKeyDown}
          className={`flex min-h-[52px] w-full items-center justify-between rounded-[2px] border bg-white px-4 py-3 text-left font-body text-base transition-colors duration-200 focus:outline-none focus:ring-1 ${
            error
              ? 'border-terracotta-deep focus:border-terracotta-deep focus:ring-terracotta-deep/30'
              : open
                ? 'border-terracotta ring-1 ring-terracotta/30'
                : 'border-limestone focus:border-terracotta focus:ring-terracotta/30'
          }`}
        >
          <span className={selectedLabel ? 'text-obsidian' : 'text-stone/50'}>
            {selectedLabel || placeholder}
          </span>
          {/* Chevron */}
          <svg
            className={`ml-2 h-4 w-4 shrink-0 text-stone transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>

        {/* Dropdown panel */}
        <AnimatePresence>
          {open && (
            <motion.ul
              ref={listRef}
              id={listboxId}
              role="listbox"
              aria-label={label}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="absolute z-50 mt-1 w-full overflow-hidden rounded-md border border-limestone/40 bg-white shadow-lg"
            >
              {options.map((option) => {
                const isSelected = option.value === value
                return (
                  <li
                    key={option.value}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => {
                      onChange(name, option.value)
                      setOpen(false)
                    }}
                    className={`flex min-h-[48px] cursor-pointer items-center px-4 py-3 font-body text-base transition-colors duration-150 ${
                      isSelected
                        ? 'bg-terracotta/10 font-medium text-terracotta'
                        : 'text-obsidian hover:bg-parchment'
                    }`}
                  >
                    {option.label}
                    {isSelected && (
                      <svg
                        className="ml-auto h-5 w-5 shrink-0 text-terracotta"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    )}
                  </li>
                )
              })}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
      {error && (
        <p id={errorId} role="alert" className="mt-1 font-body text-xs text-terracotta-deep">{error}</p>
      )}
    </div>
  )
}

/* ── Main component ── */

/* ── Blueprint grid background for split layout ── */

function BlueprintGrid() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.035]"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <pattern id="blueprint-grid" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M 24 0 L 0 0 0 24" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#blueprint-grid)" className="text-terracotta" />
    </svg>
  )
}

export function ConsultationForm({
  title = 'You Dream. We Deliver.',
  subtitle = 'Ready to build your dream home? Schedule a free consultation today and begin the journey of turning your dream into reality.',
  categories = DEFAULT_CATEGORIES,
  layout = 'centered',
  illustration,
  contactEmail = 'hello@rokvilla.com',
  contactPhone = '+91 98765 43210',
  sectionClassName,
}: ConsultationFormProps) {
  const reducedMotion = useReducedMotion()
  const uid = useId()
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

  /* ── Split layout variant ── */
  if (layout === 'split') {
    return (
      <section
        id="consultation"
        aria-labelledby="consultation-heading"
        className={sectionClassName ?? "relative overflow-hidden bg-parchment py-12 md:py-32 lg:py-36"}
      >
        <BlueprintGrid />
        {/* Faint construction guide lines */}
        <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.05]" aria-hidden="true">
          <line x1="0" y1="50%" x2="100%" y2="50%" stroke="currentColor" strokeWidth="0.5" strokeDasharray="8 5" className="text-limestone" />
          <line x1="40%" y1="0" x2="40%" y2="100%" stroke="currentColor" strokeWidth="0.5" strokeDasharray="8 5" className="text-limestone" />
        </svg>

        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 xl:px-16">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
            {/* Left column: text + illustration + contact */}
            <AnimatedSection className="flex-1 lg:max-w-md">
              <p className="font-accent text-[13px] uppercase tracking-[0.18em] text-brass md:text-[15px]">
                We&apos;re here to help
              </p>
              <h2
                id="consultation-heading"
                className="mt-3 font-display text-3xl font-medium text-obsidian md:text-4xl lg:text-5xl"
              >
                {title.includes('Deliver') ? (
                  <>
                    You Dream.
                    <br />
                    We <span className="text-terracotta">Deliver.</span>
                  </>
                ) : (
                  title
                )}
              </h2>
              <p className="mt-4 max-w-sm font-body text-base leading-relaxed tracking-wide text-slate md:text-lg">
                {subtitle}
              </p>

              {/* Illustration slot */}
              {illustration && <div className="mt-8">{illustration}</div>}

              {/* Contact info */}
              <div className="mt-6 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-terracotta/10 bg-terracotta/5">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      className="text-terracotta"
                    >
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="M22,4L12,13L2,4" />
                    </svg>
                  </div>
                  <span className="font-body text-sm text-slate">{contactEmail}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-terracotta/10 bg-terracotta/5">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      className="text-terracotta"
                    >
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.98.36 1.94.68 2.87a2 2 0 01-.45 2.11L8.09 9.91" />
                    </svg>
                  </div>
                  <span className="font-body text-sm text-slate">{contactPhone}</span>
                </div>
              </div>
            </AnimatedSection>

            {/* Right column: elevated form card */}
            <AnimatedSection delay={0.15} className="flex-1">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: reducedMotion ? 0.15 : 0.5, ease: EASE_OUT_EXPO }}
                    className="rounded-[10px] border border-limestone/20 bg-white p-12 text-center shadow-[0_1px_3px_rgba(0,0,0,0.03),0_8px_32px_rgba(0,0,0,0.05)]"
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
                      We&apos;ve received your consultation request. Our team will reach out
                      within 24 hours.
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
                    className="rounded-[10px] border border-limestone/20 bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03),0_8px_32px_rgba(0,0,0,0.05)] sm:p-7 md:p-10"
                  >
                    <h3 className="mb-5 font-display text-lg text-terracotta">
                      Get in Touch
                    </h3>

                    {/* Row 1: Name + Email */}
                    <div className="grid gap-4 md:grid-cols-2">
                      <FormInput
                        label="Name"
                        name="name"
                        value={fields.name}
                        error={errors.name}
                        placeholder="Your name"
                        onChange={handleChange}
                        autoComplete="name"
                        required
                        idPrefix={uid}
                      />
                      <FormInput
                        label="Email"
                        name="email"
                        type="email"
                        value={fields.email}
                        error={errors.email}
                        placeholder="you@example.com"
                        onChange={handleChange}
                        autoComplete="email"
                        required
                        idPrefix={uid}
                      />
                    </div>

                    {/* Row 2: Phone + Category */}
                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                      <FormInput
                        label="Phone"
                        name="phone"
                        type="tel"
                        value={fields.phone}
                        error={errors.phone}
                        placeholder="+91 98765 43210"
                        onChange={handleChange}
                        autoComplete="tel"
                        required
                        idPrefix={uid}
                      />
                      <FormSelect
                        label="Category"
                        name="category"
                        value={fields.category}
                        error={errors.category}
                        placeholder="Select a category"
                        options={categories as SelectOption[]}
                        onChange={handleChange}
                        required
                        idPrefix={uid}
                      />
                    </div>

                    {/* Row 3: Consultation Type + Location */}
                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                      <FormSelect
                        label="Consultation Type"
                        name="consultationType"
                        value={fields.consultationType}
                        error={errors.consultationType}
                        placeholder="Select type"
                        options={CONSULTATION_TYPES as unknown as SelectOption[]}
                        onChange={handleChange}
                        required
                        idPrefix={uid}
                      />
                      <FormInput
                        label="Location"
                        name="location"
                        value={fields.location}
                        error={errors.location}
                        placeholder="Your city or area"
                        onChange={handleChange}
                        required
                        idPrefix={uid}
                      />
                    </div>

                    {/* Row 4: Message */}
                    <div className="mt-4">
                      <label
                        htmlFor={`${uid}-message`}
                        className="mb-1.5 block font-body text-[13px] font-medium uppercase tracking-[0.06em] text-slate"
                      >
                        Message (optional)
                      </label>
                      <textarea
                        id={`${uid}-message`}
                        name="message"
                        rows={3}
                        value={fields.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        placeholder="Tell us about your project..."
                        className="w-full resize-none rounded-[2px] border border-limestone bg-white px-4 py-3 font-body text-base text-obsidian placeholder:text-stone/50 transition-colors duration-200 focus:border-terracotta focus:outline-none focus:ring-1 focus:ring-terracotta/30"
                      />
                    </div>

                    {/* Privacy checkbox */}
                    <div className="mt-4">
                      <label
                        htmlFor={`${uid}-privacy`}
                        className="flex cursor-pointer items-start gap-3"
                      >
                        <input
                          id={`${uid}-privacy`}
                          name="privacy"
                          type="checkbox"
                          checked={fields.privacy}
                          onChange={(e) =>
                            setFields((prev) => ({ ...prev, privacy: e.target.checked }))
                          }
                          aria-invalid={!!errors.privacy}
                          aria-describedby={errors.privacy ? `${uid}-privacy-error` : undefined}
                          aria-required="true"
                          className="mt-0.5 h-5 w-5 accent-terracotta"
                        />
                        <span className="font-body text-xs text-slate">
                          I agree to the Privacy Policy and Terms &amp; Conditions
                        </span>
                      </label>
                      {errors.privacy && (
                        <p
                          id={`${uid}-privacy-error`}
                          role="alert"
                          className="mt-1 font-body text-xs text-terracotta-deep"
                        >
                          {errors.privacy}
                        </p>
                      )}
                    </div>

                    {/* Submit */}
                    <div className="mt-6">
                      <Button variant="primary" type="submit" fullWidth>
                        Book a Meeting
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          className="ml-2"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </Button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </AnimatedSection>
          </div>
        </div>
      </section>
    )
  }

  /* ── Centered layout (default) ── */
  return (
    <section
      id="consultation"
      aria-labelledby="consultation-heading"
      className={sectionClassName ?? "bg-white py-12 md:py-32 lg:py-36"}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12 xl:px-16">
        {/* Header */}
        <AnimatedSection className="text-center">
          <h2
            id="consultation-heading"
            className="font-display text-3xl font-medium text-obsidian md:text-4xl lg:text-5xl"
          >
            {title}
          </h2>
          <p className="mt-3 font-body text-base leading-relaxed tracking-wide text-slate md:text-lg">
            {subtitle}
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
                className="mx-auto max-w-3xl rounded-[4px] border border-limestone/60 bg-parchment p-5 sm:p-8 md:p-12"
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
                    autoComplete="name"
                    required
                    idPrefix={uid}
                  />
                  <FormInput
                    label="Email"
                    name="email"
                    type="email"
                    value={fields.email}
                    error={errors.email}
                    placeholder="you@example.com"
                    onChange={handleChange}
                    autoComplete="email"
                    required
                    idPrefix={uid}
                  />
                  <FormInput
                    label="Phone"
                    name="phone"
                    type="tel"
                    value={fields.phone}
                    error={errors.phone}
                    placeholder="+91 98765 43210"
                    onChange={handleChange}
                    autoComplete="tel"
                    required
                    idPrefix={uid}
                  />
                </div>

                {/* Row 2: Category */}
                <div className="mt-5">
                  <FormSelect
                    label="Category"
                    name="category"
                    value={fields.category}
                    error={errors.category}
                    placeholder="Select a category"
                    options={categories as SelectOption[]}
                    onChange={handleChange}
                    required
                    idPrefix={uid}
                  />
                </div>

                {/* Row 3: Consultation Type + Location */}
                <div className="mt-5 grid gap-5 md:grid-cols-2">
                  <FormSelect
                    label="Consultation Type"
                    name="consultationType"
                    value={fields.consultationType}
                    error={errors.consultationType}
                    placeholder="Select type"
                    options={CONSULTATION_TYPES as unknown as SelectOption[]}
                    onChange={handleChange}
                    required
                    idPrefix={uid}
                  />
                  <FormInput
                    label="Location"
                    name="location"
                    value={fields.location}
                    error={errors.location}
                    placeholder="Your city or area"
                    onChange={handleChange}
                    required
                    idPrefix={uid}
                  />
                </div>

                {/* Row 4: Message */}
                <div className="mt-5">
                  <label
                    htmlFor={`${uid}-message`}
                    className="mb-1.5 block font-body text-[13px] font-medium uppercase tracking-[0.06em] text-slate"
                  >
                    Message (optional)
                  </label>
                  <textarea
                    id={`${uid}-message`}
                    name="message"
                    rows={4}
                    value={fields.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    placeholder="Tell us about your project..."
                    className="w-full resize-none rounded-[2px] border border-limestone bg-white px-4 py-3 font-body text-base text-obsidian placeholder:text-stone/50 transition-colors duration-200 focus:border-terracotta focus:outline-none focus:ring-1 focus:ring-terracotta/30"
                  />
                </div>

                {/* Privacy checkbox */}
                <div className="mt-5">
                  <label htmlFor={`${uid}-privacy`} className="flex cursor-pointer items-start gap-3">
                    <input
                      id={`${uid}-privacy`}
                      name="privacy"
                      type="checkbox"
                      checked={fields.privacy}
                      onChange={(e) =>
                        setFields((prev) => ({ ...prev, privacy: e.target.checked }))
                      }
                      aria-invalid={!!errors.privacy}
                      aria-describedby={errors.privacy ? `${uid}-privacy-error` : undefined}
                      aria-required="true"
                      className="mt-0.5 h-5 w-5 accent-terracotta"
                    />
                    <span className="font-body text-xs text-slate">
                      I agree to the Privacy Policy and Terms &amp; Conditions
                    </span>
                  </label>
                  {errors.privacy && (
                    <p id={`${uid}-privacy-error`} role="alert" className="mt-1 font-body text-xs text-terracotta-deep">
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
