'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

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
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-3xl mx-auto"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-3">What's your budget?</h2>
        <p className="text-gray-600">
          Select a budget range for this project
        </p>
      </div>

      <Card className="p-8 mb-8">
        <Label className="text-lg font-semibold mb-4 block">
          Select Budget Range *
        </Label>
        
        <div className="space-y-3">
          {budgetRanges.map((budget) => (
            <Card
              key={budget.value}
              className={cn(
                'p-4 cursor-pointer transition-all hover:shadow-md',
                selectedBudget === budget.value
                  ? 'border-orange-500 bg-orange-50 border-2'
                  : 'border-gray-200 hover:border-orange-300'
              )}
              onClick={() => onBudgetChange(budget.value)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-lg">{budget.label}</p>
                  <p className="text-sm text-gray-600">{budget.description}</p>
                </div>
                {selectedBudget === budget.value && (
                  <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-900">
            💡 <strong>Tip:</strong> Projects with clear budgets receive 3x more quality proposals
          </p>
        </div>
      </Card>

      <div className="flex gap-4">
        <Button onClick={onBack} variant="outline" className="flex-1">
          Back
        </Button>
        <Button
          onClick={onNext}
          disabled={!selectedBudget}
          className="flex-1 bg-orange-500 hover:bg-orange-600"
        >
          Generate Campaign
        </Button>
      </div>
    </motion.div>
  )
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <label className={className}>{children}</label>
}
