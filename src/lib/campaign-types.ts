export interface CampaignQuestion {
  id: string
  question: string
  type: 'text' | 'select' | 'multiselect'
  options?: string[]
}

export interface CampaignContent {
  title: string
  description: string
  category?: string
  tags: string[]
}

export interface CampaignBudget {
  hireType: 'one-time' | 'part-time' | 'full-time' | 'retainer'
  budgetType: 'fixed' | 'range' | 'hourly'
  minBudget: string
  maxBudget: string
  currency: 'USD' | 'EUR' | 'GBP' | 'INR' | 'AED'
}

export interface CampaignState {
  currentStep: number
  role: string
  questions: CampaignQuestion[]
  answers: Record<string, string | string[]>
  content: CampaignContent
  budget: CampaignBudget
}

export type CampaignAction =
  | { type: 'SET_STEP'; payload: number }
  | { type: 'SET_ROLE'; payload: string }
  | { type: 'SET_QUESTIONS'; payload: CampaignQuestion[] }
  | { type: 'SET_ANSWER'; payload: { questionId: string; answer: string | string[] } }
  | { type: 'SET_CONTENT'; payload: CampaignContent }
  | { type: 'SET_BUDGET'; payload: CampaignBudget }
  | { type: 'RESET' }
