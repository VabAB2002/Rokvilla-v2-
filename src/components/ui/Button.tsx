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
    base: 'bg-transparent text-obsidian border-obsidian',
    hover: 'hover:bg-obsidian hover:text-bone',
  },
  ghost: {
    base: 'bg-transparent text-slate border-limestone',
    hover: 'hover:border-terracotta hover:text-terracotta',
  },
}

const variantStylesDark: Record<ButtonVariant, string> = {
  primary: 'bg-brass text-void',
  secondary: 'bg-transparent text-bone border-bone/80',
  ghost: 'bg-transparent text-stone border-stone/30',
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
    rounded-[2px] border-[1.5px]
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
    rounded-[2px] border-[1.5px] border-transparent
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
