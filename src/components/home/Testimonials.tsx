'use client'

import { motion } from 'framer-motion'
import { Eyebrow } from '@/components/ui/Eyebrow'
import styles from './Testimonials.module.css'
import { easeSmooth } from '@/lib/motion'

interface Review {
  name: string
  title: string
  body: string
}

const rowA: Review[] = [
  {
    name: 'Kelly M.',
    title: 'Sold a single family home',
    body: 'Sharon was integral in helping me get my father\'s home ready for lease. Her knowledge of the market and professionalism allowed us to focus on other life challenges. She kept us informed, solved every problem as it arose, and went above and beyond.',
  },
  {
    name: 'Zillow Reviewer',
    title: 'Sold a single family home',
    body: 'Sharon did an excellent job helping us sell our home and buy the next one. During the selling process she gave a lot of guidance and advice regarding staging that no doubt resulted in the house selling very quickly. During the buying process she was very patient and responsive to our questions.',
  },
  {
    name: 'Shelby B.',
    title: 'Sold a single family home',
    body: 'Sharon was very knowledgeable in the real estate market. She explained everything in detail and helped us make informed decisions about selling our house. I believe her expertise helped us sell our house quickly. Would definitely recommend her.',
  },
  {
    name: 'Zillow Reviewer',
    title: 'Bought a single family home',
    body: 'Sharon is very knowledgeable in the local real estate market and was extremely helpful in helping me purchase a short sale property. I would absolutely recommend her to my friends and family, and will be using her for any future property transactions.',
  },
  {
    name: 'Dennis H.',
    title: 'Sold a single family home',
    body: 'Sharon is an excellent and very professional agent. With her help we set the price of our house at the proper market value to sell it right away. The pictures she had taken of the house and her staging touch were incredible. I highly recommend her.',
  },
  {
    name: 'Zillow Reviewer',
    title: 'Bought a single family home',
    body: 'I cannot begin to express my good feelings toward Sharon. We were buying property from out of state and she was our trusted local presence. She not only did everything a realtor should do but guided us to outside experts when needed. If you want someone you totally feel is by your side, go to Sharon.',
  },
  {
    name: 'Karen M.',
    title: 'Sold a single family home',
    body: 'Sharon was extremely helpful in calculating a sale price and then negotiating the sale, which took less than 24 hours. She was prompt with returning phone calls and informing us of anything that needed to be taken care of. We ended up closing ahead of schedule.',
  },
  {
    name: 'Zillow Reviewer',
    title: 'Sold a single family home',
    body: 'When Sharon came to the house she was very well prepared and had done her homework on the area ahead of time. She made valuable recommendations to improve the property for sale. Since I lived out of state she coordinated things well.',
  },
  {
    name: 'Jackie O.',
    title: 'Bought a condo',
    body: 'Sharon was recommended to me by a family member. She was positive, friendly and very comfortable to work with. She was always looking and communicating with me about places that would fit my needs. She responded quickly to any and all questions I had.',
  },
  {
    name: 'Zillow Reviewer',
    title: 'Bought and sold a condo',
    body: 'This is the second time Sharon has helped us sell our home and buy a new one. In each case the property sold in three weeks or less. She is very patient and always glad to help. I think she is a real pro!',
  },
  {
    name: 'Tim & Phan',
    title: 'Bought and sold a home',
    body: 'Sharon is a great resource. First Sharon helped us buy the house — she is patient and wants to be sure you get the house you want. Then she helped us sell our house in a short time. She is truly a professional.',
  },
  {
    name: 'Zhao Yu',
    title: 'Sold a home',
    body: 'Sharon is the consummate real estate professional, but never aggressive or pushy. She has an intuitive knack for quickly identifying the right buyer for her properties. She sold my own home, that of a relative, and one of a colleague I recommended — all within one month of each listing.',
  },
]

