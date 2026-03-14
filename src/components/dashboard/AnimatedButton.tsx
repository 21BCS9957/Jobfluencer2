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
  primary: 'bg-white text-black shadow-lg shadow-black/50 hover:bg-zinc-200 border border-transparent',
  secondary: 'bg-white/[0.03] text-white border border-white/[0.08] hover:bg-white/[0.08] backdrop-blur-xl',
  outline: 'border border-white/[0.12] text-white hover:bg-white/[0.05] backdrop-blur-xl',
  success: 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-400 border border-transparent',
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
