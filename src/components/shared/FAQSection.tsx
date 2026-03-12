'use client'

import { useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { EASE_OUT_QUART } from '@/lib/motion'

/* ── Props ── */

interface FAQSectionProps {
  readonly faqs: ReadonlyArray<{
    readonly id: string
    readonly category: string
    readonly question: string
    readonly answer: string
  }>
  readonly categories: ReadonlyArray<{
    readonly id: string
    readonly label: string
  }>
  readonly title?: string
  readonly subtitle?: string
  readonly sectionClassName?: string
}

/* ── Accordion item ── */
function FAQItem({
  id,
  question,
  answer,
  isOpen,
  onToggle,
  reduced,
}: {
  readonly id: string
  readonly question: string
  readonly answer: string
  readonly isOpen: boolean
  readonly onToggle: () => void
  readonly reduced: boolean
}) {
  const panelId = `faq-panel-${id}`
  return (
    <div className="border-b border-limestone/60">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        <span className="font-body text-sm font-medium text-obsidian md:text-base">
          {question}
        </span>
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: reduced ? 0.01 : 0.25, ease: EASE_OUT_QUART }}
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="shrink-0 text-stone"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </motion.svg>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduced ? 0.01 : 0.35, ease: EASE_OUT_QUART }}
            style={{ overflow: 'hidden' }}
          >
            <p className="pb-5 font-body text-sm leading-relaxed text-slate">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ── Main section ── */
export function FAQSection({
  faqs,
  categories,
  title = 'Frequently Asked Questions',
  subtitle = 'Everything you need to know',
  sectionClassName,
}: FAQSectionProps) {
  const reducedMotion = useReducedMotion()
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]?.id ?? '')
  const [openId, setOpenId] = useState<string | null>(null)

  const filteredFaqs = faqs.filter((f) => f.category === activeCategory)

  const handleToggle = useCallback((id: string) => {
    setOpenId((prev) => (prev === id ? null : id))
  }, [])

  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map())

  const handleCategoryChange = useCallback((cat: string) => {
    setActiveCategory(cat)
    setOpenId(null)
  }, [])

  const handleTabKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>) => {
      const ids = categories.map((c) => c.id)
      const currentIdx = ids.indexOf(activeCategory)
      let nextIdx = -1

      if (e.key === 'ArrowRight') {
        nextIdx = (currentIdx + 1) % ids.length
      } else if (e.key === 'ArrowLeft') {
        nextIdx = (currentIdx - 1 + ids.length) % ids.length
      } else if (e.key === 'Home') {
        nextIdx = 0
      } else if (e.key === 'End') {
        nextIdx = ids.length - 1
      }

      if (nextIdx >= 0) {
        e.preventDefault()
        const nextId = ids[nextIdx]
        handleCategoryChange(nextId)
        const btn = tabRefs.current.get(nextId)
        btn?.focus()
        btn?.scrollIntoView({ behavior: 'smooth', inline: 'nearest', block: 'nearest' })
      }
    },
    [categories, activeCategory, handleCategoryChange],
  )

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className={sectionClassName ?? "bg-parchment py-12 md:py-32 lg:py-36"}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12 xl:px-16">
        {/* Header */}
        <AnimatedSection className="text-center">
          <h2
            id="faq-heading"
            className="font-display text-3xl font-medium text-obsidian md:text-4xl lg:text-5xl"
          >
            {title}
          </h2>
          <p className="mt-3 font-body text-base leading-relaxed tracking-wide text-slate md:text-lg">
            {subtitle}
          </p>
        </AnimatedSection>

        {/* Category tabs */}
        <AnimatedSection delay={0.15} className="mt-12">
          <div
            role="tablist"
            aria-label="FAQ categories"
            className="flex justify-start gap-2 overflow-x-auto snap-x snap-mandatory no-scrollbar px-1 sm:justify-center sm:px-0"
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                ref={(el) => {
                  if (el) tabRefs.current.set(cat.id, el)
                }}
                type="button"
                role="tab"
                aria-selected={activeCategory === cat.id}
                aria-controls="faq-panel"
                id={`faq-tab-${cat.id}`}
                tabIndex={activeCategory === cat.id ? 0 : -1}
                onClick={(e) => {
                  handleCategoryChange(cat.id)
                  e.currentTarget.scrollIntoView({
                    behavior: 'smooth',
                    inline: 'nearest',
                    block: 'nearest',
                  })
                }}
                onKeyDown={handleTabKeyDown}
                className={`snap-start shrink-0 rounded-full md:rounded-[2px] border px-3 md:px-5 min-h-[36px] md:min-h-[44px] inline-flex items-center font-body text-[11px] md:text-[13px] uppercase tracking-[0.08em] transition-all duration-200 ${
                  activeCategory === cat.id
                    ? 'border-terracotta bg-terracotta text-bone shadow-sm'
                    : 'border-limestone/80 bg-white text-slate hover:border-obsidian/30 hover:text-obsidian active:text-obsidian'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* FAQ accordion */}
        <AnimatedSection delay={0.25} className="mt-10">
          <div
            id="faq-panel"
            role="tabpanel"
            aria-labelledby={`faq-tab-${activeCategory}`}
            className="mx-auto max-w-3xl rounded-[4px] border border-limestone/60 bg-white px-6 md:px-10"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                transition={{ duration: reducedMotion ? 0.1 : 0.25, ease: EASE_OUT_QUART }}
              >
                {filteredFaqs.map((faq) => (
                  <FAQItem
                    key={faq.id}
                    id={faq.id}
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={openId === faq.id}
                    onToggle={() => handleToggle(faq.id)}
                    reduced={reducedMotion}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
