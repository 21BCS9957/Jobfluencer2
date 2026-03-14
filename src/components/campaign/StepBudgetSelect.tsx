'use client'

import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { GlassCard } from '../dashboard/GlassCard'
import { Sparkles, CheckCircle2 } from 'lucide-react'

interface StepBudgetSelectProps {
  selectedBudget: string
  onBudgetChange: (budget: string) => void
  onNext: () => void
  onBack: () => void
}

const budgetRanges = [
  { value: '0-5000', label: '₹0 - ₹5,000', description: 'Small projects, quick tasks' },
  { value: '5000-15000', label: '₹5,000 - ₹15,000', description: 'Medium projects' },
  { value: '15000-30000', label: '₹15,000 - ₹30,000', description: 'Standard projects' },
  { value: '30000-50000', label: '₹30,000 - ₹50,000', description: 'Large projects' },
  { value: '50000-100000', label: '₹50,000 - ₹1,00,000', description: 'Premium projects' },
  { value: '100000+', label: '₹1,00,000+', description: 'Enterprise projects' },
]

export function StepBudgetSelect({
  selectedBudget,
  onBudgetChange,
  onNext,
  onBack,
}: StepBudgetSelectProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="max-w-3xl mx-auto"
    >
      <GlassCard className="p-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-3 text-white">What's your budget?</h2>
          <p className="text-zinc-500 text-sm">
            Select a budget range for this project
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {budgetRanges.map((budget) => {
            const isActive = selectedBudget === budget.value
            return (
              <motion.div
                key={budget.value}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onBudgetChange(budget.value)}
                className={cn(
                  "relative p-5 rounded-2xl cursor-pointer transition-all duration-300 border backdrop-blur-md group",
                  isActive
                    ? "bg-indigo-500/10 border-indigo-500/50 shadow-[0_0_20px_rgba(99,102,241,0.15)]"
                    : "bg-white/[0.02] border-white/[0.08] hover:border-white/[0.2] hover:bg-white/[0.04]"
                )}
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-2">
                    <span className={cn(
                      "text-lg font-bold transition-colors",
                      isActive ? "text-indigo-400" : "text-white"
                    )}>
                      {budget.label}
                    </span>
                    {isActive && (
                      <CheckCircle2 className="w-5 h-5 text-indigo-400" />
                    )}
                  </div>
                  <p className="text-xs text-zinc-500 group-hover:text-zinc-400 transition-colors">
                    {budget.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

        <div className="p-4 bg-indigo-500/[0.05] border border-indigo-500/20 rounded-xl mb-10 flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
          <p className="text-sm text-zinc-400 italic">
            <strong>Pro Tip:</strong> Projects with clear, realistic budgets receive 3x more quality proposals from top-rated creatives.
          </p>
        </div>

        <div className="flex gap-4">
          <Button onClick={onBack} variant="ghost" className="flex-1 h-12 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-all">
            Back
          </Button>
          <Button
            onClick={onNext}
            disabled={!selectedBudget}
            className="flex-1 h-12 bg-white text-black hover:bg-zinc-200 rounded-xl font-bold transition-all disabled:opacity-50 disabled:grayscale"
          >
            Generate Campaign
          </Button>
        </div>
      </GlassCard>
    </motion.div>
  )
}
