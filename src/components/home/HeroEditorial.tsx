import Image from 'next/image'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { ButtonLink } from '@/components/ui/button'
import { agent } from '@/config/agent'

export function HeroEditorial({ image }: { image: string }) {
  return (
    <section className="bg-charcoal overflow-hidden py-8 lg:py-0 lg:relative lg:h-[calc(100vh-80px)]">

      {/* Desktop: image — 42vw wide, 2vw from right/top/bottom */}
      <div className="hero-image-fade hidden lg:block absolute right-[2vw] top-[2vw] bottom-[2vw] w-[42vw] rounded-brand overflow-hidden">
        <Image
          src={image}
          alt="Los Angeles home"
          fill
          className="object-cover"
          priority
          fetchPriority="high"
          sizes="(min-width: 1024px) 42vw, calc(100vw - 48px)"
        />
      </div>

      {/* Mobile: image above text */}
      <div className="hero-image-fade lg:hidden relative aspect-[4/3] rounded-brand overflow-hidden mb-6 mx-6">
        <Image
          src={image}
          alt="Los Angeles home"
          fill
          className="object-cover"
          priority
          fetchPriority="high"
          sizes="(min-width: 1024px) 42vw, calc(100vw - 48px)"
        />
      </div>

      {/* Text */}
      <div className="px-6 lg:px-0 lg:absolute lg:left-[13vw] lg:top-0 lg:bottom-0 lg:flex lg:flex-col lg:justify-center space-y-6 lg:w-[32vw] lg:backdrop-blur-md lg:bg-charcoal/5 lg:rounded-brand">

        <div className="space-y-3">
          <div className="hero-text-in">
            <Eyebrow color="white">Los Angeles</Eyebrow>
          </div>

          <h1
            className="hero-text-in font-serif text-4xl lg:text-7xl 2xl:text-8xl font-semibold text-white capitalize"
            style={{ animationDelay: '0.1s' }}
          >
            The right home changes everything
          </h1>
        </div>

        <p
          className="hero-text-in font-sans text-lg text-white/70"
          style={{ animationDelay: '0.38s' }}
        >
          Helping Los Angeles buyers and sellers for {agent.yearsExperience} years make smart,
          informed decisions. No pressure, honest guidance.
        </p>

        <div className="hero-text-in pt-4" style={{ animationDelay: '0.46s' }}>
          <ButtonLink href="/contact" variant="inverse" withArrow>
            Start Conversation
          </ButtonLink>
        </div>

      </div>

    </section>
  )
}
