import { ReactNode } from 'react'

interface EyebrowProps {
  children: ReactNode
  color?: 'charcoal' | 'dark-green' | 'goldenrod' | 'white'
  className?: string
}

const colorMap = {
  charcoal: 'text-charcoal',
  'dark-green': 'text-dark-green',
  goldenrod: 'text-goldenrod',
  white: 'text-white/80',
}

export function Eyebrow({ children, color = 'charcoal', className = '' }: EyebrowProps) {
  return (
    <p className={`text-sm font-bold tracking-luxury ${colorMap[color]} uppercase ${className}`}>
      {children}
    </p>
  )
}
