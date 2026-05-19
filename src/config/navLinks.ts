export const navLinks = [
  { href: '/about', label: 'About' },
  { href: '/local-guide', label: 'Neighborhoods' },
  { href: '/properties', label: 'Properties' },
  { href: '/buying', label: 'Buying' },
  { href: '/selling', label: 'Selling' },
  { href: '/blog', label: 'Blog' },
] as const

export const mobileNavLinks = [
  ...navLinks,
  { href: '/contact', label: 'Contact' },
] as const
