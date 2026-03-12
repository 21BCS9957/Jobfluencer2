"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import type React from "react"

interface LayeredTextProps {
  lines?: Array<{ top: string; bottom: string }>
  fontSize?: string
  fontSizeMd?: string
  lineHeight?: number
  lineHeightMd?: number
  className?: string
}

export function LayeredText({
  lines = [
    { top: "\u00A0", bottom: "INFINITE" },
    { top: "INFINITE", bottom: "PROGRESS" },
    { top: "PROGRESS", bottom: "INNOVATION" },
    { top: "INNOVATION", bottom: "FUTURE" },
    { top: "FUTURE", bottom: "DREAMS" },
    { top: "DREAMS", bottom: "ACHIEVEMENT" },
    { top: "ACHIEVEMENT", bottom: "\u00A0" },
  ],
  fontSize = "72px",
  fontSizeMd = "36px",
  lineHeight = 60,
  lineHeightMd = 35,
  className = "",
}: LayeredTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<gsap.core.Timeline>()

  const calculateTranslateX = (index: number) => {
    const baseOffset = 25
    const baseOffsetMd = 15
    const centerIndex = Math.floor(lines.length / 2)
    return {
      desktop: (index - centerIndex) * baseOffset,
      mobile: (index - centerIndex) * baseOffsetMd,
    }
  }

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const paragraphs = container.querySelectorAll("p")

    // Create infinite loop animation
    timelineRef.current = gsap.timeline({ 
      repeat: -1, // Infinite repeat
      yoyo: true, // Reverse back and forth
    })

    timelineRef.current.to(paragraphs, {
      y: window.innerWidth >= 768 ? -70 : -40,
      duration: 1.5,
      ease: "power2.inOut",
      stagger: 0.1,
    })

    return () => {
      timelineRef.current?.kill()
    }
  }, [lines])

  return (
    <div
      ref={containerRef}
      className={`layered-text-responsive mx-auto py-8 sm:py-12 md:py-16 font-sans font-black tracking-[-2px] uppercase text-black dark:text-white antialiased ${className}`}
      style={
        {
          "--layered-font-size": fontSize,
          "--layered-font-size-md": fontSizeMd,
          "--layered-line-height-desktop": `${lineHeight}px`,
          "--layered-line-height": `${lineHeightMd}px`,
          "--layered-line-height-md": `${lineHeightMd}px`,
        } as React.CSSProperties
      }
    >
      <ul className="list-none p-0 m-0 flex flex-col items-center layered-text-list gap-2 sm:gap-3">
        {lines.map((line, index) => {
          const translateX = calculateTranslateX(index)
          return (
            <li
              key={index}
              className="relative layered-text-li overflow-hidden"
              style={
                {
                  height: "var(--layered-line-height)",
                  transform: `translateX(${translateX.desktop}px) skew(${index % 2 === 0 ? "60deg, -30deg" : "0deg, -30deg"}) scaleY(${index % 2 === 0 ? "0.66667" : "1.33333"})`,
                  "--md-translateX": `${translateX.mobile}px`,
                } as React.CSSProperties
              }
            >
              <p className="layered-text-p leading-[55px] md:leading-[30px] px-2 sm:px-[15px] align-top whitespace-nowrap m-0" style={{ height: "var(--layered-line-height)", lineHeight: "calc(var(--layered-line-height) - 5px)" } as React.CSSProperties}>
                {line.top}
              </p>
              <p className="layered-text-p leading-[55px] md:leading-[30px] px-2 sm:px-[15px] align-top whitespace-nowrap m-0" style={{ height: "var(--layered-line-height)", lineHeight: "calc(var(--layered-line-height) - 5px)" } as React.CSSProperties}>
                {line.bottom}
              </p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
