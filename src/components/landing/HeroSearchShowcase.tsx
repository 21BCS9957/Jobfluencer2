'use client'

import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'

const ROTATING_PLACEHOLDERS = [
  'Search Influencers',
  'Search Models',
  'Search Photographers',
  'Search UGC Creators',
  'Search Videographers',
]

const ROTATE_INTERVAL_MS = 2500

export function HeroSearchShowcase() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % ROTATING_PLACEHOLDERS.length)
    }, ROTATE_INTERVAL_MS)
    return () => clearInterval(id)
  }, [])

  return (
    <div
      className="hero-search-showcase w-full max-w-md flex items-center gap-3 pointer-events-none select-none"
      role="presentation"
      aria-hidden
    >
      <Search className="w-5 h-5 shrink-0 text-white/60" />
      <div className="flex-1 flex items-center min-h-[1.5em] overflow-hidden">
        <span
          key={index}
          className="hero-placeholder-fade-in inline-block text-white/90 text-sm sm:text-base"
        >
          {ROTATING_PLACEHOLDERS[index]}
        </span>
        <span
          className="hero-cursor-blink inline-block w-0.5 h-4 sm:h-5 bg-[var(--hero-accent)] ml-0.5"
          aria-hidden
        />
      </div>
    </div>
  )
}
