'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'
import type { Database } from '@/lib/types/database'

type Profile = Database['public']['Tables']['profiles']['Row']
type ProviderProfile = Database['public']['Tables']['provider_profiles']['Row']

export interface AuthState {
  user: User | null
  profile: Profile | null
  providerProfile: ProviderProfile | null
  loading: boolean
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    profile: null,
    providerProfile: null,
    loading: true,
  })

  const supabase = createClient()

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchProfile(session.user)
      } else {
        setState({ user: null, profile: null, providerProfile: null, loading: false })
      }
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        fetchProfile(session.user)
      } else {
        setState({ user: null, profile: null, providerProfile: null, loading: false })
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const fetchProfile = async (user: User) => {
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      let providerProfile = null
      if (profile?.role === 'provider') {
        const { data } = await supabase
          .from('provider_profiles')
          .select('*')
          .eq('id', user.id)
          .single()
        providerProfile = data
      }

      setState({ user, profile, providerProfile, loading: false })
    } catch (error) {
      console.error('Error fetching profile:', error)
      setState({ user, profile: null, providerProfile: null, loading: false })
    }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setState({ user: null, profile: null, providerProfile: null, loading: false })
  }

  return {
    ...state,
    signOut,
  }
}
