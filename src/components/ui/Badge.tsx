import { type ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  variant?: 'accent' | 'surface' | 'blush'
  className?: string
}

export function Badge({ children, variant = 'surface', className = '' }: BadgeProps) {
  const variants = {
    accent: 'bg-accent text-white',
    surface: 'bg-surface text-ink-muted',
    blush: 'bg-blush text-ink',
  }
  return (
    <span
      className={`font-mono text-xs px-2.5 py-1 rounded-full inline-flex items-center gap-1 ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
