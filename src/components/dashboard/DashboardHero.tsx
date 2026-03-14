'use client'

import { DollarSign, Briefcase, Send, Eye, Sparkles } from 'lucide-react'
import { EnhancedStatCard } from './EnhancedStatCard'
import { GlassCard } from './GlassCard'
import { AnimatedButton } from './AnimatedButton'
import { motion } from 'framer-motion'

const stats = [
  { label: 'Total Earnings', value: 12430, prefix: '$', icon: DollarSign, color: 'text-zinc-100' },
  { label: 'Active Projects', value: 3, prefix: '', icon: Briefcase, color: 'text-indigo-400' },
  { label: 'Proposals Sent', value: 8, prefix: '', icon: Send, color: 'text-zinc-300' },
  { label: 'Profile Views', value: 214, prefix: '', icon: Eye, color: 'text-zinc-400' },
]

export function DashboardHero() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Greeting */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-2 mb-2"
            >
              <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              <span className="text-sm font-medium text-indigo-400 tracking-wider uppercase">Welcome Back</span>
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white">
              Kanika <span className="text-zinc-500 font-normal">Dashboard</span>
            </h1>
          </div>

          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
            className="inline-flex flex-col items-start md:items-end"
          >
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/[0.03] border border-white/[0.08] rounded-full backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span className="text-sm font-medium text-zinc-300">Top Rated Freelancer</span>
            </div>
            <p className="text-xs text-zinc-500 mt-2 pl-3 md:pl-0">Top 1% of talent this month</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <EnhancedStatCard key={index} {...stat} index={index} />
        ))}
      </div>

      {/* Profile Completion */}
      <GlassCard delay={0.4}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-white">Profile Completion</h3>
          <motion.span 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
            className="text-indigo-400 font-medium text-xl"
          >
            75%
          </motion.span>
        </div>
        
        <div className="w-full bg-zinc-900 rounded-full h-2 mb-6 overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '75%' }}
            transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
            className="h-full bg-indigo-500 rounded-full relative"
          >
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
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

