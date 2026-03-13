'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimatedButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'outline' | 'success'
  className?: string
  fullWidth?: boolean
}

const variants = {
  primary: 'bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] text-white shadow-lg shadow-[var(--brand-primary)]/30',
  secondary: 'bg-white/10 text-white border border-white/20',
  outline: 'border-2 border-[var(--brand-primary)] text-white hover:bg-[var(--brand-primary)]/10',
  success: 'bg-gradient-to-r from-[#22c55e] to-[#16a34a] text-white shadow-lg shadow-green-500/30',
}

export function AnimatedButton({ 
  children, 
  onClick, 
  variant = 'primary', 
  className,
  fullWidth = false 
}: AnimatedButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={cn(
        'relative px-6 py-3 rounded-lg font-medium overflow-hidden transition-all duration-300',
        variants[variant],
        fullWidth && 'w-full',
        className
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {/* Shimmer effect on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6 }}
      />
      
      {/* Button content */}
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}
