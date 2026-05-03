'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface DialogContextType {
  open: boolean
  setOpen: (open: boolean) => void
}

const DialogContext = React.createContext<DialogContextType | undefined>(undefined)

const useDialogContext = () => {
  const context = React.useContext(DialogContext)
  if (!context) throw new Error('useDialogContext must be used within Dialog')
  return context
}

interface DialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

const Dialog = ({ open: controlledOpen, onOpenChange, children }: DialogProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false)
  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : uncontrolledOpen
  const setOpen = isControlled ? onOpenChange || (() => {}) : setUncontrolledOpen

  return (
    <DialogContext.Provider value={{ open, setOpen }}>
      {children}
    </DialogContext.Provider>
  )
}

interface DialogTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const DialogTrigger = React.forwardRef<HTMLButtonElement, DialogTriggerProps>(
  ({ className, ...props }, ref) => {
    const { setOpen } = useDialogContext()
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
DialogTrigger.displayName = 'DialogTrigger'

interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className, children, ...props }, ref) => {
    const { open, setOpen } = useDialogContext()

    React.useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setOpen(false)
      }
      if (open) document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }, [open, setOpen])

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
            'fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] rounded-lg border border-charcoal/10 bg-cream p-6 shadow-lg',
            className
          )}
          {...props}
        >
          {children}
          <button
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 text-charcoal hover:text-charcoal"
          >
            ✕
          </button>
        </div>
      </>
    )
  }
)
DialogContent.displayName = 'DialogContent'

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('mb-4 flex flex-col space-y-2', className)} {...props} />
)

const DialogTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h2 ref={ref} className={cn('font-serif text-2xl font-semibold', className)} {...props} />
  )
)
DialogTitle.displayName = 'DialogTitle'

const DialogDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('font-sans text-sm text-charcoal', className)} {...props} />
  )
)
DialogDescription.displayName = 'DialogDescription'

export { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription }
