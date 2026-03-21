'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import type { ClientOnboardingInput, ProviderOnboardingInput } from '@/lib/validations'

export async function completeClientOnboarding(data: ClientOnboardingInput) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: 'Not authenticated' }
  }

  // Store company info in bio as JSON
  const bioData = {
    description: data.bio,
    company_name: data.company_name,
    industry: data.industry,
    website: data.website,
  }

  const { error } = await supabase
    .from('profiles')
    .update({
      full_name: data.full_name,
      phone: data.phone,
      city: data.city,
      bio: JSON.stringify(bioData),
      avatar_url: data.avatar_url,
    })
    .eq('id', user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/client/dashboard')
  redirect('/client/dashboard')
}

export async function completeProviderOnboarding(data: ProviderOnboardingInput) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: 'Not authenticated' }
  }

  // Update profiles table
  const { error: profileError } = await supabase
    .from('profiles')
    .update({
      full_name: data.full_name,
      phone: data.phone,
      city: data.city,
      bio: data.bio,
      avatar_url: data.avatar_url,
    })
    .eq('id', user.id)

  if (profileError) {
    return { error: profileError.message }
  }

  // Map years_experience string to number
  const experienceMap: Record<string, number> = {
    '0-1': 0,
    '1-3': 1,
    '3-5': 3,
    '5+': 5,
  }

  // Update provider_profiles table
  const { error: providerError } = await supabase
    .from('provider_profiles')
    .update({
      categories: data.categories,
      years_experience: experienceMap[data.years_experience] || 0,
      hourly_rate: data.hourly_rate,
      daily_rate: data.daily_rate,
      instagram_url: data.instagram_url,
      youtube_url: data.youtube_url,
      website_url: data.website_url,
      portfolio_image_urls: data.portfolio_image_urls || [],
    })
    .eq('id', user.id)

  if (providerError) {
    return { error: providerError.message }
  }

  revalidatePath('/provider/dashboard')
  redirect('/provider/dashboard')
}

export async function uploadFile(file: File, bucket: string, folder: string) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: 'Not authenticated' }
  }

  const fileExt = file.name.split('.').pop()
  const fileName = `${user.id}/${folder}/${Date.now()}.${fileExt}`

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
    })

  if (error) {
    return { error: error.message }
  }

  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(data.path)

  return { url: publicUrl }
}
