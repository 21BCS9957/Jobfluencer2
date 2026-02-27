import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  // KYC verification - to be implemented
  return NextResponse.json({ message: 'KYC API - to be implemented' })
}