const rowB: Review[] = [
  {
    name: 'Adam B.',
    title: 'Sold a single family home',
    body: 'Professional and knowledgeable. Kept us posted every step of the way and helped answer all the questions we had. When we needed advice on what would help sell the house quickly she gave us all the right options. Couldn\'t ask for a better experience.',
  },
  {
    name: 'Zillow Reviewer',
    title: 'Bought a single family home',
    body: 'Sharon Zunkley went out of her way to find us our dream home. She actually knew what we wanted more than we did! She was very professional, friendly, and courteous. She kept us up-to-date as needed. We both highly recommend Sharon. Five stars for all!',
  },
  {
    name: 'Irene L.',
    title: 'Bought a single family home',
    body: 'Sharon was great to work with. She listened to what we wanted in a home and found us the perfect place. Not once did she pressure us. I highly recommend her!',
  },
  {
    name: 'Zillow Reviewer',
    title: 'Bought a single family home',
    body: 'Sharon was a pleasure to work with. She is very knowledgeable and really helped us through the process, which meant a lot as we are first time home buyers. Even when busy, she was always quick to respond and answer our questions. I would definitely work with her again.',
  },
  {
    name: 'Lynn',
    title: 'Bought 4 homes over 24 years',
    body: 'Sharon has helped me find and purchase 4 homes over the past 24 years as well as sell my condo. She\'s very knowledgeable and professional — and fun to run around with looking at houses. She\'s also very patient with someone like me who asks a zillion questions.',
  },
  {
    name: 'Zillow Reviewer',
    title: 'Helped me rent a home',
    body: 'She would never let anyone buy or rent a house that they did not want and was completely happy with. She made herself available when you needed her even at a moment\'s notice — a really great lady and person. Can never say thanks enough.',
  },
  {
    name: 'J. Walsh',
    title: 'Sold a single family home in one day',
    body: 'Sharon listed and sold our home in one day. We were very impressed and happy with her experience and knowledge of the market. She is very hands on and kept us in the loop all the way. I would not hesitate to recommend her.',
  },
  {
    name: 'Zillow Reviewer',
    title: 'Sold a single family home',
    body: 'I was very impressed with the overall guidance through this process to sell a home in a tight market. I had expected at least a one year project, but with her timely knowledge the house was listed and closed in less than three months.',
  },
  {
    name: 'M. Passerell',
    title: 'Bought and sold a condo',
    body: 'Sharon is the best. She goes over and above for her clients. I would use no one else when buying or selling a house. She is very detail oriented and follows through from beginning to end. She makes you feel like you are her only client.',
  },
  {
    name: 'Zillow Reviewer',
    title: 'Bought and sold a home',
    body: 'Sharon was very helpful in helping us sell our house in 30 days. She advised us how to make the house marketable. Sharon was very pleasant and easy to work with and always called right away if we had questions. I would call Sharon again if I was to buy or sell.',
  },
  {
    name: 'Jessee M.',
    title: 'Bought a single family home',
    body: 'Sharon went out of her way to help me find a home. She even taught me what to look for when considering a house, being this was my first time. She quickly adapted to what I was looking for and we found the perfect home for me.',
  },
  {
    name: 'Regina G.',
    title: 'Bought a home',
    body: 'Sharon is very knowledgeable, attentive, and accessible. This was my husband\'s and my first home purchase, and she helped us throughout the entire process. She answered all of our questions and was very patient. We are thrilled with our purchase.',
  },
]

function ReviewCard({ review }: { review: Review }) {
  return (
    <li className={styles.card}>
      <div className={styles.stars}>★★★★★</div>
      <p className={styles.cardTitle}>{review.title}</p>
      <p className={styles.cardBody}>{review.body}</p>
      <p className={styles.cardName}>{review.name}</p>
    </li>
  )
}

export function Testimonials() {
  const doubledA = [...rowA, ...rowA]
  const doubledB = [...rowB, ...rowB]

  return (
    <section className="py-10 bg-wheat overflow-hidden">
      <div className="w-full px-6 lg:px-12 mb-12">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: easeSmooth }}
            viewport={{ once: true, margin: '-80px' }}
          >
            <Eyebrow>Testimonials</Eyebrow>
            <h2 className="font-serif text-5xl font-semibold text-charcoal mt-3">
              Hear from our clients.
            </h2>
            <p className="font-sans text-lg text-charcoal mt-4 max-w-xl">
              Real stories from buyers and sellers who trusted us with their most important decisions.
            </p>
          </motion.div>
        </div>
      </div>

      <div className={styles.rowWrap}>
        <ul className={styles.track}>
          {doubledA.map((review, i) => (
            <ReviewCard key={i} review={review} />
          ))}
        </ul>
      </div>

      <div className={`${styles.rowWrap} mt-4`}>
        <ul className={`${styles.track} ${styles.trackReverse}`}>
          {doubledB.map((review, i) => (
            <ReviewCard key={i} review={review} />
          ))}
        </ul>
      </div>
    </section>
  )
}
