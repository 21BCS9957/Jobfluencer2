'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CityMapSvg, type CityMapRefs } from './CityMapSvg'

gsap.registerPlugin(ScrollTrigger)

// Lottie JSON path for the task assigning animation
// Make sure you have: public/lottie/task-assigning.json
const LOTTIE_PATH = '/lottie/task-assigning.json'

export function CityDiscoverySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subtextRef = useRef<HTMLParagraphElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const lottieHostRef = useRef<HTMLDivElement>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)

  const pathRef = useRef<SVGPathElement>(null)
  const clusterRef = useRef<SVGCircleElement>(null)
  const influencerRef = useRef<SVGGElement>(null)
  const pinRef0 = useRef<SVGGElement>(null)
  const pinRef1 = useRef<SVGGElement>(null)
  const pinRef2 = useRef<SVGGElement>(null)

  const mapRefs: CityMapRefs = {
    pathRef,
    clusterRef,
    influencerRef,
    pinRefs: [pinRef0, pinRef1, pinRef2],
  }

  useEffect(() => {
    const section = sectionRef.current
    const stage = stageRef.current
    const lottieHost = lottieHostRef.current
    const mapContainer = mapContainerRef.current
    const pathEl = pathRef.current

    if (!section || !stage || !lottieHost || !mapContainer || !pathEl) return

    const pathLength = pathEl.getTotalLength()
    const pins = [pinRef0.current, pinRef1.current, pinRef2.current].filter(Boolean)
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let animation: any | null = null
    let totalFrames = 0
    let destroyed = false
    let ctx: gsap.Context | null = null

    const initLottie = async () => {
      try {
        const { default: lottie } = await import('lottie-web')
        if (destroyed || !lottieHost) return

        animation = lottie.loadAnimation({
          container: lottieHost,
          renderer: 'svg',
          loop: false,
          autoplay: false,
          path: LOTTIE_PATH,
        })

        const handleLoaded = () => {
          if (!animation) return
          totalFrames = animation.totalFrames || Math.floor((animation as any).getDuration(true) ?? 0)
          if (prefersReduced && totalFrames > 0) {
            animation.goToAndStop(totalFrames, true)
          }
        }

        if ((animation as any).isLoaded || (animation as any).isDOMLoaded) {
          handleLoaded()
        } else {
          animation.addEventListener('DOMLoaded', handleLoaded)
        }
      } catch (err) {
        console.error('Failed to load Lottie for city discovery', err)
      }
    }

    initLottie()

    if (prefersReduced) {
      gsap.set(mapContainer, { opacity: 1, scale: 1 })
      gsap.set(pathEl, { strokeDasharray: pathLength, strokeDashoffset: pathLength * 0.35 })
      gsap.set(section.querySelectorAll('.city-districts, .city-river'), { opacity: 0.6 })
      gsap.set(pins, { opacity: 1, y: 0 })
      gsap.set(clusterRef.current, { opacity: 0.18 })
      gsap.set(influencerRef.current, { opacity: 1, scale: 1 })

      return () => {
        destroyed = true
        if (animation) {
          animation.destroy()
        }
      }
    }

    ctx = gsap.context(() => {
      // Initial hidden states
      gsap.set(headingRef.current, { y: 50, opacity: 0 })
      gsap.set(subtextRef.current, { y: 30, opacity: 0 })
      gsap.set(lottieHost, { opacity: 1, scale: 1, y: 20 })
      gsap.set(mapContainer, { opacity: 0, scale: 0.5 })
      gsap.set(pathEl, { strokeDasharray: pathLength, strokeDashoffset: pathLength })
      gsap.set(pins, { y: -20, opacity: 0 })
      gsap.set(influencerRef.current, { scale: 0, opacity: 0, transformOrigin: 'center center' })
      gsap.set(clusterRef.current, { opacity: 0, scale: 0.8, transformOrigin: 'center center' })
      gsap.set(section.querySelectorAll('.city-districts'), { opacity: 0 })
      gsap.set(section.querySelectorAll('.city-river'), { opacity: 0 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=4000',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (!animation || totalFrames <= 0) return
            const LOTTIE_PHASE_END = 0.5
            const normalized = Math.max(0, Math.min(1, self.progress / LOTTIE_PHASE_END))
            const frame = normalized * totalFrames
            animation.goToAndStop(frame, true)
          },
        },
      })

      /* Phase 1: Text entrance */
      tl.to(
        headingRef.current,
        { y: 0, opacity: 1, duration: 0.05, ease: 'power2.out' },
        0,
      )
      tl.to(
        subtextRef.current,
        { y: 0, opacity: 1, duration: 0.05, ease: 'power2.out' },
        0.02,
      )

      /* Phase 2: Lottie guy walks & arrives at board (driven by onUpdate) */
      tl.to(
        lottieHost,
        { y: 0, duration: 0.12, ease: 'power2.out' },
        0.06,
      )
      tl.to(
        lottieHost,
        { scale: 1.06, duration: 0.12, ease: 'power2.inOut' },
        0.26,
      )

      /* Phase 3: Fade Lottie, bring map to front */
      tl.to(
        lottieHost,
        { opacity: 0, duration: 0.10, ease: 'power1.out' },
        0.54,
      )

      // Map reveals where the board was
      tl.to(
        mapContainer,
        { opacity: 1, scale: 1, duration: 0.10, ease: 'power2.out' },
        0.56,
      )

      /* Phase 4: Map discovery flow (same as before) */
      tl.to(
        section.querySelectorAll('.city-districts'),
        { opacity: 0.7, duration: 0.06 },
        0.64,
      )
      tl.to(
        section.querySelectorAll('.city-river'),
        { opacity: 0.5, duration: 0.06 },
        0.64,
      )

      tl.to(
        pathEl,
        {
          strokeDashoffset: pathLength * 0.35,
          duration: 0.12,
          ease: 'power1.inOut',
        },
        0.68,
      )

      const pinEls = pins
      pinEls.forEach((pin, i) => {
        tl.to(
          pin,
          {
            y: 0,
            opacity: 1,
            duration: 0.04,
            ease: 'back.out(2)',
          },
          0.82 + i * 0.03,
        )
      })

      tl.to(
        clusterRef.current,
        {
          opacity: 0.18,
          scale: 1.15,
          duration: 0.06,
          ease: 'power1.out',
        },
        0.90,
      )

      tl.to(
        influencerRef.current,
        {
          scale: 1,
          opacity: 1,
          duration: 0.08,
          ease: 'back.out(1.6)',
        },
        0.92,
      )
    }, section)

    return () => {
      destroyed = true
      if (ctx) ctx.revert()
      if (animation) {
        animation.destroy()
      }
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="city-discovery-section relative w-full bg-[var(--brand-bg-base)]"
    >
      {/* Text block */}
      <div className="pt-16 sm:pt-20 pb-6 text-center px-6">
        <h2
          ref={headingRef}
          className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight text-[var(--brand-text)]"
        >
          Find the right influencers{' '}
          <span className="text-[var(--brand-primary)]">in your city</span>
        </h2>
        <p
          ref={subtextRef}
          className="mt-4 text-base sm:text-lg text-[var(--muted-foreground)] max-w-lg mx-auto leading-relaxed"
        >
          Discover creators where your audience actually lives
        </p>
      </div>

      {/* Stage — pinned viewport area */}
      <div
        ref={stageRef}
        className="relative w-full overflow-hidden"
        style={{ height: 'calc(100vh - 180px)' }}
      >
        {/* Lottie: guy walking with brief to the board */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-4 sm:px-0">
          <div
            ref={lottieHostRef}
            className="w-full max-w-xl aspect-[16/9]"
            aria-hidden
          />
        </div>

        {/* Map container — fades in after Lottie finishes */}
        <div
          ref={mapContainerRef}
          className="absolute inset-0 flex items-center justify-center px-4 sm:px-8"
        >
          <div className="w-full max-w-3xl">
            <CityMapSvg className="city-map-svg w-full h-auto" refs={mapRefs} />
          </div>
        </div>
      </div>
    </section>
  )
}
