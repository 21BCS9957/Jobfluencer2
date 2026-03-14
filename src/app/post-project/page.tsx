'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Loader2, Sparkles, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { StepIndicator } from '@/components/campaign/StepIndicator'
import { StepRole } from '@/components/campaign/StepRole'
import { StepDetailsForm } from '@/components/campaign/StepDetailsForm'
import { StepBudgetSelect } from '@/components/campaign/StepBudgetSelect'
import { StepReview } from '@/components/campaign/StepReview'
import { SuccessScreen } from '@/components/campaign/SuccessScreen'
import { createProject } from '@/actions/project.actions'
import { getUser } from '@/actions/auth.actions'

export default function PostProjectPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [role, setRole] = useState('')
  const [answers, setAnswers] = useState({
    projectTitle: '',
    projectDescription: '',
    deliverables: '',
    timeline: '',
    location: '',
    influencerType: '',
    targetAudience: '',
  })
  const [selectedBudget, setSelectedBudget] = useState('')
  const [generatedContent, setGeneratedContent] = useState({
    title: '',
    description: '',
    category: '',
    tags: [] as string[],
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)

  // Check for pending campaign after auth
  useEffect(() => {
    const pendingCampaign = sessionStorage.getItem('pendingCampaign')
    if (pendingCampaign) {
      const data = JSON.parse(pendingCampaign)
      setRole(data.role)
      setAnswers(data.answers)
      setSelectedBudget(data.selectedBudget)
      setGeneratedContent(data.generatedContent)
      setCurrentStep(3) // Go to review step
      sessionStorage.removeItem('pendingCampaign')
      
      // Auto-publish after restoration
      setTimeout(() => {
        handlePublish()
      }, 500)
    }
  }, [])

  const handleAnswerChange = (field: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [field]: value }))
  }

  const handleGenerateContent = async () => {
    setIsGenerating(true)
    
    try {
      const response = await fetch('/api/generate-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role,
          answers,
          budget: selectedBudget,
        }),
      })

      const data = await response.json()
      
      if (data.content) {
        setGeneratedContent(data.content)
      }
    } catch (error) {
      console.error('Failed to generate content:', error)
      // Use fallback content
      const roleLower = role.toLowerCase()
      let category = 'content_creation'
      if (roleLower.includes('photo')) category = 'photography'
      else if (roleLower.includes('video') && !roleLower.includes('edit')) category = 'videography'
      else if (roleLower.includes('social')) category = 'social_media'
      else if (roleLower.includes('edit')) category = 'editing'
      else if (roleLower.includes('influencer')) category = 'influencer'
      
      setGeneratedContent({
        title: answers.projectTitle || `Hiring: ${role}`,
        description: answers.projectDescription,
        category,
        tags: [role.toLowerCase().replace(/\s+/g, '-'), 'freelance', 'project', category],
      })
    } finally {
      setIsGenerating(false)
      setCurrentStep(3) // Move to review
    }
  }

  const handlePublish = async () => {
    setIsPublishing(true)
    
    // Check if user is authenticated
    const user = await getUser()
    
    if (!user) {
      // Store campaign data before redirecting
      sessionStorage.setItem('pendingCampaign', JSON.stringify({
        role,
        answers,
        selectedBudget,
        generatedContent,
      }))
      router.push('/auth/register?callback=/post-project')
      return
    }

    // Parse budget range
    const [minBudget, maxBudget] = selectedBudget.includes('+')
      ? [parseFloat(selectedBudget.replace('+', '')), parseFloat(selectedBudget.replace('+', '')) * 2]
      : selectedBudget.split('-').map((b) => parseFloat(b))

    // Create project
    const projectData = {
      client_id: user.id,
      title: generatedContent.title,
      description: generatedContent.description,
      category: mapRoleToCategory(role),
      budget_min: minBudget,
      budget_max: maxBudget || minBudget,
      location: answers.location || undefined,
      is_remote: !answers.location,
      status: 'open' as const,
      requirements: {
        projectTitle: answers.projectTitle,
        projectDescription: answers.projectDescription,
        deliverables: answers.deliverables,
        timeline: answers.timeline,
        budget: selectedBudget,
      },
      skills_needed: generatedContent.tags,
    }

    await createProject(projectData)
    setIsPublishing(false)
    setCurrentStep(4) // Success screen
  }

  const mapRoleToCategory = (role: string): any => {
    // Use AI-generated category if available
    if (generatedContent.category) {
      return generatedContent.category
    }
    
    // Fallback to role-based mapping
    const roleLower = role.toLowerCase()
    if (roleLower.includes('photo')) return 'photography'
    if (roleLower.includes('video') && !roleLower.includes('edit')) return 'videography'
    if (roleLower.includes('social')) return 'social_media'
    if (roleLower.includes('edit')) return 'editing'
    if (roleLower.includes('influencer')) return 'influencer'
    return 'content_creation'
  }

  const campaignState = {
    currentStep,
    role,
    questions: [],
    answers: {},
    content: generatedContent,
    budget: {
      hireType: 'one-time' as const,
      budgetType: 'range' as const,
      minBudget: selectedBudget.split('-')[0] || selectedBudget.replace('+', ''),
      maxBudget: selectedBudget.split('-')[1] || '',
      currency: 'INR' as const,
    },
  }

  if (isGenerating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-slate-50 flex flex-col">
        <div className="absolute top-6 left-6">
          <Link href="/" className="flex items-center gap-2 text-gray-900 hover:opacity-80 transition-opacity">
            <Zap className="w-6 h-6" />
            <span className="text-xl font-bold">Job Fluencer</span>
          </Link>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-16 h-16 text-orange-500 animate-spin mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2 justify-center">
              <Sparkles className="w-6 h-6" />
              AI is creating your campaign...
            </h2>
            <p className="text-gray-600">
              Generating title, description, and tags based on your inputs
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black py-12 px-4 selection:bg-indigo-500/30">
      <div className="max-w-4xl mx-auto">
        {currentStep < 4 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <Link href="/" className="flex items-center gap-2 shrink-0 text-white hover:opacity-90 transition-opacity">
                  <Zap className="w-6 h-6" />
                  <span className="text-xl font-bold">Job Fluencer</span>
                </Link>
                {currentStep > 0 && (
                  <Button
                    variant="ghost"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="text-zinc-400 hover:text-white hover:bg-white/5"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                )}
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-white/[0.03] border border-white/[0.08] rounded-full backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span className="text-xs font-medium text-zinc-400">AI Assisted Campaign</span>
              </div>
            </div>
            <StepIndicator currentStep={currentStep} totalSteps={4} />
          </div>
        )}

        {currentStep === 4 && (
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center gap-2 text-white hover:opacity-90 transition-opacity">
              <Zap className="w-6 h-6" />
              <span className="text-xl font-bold">Job Fluencer</span>
            </Link>
          </div>
        )}

        <AnimatePresence mode="wait">
          {currentStep === 0 && (
            <StepRole
              value={role}
              onChange={setRole}
              onNext={() => setCurrentStep(1)}
            />
          )}

          {currentStep === 1 && (
            <StepDetailsForm
              role={role}
              answers={answers}
              onAnswerChange={handleAnswerChange}
              onNext={() => setCurrentStep(2)}
              onBack={() => setCurrentStep(0)}
            />
          )}

          {currentStep === 2 && (
            <StepBudgetSelect
              selectedBudget={selectedBudget}
              onBudgetChange={setSelectedBudget}
              onNext={handleGenerateContent}
              onBack={() => setCurrentStep(1)}
            />
          )}

          {currentStep === 3 && (
            <StepReview
              campaign={campaignState}
              onEdit={setCurrentStep}
              onPublish={handlePublish}
              onBack={() => setCurrentStep(2)}
              isPublishing={isPublishing}
            />
          )}

          {currentStep === 4 && (
            <SuccessScreen
              campaign={campaignState}
              onCreateAnother={() => {
                setCurrentStep(0)
                setRole('')
                setAnswers({
                  projectTitle: '',
                  projectDescription: '',
                  deliverables: '',
                  timeline: '',
                  location: '',
                  influencerType: '',
                  targetAudience: '',
                })
                setSelectedBudget('')
                setGeneratedContent({ title: '', description: '', category: '', tags: [] })
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
