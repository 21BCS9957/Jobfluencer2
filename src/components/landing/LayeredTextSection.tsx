'use client'

import { LayeredText } from '@/components/ui/layered-text'

export function LayeredTextSection() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden flex items-center justify-center bg-black">
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
          background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 0.6) 100%)',
        }}
        aria-hidden
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <LayeredText
          lines={[
            { top: '\u00A0', bottom: 'CREATIVE' },
            { top: 'CREATIVE', bottom: 'TALENT' },
            { top: 'TALENT', bottom: 'MEETS' },
            { top: 'MEETS', bottom: 'BRANDS' },
            { top: 'BRANDS', bottom: '\u00A0' },
          ]}
          fontSize="52px"
          fontSizeMd="24px"
          lineHeight={46}
          lineHeightMd={26}
          className="text-white"
        />
      </div>
    </section>
  )
}
