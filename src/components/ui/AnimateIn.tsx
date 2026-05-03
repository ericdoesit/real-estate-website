'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

const easeSmooth: [number, number, number, number] = [0.33, 0.66, 0.66, 1]

export function AnimateIn({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: easeSmooth, delay }}
      viewport={{ once: true, margin: '-80px' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
