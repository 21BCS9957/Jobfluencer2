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
  const timelineRef = useRef<gsap.core.Timeline | undefined>(undefined)

  const calculateTranslateX = (index: number) => {
    const baseOffset = 24
    const baseOffsetMd = 14
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
      y: window.innerWidth >= 768 ? -48 : -28,
      duration: 1.2,
      ease: "power2.inOut",
      stagger: 0.08,
    })

    return () => {
      timelineRef.current?.kill()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lines])

  return (
    <div
      ref={containerRef}
      className={`mx-auto py-12 font-sans font-black tracking-[-2px] uppercase text-black dark:text-white antialiased ${className}`}
      style={{ fontSize, "--md-font-size": fontSizeMd } as React.CSSProperties}
    >
      <ul className="list-none p-0 m-0 flex flex-col items-center">
        {lines.map((line, index) => {
          const translateX = calculateTranslateX(index)
          return (
            <li
              key={index}
              className={`overflow-hidden relative ${
                index % 2 === 0
                  ? "[transform:skew(60deg,-30deg)_scaleY(0.66667)]"
                  : "[transform:skew(0deg,-30deg)_scaleY(1.33333)]"
              }`}
              style={
                {
                  height: `${lineHeight}px`,
                  transform: `translateX(${translateX.desktop}px) skew(${index % 2 === 0 ? "60deg, -30deg" : "0deg, -30deg"}) scaleY(${index % 2 === 0 ? "0.66667" : "1.33333"})`,
                  "--md-height": `${lineHeightMd}px`,
                  "--md-translateX": `${translateX.mobile}px`,
                } as React.CSSProperties
              }
            >
              <p
                className="leading-[55px] md:leading-[30px] px-[15px] align-top whitespace-nowrap m-0"
                style={
                  {
                    height: `${lineHeight}px`,
                    lineHeight: `${lineHeight - 5}px`,
                  } as React.CSSProperties
                }
              >
                {line.top}
              </p>
              <p
                className="leading-[55px] md:leading-[30px] px-[15px] align-top whitespace-nowrap m-0"
                style={
                  {
                    height: `${lineHeight}px`,
                    lineHeight: `${lineHeight - 5}px`,
                  } as React.CSSProperties
                }
              >
                {line.bottom}
              </p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
