import * as React from 'react'
import { cn } from '@/lib/utils'
import styles from './button.module.css'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    const baseStyles =
      'font-sans font-normal transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-clay disabled:opacity-50 disabled:cursor-not-allowed'

    const variants = {
      default: 'bg-goldenrod text-white hover:bg-opacity-90',
      outline: 'border border-dark-green hover:bg-goldenrod hover:text-white',
      ghost: 'text-charcoal hover:bg-wheat',
    }

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2.5 text-base',
      lg: 'px-6 py-3 text-lg',
    }

    const variantStyles = variant === 'ghost' ? styles.ghost : ''

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], variantStyles, className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button }
