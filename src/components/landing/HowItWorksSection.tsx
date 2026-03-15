'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

const FRAMES = [
  {
    image: '/creative-1.jpeg',
    size: 'large',
    label: 'Influencer',
    pills: ['Campaigns', 'Portfolio'],
  },
  {
    image: '/creative-2.jpeg',
    size: 'medium',
    label: 'UGC Creator',
    pills: ['Reels', 'Content'],
  },
  {
    image: '/creative-3.jpeg',
    size: 'small',
    label: 'Content Creator',
    pills: ['Posts', 'Stories'],
  },
  {
    image: '/photographer.webp',
    size: 'medium',
    label: 'Photographer',
    pills: ['Portfolio', 'Shoots'],
  },
  {
    image: '/videographer.webp',
    size: 'large',
    label: 'Videographer',
    pills: ['Reels', 'Campaigns'],
  },
] as const

export function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subtextRef = useRef<HTMLParagraphElement>(null)
  const framesRef = useRef<(HTMLDivElement | null)[]>([])
  const bulletsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const section = sectionRef.current
    const heading = headingRef.current
    const subtext = subtextRef.current
    const frames = framesRef.current.filter(Boolean)
    const bullets = bulletsRef.current.filter(Boolean)

    if (!section || !heading || !subtext || frames.length === 0) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      gsap.set([heading, subtext, ...frames, ...bullets], { opacity: 1, y: 0, scale: 1 })
      return
    }

    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(heading, { y: 40, opacity: 0 })
      gsap.set(subtext, { y: 30, opacity: 0 })
      gsap.set(frames, { scale: 0.8, opacity: 0 })
      gsap.set(bullets, { x: -50, opacity: 0 })

      // Heading animation
      gsap.to(heading, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: heading,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })

      // Subtext animation
      gsap.to(subtext, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: subtext,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })

      // Frames stagger animation
      frames.forEach((frame, index) => {
        gsap.to(frame, {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: frame,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
          delay: index * 0.08,
        })

        // Subtle parallax on scroll
        gsap.to(frame, {
          y: -15,
          ease: 'none',
          scrollTrigger: {
            trigger: frame,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        })
      })

      // Bullets animation - slide in from left with stagger
      bullets.forEach((bullet, index) => {
        gsap.to(bullet, {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: bullet,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
          delay: index * 0.15,
        })

        // Continuous floating animation
        gsap.to(bullet, {
          y: -8,
          duration: 1.5 + index * 0.2,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: index * 0.3,
        })

        // Dot pulse animation
        const dot = bullet?.querySelector('.bullet-dot')
        if (dot) {
          gsap.to(dot, {
            scale: 1.5,
            opacity: 0.6,
            duration: 1.2,
            ease: 'power1.inOut',
            repeat: -1,
            yoyo: true,
            delay: index * 0.4,
          })
        }
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[var(--brand-bg-base)] py-10 sm:py-16 md:py-20 lg:py-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2
            ref={headingRef}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal leading-tight tracking-wide overflow-hidden px-1"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            <span className="inline-block">
              {/* "Hire " */}
              {Array.from('Hire ').map((char, index) => (
                <span
                  key={`hire-${index}`}
                  className="inline-block animate-type-in opacity-0 text-[var(--brand-text)]"
                  style={{
                    animationDelay: `${index * 0.05}s`,
                    animationFillMode: 'forwards',
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
              {/* "influencers" - purple */}
              {Array.from('influencers').map((char, index) => (
                <span
                  key={`influencers-${index}`}
                  className="inline-block animate-type-in opacity-0 text-[var(--brand-primary)]"
                  style={{
                    animationDelay: `${(5 + index) * 0.05}s`,
                    animationFillMode: 'forwards',
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
              {/* " according to your " */}
              {Array.from(' according to your ').map((char, index) => (
                <span
                  key={`according-${index}`}
                  className="inline-block animate-type-in opacity-0 text-[var(--brand-text)]"
                  style={{
                    animationDelay: `${(16 + index) * 0.05}s`,
                    animationFillMode: 'forwards',
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
              {/* "niche" - purple */}
              {Array.from('niche').map((char, index) => (
                <span
                  key={`niche-${index}`}
                  className="inline-block animate-type-in opacity-0 text-[var(--brand-primary)]"
                  style={{
                    animationDelay: `${(35 + index) * 0.05}s`,
                    animationFillMode: 'forwards',
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
              {/* " in your " */}
              {Array.from(' in your ').map((char, index) => (
                <span
                  key={`in-${index}`}
                  className="inline-block animate-type-in opacity-0 text-[var(--brand-text)]"
                  style={{
                    animationDelay: `${(40 + index) * 0.05}s`,
                    animationFillMode: 'forwards',
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
              {/* "city" - purple */}
              {Array.from('city').map((char, index) => (
                <span
                  key={`city-${index}`}
                  className="inline-block animate-type-in opacity-0 text-[var(--brand-primary)]"
                  style={{
                    animationDelay: `${(48 + index) * 0.05}s`,
                    animationFillMode: 'forwards',
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </span>
          </h2>
          <p
            ref={subtextRef}
            className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto leading-relaxed px-1"
          >
            Job Fluencer helps you manage discovery, deal closure, protected payments, and
            project communication in one place.
          </p>
        </div>

        {/* Frame Gallery - Masonry Style; shorter rows on mobile */}
        <div className="grid grid-cols-12 gap-2 sm:gap-3 md:gap-4 auto-rows-[140px] sm:auto-rows-[180px] md:auto-rows-[220px]">
          {/* Frame 1 - Large */}
          <div
            ref={(el) => {
              framesRef.current[0] = el
            }}
            className="col-span-12 sm:col-span-7 row-span-2 group"
          >
            <div className="relative w-full h-full overflow-hidden rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.15)] transition-all duration-500 hover:shadow-[0_8px_40px_rgba(145,47,86,0.25)] hover:scale-[1.02]">
              <Image
                src={FRAMES[0].image}
                alt="Creative work"
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, 58vw"
              />
              {FRAMES[0].label && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="text-white text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
                    {FRAMES[0].label}
                  </span>
                </div>
              )}
              {/* Pills */}
              <div className="absolute bottom-4 left-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {FRAMES[0].pills.map((pill) => (
                  <span
                    key={pill}
                    className="px-4 py-2 rounded-full text-xs sm:text-sm font-medium text-white border border-white/50 hover:border-white transition-colors duration-300"
                  >
                    {pill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Frame 2 - Medium */}
          <div
            ref={(el) => {
              framesRef.current[1] = el
            }}
            className="col-span-12 sm:col-span-5 row-span-1 group"
          >
            <div className="relative w-full h-full overflow-hidden rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.15)] transition-all duration-500 hover:shadow-[0_8px_40px_rgba(145,47,86,0.25)] hover:scale-[1.02]">
              <Image
                src={FRAMES[1].image}
                alt="Creative work"
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, 42vw"
              />
              {FRAMES[1].label && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="text-white text-xl sm:text-2xl md:text-3xl font-bold tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
                    {FRAMES[1].label}
                  </span>
                </div>
              )}
              {/* Pills */}
              <div className="absolute bottom-4 left-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {FRAMES[1].pills.map((pill) => (
                  <span
                    key={pill}
                    className="px-3 py-1.5 rounded-full text-xs font-medium text-white border border-white/50 hover:border-white transition-colors duration-300"
                  >
                    {pill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Frame 3 - Small */}
          <div
            ref={(el) => {
              framesRef.current[2] = el
            }}
            className="col-span-6 sm:col-span-5 row-span-1 group"
          >
            <div className="relative w-full h-full overflow-hidden rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.15)] transition-all duration-500 hover:shadow-[0_8px_40px_rgba(145,47,86,0.25)] hover:scale-[1.02]">
              <Image
                src={FRAMES[2].image}
                alt="Creative work"
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                sizes="(max-width: 640px) 50vw, 42vw"
              />
              {FRAMES[2].label && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="text-white text-lg sm:text-xl md:text-2xl font-bold tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
                    {FRAMES[2].label}
                  </span>
                </div>
              )}
              {/* Pills */}
              <div className="absolute bottom-3 left-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {FRAMES[2].pills.map((pill) => (
                  <span
                    key={pill}
                    className="px-3 py-1.5 rounded-full text-xs font-medium text-white border border-white/50 hover:border-white transition-colors duration-300"
                  >
                    {pill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Frame 4 - Medium */}
          <div
            ref={(el) => {
              framesRef.current[3] = el
            }}
            className="col-span-6 sm:col-span-4 row-span-2 group"
          >
            <div className="relative w-full h-full overflow-hidden rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.15)] transition-all duration-500 hover:shadow-[0_8px_40px_rgba(145,47,86,0.25)] hover:scale-[1.02]">
              <Image
                src={FRAMES[3].image}
                alt="Creative work"
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                sizes="(max-width: 640px) 50vw, 33vw"
              />
              {FRAMES[3].label && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="text-white text-xl sm:text-2xl md:text-3xl font-bold tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
                    {FRAMES[3].label}
                  </span>
                </div>
              )}
              {/* Pills */}
              <div className="absolute bottom-4 left-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {FRAMES[3].pills.map((pill) => (
                  <span
                    key={pill}
                    className="px-3 py-1.5 rounded-full text-xs font-medium text-white border border-white/50 hover:border-white transition-colors duration-300"
                  >
                    {pill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Frame 5 - Large */}
          <div
            ref={(el) => {
              framesRef.current[4] = el
            }}
            className="col-span-12 sm:col-span-8 row-span-2 group"
          >
            <div className="relative w-full h-full overflow-hidden rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.15)] transition-all duration-500 hover:shadow-[0_8px_40px_rgba(145,47,86,0.25)] hover:scale-[1.02]">
              <Image
                src={FRAMES[4].image}
                alt="Creative work"
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, 67vw"
              />
              {FRAMES[4].label && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="text-white text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
                    {FRAMES[4].label}
                  </span>
                </div>
              )}
              {/* Pills */}
              <div className="absolute bottom-4 left-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {FRAMES[4].pills.map((pill) => (
                  <span
                    key={pill}
                    className="px-4 py-2 rounded-full text-xs sm:text-sm font-medium text-white border border-white/50 hover:border-white transition-colors duration-300"
                  >
                    {pill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom features */}
        <div className="mt-8 sm:mt-12 md:mt-16 flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8">
          <div
            ref={(el) => {
              bulletsRef.current[0] = el
            }}
            className="flex items-center gap-3 text-sm sm:text-base text-[var(--brand-text)]"
          >
            <div className="relative">
              <div className="bullet-dot w-3 h-3 rounded-full bg-[var(--brand-primary)]" />
            </div>
            <span className="font-medium">Relationship manager support</span>
          </div>
          <div
            ref={(el) => {
              bulletsRef.current[1] = el
            }}
            className="flex items-center gap-3 text-sm sm:text-base text-[var(--brand-text)]"
          >
            <div className="relative">
              <div className="bullet-dot w-3 h-3 rounded-full bg-[var(--brand-primary)]" />
            </div>
            <span className="font-medium">Pan-India creatives</span>
          </div>
          <div
            ref={(el) => {
              bulletsRef.current[2] = el
            }}
            className="flex items-center gap-3 text-sm sm:text-base text-[var(--brand-text)]"
          >
            <div className="relative">
              <div className="bullet-dot w-3 h-3 rounded-full bg-[var(--brand-primary)]" />
            </div>
            <span className="font-medium">End-to-end workflow</span>
          </div>
        </div>
      </div>
    </section>
  )
}
