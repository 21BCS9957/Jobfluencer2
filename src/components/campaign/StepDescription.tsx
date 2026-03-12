'use client'

import { useEffect, useState } from 'react'
import { Loader2, Sparkles, X, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { motion } from 'framer-motion'
import type { CampaignContent, CampaignQuestion } from '@/lib/campaign-types'

interface StepDescriptionProps {
  role: string
  questions: CampaignQuestion[]
  answers: Record<string, string | string[]>
  content: CampaignContent
  onContentChange: (content: CampaignContent) => void
  onNext: () => void
  onBack: () => void
}

export function StepDescription({
  role,
  questions,
  answers,
  content,
  onContentChange,
  onNext,
  onBack,
}: StepDescriptionProps) {
  const [loading, setLoading] = useState(false)
  const [newTag, setNewTag] = useState('')

  useEffect(() => {
    if (!content.title && !content.description) {
      generateContent()
    }
  }, [])

  const generateContent = async () => {
    setLoading(true)

    try {
      const response = await fetch('/api/generate-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role, questions, answers }),
      })

      const data = await response.json()

      if (data.content) {
        onContentChange(data.content)
      }
    } catch (err) {
      console.error('Failed to generate content:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddTag = () => {
    if (newTag.trim() && !content.tags.includes(newTag.trim().toLowerCase())) {
      onContentChange({
        ...content,
        tags: [...content.tags, newTag.trim().toLowerCase()],
      })
      setNewTag('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    onContentChange({
      ...content,
      tags: content.tags.filter((tag) => tag !== tagToRemove),
    })
  }

  const isValid = content.title.length > 0 && content.description.length >= 50

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-12 h-12 text-orange-500 animate-spin mb-4" />
        <p className="text-lg text-gray-600 flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          Gemini is writing your campaign...
        </p>
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
        <h2 className="text-3xl font-bold mb-3">Your Campaign Content</h2>
        <p className="text-gray-600">
          Review and customize the AI-generated content
        </p>
      </div>

      <div className="space-y-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-gray-700">Campaign Title</label>
            <span className="text-xs text-gray-500">{content.title.length}/60</span>
          </div>
          <Input
            value={content.title}
            onChange={(e) =>
              onContentChange({ ...content, title: e.target.value.slice(0, 60) })
            }
            placeholder="Enter campaign title..."
            className="text-lg font-semibold"
          />
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-gray-700">Description</label>
            <div className="flex items-center gap-3">
              <span
                className={`text-xs ${
                  content.description.length < 50
                    ? 'text-red-500'
                    : content.description.length > 300
                    ? 'text-orange-500'
                    : 'text-gray-500'
                }`}
              >
                {content.description.length} chars (min 50, max 300)
              </span>
              <Button
                size="sm"
                variant="outline"
                onClick={generateContent}
                className="text-xs"
              >
                <Sparkles className="w-3 h-3 mr-1" />
                Regenerate
              </Button>
            </div>
          </div>
          <Textarea
            value={content.description}
            onChange={(e) =>
              onContentChange({ ...content, description: e.target.value.slice(0, 300) })
            }
            placeholder="Describe your project..."
            rows={6}
            className="resize-none"
          />
        </Card>

        <Card className="p-6">
          <label className="text-sm font-medium text-gray-700 mb-3 block">Tags</label>
          <div className="flex flex-wrap gap-2 mb-3">
            {content.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="pl-3 pr-1">
                {tag}
                <button
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
              placeholder="Add a tag..."
              className="flex-1"
            />
            <Button onClick={handleAddTag} size="icon" variant="outline">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
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
