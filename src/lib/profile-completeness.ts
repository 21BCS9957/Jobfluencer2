import type { Database } from '@/lib/types/database'

type Profile = Database['public']['Tables']['profiles']['Row']
type ProviderProfile = Database['public']['Tables']['provider_profiles']['Row']

export interface ProfileCompleteness {
  percentage: number
  missing: string[]
  isComplete: boolean
}

export function getClientProfileCompleteness(profile: Profile | null): ProfileCompleteness {
  if (!profile) {
    return { percentage: 0, missing: ['All fields'], isComplete: false }
  }

  const requiredFields = [
    { key: 'full_name', label: 'Full Name', value: profile.full_name },
    { key: 'phone', label: 'Phone Number', value: profile.phone },
    { key: 'city', label: 'City', value: profile.city },
    { key: 'bio', label: 'Bio/Company Description', value: profile.bio },
    { key: 'avatar_url', label: 'Profile Photo', value: profile.avatar_url },
  ]

  const missing = requiredFields
    .filter(field => !field.value || field.value.trim() === '')
    .map(field => field.label)

  const percentage = Math.round(
    ((requiredFields.length - missing.length) / requiredFields.length) * 100
  )

  return {
    percentage,
    missing,
    isComplete: missing.length === 0,
  }
}

export function getProviderProfileCompleteness(
  profile: Profile | null,
  providerProfile: ProviderProfile | null
): ProfileCompleteness {
  if (!profile || !providerProfile) {
    return { percentage: 0, missing: ['All fields'], isComplete: false }
  }

  const requiredFields = [
    { key: 'full_name', label: 'Full Name', value: profile.full_name },
    { key: 'phone', label: 'Phone Number', value: profile.phone },
    { key: 'city', label: 'City', value: profile.city },
    { key: 'bio', label: 'Bio', value: profile.bio },
    { key: 'avatar_url', label: 'Profile Photo', value: profile.avatar_url },
    { 
      key: 'categories', 
      label: 'At least one category', 
      value: providerProfile.categories?.length > 0 ? 'yes' : null 
    },
    {
      key: 'social',
      label: 'Instagram or YouTube URL',
      value: providerProfile.instagram_url || providerProfile.youtube_url ? 'yes' : null,
    },
    {
      key: 'portfolio',
      label: 'At least one portfolio image',
      value: providerProfile.portfolio_image_urls?.length > 0 ? 'yes' : null,
    },
  ]

  const missing = requiredFields
    .filter(field => !field.value || (typeof field.value === 'string' && field.value.trim() === ''))
    .map(field => field.label)

  const percentage = Math.round(
    ((requiredFields.length - missing.length) / requiredFields.length) * 100
  )

  return {
    percentage,
    missing,
    isComplete: missing.length === 0,
  }
}
