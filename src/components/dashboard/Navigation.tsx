'use client'

import { useState, useEffect } from 'react'
import { Bell, ChevronDown, Zap, Search as SearchIcon } from 'lucide-react'
import Link from 'next/link'
import { SearchBar } from './SearchBar'
import { motion, AnimatePresence } from 'framer-motion'

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-[var(--brand-dark)]/80 backdrop-blur-xl shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Zap className="w-6 h-6 text-[var(--brand-primary)]" />
            <span className="text-xl font-bold text-white">
              Job Fluencer
            </span>
          </Link>

          {/* Search Bar - Hidden on mobile, shown on tablet+ */}
          <div className="hidden lg:block flex-1 max-w-md">
            <SearchBar variant="compact" />
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Find Work</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">My Projects</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Earnings</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Messages</a>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Mobile Search Button */}
            <button 
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              className="lg:hidden p-2 text-gray-300 hover:text-white transition-colors"
            >
              <SearchIcon className="w-6 h-6" />
            </button>

            {/* Notification Bell */}
            <button className="relative p-2 text-gray-300 hover:text-white transition-colors">
              <Bell className="w-6 h-6" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 p-1 rounded-lg hover:bg-white/5 transition-colors"
              >
                <img 
                  src="https://api.dicebear.com/7.x/lorelei/svg?seed=Kanika" 
                  alt="Profile" 
                  className="w-8 h-8 rounded-full ring-2 ring-[var(--brand-primary)]"
                />
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[var(--brand-dark)] rounded-lg shadow-xl border border-white/10 overflow-hidden">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5 transition-colors">Profile</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5 transition-colors">Settings</a>
                  <a href="#" className="block px-4 py-2 text-sm text-red-400 hover:bg-white/5 transition-colors">Logout</a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search Dropdown */}
        <AnimatePresence>
          {mobileSearchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden pb-4"
            >
              <SearchBar variant="compact" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}
