'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'
import type { CampaignState } from '@/lib/campaign-types'
import { CURRENCIES, HIRE_TYPES } from '@/lib/campaign-constants'

interface SuccessScreenProps {
  campaign: CampaignState
  onCreateAnother: () => void
}

export function SuccessScreen({ campaign, onCreateAnother }: SuccessScreenProps) {
  const [campaignId, setCampaignId] = useState('')

  useEffect(() => {
    // Generate random campaign ID
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
      className="max-w-2xl mx-auto text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        className="mb-6"
      >
        <CheckCircle2 className="w-24 h-24 text-green-500 mx-auto" />
      </motion.div>

      <h2 className="text-4xl font-bold mb-3">Campaign Live!</h2>
      <p className="text-xl text-gray-600 mb-8">
        Your project has been published successfully
      </p>

      <Card className="p-6 mb-8 text-left">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-600">Campaign ID</p>
            <p className="text-lg font-mono font-semibold">{campaignId}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Status</p>
            <p className="text-lg font-semibold text-green-600">Active</p>
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="font-semibold mb-2">{campaign.content.title}</h3>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>Role: {campaign.role}</span>
            <span>•</span>
            <span>Budget: {budgetDisplay}</span>
            <span>•</span>
            <span>{hireType?.label}</span>
          </div>
        </div>
      </Card>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
        <p className="text-sm text-blue-900">
          🎉 Your campaign is now visible to {Math.floor(Math.random() * 500) + 200}+ verified
          creatives. You'll start receiving proposals soon!
        </p>
      </div>

      <div className="flex gap-4">
        <Button variant="outline" className="flex-1" onClick={() => window.location.href = '/client/my-projects'}>
          View Campaign
        </Button>
        <Button className="flex-1 bg-orange-500 hover:bg-orange-600" onClick={onCreateAnother}>
          Create Another
        </Button>
      </div>
    </motion.div>
  )
}
