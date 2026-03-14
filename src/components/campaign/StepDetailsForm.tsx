'use client'

import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { GlassCard } from '../dashboard/GlassCard'
import { cn } from '@/lib/utils'

interface StepDetailsFormProps {
  role: string
  answers: {
    projectTitle: string
    projectDescription: string
    deliverables: string
    timeline: string
    location: string
    influencerType: string
    targetAudience: string
  }
  onAnswerChange: (field: string, value: string) => void
  onNext: () => void
  onBack: () => void
}

const influencerTypes = [
  'Fashion & Lifestyle',
  'Food & Beverage',
  'Tech & Gadgets',
  'Travel & Adventure',
  'Fitness & Health',
  'Beauty & Makeup',
  'Gaming & Entertainment',
  'Business & Finance',
  'Education & Learning',
  'Parenting & Family',
  'Home & Decor',
  'Photography & Art',
  'Music & Dance',
  'Sports & Athletics',
  'Any Category',
]

export function StepDetailsForm({
  role,
  answers,
  onAnswerChange,
  onNext,
  onBack,
}: StepDetailsFormProps) {
  const isInfluencer = role.toLowerCase().includes('influencer')
  
  const isValid =
    answers.projectTitle &&
    answers.projectDescription &&
    answers.deliverables &&
    answers.timeline &&
    (!isInfluencer || answers.influencerType)

  const InputWrapper = ({ label, children, description, optional }: any) => (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <label className="text-sm font-semibold text-zinc-300 tracking-wide uppercase flex items-center gap-2">
          {label}
          {!optional && <span className="text-indigo-500">*</span>}
        </label>
        {optional && <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Optional</span>}
      </div>
      {children}
      {description && <p className="text-[11px] text-zinc-500 px-1 leading-relaxed">{description}</p>}
    </div>
  )

  const inputClasses = "w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.06] transition-all"

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
          <h2 className="text-3xl font-bold mb-3 text-white">Project Details</h2>
          <p className="text-zinc-500 text-sm">
            Provide details about the <span className="text-indigo-400 font-medium">{role}</span> you want to hire
          </p>
        </div>

        <div className="space-y-10 mb-12">
          <InputWrapper label="Project Title" description="Give your project a clear, descriptive title">
            <input
              value={answers.projectTitle}
              onChange={(e) => onAnswerChange('projectTitle', e.target.value)}
              placeholder="e.g., Product Photography for E-commerce Store"
              className={inputClasses}
            />
          </InputWrapper>

          <InputWrapper label="Project Description" description={`${answers.projectDescription.length} characters (min 100 recommended)`}>
            <textarea
              value={answers.projectDescription}
              onChange={(e) => onAnswerChange('projectDescription', e.target.value)}
              placeholder="Describe what you need, your goals, target audience, brand message..."
              rows={5}
              className={cn(inputClasses, "resize-none")}
            />
          </InputWrapper>

          {isInfluencer && (
            <InputWrapper label="Influencer Category" description="Select the category that best matches your campaign">
              <div className="flex flex-wrap gap-2">
                {influencerTypes.map((type) => {
                  const isActive = answers.influencerType === type
                  return (
                    <button
                      key={type}
                      onClick={() => onAnswerChange('influencerType', type)}
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 border",
                        isActive
                          ? "bg-indigo-500/10 border-indigo-500/40 text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.1)]"
                          : "bg-white/[0.02] border-white/[0.08] text-zinc-500 hover:border-white/[0.2] hover:text-zinc-300"
                      )}
                    >
                      {type}
                    </button>
                  )
                })}
              </div>
            </InputWrapper>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <InputWrapper label="Deliverables" description="e.g., 3 Instagram posts, 2 reels">
              <textarea
                value={answers.deliverables}
                onChange={(e) => onAnswerChange('deliverables', e.target.value)}
                placeholder="What exactly do you expect?"
                rows={3}
                className={cn(inputClasses, "resize-none")}
              />
            </InputWrapper>

            <InputWrapper label="Timeline" description="e.g., 2 weeks, ASAP">
              <input
                value={answers.timeline}
                onChange={(e) => onAnswerChange('timeline', e.target.value)}
                placeholder="When should this be done?"
                className={inputClasses}
              />
            </InputWrapper>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <InputWrapper label="Target Audience" optional description="Who are we reaching?">
              <input
                value={answers.targetAudience}
                onChange={(e) => onAnswerChange('targetAudience', e.target.value)}
                placeholder="e.g., Young professionals"
                className={inputClasses}
              />
            </InputWrapper>

            <InputWrapper label="Location" optional description="Leave blank for remote">
              <input
                value={answers.location}
                onChange={(e) => onAnswerChange('location', e.target.value)}
                placeholder="e.g., Mumbai, Remote"
                className={inputClasses}
              />
            </InputWrapper>
          </div>
        </div>

        <div className="flex gap-4">
          <Button onClick={onBack} variant="ghost" className="flex-1 h-12 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-all">
            Back
          </Button>
          <Button
            onClick={onNext}
            disabled={!isValid}
            className="flex-1 h-12 bg-white text-black hover:bg-zinc-200 rounded-xl font-bold transition-all disabled:opacity-50 disabled:grayscale"
          >
            Continue
          </Button>
        </div>
      </GlassCard>
    </motion.div>
  )
}
