import Link from 'next/link'
import { ArrowRight } from '@/components/ui/ArrowRight'

interface NavItem {
  label: string
  href: string
}

export function PrevNextNav({ prev, next }: { prev?: NavItem | null; next?: NavItem | null }) {
  if (!prev && !next) return null

  return (
    <div className="py-10">
      <div className="flex items-start justify-between gap-8">
        {prev ? (
          <Link href={prev.href} className="group flex flex-col gap-2 max-w-xs">
            <span className="text-xs font-semibold tracking-luxury uppercase text-charcoal/50 flex items-center gap-1.5 group-hover:text-charcoal transition-colors">
              <ArrowRight className="w-3 h-3 rotate-180 shrink-0" />
              Previous
            </span>
            <span className="font-serif text-xl font-semibold text-charcoal group-hover:text-charcoal transition-colors">
              {prev.label}
            </span>
          </Link>
        ) : (
          <div />
        )}

        {next ? (
          <Link href={next.href} className="group flex flex-col gap-2 text-right max-w-xs ml-auto">
            <span className="text-xs font-semibold tracking-luxury uppercase text-charcoal/50 flex items-center gap-1.5 justify-end group-hover:text-charcoal transition-colors">
              Next
              <ArrowRight className="w-3 h-3 shrink-0" />
            </span>
            <span className="font-serif text-xl font-semibold text-charcoal group-hover:text-charcoal transition-colors">
              {next.label}
            </span>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  )
}
