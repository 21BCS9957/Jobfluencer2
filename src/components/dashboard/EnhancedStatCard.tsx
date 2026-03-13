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
      className="group relative bg-[var(--brand-dark)] rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden"
    >
      {/* Gradient overlay on hover */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
      />
      
      {/* Subtle glow effect */}
      <div 
        className="absolute -inset-1 bg-gradient-to-br from-[var(--brand-primary)]/20 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"
      />

      <div className="relative">
        {/* Icon with gradient background */}
        <motion.div 
          className={`w-12 h-12 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center mb-4 shadow-lg`}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Icon className="w-6 h-6 text-white" />
        </motion.div>
        
        <p className="text-gray-400 text-sm mb-1 font-medium">{label}</p>
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
