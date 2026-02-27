'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { ReviewInput } from '@/lib/validations'

export async function createReview(data: ReviewInput & { reviewer_id: string; provider_id: string }) {
  const supabase = await createClient()

  const { data: review, error } = await supabase
    .from('reviews')
    .insert(data as any)
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/client/bookings')
  revalidatePath(`/profile/${data.provider_id}`)
  return { data: review }
}

export async function getReviews(providerId: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('reviews')
    .select('*, reviewer:profiles!reviewer_id(*)')
    .eq('provider_id', providerId)
    .order('created_at', { ascending: false })

  if (error) {
    return { error: error.message }
  }

  return { data }
}
