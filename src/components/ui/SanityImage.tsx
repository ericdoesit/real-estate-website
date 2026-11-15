'use client'

import Image, { type ImageProps } from 'next/image'
import { sanityLoader } from '@/lib/sanity/image'

type SanityImageProps = Omit<ImageProps, 'loader'>

export function SanityImage(props: SanityImageProps) {
  return <Image {...props} loader={sanityLoader} />
}
