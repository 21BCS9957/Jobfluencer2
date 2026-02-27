"use client"

import { MagneticText } from "@/components/ui/morphing-cursor"

export function MagneticStrip() {
  return (
    <section className="w-full bg-[var(--brand-bg-base)] border-t border-[rgba(212,200,207,0.5)]">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 py-10 sm:py-12">
        <div className="flex flex-col items-center gap-4 sm:gap-6">
          <p className="text-[10px] sm:text-xs tracking-[0.28em] uppercase text-[var(--muted-foreground)]">
            Hover to explore your local network
          </p>
          <MagneticText
            text="HIRE INFLUENCERS FROM YOUR CITY"
            hoverText="HIRE INFLUENCERS FROM YOUR CITY"
            className="max-w-full"
          />
        </div>
      </div>
    </section>
  )
}

