import { NextRequest, NextResponse } from 'next/server'
import { geminiModel } from '@/lib/gemini'

export async function POST(request: NextRequest) {
  try {
    const { role } = await request.json()

    if (!role) {
      return NextResponse.json(
        { error: 'Role is required' },
        { status: 400 }
      )
    }

    // Check if Gemini is available
    if (!geminiModel) {
      console.log('Gemini API key not configured, using fallback questions')
      return NextResponse.json({ questions: getFallbackQuestions() })
    }

    const prompt = `You are a campaign creation assistant for a freelance hiring platform.
Return ONLY a valid JSON array. No markdown, no backticks, no explanation.
Each object must have: id (string), question (string), type ("text"|"select"|"multiselect"),
and options (array of 4-6 strings, only for select/multiselect types).

Generate exactly 6 smart, targeted questions to help someone create a
detailed hiring campaign for a ${role}. Make all questions specific to this role.
Include: 2 text questions, 2 single-select questions with options, 2 multiselect
questions with options. Options must be practical and role-relevant.`

    const result = await geminiModel.generateContent(prompt)
    const response = result.response
    let text = response.text()

    // Strip markdown code fences if present
    text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()

    // Parse JSON
    const questions = JSON.parse(text)

    return NextResponse.json({ questions })
  } catch (error) {
    console.error('Error generating questions:', error)
    return NextResponse.json({ questions: getFallbackQuestions() })
  }
}

function getFallbackQuestions() {
  return [
    {
      id: '1',
      question: 'What is the main objective of this project?',
      type: 'text',
    },
    {
      id: '2',
      question: 'What is your preferred timeline?',
      type: 'select',
      options: ['Less than 1 week', '1-2 weeks', '2-4 weeks', 'More than 1 month'],
    },
    {
      id: '3',
      question: 'What deliverables do you expect?',
      type: 'text',
    },
    {
      id: '4',
      question: 'What experience level are you looking for?',
      type: 'select',
      options: ['Entry Level', 'Intermediate', 'Expert', 'Any'],
    },
    {
      id: '5',
      question: 'Which skills are most important? (Select all that apply)',
      type: 'multiselect',
      options: ['Technical Skills', 'Creativity', 'Communication', 'Time Management', 'Problem Solving'],
    },
    {
      id: '6',
      question: 'What tools or software should they be familiar with? (Select all that apply)',
      type: 'multiselect',
      options: ['Adobe Creative Suite', 'Figma', 'Final Cut Pro', 'Other'],
    },
  ]
}
