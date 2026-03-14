'use client'

import { useState, useRef, useEffect } from 'react'
import { Search, MapPin, Briefcase, DollarSign, X, TrendingUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { GlassCard } from './GlassCard'

const trendingSearches = [
  'Photography',
  'Video Editing',
  'Social Media Management',
  'Content Creation',
  'Influencer Marketing',
]

const recentSearches = [
  'Wedding Photography Mumbai',
  'Video Editor for YouTube',
  'Instagram Content Creator',
]

interface SearchBarProps {
  variant?: 'hero' | 'compact'
  onSearch?: (query: string) => void
}

export function SearchBar({ variant = 'hero', onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [location, setLocation] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = () => {
    if (query.trim()) {
      onSearch?.(query)
      setShowSuggestions(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const selectTrending = (term: string) => {
    setQuery(term)
    setShowSuggestions(false)
  }

  if (variant === 'compact') {
    return (
      <div className="relative" ref={searchRef}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onKeyPress={handleKeyPress}
            placeholder="Search jobs, projects..."
            className="w-full pl-10 pr-4 py-2 bg-white/[0.04] border border-white/[0.08] rounded-lg text-white placeholder:text-zinc-500 focus:outline-none focus:border-indigo-400 focus:bg-white/[0.08] transition-colors"
          />
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full" ref={searchRef}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className={`relative ${isFocused ? 'scale-[1.02]' : 'scale-100'} transition-transform duration-300`}
      >
        <GlassCard className="p-2">
          <div className="flex flex-col md:flex-row gap-2">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setShowSuggestions(true)
                }}
                onFocus={() => {
                  setIsFocused(true)
                  setShowSuggestions(true)
                }}
                onBlur={() => setIsFocused(false)}
                onKeyPress={handleKeyPress}
                placeholder="Search for photography, videography, editing..."
                className="w-full pl-12 pr-10 py-3 bg-white/[0.04] border border-white/[0.08] rounded-lg text-white placeholder:text-zinc-500 focus:outline-none focus:border-indigo-400 focus:bg-white/[0.08] transition-all"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              )}
            </div>

            {/* Location Input */}
            <div className="md:w-64 relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Location"
                className="w-full pl-12 pr-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-lg text-white placeholder:text-zinc-500 focus:outline-none focus:border-indigo-400 focus:bg-white/[0.08] transition-all"
              />
            </div>

            {/* Search Button */}
            <motion.button
              onClick={handleSearch}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3 bg-white text-black rounded-lg font-medium hover:bg-zinc-200 transition-all duration-300 whitespace-nowrap shadow-lg shadow-black/50 border border-transparent"
            >
              Search Jobs
            </motion.button>
          </div>
        </GlassCard>
      </motion.div>

      {/* Search Suggestions Dropdown */}
      <AnimatePresence>
        {showSuggestions && (query || isFocused) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-2 left-0 right-0 z-50"
          >
            <GlassCard className="max-h-96 overflow-y-auto">
              {/* Trending Searches */}
              {!query && (
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-3 text-sm text-gray-400">
                    <TrendingUp className="w-4 h-4" />
                    <span className="font-medium">Trending Searches</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {trendingSearches.map((term, i) => (
                      <motion.button
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        onClick={() => selectTrending(term)}
                        className="px-3 py-1.5 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-indigo-500/50 rounded-full text-sm text-zinc-300 hover:text-white transition-all"
                      >
                        {term}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Recent Searches */}
              {!query && recentSearches.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3 text-sm text-gray-400">
                    <Briefcase className="w-4 h-4" />
                    <span className="font-medium">Recent Searches</span>
                  </div>
                  <div className="space-y-2">
                    {recentSearches.map((term, i) => (
                      <motion.button
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        onClick={() => selectTrending(term)}
                        className="w-full flex items-center gap-3 p-2 hover:bg-white/[0.04] rounded-lg text-left transition-colors group"
                      >
                        <Search className="w-4 h-4 text-zinc-500 group-hover:text-indigo-400 transition-colors" />
                        <span className="text-sm text-zinc-300 group-hover:text-white transition-colors">{term}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Search Results Preview */}
              {query && (
                <div>
                  <div className="text-sm text-gray-400 mb-3">
                    Searching for "<span className="text-white font-medium">{query}</span>"
                  </div>
                  <div className="space-y-2">
                    {[
                      { title: 'Wedding Photography - Mumbai', budget: '₹50,000', type: 'Photography' },
                      { title: 'Product Video Shoot', budget: '₹30,000', type: 'Videography' },
                      { title: 'Social Media Content Creator', budget: '₹25/hr', type: 'Content' },
                    ].map((result, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="p-3 hover:bg-white/5 rounded-lg cursor-pointer transition-colors group"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="text-sm font-medium text-white group-hover:text-indigo-400 transition-colors">
                              {result.title}
                            </h4>
                            <p className="text-xs text-gray-400 mt-1">{result.type}</p>
                          </div>
                          <div className="flex items-center gap-1 text-[#22c55e] text-sm font-medium">
                            <DollarSign className="w-3 h-3" />
                            {result.budget}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
