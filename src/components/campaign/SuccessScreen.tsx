'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import type { CampaignState } from '@/lib/campaign-types'
import { CURRENCIES, HIRE_TYPES } from '@/lib/campaign-constants'
import { ArrowRight, PartyPopper, Share2 } from 'lucide-react'
import { GlassCard } from '../dashboard/GlassCard'
import { cn } from '@/lib/utils'

interface SuccessScreenProps {
  campaign: CampaignState
  onCreateAnother: () => void
}

export function SuccessScreen({ campaign, onCreateAnother }: SuccessScreenProps) {
  const [campaignId, setCampaignId] = useState('')

  useEffect(() => {
    const id = Math.random().toString(36).substring(2, 10).toUpperCase()
    setCampaignId(id)
  }, [])

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
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-2xl mx-auto"
    >
      <GlassCard className="p-10 text-center relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/10 blur-[100px] rounded-full" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-cyan-500/10 blur-[100px] rounded-full" />

        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.2 }}
          className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.3)]"
        >
          <PartyPopper className="w-12 h-12 text-white" />
        </motion.div>

        <h2 className="text-4xl font-bold mb-3 text-white tracking-tight">Campaign Live!</h2>
        <p className="text-zinc-500 mb-10">
          Your project has been successfully published to the marketplace
        </p>

        <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 mb-10 text-left group">
          <div className="flex items-center justify-between mb-6 pb-6 border-b border-white/[0.05]">
            <div>
              <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest mb-1">Campaign ID</p>
              <p className="text-sm font-mono font-bold text-indigo-400">#{campaignId}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest mb-1">Status</p>
              <div className="flex items-center gap-2 justify-end">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                <span className="text-xs font-bold text-emerald-500 uppercase tracking-wide">Live</span>
              </div>
            </div>
          </div>

          <h3 className="text-lg font-bold text-white mb-2 tracking-tight line-clamp-1">{campaign.content.title}</h3>
          <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500">
            <span className="flex items-center gap-1.5 px-2 py-1 bg-white/[0.05] rounded-md border border-white/[0.05]">
              {campaign.role}
            </span>
            <span className="text-white/20">•</span>
            <span>{budgetDisplay}</span>
            <span className="text-white/20">•</span>
            <span>{hireType?.label}</span>
          </div>
        </div>

        <div className="p-4 bg-indigo-500/5 border border-indigo-500/10 rounded-xl mb-10 flex items-center justify-between">
          <p className="text-xs text-zinc-400">
            Visible to <span className="text-white font-bold">{Math.floor(Math.random() * 500) + 200}+</span> verified creatives
          </p>
          <button className="text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1">
            <Share2 className="w-3 h-3" />
            Share
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            variant="ghost" 
            className="flex-1 h-14 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-all font-bold"
            onClick={() => window.location.href = '/client/my-projects'}
          >
            Manage Campaign
          </Button>
          <Button 
            className="flex-1 h-14 bg-white text-black hover:bg-zinc-100 rounded-xl font-bold transition-all flex items-center border-none"
            onClick={onCreateAnother}
          >
            Create Another
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </GlassCard>
    </motion.div>
  )
}
