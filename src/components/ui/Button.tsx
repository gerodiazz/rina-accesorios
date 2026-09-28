import { type ButtonHTMLAttributes, type ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
}

export function Button({ variant = 'primary', size = 'md', className = '', children, ...props }: ButtonProps) {
  const base = 'btn-' + variant
  const sizes = {
    sm: 'text-sm px-5 py-2',
    md: '',
    lg: 'text-lg px-9 py-4',
  }
  return (
    <button className={`${base} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  )
}
