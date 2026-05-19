import Link from 'next/link'
import { ArrowRight } from './ArrowRight'
import styles from '@/styles/arrow-link.module.css'

interface ArrowLinkProps {
  href: string
  children: React.ReactNode
  className?: string
}

export function ArrowLink({ href, children, className = '' }: ArrowLinkProps) {
  return (
    <Link href={href} className={`${styles.link} ${className}`}>
      {children}
      <ArrowRight className={`w-5 h-5 ${styles.arrow}`} />
    </Link>
  )
}
