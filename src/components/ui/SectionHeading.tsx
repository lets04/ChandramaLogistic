import type { ReactNode } from 'react'

interface SectionHeadingProps {
  label?: string
  title: string
  description?: string
  light?: boolean
}

export function SectionHeading({ label, title, description, light }: SectionHeadingProps) {
  return (
    <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-12 md:mb-16">
      {label && (
        <span
          className={`mb-2 inline-block text-xs font-semibold uppercase tracking-widest sm:mb-3 sm:text-sm ${
            light ? 'text-accent-light' : 'text-accent'
          }`}
        >
          {label}
        </span>
      )}
      <h2
        className={`font-heading text-2xl font-bold leading-tight sm:text-3xl md:text-4xl lg:text-[2.75rem] ${
          light ? 'text-white' : 'text-primary'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-3 text-sm leading-relaxed sm:mt-4 sm:text-base md:text-lg ${
            light ? 'text-white/80' : 'text-text-muted'
          }`}
        >
          {description}
        </p>
      )}
      <div
        className={`mx-auto mt-4 h-1 w-12 rounded-full sm:mt-5 sm:w-16 ${
          light ? 'bg-accent-light' : 'gradient-corporate'
        }`}
      />
    </div>
  )
}

interface ButtonProps {
  children: ReactNode
  href?: string
  variant?: 'primary' | 'secondary' | 'outline'
  onClick?: () => void
  type?: 'button' | 'submit'
  className?: string
  fullWidth?: boolean
}

export function Button({
  children,
  href,
  variant = 'primary',
  onClick,
  type = 'button',
  className = '',
  fullWidth = false,
}: ButtonProps) {
  const base =
    'inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-all duration-300 active:scale-[0.98] sm:px-6 sm:text-base md:px-8 md:py-3.5'

  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-hover shadow-lg shadow-primary/20',
    secondary: 'bg-accent text-white hover:bg-accent-hover shadow-lg shadow-accent/20',
    outline:
      'border-2 border-white/80 bg-transparent text-white hover:bg-white hover:text-primary',
  }

  const widthClass = fullWidth ? 'w-full' : 'w-full sm:w-auto'
  const classes = `${base} ${variants[variant]} ${widthClass} ${className}`

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  )
}
