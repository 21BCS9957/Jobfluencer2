'use client'

import { useRef, useState, useEffect } from 'react'

// Use MP4 for all browsers (Chrome, Firefox, Safari). .mov works only in Safari.
// To convert: node scripts/convert-hero-video.js (requires ffmpeg)
const VIDEO_SOURCES = [
  { src: '/hero-bg.mp4', type: 'video/mp4' },
  { src: '/electric-trolleys-of-the-traditional-vintage-yello-2026-01-22-02-18-14-utc.mov', type: 'video/quicktime' },
]

export function HeroVideo() {
  const [error, setError] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.play().catch(() => setError(true))
  }, [])

  if (error) {
    return (
      <div
        className="absolute inset-0 z-0 w-full h-full bg-gradient-to-b from-black/80 to-black/60"
        aria-hidden
      />
    )
  }

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 z-0 w-full h-full object-cover"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      onError={() => setError(true)}
      aria-hidden
    >
      {VIDEO_SOURCES.map(({ src, type }) => (
        <source key={src} src={src} type={type} />
      ))}
    </video>
  )
}
