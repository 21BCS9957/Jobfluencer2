import { GoogleGenerativeAI } from '@google/generative-ai'

// Check if API key exists, but don't throw error - let the API routes handle fallback
const apiKey = process.env.GEMINI_API_KEY

let geminiModel: any = null

if (apiKey) {
  const genAI = new GoogleGenerativeAI(apiKey)
  geminiModel = genAI.getGenerativeModel({ 
    model: 'gemini-1.5-flash' 
  })
}

export { geminiModel }
