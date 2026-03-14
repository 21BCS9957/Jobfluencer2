'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GlassCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  delay?: number
  fullHeight?: boolean
}

export function GlassCard({ children, className, hover = true, delay = 0, fullHeight = false }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay, duration: 0.5 }}
      className={cn(
        "relative bg-white/[0.02] backdrop-blur-2xl rounded-2xl p-6 border border-white/[0.08]",
        fullHeight && "flex flex-col",
        hover && "hover:border-white/[0.15] hover:bg-white/[0.04] transition-all duration-300",
        className
      )}
    >
      {/* Subtle glow overlay on hover */}
      {hover && <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent rounded-2xl pointer-events-none" />}
      
      {/* Content */}
      <div className={cn("relative z-10", fullHeight && "flex flex-col flex-grow")}>
        {children}
      </div>
    </motion.div>
  )
}
