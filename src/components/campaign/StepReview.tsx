'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Loader2, Edit } from 'lucide-react'
import { motion } from 'framer-motion'
import type { CampaignState } from '@/lib/campaign-types'
import { CURRENCIES, HIRE_TYPES } from '@/lib/campaign-constants'
import { GlassCard } from '../dashboard/GlassCard'
import { cn } from '@/lib/utils'

interface StepReviewProps {
  campaign: CampaignState
  onEdit: (step: number) => void
  onPublish: () => void
  onBack: () => void
  isPublishing?: boolean
}

export function StepReview({ campaign, onEdit, onPublish, onBack, isPublishing = false }: StepReviewProps) {
  const [agreed, setAgreed] = useState(false)

  const handlePublish = () => {
    onPublish()
  }

  const currency = CURRENCIES.find((c) => c.code === campaign.budget.currency)
  const hireType = HIRE_TYPES.find((h) => h.value === campaign.budget.hireType)

  const budgetDisplay =
    campaign.budget.budgetType === 'range'
      ? `${currency?.symbol}${campaign.budget.minBudget} - ${currency?.symbol}${campaign.budget.maxBudget}`
      : campaign.budget.budgetType === 'hourly'
      ? `${currency?.symbol}${campaign.budget.minBudget}/hr`
      : `${currency?.symbol}${campaign.budget.minBudget}`

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
          <h2 className="text-3xl font-bold mb-3 text-white">Review & Publish</h2>
          <p className="text-zinc-500 text-sm">Review your campaign details before going live</p>
        </div>

        <div className="space-y-6 mb-10">
          <div className="p-6 bg-white/[0.03] border border-white/[0.08] rounded-2xl relative group">
            <div className="flex items-start justify-between mb-6">
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/30 rounded-full text-[10px] font-bold text-indigo-400 uppercase tracking-wider">
                  {campaign.role}
                </span>
                <span className="px-3 py-1 bg-white/[0.05] border border-white/[0.1] rounded-full text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                  {hireType?.label}
                </span>
              </div>
              <button 
                onClick={() => onEdit(0)}
                className="p-2 hover:bg-white/5 rounded-lg text-zinc-500 hover:text-white transition-all group-hover:scale-110"
              >
                <Edit className="w-4 h-4" />
              </button>
            </div>

            <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{campaign.content.title}</h3>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6 whitespace-pre-wrap">{campaign.content.description}</p>

            <div className="flex flex-wrap gap-2 mb-8">
              {campaign.content.tags.map((tag) => (
                <span key={tag} className="px-2 py-1 bg-white/[0.02] border border-white/[0.05] rounded text-[10px] text-zinc-500">
                  #{tag}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/[0.05]">
              <div>
                <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest mb-1">Budget</p>
                <p className="text-sm font-bold text-white tracking-tight">{budgetDisplay}</p>
              </div>
              <div>
                <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest mb-1">Currency</p>
                <p className="text-sm font-bold text-white tracking-tight">{campaign.budget.currency}</p>
              </div>
              <div>
                <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest mb-1">Type</p>
                <p className="text-sm font-bold text-white tracking-tight">{hireType?.label}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button 
              variant="ghost" 
              onClick={() => onEdit(1)}
              className="flex-1 h-12 bg-white/[0.03] border border-white/[0.08] text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-all font-medium text-xs uppercase tracking-widest"
            >
              <Edit className="w-3 h-3 mr-2" />
              Edit Content
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => onEdit(2)}
              className="flex-1 h-12 bg-white/[0.03] border border-white/[0.08] text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-all font-medium text-xs uppercase tracking-widest"
            >
              <Edit className="w-3 h-3 mr-2" />
              Edit Budget
            </Button>
          </div>
        </div>

        <div className="p-5 bg-white/[0.02] border border-white/[0.05] rounded-xl mb-10 flex items-start gap-4 cursor-pointer group" onClick={() => setAgreed(!agreed)}>
          <Checkbox
            id="terms"
            checked={agreed}
            onCheckedChange={(checked) => setAgreed(checked as boolean)}
            className="mt-1 border-white/20 data-[state=checked]:bg-indigo-500 data-[state=checked]:border-indigo-500"
          />
          <label htmlFor="terms" className="text-xs text-zinc-500 leading-relaxed group-hover:text-zinc-400 transition-colors cursor-pointer">
            I agree to Job Fluencer's <span className="text-indigo-400 underline decoration-indigo-400/30 underline-offset-4">terms and conditions</span> and confirm that all project information provided is accurate and professional.
          </label>
        </div>

        <div className="flex gap-4">
          <Button onClick={onBack} variant="ghost" className="flex-1 h-14 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-all font-bold">
            Back
          </Button>
          <Button
            onClick={handlePublish}
            disabled={!agreed || isPublishing}
            className="flex-1 h-14 bg-white text-black hover:bg-zinc-200 rounded-xl font-bold transition-all disabled:opacity-50 disabled:grayscale relative overflow-hidden group"
          >
            {isPublishing ? (
              <div className="flex items-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin text-black" />
                <span>Publishing...</span>
              </div>
            ) : (
              <span className="flex items-center gap-2">
                🚀 <span className="tracking-tight">Publish Campaign</span>
              </span>
            )}
          </Button>
        </div>
      </GlassCard>
    </motion.div>
  )
}
