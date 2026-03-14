'use client'

import { Check } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface StepIndicatorProps {
  currentStep: number
  totalSteps: number
}

const steps = [
  { number: 0, label: 'Role' },
  { number: 1, label: 'Details' },
  { number: 2, label: 'Budget' },
  { number: 3, label: 'Review' },
]

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex items-center justify-between relative">
        {/* Background line */}
        <div className="absolute top-5 left-0 right-0 h-[1px] bg-white/[0.05] -z-10" />
        
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.number
          const isActive = currentStep === step.number

          return (
            <div key={step.number} className="flex flex-col items-center relative z-10">
              <motion.div
                initial={false}
                animate={{
                  backgroundColor: isCompleted || isActive ? 'rgb(99 102 241)' : 'rgb(24 24 27)',
                  scale: isActive ? 1.1 : 1,
                }}
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-500 border',
                  isCompleted || isActive
                    ? 'border-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.4)] text-white'
                    : 'border-white/[0.08] text-zinc-500 bg-zinc-900'
                )}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5 text-white" />
                ) : (
                  step.number + 1
                )}
              </motion.div>
              
              <span
                className={cn(
                  'text-[10px] sm:text-xs mt-3 tracking-widest uppercase font-semibold transition-colors duration-500',
                  isActive ? 'text-indigo-400' : isCompleted ? 'text-zinc-300' : 'text-zinc-600'
                )}
              >
                {step.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
