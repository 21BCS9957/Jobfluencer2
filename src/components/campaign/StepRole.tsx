'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ROLE_SUGGESTIONS } from '@/lib/campaign-constants'
import { motion } from 'framer-motion'

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
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-2xl mx-auto"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-3">Who do you want to hire?</h2>
        <p className="text-gray-600">
          Tell us what type of creative professional you're looking for
        </p>
      </div>

      <div className="relative mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            value={value}
            onChange={handleInputChange}
            onFocus={() => setShowSuggestions(true)}
            placeholder="e.g., Photographer, Video Editor, Social Media Manager..."
            className="pl-10 h-12 text-lg"
          />
        </div>

        {showSuggestions && filteredRoles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
          >
            {filteredRoles.map((role) => (
              <button
                key={role}
                onClick={() => handleRoleSelect(role)}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b last:border-b-0"
              >
                {role}
              </button>
            ))}
          </motion.div>
        )}
      </div>

      <div className="mb-8">
        <p className="text-sm text-gray-600 mb-3">Popular roles:</p>
        <div className="flex flex-wrap gap-2">
          {ROLE_SUGGESTIONS.slice(0, 12).map((role) => (
            <Badge
              key={role}
              variant={value === role ? 'default' : 'outline'}
              className={`cursor-pointer transition-all ${
                value === role
                  ? 'bg-orange-500 hover:bg-orange-600'
                  : 'hover:bg-gray-100'
              }`}
              onClick={() => handleRoleSelect(role)}
            >
              {role}
            </Badge>
          ))}
        </div>
      </div>

      <Button
        onClick={onNext}
        disabled={!value}
        className="w-full h-12 text-lg bg-orange-500 hover:bg-orange-600"
      >
        Continue
      </Button>
    </motion.div>
  )
}
