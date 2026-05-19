import { ReactNode } from 'react'

interface EyebrowProps {
  children: ReactNode
  color?: 'charcoal' | 'white'
  className?: string
}

const colorMap = {
  charcoal: 'text-charcoal',
  white: 'text-white/80',
}

export function Eyebrow({ children, color = 'charcoal', className = '' }: EyebrowProps) {
  return (
    <p className={`text-sm font-semibold tracking-luxury ${colorMap[color]} uppercase ${className}`}>
      {children}
    </p>
  )
}
