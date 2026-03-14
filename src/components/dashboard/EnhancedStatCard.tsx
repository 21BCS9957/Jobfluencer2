'use client'

import { useEffect, useState } from 'react'
import { LucideIcon } from 'lucide-react'
import { motion } from 'framer-motion'

interface EnhancedStatCardProps {
  label: string
  value: number
  prefix?: string
  icon: LucideIcon
  color: string
  index: number
}

function AnimatedCounter({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      setCount(Math.floor(progress * end))
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration])

  return <span>{count.toLocaleString()}</span>
}

export function EnhancedStatCard({ label, value, prefix = '', icon: Icon, color, index }: EnhancedStatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group relative bg-white/[0.02] backdrop-blur-2xl rounded-2xl p-6 border border-white/[0.08] hover:border-white/[0.15] transition-all duration-300 overflow-hidden"
    >
      {/* Very subtle glow effect */}
      <div 
        className="absolute -inset-1 bg-white/[0.02] opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500"
      />

      <div className="relative">
        {/* Icon with subtle background */}
        <motion.div 
          className={`w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-5 ${color.replace('text-', 'text-')} group-hover:bg-white/[0.08] transition-colors`}
          whileHover={{ scale: 1.05, rotate: 2 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Icon className="w-5 h-5 flex-shrink-0" />
        </motion.div>
        
        <p className="text-zinc-500 text-xs font-medium uppercase tracking-[0.1em] mb-1.5">{label}</p>
        <p className="text-3xl font-bold text-white">
          {prefix}
          <AnimatedCounter end={value} />
        </p>
      </div>

      {/* Bottom accent line */}
      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
    </motion.div>
  )
}
