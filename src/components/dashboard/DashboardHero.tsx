'use client'

import { DollarSign, Briefcase, Send, Eye } from 'lucide-react'
import { EnhancedStatCard } from './EnhancedStatCard'
import { GlassCard } from './GlassCard'
import { AnimatedButton } from './AnimatedButton'
import { motion } from 'framer-motion'

const stats = [
  { label: 'Total Earnings', value: 12430, prefix: '$', icon: DollarSign, color: 'from-green-500 to-emerald-500' },
  { label: 'Active Projects', value: 3, prefix: '', icon: Briefcase, color: 'from-blue-500 to-cyan-500' },
  { label: 'Proposals Sent', value: 8, prefix: '', icon: Send, color: 'from-purple-500 to-pink-500' },
  { label: 'Profile Views', value: 214, prefix: '', icon: Eye, color: 'from-orange-500 to-amber-500' },
]

export function DashboardHero() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Greeting */}
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold mb-8"
      >
        Welcome back, <span className="bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] bg-clip-text text-transparent">Kanika</span> 👋
      </motion.h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <EnhancedStatCard key={index} {...stat} index={index} />
        ))}
      </div>

      {/* Profile Completion */}
      <GlassCard delay={0.4}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold">Profile Completion</h3>
          <motion.span 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
            className="text-[var(--brand-primary)] font-semibold text-xl"
          >
            75%
          </motion.span>
        </div>
        
        <div className="w-full bg-[#361F27] rounded-full h-3 mb-4 overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '75%' }}
            transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] rounded-full relative"
          >
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            />
          </motion.div>
        </div>
        
        <AnimatedButton variant="primary">
          Complete your profile
        </AnimatedButton>
      </GlassCard>
    </section>
  )
}

