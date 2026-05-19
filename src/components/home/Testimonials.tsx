'use client'

import { useEffect, useState } from 'react'
import { Eyebrow } from '@/components/ui/Eyebrow'
import styles from './Testimonials.module.css'

interface Review {
  _id: string
  name: string
  subtitle?: string
  text: string
  rating: number
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <li className={styles.card}>
      <div className={styles.stars}>
        {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
      </div>
      {review.subtitle && (
        <p className={styles.cardTitle}>{review.subtitle}</p>
      )}
      <p className={styles.cardBody}>{review.text}</p>
      <p className={styles.cardName}>{review.name}</p>
    </li>
  )
}

export function Testimonials() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadReviews() {
      try {
        const res = await fetch('/api/reviews/featured')
        const data = await res.json()
        setReviews(data)
      } catch {
        setReviews([])
      } finally {
        setLoading(false)
      }
    }
    loadReviews()
  }, [])

  if (loading || reviews.length === 0) return null

  const midpoint = Math.ceil(reviews.length / 2)
  const rowA = reviews.slice(0, midpoint)
  const rowB = reviews.slice(midpoint)

  return (
    <section className="section-py bg-sand overflow-hidden">
      <div className="w-full px-6 lg:px-12 mb-12">
        <div className="max-w-[1400px] mx-auto">
          <Eyebrow>Testimonials</Eyebrow>
          <h2 className="font-serif text-5xl font-semibold text-charcoal mt-3">
            Hear from our clients.
          </h2>
          <p className="font-sans text-lg text-charcoal mt-4 max-w-xl">
            Real stories from buyers and sellers who trusted us with their most important decisions.
          </p>
        </div>
      </div>

      <div className={styles.rowWrap}>
        <ul className={styles.track}>
          {[...rowA, ...rowA].map((review, idx) => (
            <ReviewCard key={`${review._id}-${idx}`} review={review} />
          ))}
        </ul>
      </div>

      {rowB.length > 0 && (
        <div className={`${styles.rowWrap} mt-4`}>
          <ul className={`${styles.track} ${styles.trackReverse}`}>
            {[...rowB, ...rowB].map((review, idx) => (
              <ReviewCard key={`${review._id}-${idx}`} review={review} />
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}
