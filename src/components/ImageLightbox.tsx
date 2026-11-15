'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { sanityLoader } from '@/lib/sanity/image'
import { m, AnimatePresence } from '@/lib/motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface ImageLightboxProps {
  images: Array<{
    _key?: string
    asset?: { _ref: string; url?: string }
    url?: string
    alt?: string
    caption?: string
  } | string>
  initialIndex?: number
}

export function ImageLightbox({ images, initialIndex = 0 }: ImageLightboxProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      if (e.key === 'Escape') setIsOpen(false)
      if (e.key === 'ArrowLeft') goToPrevious()
      if (e.key === 'ArrowRight') goToNext()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const getImageUrl = (image: (typeof images)[0]) => {
    if (typeof image === 'string') return image
    if (image.url) return image.url
    if (image.asset?.url) return image.asset.url
    return ''
  }

  const getImageAlt = (image: (typeof images)[0]) => {
    if (typeof image === 'string') return `Property image ${currentIndex + 1}`
    return image.alt || `Property image ${currentIndex + 1}`
  }

  const getImageCaption = (image: (typeof images)[0]) =>
    typeof image === 'string' ? undefined : image.caption

  const currentImage = images[currentIndex]
  const imageUrl = getImageUrl(currentImage)
  const currentCaption = getImageCaption(currentImage)

  return (
    <>
      {/* Thumbnail Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => {
          const url = getImageUrl(image)
          const key = typeof image === 'string' ? index : (image._key || index)
          return (
            <button
              key={key}
              onClick={() => {
                setCurrentIndex(index)
                setIsOpen(true)
              }}
              className="relative aspect-square overflow-hidden rounded-brand group"
            >
              {url && (
                <Image
                  loader={sanityLoader}
                  src={url}
                  alt={getImageAlt(image)}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 280px"
                  className="object-cover group-hover:scale-105 transition-transform duration-600 ease-out"
                />
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-600 ease-out pointer-events-none" />
              {getImageCaption(image) && (
                <span className="absolute bottom-2 left-2 bg-black/70 text-white text-xs font-semibold px-2 py-1 rounded-full pointer-events-none">
                  {getImageCaption(image)}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isOpen && imageUrl && (
          <>
            {/* Backdrop */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 z-40"
            />

            {/* Modal */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={() => setIsOpen(false)}
            >
              <m.div
                onClick={(e) => e.stopPropagation()}
                className="relative w-full h-full flex items-center justify-center"
              >
                {/* Image */}
                <m.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="relative max-w-[75vw] max-h-[90vh] w-[75vw] h-[90vh]"
                >
                  <Image
                    loader={sanityLoader}
                    src={imageUrl}
                    alt={getImageAlt(currentImage)}
                    fill
                    sizes="75vw"
                    className="object-contain"
                    priority
                  />
                </m.div>

                {/* Close Button */}
                <m.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsOpen(false)}
                  className="absolute top-6 right-6 p-2 bg-white rounded-full hover:bg-white/90 transition-colors z-10"
                  aria-label="Close lightbox"
                >
                  <X className="w-6 h-6 text-charcoal" />
                </m.button>

                {/* Navigation Buttons */}
                {images.length > 1 && (
                  <>
                    <m.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={(e) => {
                        e.stopPropagation()
                        goToPrevious()
                      }}
                      className="absolute left-6 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors backdrop-blur-sm z-10"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-6 h-6 text-white" />
                    </m.button>

                    <m.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={(e) => {
                        e.stopPropagation()
                        goToNext()
                      }}
                      className="absolute right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors backdrop-blur-sm z-10"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-6 h-6 text-white" />
                    </m.button>
                  </>
                )}

                {/* Counter */}
                <m.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm"
                >
                  {currentIndex + 1} / {images.length}
                  {currentCaption && <span> · {currentCaption}</span>}
                </m.div>
              </m.div>
            </m.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
