'use client'

import { type ReactNode } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'

interface ButtonBaseProps {
  readonly variant?: ButtonVariant
  readonly children: ReactNode
  readonly className?: string
  readonly fullWidth?: boolean
}

interface ButtonAsButton extends ButtonBaseProps {
  readonly href?: never
  readonly onClick?: () => void
  readonly type?: 'button' | 'submit'
}

interface ButtonAsLink extends ButtonBaseProps {
  readonly href: string
  readonly onClick?: never
  readonly type?: never
}

type ButtonProps = ButtonAsButton | ButtonAsLink

const variantStyles: Record<ButtonVariant, { base: string; hover: string }> = {
  primary: {
    base: 'bg-terracotta text-bone border-transparent',
    hover: 'hover:bg-terracotta-deep',
  },
  secondary: {
    base: 'border-terracotta/30 bg-terracotta/[0.07] backdrop-blur-sm text-terracotta',
    hover: 'hover:border-terracotta/50 hover:bg-terracotta/[0.12]',
  },
  ghost: {
    base: 'border-limestone/60 bg-white/40 backdrop-blur-sm text-slate',
    hover: 'hover:border-terracotta/30 hover:bg-terracotta/[0.06] hover:text-terracotta',
  },
}

const variantStylesDark: Record<ButtonVariant, string> = {
  primary: 'border-transparent bg-brass text-void',
  secondary: 'border-bone/20 bg-white/10 backdrop-blur-sm text-bone',
  ghost: 'border-stone/30 bg-white/5 backdrop-blur-sm text-stone',
}

export function Button({
  variant = 'primary',
  children,
  className = '',
  fullWidth = false,
  href,
  onClick,
  type = 'button',
}: ButtonProps) {
  const styles = variantStyles[variant]

  const baseClasses = `
    inline-flex items-center justify-center gap-2
    rounded-full border-[1.5px]
    px-6 py-3.5 md:px-8
    font-body text-[13px] font-medium uppercase tracking-[0.12em]
    transition-all duration-200
    ${styles.base} ${styles.hover}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `.trim()

  const inner = (
    <motion.span
      className="inline-flex items-center gap-2"
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.08 }}
    >
      {children}
    </motion.span>
  )

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {inner}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} className={baseClasses}>
      {inner}
    </button>
  )
}

// Dark background variant export for hero/dark sections
export function ButtonDark({
  variant = 'primary',
  children,
  className = '',
  fullWidth = false,
  href,
}: ButtonProps) {
  const darkStyle = variantStylesDark[variant]

  const baseClasses = `
    inline-flex items-center justify-center gap-2
    rounded-full border-[1.5px]
    px-6 py-3.5 md:px-8
    font-body text-[13px] font-medium uppercase tracking-[0.12em]
    transition-all duration-200
    ${darkStyle}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `.trim()

  const inner = (
    <motion.span
      className="inline-flex items-center gap-2"
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.08 }}
    >
      {children}
    </motion.span>
  )

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {inner}
      </Link>
    )
  }

  return (
    <button type="button" className={baseClasses}>
      {inner}
    </button>
  )
}
