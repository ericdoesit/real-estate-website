'use client'

import { useRef, useEffect, useState } from 'react'
import { useInView, animate } from '@/lib/motion'

const stats = [
  {
    prefix: '',
    value: 10,
    suffix: '+',
    decimals: 0,
    label: 'Years in LA real estate',
    description: 'Helping buyers and sellers across Los Angeles',
  },
  {
    prefix: '$',
    value: 50,
    suffix: 'M+',
    decimals: 0,
    label: 'Transaction volume',
    description: 'In closed real estate sales',
  },
  {
    prefix: '',
    value: 5.0,
    suffix: '',
    decimals: 1,
    label: 'Average rating',
    description: 'Across Zillow and Google reviews',
  },
]

function StatCounter({ prefix, value, suffix, decimals, inView }: { prefix: string; value: number; suffix: string; decimals: number; inView: boolean }) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const start = value * 0.5
    setDisplay(parseFloat(start.toFixed(decimals)))
    const controls = animate(start, value, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: v => setDisplay(parseFloat(v.toFixed(decimals))),
    })
    return () => controls.stop()
  }, [inView, value, decimals])

  const formatted = decimals > 0
    ? display.toFixed(decimals)
    : display.toLocaleString()

  return <>{prefix}{formatted}{suffix}</>
}

export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="bg-cream section-py">
      <div className="w-full px-6 lg:px-12">
        <div className="container-site">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 lg:gap-0">
            {stats.map((stat, i) => {
              const align = i === 0 ? 'sm:items-start sm:text-left' : i === 1 ? 'sm:items-center sm:text-center' : 'sm:items-end sm:text-right'
              return (
              <div
                key={i}
                className={`flex flex-col gap-3 items-center text-center ${align}`}
              >
                <p className="font-sans text-6xl lg:text-7xl font-light text-charcoal tracking-tight leading-none">
                  <StatCounter prefix={stat.prefix} value={stat.value} suffix={stat.suffix} decimals={stat.decimals} inView={inView} />
                </p>
                <div className="space-y-1">
                  <p className="font-sans text-sm font-semibold text-charcoal uppercase tracking-widest">
                    {stat.label}
                  </p>
                  <p className="font-sans text-sm text-charcoal/70 leading-relaxed">
                    {stat.description}
                  </p>
                </div>
              </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
