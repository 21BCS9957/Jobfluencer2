'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Loader2, Edit } from 'lucide-react'
import { motion } from 'framer-motion'
import type { CampaignState } from '@/lib/campaign-types'
import { CURRENCIES, HIRE_TYPES } from '@/lib/campaign-constants'

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
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-3xl mx-auto"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-3">Review & Publish</h2>
        <p className="text-gray-600">Review your campaign before publishing</p>
      </div>

      <Card className="p-6 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex gap-2">
            <Badge variant="secondary">{campaign.role}</Badge>
            <Badge variant="outline">{hireType?.label}</Badge>
          </div>
          <Button size="sm" variant="ghost" onClick={() => onEdit(0)}>
            <Edit className="w-4 h-4" />
          </Button>
        </div>

        <h3 className="text-2xl font-bold mb-3">{campaign.content.title}</h3>

        <p className="text-gray-700 mb-4 whitespace-pre-wrap">{campaign.content.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {campaign.content.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div>
            <p className="text-sm text-gray-600">Budget</p>
            <p className="text-lg font-semibold">{budgetDisplay}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Engagement</p>
            <p className="text-lg font-semibold">{hireType?.label}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Currency</p>
            <p className="text-lg font-semibold">{campaign.budget.currency}</p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <Button variant="outline" onClick={() => onEdit(2)}>
          <Edit className="w-4 h-4 mr-2" />
          Edit Content
        </Button>
        <Button variant="outline" onClick={() => onEdit(3)}>
          <Edit className="w-4 h-4 mr-2" />
          Edit Budget
        </Button>
      </div>

      <Card className="p-4 mb-6">
        <div className="flex items-start gap-3">
          <Checkbox
            id="terms"
            checked={agreed}
            onCheckedChange={(checked) => setAgreed(checked as boolean)}
          />
          <label htmlFor="terms" className="text-sm text-gray-700 cursor-pointer">
            I agree to Job Fluencer's terms and conditions and confirm that all information
            provided is accurate
          </label>
        </div>
      </Card>

      <div className="flex gap-4">
        <Button onClick={onBack} variant="outline" className="flex-1">
          Back
        </Button>
        <Button
          onClick={handlePublish}
          disabled={!agreed || isPublishing}
          className="flex-1 bg-orange-500 hover:bg-orange-600"
        >
          {isPublishing ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Publishing...
            </>
          ) : (
            <>🚀 Publish Campaign</>
          )}
        </Button>
      </div>
    </motion.div>
  )
}
