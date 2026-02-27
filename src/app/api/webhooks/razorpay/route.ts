import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  // Razorpay webhook handler - to be implemented
  return NextResponse.json({ received: true })
}
