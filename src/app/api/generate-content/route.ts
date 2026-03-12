import { NextRequest, NextResponse } from 'next/server'
import { geminiModel } from '@/lib/gemini'

export async function POST(request: NextRequest) {
  try {
    const { role, answers, budget } = await request.json()

    if (!role || !answers) {
      return NextResponse.json(
        { error: 'Role and answers are required' },
        { status: 400 }
      )
    }

    // Check if Gemini is available
    if (!geminiModel) {
      console.log('Gemini API key not configured, using fallback content')
      return NextResponse.json({ 
        content: getFallbackContent(role, answers) 
      })
    }

    // Format answers for the prompt
    const isInfluencer = role.toLowerCase().includes('influencer')
    const detailsText = `
Project Title: ${answers.projectTitle}
Client Requirements: ${answers.projectDescription}
${isInfluencer ? `Influencer Type/Category: ${answers.influencerType || 'Not specified'}` : ''}
Target Audience: ${answers.targetAudience || 'Not specified'}
Expected Deliverables: ${answers.deliverables}
Timeline: ${answers.timeline}
Location: ${answers.location || 'Remote'}
Budget Range: ${budget}
`

    const prompt = `You are a professional campaign copywriter for a freelance hiring platform in India.

Return ONLY valid JSON. No markdown, no backticks, no explanation text.
Output a JSON object with these exact keys:
- title: string (max 60 chars, clear and engaging)
- description: string (200-300 words, comprehensive and professional)
- category: string (one of: photography, videography, social_media, editing, influencer, content_creation)
- tags: array of 10-15 keyword strings (lowercase, specific and relevant)

Create campaign content for hiring a ${role}.

Project Details:
${detailsText}

DESCRIPTION REQUIREMENTS (200-300 words):
1. Start with a compelling overview of the project and what the client is looking for
2. Clearly state the client's requirements and goals from the project description
3. Mention the target audience and why this matters
4. Detail all expected deliverables
5. Include timeline and location information
6. ${isInfluencer ? 'Emphasize the influencer category/niche and campaign type' : 'Highlight the creative skills needed'}
7. End with a call-to-action for qualified professionals
8. Use professional, compelling language that attracts top talent
9. Make it specific to the project, not generic

CATEGORY: ${isInfluencer ? 'Auto-detect from influencer type and set to "influencer"' : 'Auto-detect from role (photography/videography/social_media/editing/content_creation)'}

TAGS: Generate 10-15 specific, searchable keywords including:
- Role-specific terms
- Industry/niche keywords
- Deliverable types
- Skills required
- Location (if specified)
- ${isInfluencer ? 'Influencer category terms' : 'Creative specialization terms'}`

    const result = await geminiModel.generateContent(prompt)
    const response = result.response
    let text = response.text()

    // Strip markdown code fences if present
    text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()

    // Parse JSON
    const content = JSON.parse(text)

    return NextResponse.json({ content })
  } catch (error) {
    console.error('Error generating content:', error)
    const body = await request.json().catch(() => ({}))
    return NextResponse.json({ 
      content: getFallbackContent(body.role || 'Creative Professional', body.answers || {}) 
    })
  }
}

function getFallbackContent(role: string, answers: any) {
  const title = answers.projectTitle || `Hiring: ${role}`
  const isInfluencer = role.toLowerCase().includes('influencer')
  
  // Create comprehensive description
  let description = `We are seeking a talented ${role} for an exciting project. `
  
  if (answers.projectDescription) {
    description += `${answers.projectDescription} `
  }
  
  if (answers.targetAudience) {
    description += `Our target audience includes ${answers.targetAudience}. `
  }
  
  if (answers.deliverables) {
    description += `Expected deliverables: ${answers.deliverables}. `
  }
  
  if (answers.timeline) {
    description += `Timeline: ${answers.timeline}. `
  }
  
  if (answers.location) {
    description += `Location: ${answers.location}. `
  } else {
    description += `This is a remote opportunity. `
  }
  
  description += `We're looking for a professional who can deliver high-quality work and meet our project requirements. If you have the skills and experience, we'd love to hear from you!`
  
  // Auto-detect category
  let category = 'content_creation'
  const roleLower = role.toLowerCase()
  if (roleLower.includes('photo')) category = 'photography'
  else if (roleLower.includes('video') && !roleLower.includes('edit')) category = 'videography'
  else if (roleLower.includes('social')) category = 'social_media'
  else if (roleLower.includes('edit')) category = 'editing'
  else if (roleLower.includes('influencer')) category = 'influencer'
  
  // Generate relevant tags
  const baseTags = [
    role.toLowerCase().replace(/\s+/g, '-'),
    'freelance',
    'creative',
    'professional',
    'hire',
    category,
  ]
  
  if (isInfluencer && answers.influencerType) {
    baseTags.push(answers.influencerType.toLowerCase().replace(/\s+/g, '-'))
  }
  
  if (answers.location) {
    baseTags.push(answers.location.toLowerCase().replace(/\s+/g, '-'))
  }
  
  return {
    title: title.slice(0, 60),
    description,
    category,
    tags: baseTags.slice(0, 12),
  }
}
