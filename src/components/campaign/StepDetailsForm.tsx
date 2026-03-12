'use client'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'

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

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-3xl mx-auto"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-3">Tell us about your project</h2>
        <p className="text-gray-600">
          Provide details about the {role} you want to hire
        </p>
      </div>

      <div className="space-y-6 mb-8">
        <Card className="p-6">
          <Label htmlFor="projectTitle" className="text-base font-semibold mb-2 block">
            1. Project Title *
          </Label>
          <Input
            id="projectTitle"
            value={answers.projectTitle}
            onChange={(e) => onAnswerChange('projectTitle', e.target.value)}
            placeholder="e.g., Product Photography for E-commerce Store"
            className="text-lg"
          />
          <p className="text-sm text-gray-500 mt-1">
            Give your project a clear, descriptive title
          </p>
        </Card>

        <Card className="p-6">
          <Label htmlFor="projectDescription" className="text-base font-semibold mb-2 block">
            2. Project Description *
          </Label>
          <Textarea
            id="projectDescription"
            value={answers.projectDescription}
            onChange={(e) => onAnswerChange('projectDescription', e.target.value)}
            placeholder="Describe what you need, your goals, target audience, brand message, and any specific requirements..."
            rows={6}
            className="resize-none"
          />
          <p className="text-sm text-gray-500 mt-1">
            {answers.projectDescription.length} characters (min 100 recommended for better AI results)
          </p>
        </Card>

        {isInfluencer && (
          <Card className="p-6">
            <Label className="text-base font-semibold mb-3 block">
              3. What type of influencer do you need? *
            </Label>
            <p className="text-sm text-gray-600 mb-3">
              Select the category that best matches your campaign
            </p>
            <div className="flex flex-wrap gap-2">
              {influencerTypes.map((type) => (
                <Badge
                  key={type}
                  variant={answers.influencerType === type ? 'default' : 'outline'}
                  className={`cursor-pointer transition-all ${
                    answers.influencerType === type
                      ? 'bg-orange-500 hover:bg-orange-600'
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => onAnswerChange('influencerType', type)}
                >
                  {type}
                </Badge>
              ))}
            </div>
          </Card>
        )}

        <Card className="p-6">
          <Label htmlFor="targetAudience" className="text-base font-semibold mb-2 block">
            {isInfluencer ? '4' : '3'}. Target Audience (Optional but recommended)
          </Label>
          <Input
            id="targetAudience"
            value={answers.targetAudience}
            onChange={(e) => onAnswerChange('targetAudience', e.target.value)}
            placeholder="e.g., Young professionals aged 25-35, Fashion enthusiasts..."
          />
          <p className="text-sm text-gray-500 mt-1">
            Who is your target audience? This helps AI create better descriptions
          </p>
        </Card>

        <Card className="p-6">
          <Label htmlFor="deliverables" className="text-base font-semibold mb-2 block">
            {isInfluencer ? '5' : '4'}. What deliverables do you expect? *
          </Label>
          <Textarea
            id="deliverables"
            value={answers.deliverables}
            onChange={(e) => onAnswerChange('deliverables', e.target.value)}
            placeholder="e.g., 3 Instagram posts, 2 reels, 1 story series, product review video..."
            rows={3}
            className="resize-none"
          />
        </Card>

        <Card className="p-6">
          <Label htmlFor="timeline" className="text-base font-semibold mb-2 block">
            {isInfluencer ? '6' : '5'}. What is your timeline? *
          </Label>
          <Input
            id="timeline"
            value={answers.timeline}
            onChange={(e) => onAnswerChange('timeline', e.target.value)}
            placeholder="e.g., 2 weeks, 1 month, ASAP..."
          />
        </Card>

        <Card className="p-6">
          <Label htmlFor="location" className="text-base font-semibold mb-2 block">
            {isInfluencer ? '7' : '6'}. Location (Optional)
          </Label>
          <Input
            id="location"
            value={answers.location}
            onChange={(e) => onAnswerChange('location', e.target.value)}
            placeholder="e.g., Mumbai, Remote, Bangalore..."
          />
          <p className="text-sm text-gray-500 mt-1">
            Leave blank if remote work is acceptable
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
