'use client'

import { motion } from 'framer-motion'
import { SearchBar } from './SearchBar'
import { Sparkles, Camera, Video, Scissors, Smartphone, Star } from 'lucide-react'

export function SearchSection() {
  const handleSearch = (query: string) => {
    console.log('Searching for:', query)
    // Add your search logic here
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        {/* Decorative elements */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2">
          <motion.div
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <Sparkles className="w-6 h-6 text-indigo-400" />
          </motion.div>
        </div>

        {/* Search Bar */}
        <SearchBar variant="hero" onSearch={handleSearch} />

        {/* Quick Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap items-center gap-3 mt-4"
        >
          <span className="text-sm text-gray-400">Quick filters:</span>
          {[
            { label: 'Photography', icon: <Camera className="w-3.5 h-3.5" /> },
            { label: 'Videography', icon: <Video className="w-3.5 h-3.5" /> },
            { label: 'Editing', icon: <Scissors className="w-3.5 h-3.5" /> },
            { label: 'Social Media', icon: <Smartphone className="w-3.5 h-3.5" /> },
            { label: 'Influencer', icon: <Star className="w-3.5 h-3.5" /> },
          ].map((filter, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.05 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.08] hover:border-indigo-500/30 rounded-full text-sm text-zinc-400 hover:text-white transition-all flex items-center gap-1.5 group"
            >
              <span className="text-zinc-500 group-hover:text-indigo-400 transition-colors">{filter.icon}</span>
              <span>{filter.label}</span>
            </motion.button>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
