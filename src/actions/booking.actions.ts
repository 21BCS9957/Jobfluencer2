'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { BookingInput } from '@/lib/validations'
import type { Database } from '@/lib/types/database'

type BookingStatus = Database['public']['Tables']['bookings']['Row']['status']
type BookingInsert = Database['public']['Tables']['bookings']['Insert']
type BookingUpdate = Database['public']['Tables']['bookings']['Update']

export async function createBooking(data: BookingInput & { client_id: string }) {
  const supabase = await createClient()

  const depositAmount = data.total_amount * 0.3 // 30% deposit
  const remainingAmount = data.total_amount - depositAmount
  const platformFee = data.total_amount * 0.1 // 10% platform fee

  // Construct properly typed insert object
  const insertData: BookingInsert = {
    client_id: data.client_id,
    provider_id: data.provider_id,
    project_id: data.project_id,
    total_amount: data.total_amount,
    deposit_amount: depositAmount,
    remaining_amount: remainingAmount,
    platform_fee: platformFee,
    scheduled_date: data.scheduled_date,
    scheduled_time: data.scheduled_time,
    notes: data.notes,
  }

  const { data: booking, error } = await supabase
    .from('bookings')
    .insert(insertData)
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/client/bookings')
  return { data: booking }
}

export async function getBookings(filters?: {
  client_id?: string
  provider_id?: string
  status?: string
}) {
  const supabase = await createClient()

  let query = supabase
    .from('bookings')
    .select('*, client:profiles!client_id(*), provider:profiles!provider_id(*), project:projects(*)')

  if (filters?.client_id) {
    query = query.eq('client_id', filters.client_id)
  }
  if (filters?.provider_id) {
    query = query.eq('provider_id', filters.provider_id)
  }
  if (filters?.status) {
    query = query.eq('status', filters.status)
  }

  const { data, error } = await query.order('created_at', { ascending: false })

  if (error) {
    return { error: error.message }
  }

  return { data }
}

export async function updateBookingStatus(
  id: string,
  status: BookingStatus
) {
  const supabase = await createClient()

  // Construct properly typed update object
  const updateData: BookingUpdate = {
    status: status,
  }

  const { data, error } = await supabase
    .from('bookings')
    .update(updateData)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/client/bookings')
  revalidatePath('/provider/dashboard')
  return { data }
}
