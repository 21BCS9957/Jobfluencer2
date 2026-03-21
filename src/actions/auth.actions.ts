'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import type { LoginInput, RegisterInput } from '@/lib/validations'

export async function login(data: LoginInput) {
  const supabase = await createClient()

  const { data: authData, error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  })

  if (error) {
    return { error: error.message }
  }

  // Get user profile to determine redirect
  if (authData.user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authData.user.id)
      .single()

    revalidatePath('/', 'layout')
    
    if (profile?.role === 'client') {
      // Check if client profile is complete
      const isComplete = profile.phone && profile.city && profile.bio
      if (!isComplete) {
        redirect('/client/onboarding')
      }
      redirect('/client/dashboard')
    } else if (profile?.role === 'provider') {
      // Check if provider profile is complete
      const { data: providerProfile } = await supabase
        .from('provider_profiles')
        .select('*')
        .eq('id', authData.user.id)
        .single()
      
      const isComplete = 
        profile.phone && 
        profile.city && 
        profile.bio && 
        providerProfile?.categories && 
        providerProfile.categories.length > 0
      
      if (!isComplete) {
        redirect('/provider/onboarding')
      }
      redirect('/provider/dashboard')
    } else {
      redirect('/')
    }
  }

  return { error: 'Login failed' }
}

export async function register(data: RegisterInput) {
  const supabase = await createClient()

  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        full_name: data.full_name,
        role: data.role,
      },
    },
  })

  if (error) {
    return { error: error.message }
  }

  return { success: true, message: 'Check your email to verify your account' }
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/auth/login')
}

export async function getUser() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}

export async function getProfile(userId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) {
    return { error: error.message }
  }

  return { data }
}

export async function resetPassword(email: string) {
  const supabase = await createClient()
  
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password`,
  })

  if (error) {
    return { error: error.message }
  }

  return { success: true }
}
