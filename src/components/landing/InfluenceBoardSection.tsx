"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

type InfluenceTile = {
  id: string
  name: string
  subtitle?: string
  image: string
  size: "large" | "medium" | "small"
}

const TILES: InfluenceTile[] = [
  {
    id: "luxury-product",
    name: "Luxury Product Shoot",
    subtitle: "High-gloss, detail-first visuals",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80",
    size: "large",
  },
  {
    id: "streetwear",
    name: "Streetwear Campaign",
    subtitle: "Found-light, city texture",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80",
    size: "small",
  },
  {
    id: "minimal-film",
    name: "Minimal Brand Film",
    subtitle: "Soft motion, clean framing",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    size: "small",
  },
  {
    id: "ugc-content",
    name: "UGC Style Content",
    subtitle: "Handheld, platform-native",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    size: "medium",
  },
  {
    id: "editorial-photo",
    name: "Editorial Photography",
    subtitle: "Intentional, story-rich frames",
    image:
      "https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=1200&q=80",
    size: "medium",
  },
  {
    id: "event-aesthetic",
    name: "Event Aesthetic",
    subtitle: "Live energy, premium guests",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80",
    size: "small",
  },
  {
    id: "performance-ads",
    name: "Performance Ads Look",
    subtitle: "Conversion-first creative",
    image:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80",
    size: "large",
  },
]

export function InfluenceBoardSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.disconnect()
          }
        })
      },
      {
        root: null,
        threshold: 0.18,
      },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white text-[var(--brand-text)]"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 py-14 sm:py-16 lg:py-18">
        <header className="max-w-3xl mb-8 sm:mb-10">
          <p className="text-[10px] sm:text-xs tracking-[0.28em] text-[var(--muted-foreground)] uppercase mb-3">
            Build from your influences
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-[var(--brand-text)]">
            Build creative teams from your influences.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[var(--muted-foreground)] max-w-xl">
            You don&apos;t just hire creatives. You curate them from the references, moods, and campaigns that already
            live in your head.
          </p>
        </header>

        {/* Influence grid */}
        <div
          className={cn(
            "grid grid-cols-12 gap-4 sm:gap-5 md:gap-6",
            "transition-opacity transition-transform duration-700 ease-out",
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
          )}
        >
          {TILES.map((tile, index) => (
            <InfluenceTileCard key={tile.id} tile={tile} index={index} visible={visible} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 sm:mt-12 flex justify-center">
          <button
            type="button"
            className="relative text-sm sm:text-base font-medium tracking-wide text-[var(--brand-text)] group"
          >
            <span>Build your creative stack →</span>
            <span className="block h-px mt-1 bg-[rgba(0,0,0,0.12)] overflow-hidden relative">
              <span className="absolute inset-y-0 left-0 w-0 bg-[var(--brand-primary)] group-hover:w-full transition-all duration-400 ease-out" />
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}

function InfluenceTileCard({
  tile,
  index,
  visible,
}: {
  tile: InfluenceTile
  index: number
  visible: boolean
}) {
  const baseLayout =
    tile.size === "large"
      ? "col-span-12 md:col-span-7 row-span-2 min-h-[220px] md:min-h-[260px]"
      : tile.size === "medium"
        ? "col-span-12 md:col-span-5 min-h-[200px]"
        : "col-span-12 sm:col-span-6 md:col-span-4 min-h-[170px]"

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-[rgba(15,23,42,0.06)] bg-[rgba(248,250,252,0.9)]",
        "shadow-[0_18px_40px_rgba(15,23,42,0.12)]",
        baseLayout,
        "transition-all duration-500 ease-out",
        visible
          ? `delay-[${index * 40}ms] opacity-100 translate-y-0`
          : "opacity-0 translate-y-4 pointer-events-none",
      )}
    >
      {/* Image layer with monochrome → color */}
      <div className="absolute inset-0">
        <div
          className={cn(
            "absolute inset-0 bg-cover bg-center",
            "grayscale contrast-[1.05] brightness-[0.96]",
            "group-hover:grayscale-0 group-hover:brightness-100",
            "transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]",
          )}
          style={{
            backgroundImage: `url(${tile.image})`,
          }}
        />
        {/* Grain & vignette */}
        <div className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-60 bg-[radial-gradient(circle_at_top,rgba(0,0,0,0)_0%,rgba(15,23,42,0.55)_80%)]" />
        {/* Soft brand glow on hover */}
        <div
          className={cn(
            "absolute inset-0 rounded-2xl border border-transparent",
            "group-hover:border-[rgba(145,47,86,0.6)] group-hover:shadow-[0_0_34px_rgba(145,47,86,0.35)]",
            "transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]",
          )}
        />
        {/* Subtle gradient edge light */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out bg-[radial-gradient(circle_at_top_right,rgba(145,47,86,0.24),transparent_58%)]" />
      </div>

      {/* Content overlay */}
      <div className="relative h-full w-full flex flex-col justify-between p-4 sm:p-5">
        <div className="flex items-center justify-between text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[rgba(15,23,42,0.55)]">
          <span>Influence</span>
          <span className="text-[rgba(15,23,42,0.75)] group-hover:text-[var(--brand-primary)] transition-colors duration-300">
            Build from this →
          </span>
        </div>

        <div className="mt-3 sm:mt-4">
          <h3 className="text-sm sm:text-base md:text-lg font-semibold tracking-tight text-[var(--brand-text)]">
            {tile.name}
          </h3>
          {tile.subtitle && (
            <p className="mt-1 text-[11px] sm:text-xs text-[rgba(15,23,42,0.7)] max-w-xs">
              {tile.subtitle}
            </p>
          )}
        </div>

        {/* Hover micro-copy */}
        <div className="mt-3 flex items-center justify-between text-[11px] sm:text-xs text-[rgba(15,23,42,0.7)]">
          <span className="opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out">
            Use this as creative direction
          </span>
          <button
            type="button"
            className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-medium text-[rgba(15,23,42,0.9)] group-hover:text-[var(--brand-primary)] transition-colors duration-300"
          >
            Create team inspired by this
          </button>
        </div>
      </div>
    </article>
  )
}

