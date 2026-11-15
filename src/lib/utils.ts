import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// JSON.stringify doesn't escape </script>, which would let CMS content break
// out of a JSON-LD script tag. This utility escapes the closing tag.
export function safeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/<\//g, '<\\/')
}
