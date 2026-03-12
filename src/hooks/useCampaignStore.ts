import { useReducer } from 'react'
import type { CampaignState, CampaignAction } from '@/lib/campaign-types'

const initialState: CampaignState = {
  currentStep: 0,
  role: '',
  questions: [],
  answers: {},
  content: {
    title: '',
    description: '',
    tags: [],
  },
  budget: {
    hireType: 'one-time',
    budgetType: 'fixed',
    minBudget: '',
    maxBudget: '',
    currency: 'USD',
  },
}

function campaignReducer(state: CampaignState, action: CampaignAction): CampaignState {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, currentStep: action.payload }
    case 'SET_ROLE':
      return { ...state, role: action.payload }
    case 'SET_QUESTIONS':
      return { ...state, questions: action.payload }
    case 'SET_ANSWER':
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.payload.questionId]: action.payload.answer,
        },
      }
    case 'SET_CONTENT':
      return { ...state, content: action.payload }
    case 'SET_BUDGET':
      return { ...state, budget: action.payload }
    case 'RESET':
      return initialState
    default:
      return state
  }
}

export function useCampaignStore() {
  const [state, dispatch] = useReducer(campaignReducer, initialState)

  return {
    state,
    setStep: (step: number) => dispatch({ type: 'SET_STEP', payload: step }),
    setRole: (role: string) => dispatch({ type: 'SET_ROLE', payload: role }),
    setQuestions: (questions: any[]) => dispatch({ type: 'SET_QUESTIONS', payload: questions }),
    setAnswer: (questionId: string, answer: string | string[]) =>
      dispatch({ type: 'SET_ANSWER', payload: { questionId, answer } }),
    setContent: (content: any) => dispatch({ type: 'SET_CONTENT', payload: content }),
    setBudget: (budget: any) => dispatch({ type: 'SET_BUDGET', payload: budget }),
    reset: () => dispatch({ type: 'RESET' }),
  }
}
