/**
 * City map SVG with double-wrapped elements for clean GSAP animation.
 * Outer <g> = static position via transform="translate(x,y)"
 * Inner <g> = ref target for animation (no initial transform, so GSAP owns it)
 */

import type { RefObject } from 'react'

const DISCOVERY_PATH_D = 'M 80 380 C 180 360, 280 320, 380 300 C 450 285, 500 270, 520 260'

export interface CityMapRefs {
  pathRef: RefObject<SVGPathElement | null>
  clusterRef: RefObject<SVGCircleElement | null>
  influencerRef: RefObject<SVGGElement | null>
  pinRefs: RefObject<SVGGElement | null>[]
}

interface CityMapSvgProps {
  className?: string
  refs: CityMapRefs
}

export function CityMapSvg({ className, refs }: CityMapSvgProps) {
  const { pathRef, clusterRef, influencerRef, pinRefs } = refs

  return (
    <svg
      viewBox="0 0 800 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id="discoveryGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--brand-primary)" />
          <stop offset="100%" stopColor="var(--brand-secondary)" />
        </linearGradient>
      </defs>

      {/* 1. Districts */}
      <g className="city-districts" opacity="0">
        <path d="M 50 80 L 350 60 L 380 220 L 200 240 L 80 200 Z" stroke="var(--brand-secondary)" strokeWidth="1.2" fill="rgba(82,25,69,0.06)" strokeOpacity="0.6" />
        <path d="M 350 60 L 750 80 L 720 200 L 400 220 L 380 220 Z" stroke="var(--brand-secondary)" strokeWidth="1.2" fill="rgba(82,25,69,0.06)" strokeOpacity="0.6" />
        <path d="M 80 200 L 200 240 L 220 420 L 100 450 L 50 380 Z" stroke="var(--brand-secondary)" strokeWidth="1.2" fill="rgba(82,25,69,0.06)" strokeOpacity="0.6" />
        <path d="M 200 240 L 380 220 L 400 220 L 420 400 L 220 420 Z" stroke="var(--brand-secondary)" strokeWidth="1.2" fill="rgba(82,25,69,0.06)" strokeOpacity="0.6" />
        <path d="M 400 220 L 720 200 L 740 380 L 550 420 L 420 400 Z" stroke="var(--brand-secondary)" strokeWidth="1.2" fill="rgba(82,25,69,0.06)" strokeOpacity="0.6" />
      </g>

      {/* 2. River */}
      <g className="city-river" opacity="0">
        <path d="M 0 250 Q 200 200 400 250 T 800 220" stroke="var(--brand-secondary)" strokeWidth="2" fill="none" strokeOpacity="0.35" strokeDasharray="12 8" />
      </g>

      {/* 3. Cluster glow – positioned by cx/cy, no transform conflict */}
      <circle
        ref={clusterRef}
        className="cluster-glow"
        cx="520"
        cy="260"
        r="90"
        fill="var(--brand-primary)"
      />

      {/* 4. Discovery path */}
      <path
        ref={pathRef}
        className="discovery-path"
        d={DISCOVERY_PATH_D}
        stroke="url(#discoveryGrad)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* 5. Pins – outer <g> for position, inner <g> with ref for animation */}
      <g transform="translate(180, 140)">
        <g ref={pinRefs[0]}>
          <circle cx="0" cy="0" r="6" fill="var(--brand-primary)" />
          <circle cx="0" cy="0" r="3" fill="white" />
        </g>
      </g>
      <g transform="translate(620, 180)">
        <g ref={pinRefs[1]}>
          <circle cx="0" cy="0" r="6" fill="var(--brand-primary)" />
          <circle cx="0" cy="0" r="3" fill="white" />
        </g>
      </g>
      <g transform="translate(280, 360)">
        <g ref={pinRefs[2]}>
          <circle cx="0" cy="0" r="6" fill="var(--brand-primary)" />
          <circle cx="0" cy="0" r="3" fill="white" />
        </g>
      </g>

      {/* 6. Cartoon influencer – outer for position, inner ref for animation */}
      <g transform="translate(520, 260)">
        <g ref={influencerRef}>
          {/* Speech bubble */}
          <ellipse cx="0" cy="-52" rx="32" ry="16" fill="white" stroke="var(--brand-secondary)" strokeWidth="1.5" strokeOpacity="0.6" />
          <path d="M -6 -38 L 0 -30 L 6 -38 Z" fill="white" />
          <text x="0" y="-50" textAnchor="middle" dominantBaseline="middle" fill="var(--brand-text)" fontSize="14" fontWeight="700" fontFamily="system-ui, sans-serif">Hi!</text>
          {/* Head */}
          <circle cx="0" cy="-8" r="16" fill="#f5e6d3" stroke="var(--brand-secondary)" strokeWidth="1.5" strokeOpacity="0.5" />
          {/* Eyes */}
          <circle cx="-5" cy="-11" r="2" fill="var(--brand-text)" />
          <circle cx="5" cy="-11" r="2" fill="var(--brand-text)" />
          {/* Smile */}
          <path d="M -5 -5 Q 0 1 5 -5" stroke="var(--brand-text)" strokeWidth="1.2" fill="none" strokeLinecap="round" />
          {/* Body */}
          <ellipse cx="0" cy="18" rx="12" ry="16" fill="var(--brand-primary)" stroke="var(--brand-secondary)" strokeWidth="1" strokeOpacity="0.4" />
          {/* Phone in hand */}
          <rect x="10" y="10" width="8" height="14" rx="2" fill="var(--brand-text)" opacity="0.25" />
          <rect x="11.5" y="12" width="5" height="3.5" rx="0.5" fill="white" opacity="0.7" />
          {/* Waving hand */}
          <g>
            <circle cx="-16" cy="6" r="4" fill="#f5e6d3" stroke="var(--brand-secondary)" strokeWidth="0.8" strokeOpacity="0.4" />
          </g>
        </g>
      </g>
    </svg>
  )
}
