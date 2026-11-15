import * as React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import styles from './button.module.css'
import { ArrowRight } from './ArrowRight'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'inverse'
  size?: 'sm' | 'md' | 'lg'
  withArrow?: boolean
}

const baseStyles =
  'inline-flex items-center gap-3 font-sans font-medium rounded-brand cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-border disabled:opacity-50 disabled:cursor-not-allowed'

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-8 py-3 text-base',
  lg: 'px-10 py-4 text-lg',
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', withArrow = false, children, ...props }, ref) => (
    <button
      className={cn(baseStyles, sizes[size], styles[variant], className)}
      ref={ref}
      {...props}
    >
      {children}
      {withArrow && <ArrowRight className={cn('w-5 h-5', styles.arrow)} />}
    </button>
  )
)
Button.displayName = 'Button'

interface ButtonLinkProps {
  href: string
  variant?: 'default' | 'inverse'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  children: React.ReactNode
  withArrow?: boolean
}

function ButtonLink({ href, variant = 'default', size = 'md', withArrow = false, className, children }: ButtonLinkProps) {
  return (
    <Link href={href} className={cn(baseStyles, sizes[size], styles[variant], className)}>
      {children}
      {withArrow && <ArrowRight className={cn('w-5 h-5', styles.arrow)} />}
    </Link>
  )
}

export { Button, ButtonLink }
