'use client'

import { useState } from 'react'
import { Search, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ROLE_SUGGESTIONS } from '@/lib/campaign-constants'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { GlassCard } from '../dashboard/GlassCard'

interface StepRoleProps {
  value: string
  onChange: (role: string) => void
  onNext: () => void
}

export function StepRole({ value, onChange, onNext }: StepRoleProps) {
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [filteredRoles, setFilteredRoles] = useState(ROLE_SUGGESTIONS)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value
    onChange(input)
    
    if (input) {
      const filtered = ROLE_SUGGESTIONS.filter((role) =>
        role.toLowerCase().includes(input.toLowerCase())
      )
      setFilteredRoles(filtered)
      setShowSuggestions(true)
    } else {
      setFilteredRoles(ROLE_SUGGESTIONS)
      setShowSuggestions(false)
    }
  }

  const handleRoleSelect = (role: string) => {
    onChange(role)
    setShowSuggestions(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="max-w-2xl mx-auto"
    >
      <GlassCard className="p-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-3 text-white tracking-tight">Who do you want to hire?</h2>
          <p className="text-zinc-500 text-sm">
            Tell us what type of creative professional you're looking for
          </p>
        </div>

        <div className="relative mb-10">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-indigo-400 transition-colors" />
            <input
              type="text"
              value={value}
              onChange={handleInputChange}
              onFocus={() => setShowSuggestions(true)}
              placeholder="e.g., Photographer, Video Editor..."
              className="w-full pl-12 pr-4 py-4 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.06] transition-all text-lg"
            />
          </div>

          <AnimatePresence>
            {showSuggestions && filteredRoles.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute z-50 w-full mt-2 bg-[#0a0a0a] border border-white/[0.08] rounded-xl shadow-2xl max-h-60 overflow-y-auto backdrop-blur-xl"
              >
                {filteredRoles.map((role) => (
                  <button
                    key={role}
                    onClick={() => handleRoleSelect(role)}
                    className="w-full px-5 py-4 text-left hover:bg-white/5 text-zinc-300 hover:text-white transition-all border-b border-white/[0.04] last:border-b-0 flex items-center justify-between group"
                  >
                    <span>{role}</span>
                    <Sparkles className="w-4 h-4 opacity-0 group-hover:opacity-100 text-indigo-400 transition-all" />
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mb-10">
          <p className="text-[10px] tracking-widest uppercase font-bold text-zinc-600 mb-4 px-1">Popular roles</p>
          <div className="flex flex-wrap gap-2">
            {ROLE_SUGGESTIONS.slice(0, 12).map((role) => {
              const isActive = value === role
              return (
                <button
                  key={role}
                  onClick={() => handleRoleSelect(role)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 border",
                    isActive
                      ? "bg-indigo-500/10 border-indigo-500/40 text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.15)]"
                      : "bg-white/[0.02] border-white/[0.08] text-zinc-500 hover:border-white/[0.2] hover:text-zinc-300"
                  )}
                >
                  {role}
                </button>
              )
            })}
          </div>
        </div>

        <Button
          onClick={onNext}
          disabled={!value}
          className="w-full h-14 text-lg bg-white text-black hover:bg-zinc-200 rounded-xl font-bold tracking-tight transition-all active:scale-[0.98] disabled:opacity-50 disabled:grayscale"
        >
          Continue
        </Button>
      </GlassCard>
    </motion.div>
  )
}
