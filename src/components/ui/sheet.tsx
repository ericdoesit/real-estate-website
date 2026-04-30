'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface SheetContextType {
  open: boolean
  setOpen: (open: boolean) => void
}

const SheetContext = React.createContext<SheetContextType | undefined>(undefined)

const useSheetContext = () => {
  const context = React.useContext(SheetContext)
  if (!context) throw new Error('useSheetContext must be used within Sheet')
  return context
}

interface SheetProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

const Sheet = ({ open: controlledOpen, onOpenChange, children }: SheetProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false)
  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : uncontrolledOpen
  const setOpen = isControlled ? onOpenChange || (() => {}) : setUncontrolledOpen

  return (
    <SheetContext.Provider value={{ open, setOpen }}>
      {children}
    </SheetContext.Provider>
  )
}

interface SheetTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const SheetTrigger = React.forwardRef<HTMLButtonElement, SheetTriggerProps>(
  ({ className, ...props }, ref) => {
    const { setOpen } = useSheetContext()
    return (
      <button
        ref={ref}
        className={cn('font-sans', className)}
        onClick={() => setOpen(true)}
        {...props}
      />
    )
  }
)
SheetTrigger.displayName = 'SheetTrigger'

interface SheetContentProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: 'top' | 'right' | 'bottom' | 'left'
}

const SheetContent = React.forwardRef<HTMLDivElement, SheetContentProps>(
  ({ className, children, side = 'right', ...props }, ref) => {
    const { open, setOpen } = useSheetContext()

    React.useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setOpen(false)
      }
      if (open) document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }, [open, setOpen])

    const sideStyles = {
      right: 'right-0 top-0 h-full w-3/4 max-w-sm rounded-l-lg slide-in-from-right',
      left: 'left-0 top-0 h-full w-3/4 max-w-sm rounded-r-lg slide-in-from-left',
      top: 'top-0 left-0 w-full rounded-b-lg slide-in-from-top',
      bottom: 'bottom-0 left-0 w-full rounded-t-lg slide-in-from-bottom',
    }

    if (!open) return null

    return (
      <>
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={() => setOpen(false)}
        />
        <div
          ref={ref}
          className={cn(
            'fixed z-50 border border-charcoal/10 bg-cream p-6 shadow-lg transition-transform duration-300',
            sideStyles[side],
            className
          )}
          {...props}
        >
          {children}
          <button
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 text-muted hover:text-charcoal"
          >
            ✕
          </button>
        </div>
      </>
    )
  }
)
SheetContent.displayName = 'SheetContent'

const SheetHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('mb-4 flex flex-col space-y-2', className)} {...props} />
)

const SheetTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h2 ref={ref} className={cn('font-serif text-2xl font-semibold', className)} {...props} />
  )
)
SheetTitle.displayName = 'SheetTitle'

export { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle }
