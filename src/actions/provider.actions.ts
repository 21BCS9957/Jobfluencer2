'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { ProviderProfileInput } from '@/lib/validations'

export async function updateProviderProfile(
  id: string,
  data: Partial<ProviderProfileInput>
) {
  const supabase = await createClient()

  const { data: profile, error } = await supabase
    .from('provider_profiles')
    // @ts-ignore - Supabase type inference issue
    .update(data)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/provider/profile')
  return { data: profile }
}

export async function getProviders(filters?: {
  category?: string
  city?: string
  minRating?: number
  isAvailable?: boolean
}) {
  const supabase = await createClient()

  let query = supabase
    .from('provider_profiles')
    .select('*, profile:profiles(*)')
    .eq('profile.is_active', true)

  if (filters?.category) {
    query = query.contains('categories', [filters.category])
  }
  if (filters?.city) {
    query = query.eq('profile.city', filters.city)
  }
  if (filters?.minRating) {
    query = query.gte('rating', filters.minRating)
  }
  if (filters?.isAvailable !== undefined) {
    query = query.eq('is_available', filters.isAvailable)
  }

  const { data, error } = await query.order('rating', { ascending: false })

  if (error) {
    return { error: error.message }
  }

  return { data }
}

export async function getProviderProfile(id: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('provider_profiles')
    .select('*, profile:profiles(*)')
    .eq('id', id)
    .single()

  if (error) {
    return { error: error.message }
  }

  return { data }
}

export async function updateKYCStatus(
  id: string,
  status: 'pending' | 'submitted' | 'approved' | 'rejected',
  rejectionReason?: string
) {
  const supabase = await createClient()

  const updates: any = { kyc_status: status }
  if (rejectionReason) {
    updates.kyc_rejection_reason = rejectionReason
  }

  const { data, error } = await supabase
    .from('provider_profiles')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/provider/kyc')
  return { data }
}
