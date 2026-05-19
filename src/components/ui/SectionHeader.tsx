'use client'

import { motion } from 'framer-motion'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { easeSmooth } from '@/lib/ease'

interface SectionHeaderProps {
  eyebrow?: string
  heading: string
  body?: string
  as?: 'h1' | 'h2'
  color?: 'dark' | 'light'
  animated?: boolean
  className?: string
}

export function SectionHeader({
  eyebrow,
  heading,
  body,
  as: Tag = 'h2',
  color = 'dark',
  animated = true,
  className = '',
}: SectionHeaderProps) {
  const headingColor = color === 'light' ? 'text-white' : 'text-charcoal'
  const bodyColor = color === 'light' ? 'text-white/70' : 'text-charcoal'

  const inner = (
    <>
      {eyebrow && <Eyebrow color={color === 'light' ? 'white' : 'charcoal'}>{eyebrow}</Eyebrow>}
      <Tag className={`font-serif text-4xl lg:text-6xl font-semibold ${headingColor} capitalize`}>
        {heading}
      </Tag>
      {body && (
        <p className={`font-sans text-lg ${bodyColor} leading-relaxed`}>{body}</p>
      )}
    </>
  )

  if (animated) {
    return (
      <motion.div
        className={`mb-10 space-y-3 ${className}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: easeSmooth }}
        viewport={{ once: true, margin: '-80px' }}
      >
        {inner}
      </motion.div>
    )
  }

  return <div className={`mb-10 space-y-3 ${className}`}>{inner}</div>
}
