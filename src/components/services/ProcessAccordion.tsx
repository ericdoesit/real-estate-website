'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { easeSmooth } from '@/lib/ease'

type Step = {
  number: string
  title: string
  description: string
}

function AccordionItem({ step, index }: { step: Step; index: number }) {
  const [open, setOpen] = useState(false)
  const num = String(index + 1).padStart(2, '0')

  return (
    <div className="border-b border-charcoal/10">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-6 lg:gap-10 py-6 text-left group cursor-pointer"
        aria-expanded={open}
      >
        <span className="flex-shrink-0 font-sans text-sm font-semibold tracking-luxury uppercase text-charcoal/40 w-8 select-none">
          {num}
        </span>

        <span className="flex-1 font-serif text-2xl lg:text-3xl font-semibold text-charcoal">
          {step.title}
        </span>

        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.35, ease: easeSmooth }}
          className="flex-shrink-0 text-charcoal/50 group-hover:text-charcoal transition-colors"
          aria-hidden="true"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 2v16M2 10h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: easeSmooth }}
            className="overflow-hidden"
          >
            <div className="pb-8 pl-[calc(4rem+1.5rem)] lg:pl-[calc(6rem+2.5rem)]">
              <p className="font-sans text-base lg:text-lg text-charcoal/80 leading-relaxed max-w-3xl">
                {step.description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function ProcessAccordion({ steps }: { steps: Step[] }) {
  return (
    <div>
      {steps.map((step, i) => (
        <AccordionItem key={step.number} step={step} index={i} />
      ))}
    </div>
  )
}
