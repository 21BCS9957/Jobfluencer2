'use client'

import { useEffect, useState } from 'react'
import { Loader2, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { motion } from 'framer-motion'
import type { CampaignQuestion } from '@/lib/campaign-types'

interface StepQuestionsProps {
  role: string
  questions: CampaignQuestion[]
  answers: Record<string, string | string[]>
  onQuestionsLoaded: (questions: CampaignQuestion[]) => void
  onAnswerChange: (questionId: string, answer: string | string[]) => void
  onNext: () => void
  onBack: () => void
}

export function StepQuestions({
  role,
  questions,
  answers,
  onQuestionsLoaded,
  onAnswerChange,
  onNext,
  onBack,
}: StepQuestionsProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (questions.length === 0) {
      loadQuestions()
    }
  }, [])

  const loadQuestions = async () => {
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/generate-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role }),
      })

      const data = await response.json()

      if (data.questions) {
        onQuestionsLoaded(data.questions)
      } else {
        setError('Failed to generate questions')
      }
    } catch (err) {
      setError('Failed to load questions. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleMultiselectToggle = (questionId: string, option: string) => {
    const currentAnswers = (answers[questionId] as string[]) || []
    const newAnswers = currentAnswers.includes(option)
      ? currentAnswers.filter((a) => a !== option)
      : [...currentAnswers, option]
    onAnswerChange(questionId, newAnswers)
  }

  const answeredCount = Object.keys(answers).filter(
    (key) => answers[key] && (Array.isArray(answers[key]) ? answers[key].length > 0 : answers[key])
  ).length

  const allAnswered = answeredCount === questions.length

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-12 h-12 text-orange-500 animate-spin mb-4" />
        <p className="text-lg text-gray-600 flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          Gemini AI is crafting your questions...
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-600 mb-4">{error}</p>
        <Button onClick={loadQuestions}>Try Again</Button>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-3xl mx-auto"
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 px-3 py-1 rounded-full text-sm mb-3">
          <Sparkles className="w-4 h-4" />
          AI Generated
        </div>
        <h2 className="text-3xl font-bold mb-3">Tell us more about your project</h2>
        <p className="text-gray-600">
          Answer these questions to help us create the perfect campaign
        </p>
        <p className="text-sm text-gray-500 mt-2">
          {answeredCount} of {questions.length} answered
        </p>
      </div>

      <div className="space-y-6 mb-8">
        {questions.map((question, index) => (
          <motion.div
            key={question.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
          >
            <Card className="p-6">
              <label className="block mb-3">
                <span className="text-sm font-medium text-gray-700">
                  {index + 1}. {question.question}
                </span>
              </label>

              {question.type === 'text' && (
                <Textarea
                  value={(answers[question.id] as string) || ''}
                  onChange={(e) => onAnswerChange(question.id, e.target.value)}
                  placeholder="Type your answer here..."
                  rows={3}
                  className="w-full"
                />
              )}

              {question.type === 'select' && question.options && (
                <div className="flex flex-wrap gap-2">
                  {question.options.map((option) => (
                    <Badge
                      key={option}
                      variant={answers[question.id] === option ? 'default' : 'outline'}
                      className={`cursor-pointer transition-all ${
                        answers[question.id] === option
                          ? 'bg-orange-500 hover:bg-orange-600'
                          : 'hover:bg-gray-100'
                      }`}
                      onClick={() => onAnswerChange(question.id, option)}
                    >
                      {option}
                    </Badge>
                  ))}
                </div>
              )}

              {question.type === 'multiselect' && question.options && (
                <div>
                  <p className="text-xs text-gray-500 mb-2">Select all that apply</p>
                  <div className="flex flex-wrap gap-2">
                    {question.options.map((option) => {
                      const selected = (answers[question.id] as string[] || []).includes(option)
                      return (
                        <Badge
                          key={option}
                          variant={selected ? 'default' : 'outline'}
                          className={`cursor-pointer transition-all ${
                            selected
                              ? 'bg-orange-500 hover:bg-orange-600'
                              : 'hover:bg-gray-100'
                          }`}
                          onClick={() => handleMultiselectToggle(question.id, option)}
                        >
                          {option}
                        </Badge>
                      )
                    })}
                  </div>
                </div>
              )}
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="flex gap-4">
        <Button onClick={onBack} variant="outline" className="flex-1">
          Back
        </Button>
        <Button
          onClick={onNext}
          disabled={!allAnswered}
          className="flex-1 bg-orange-500 hover:bg-orange-600"
        >
          Continue
        </Button>
      </div>
    </motion.div>
  )
}
