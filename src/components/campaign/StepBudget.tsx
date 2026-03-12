'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { motion } from 'framer-motion'
import { HIRE_TYPES, BUDGET_TYPES, CURRENCIES } from '@/lib/campaign-constants'
import type { CampaignBudget } from '@/lib/campaign-types'
import { cn } from '@/lib/utils'

interface StepBudgetProps {
  budget: CampaignBudget
  onBudgetChange: (budget: CampaignBudget) => void
  onNext: () => void
  onBack: () => void
}

export function StepBudget({ budget, onBudgetChange, onNext, onBack }: StepBudgetProps) {
  const isValid =
    budget.hireType &&
    budget.budgetType &&
    budget.minBudget &&
    (budget.budgetType === 'range' ? budget.maxBudget : true)

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-4xl mx-auto"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-3">Budget & Engagement</h2>
        <p className="text-gray-600">Define how you want to work and your budget</p>
      </div>

      <div className="space-y-8 mb-8">
        {/* Hire Type */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Engagement Type</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {HIRE_TYPES.map((type) => (
              <Card
                key={type.value}
                className={cn(
                  'p-4 cursor-pointer transition-all hover:shadow-md',
                  budget.hireType === type.value
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200'
                )}
                onClick={() => onBudgetChange({ ...budget, hireType: type.value as any })}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{type.icon}</span>
                  <div>
                    <h4 className="font-semibold mb-1">{type.label}</h4>
                    <p className="text-sm text-gray-600">{type.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Budget Type */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Budget Type</h3>
          <div className="flex gap-3">
            {BUDGET_TYPES.map((type) => (
              <Button
                key={type.value}
                variant={budget.budgetType === type.value ? 'default' : 'outline'}
                className={cn(
                  'flex-1',
                  budget.budgetType === type.value && 'bg-orange-500 hover:bg-orange-600'
                )}
                onClick={() => onBudgetChange({ ...budget, budgetType: type.value as any })}
              >
                {type.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Budget Amount */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Budget Amount</h3>
          <div className="flex gap-4">
            <Select
              value={budget.currency}
              onValueChange={(value: any) => onBudgetChange({ ...budget, currency: value })}
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CURRENCIES.map((curr) => (
                  <SelectItem key={curr.code} value={curr.code}>
                    {curr.symbol} {curr.code}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {budget.budgetType === 'fixed' && (
              <Input
                type="number"
                min="1"
                value={budget.minBudget}
                onChange={(e) => onBudgetChange({ ...budget, minBudget: e.target.value })}
                placeholder="Budget"
                className="flex-1"
              />
            )}

            {budget.budgetType === 'range' && (
              <>
                <Input
                  type="number"
                  min="1"
                  value={budget.minBudget}
                  onChange={(e) => onBudgetChange({ ...budget, minBudget: e.target.value })}
                  placeholder="Min"
                  className="flex-1"
                />
                <Input
                  type="number"
                  min="1"
                  value={budget.maxBudget}
                  onChange={(e) => onBudgetChange({ ...budget, maxBudget: e.target.value })}
                  placeholder="Max"
                  className="flex-1"
                />
              </>
            )}

            {budget.budgetType === 'hourly' && (
              <Input
                type="number"
                min="1"
                value={budget.minBudget}
                onChange={(e) => onBudgetChange({ ...budget, minBudget: e.target.value })}
                placeholder="Rate per hour"
                className="flex-1"
              />
            )}
          </div>
        </div>

        <Card className="p-4 bg-blue-50 border-blue-200">
          <p className="text-sm text-blue-900">
            💡 Campaigns with defined budgets get 3x more quality proposals
          </p>
        </Card>
      </div>

      <div className="flex gap-4">
        <Button onClick={onBack} variant="outline" className="flex-1">
          Back
        </Button>
        <Button
          onClick={onNext}
          disabled={!isValid}
          className="flex-1 bg-orange-500 hover:bg-orange-600"
        >
          Continue
        </Button>
      </div>
    </motion.div>
  )
}
