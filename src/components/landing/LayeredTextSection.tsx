'use client'

import { LayeredText } from '@/components/ui/layered-text'

export function LayeredTextSection() {
  return (
    <section className="relative w-full min-h-[100dvh] min-h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/layered-bg.mp4" type="video/mp4" />
      </video>

      {/* Video Overlay - similar to hero section */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 0.7) 100%)',
        }}
        aria-hidden
      />

      {/* Content - responsive padding and smaller type on mobile */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 py-12 sm:py-16">
        <LayeredText
          lines={[
            { top: '\u00A0', bottom: 'CREATIVE' },
            { top: 'CREATIVE', bottom: 'TALENT' },
            { top: 'TALENT', bottom: 'MEETS' },
            { top: 'MEETS', bottom: 'BRANDS' },
            { top: 'BRANDS', bottom: '\u00A0' },
          ]}
          fontSize="64px"
          fontSizeMd="28px"
          lineHeight={70}
          lineHeightMd={32}
          className="text-white layered-text-responsive"
        />
      </div>
    </section>
  )
}
