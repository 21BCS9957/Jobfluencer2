'use client'

import { AnimatePresence } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { StepIndicator } from '@/components/campaign/StepIndicator'
import { StepRole } from '@/components/campaign/StepRole'
import { StepQuestions } from '@/components/campaign/StepQuestions'
import { StepDescription } from '@/components/campaign/StepDescription'
import { StepBudget } from '@/components/campaign/StepBudget'
import { StepReview } from '@/components/campaign/StepReview'
import { SuccessScreen } from '@/components/campaign/SuccessScreen'
import { useCampaignStore } from '@/hooks/useCampaignStore'
import { createProject } from '@/actions/project.actions'
import { getUser } from '@/actions/auth.actions'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function PostProjectPage() {
  const router = useRouter()
  const [userId, setUserId] = useState<string | null>(null)
  const [checkingAuth, setCheckingAuth] = useState(false)
  const {
    state,
    setStep,
    setRole,
    setQuestions,
    setAnswer,
    setContent,
    setBudget,
    reset,
  } = useCampaignStore()

  // Don't check auth on mount - let users create campaign first
  // Only check when they try to publish

  const handlePublish = async () => {
    setCheckingAuth(true)
    
    // Check if user is authenticated
    const user = await getUser()
    
    if (!user) {
      // Store campaign data in sessionStorage before redirecting
      sessionStorage.setItem('pendingCampaign', JSON.stringify(state))
      // Redirect to register with callback
      router.push('/auth/register?callback=/client/post-project&action=publish')
      return
    }

    // User is authenticated, proceed with publishing
    const projectData = {
      client_id: user.id,
      title: state.content.title,
      description: state.content.description,
      category: mapRoleToCategory(state.role),
      budget_min: parseFloat(state.budget.minBudget),
      budget_max: state.budget.budgetType === 'range' ? parseFloat(state.budget.maxBudget) : parseFloat(state.budget.minBudget),
      is_remote: true,
      status: 'open' as const,
      requirements: {
        hireType: state.budget.hireType,
        budgetType: state.budget.budgetType,
        currency: state.budget.currency,
        questions: state.questions,
        answers: state.answers,
      },
      skills_needed: state.content.tags,
    }

    await createProject(projectData)
    setCheckingAuth(false)
    setStep(5) // Move to success screen
  }

  // Check for pending campaign after auth (when user returns from login/register)
  useEffect(() => {
    const pendingCampaign = sessionStorage.getItem('pendingCampaign')
    if (pendingCampaign) {
      const campaignData = JSON.parse(pendingCampaign)
      // Restore campaign state
      setRole(campaignData.role)
      setQuestions(campaignData.questions)
      Object.entries(campaignData.answers).forEach(([questionId, answer]) => {
        setAnswer(questionId, answer as string | string[])
      })
      setContent(campaignData.content)
      setBudget(campaignData.budget)
      setStep(4) // Go back to review step
      
      // Clear pending campaign
      sessionStorage.removeItem('pendingCampaign')
      
      // Auto-publish after restoration
      setTimeout(() => {
        handlePublish()
      }, 500)
    }
  }, [])

  const mapRoleToCategory = (role: string): any => {
    const roleLower = role.toLowerCase()
    if (roleLower.includes('photo')) return 'photography'
    if (roleLower.includes('video') || roleLower.includes('videographer')) return 'videography'
    if (roleLower.includes('social')) return 'social_media'
    if (roleLower.includes('edit')) return 'editing'
    if (roleLower.includes('influencer')) return 'influencer'
    return 'content_creation'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-slate-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {state.currentStep < 5 && (
          <>
            {state.currentStep > 0 && (
              <Button
                variant="ghost"
                onClick={() => setStep(state.currentStep - 1)}
                className="mb-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            )}
            <StepIndicator currentStep={state.currentStep} totalSteps={5} />
          </>
        )}

        <AnimatePresence mode="wait">
          {state.currentStep === 0 && (
            <StepRole
              value={state.role}
              onChange={setRole}
              onNext={() => setStep(1)}
            />
          )}

          {state.currentStep === 1 && (
            <StepQuestions
              role={state.role}
              questions={state.questions}
              answers={state.answers}
              onQuestionsLoaded={setQuestions}
              onAnswerChange={setAnswer}
              onNext={() => setStep(2)}
              onBack={() => setStep(0)}
            />
          )}

          {state.currentStep === 2 && (
            <StepDescription
              role={state.role}
              questions={state.questions}
              answers={state.answers}
              content={state.content}
              onContentChange={setContent}
              onNext={() => setStep(3)}
              onBack={() => setStep(1)}
            />
          )}

          {state.currentStep === 3 && (
            <StepBudget
              budget={state.budget}
              onBudgetChange={setBudget}
              onNext={() => setStep(4)}
              onBack={() => setStep(2)}
            />
          )}

          {state.currentStep === 4 && (
            <StepReview
              campaign={state}
              onEdit={setStep}
              onPublish={handlePublish}
              onBack={() => setStep(3)}
              isPublishing={checkingAuth}
            />
          )}

          {state.currentStep === 5 && (
            <SuccessScreen campaign={state} onCreateAnother={reset} />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
