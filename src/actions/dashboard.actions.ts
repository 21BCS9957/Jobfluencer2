'use server'

import { createClient } from '@/lib/supabase/server'

export async function getClientDashboardData() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: 'Not authenticated' }
  }

  // Get all projects for this client
  const { data: projects, error: projectsError } = await supabase
    .from('projects')
    .select('*')
    .eq('client_id', user.id)
    .order('created_at', { ascending: false })

  if (projectsError) {
    return { error: projectsError.message }
  }

  // Get all bookings for this client
  const { data: bookings, error: bookingsError } = await supabase
    .from('bookings')
    .select('*, provider:provider_id(full_name, avatar_url), project:project_id(title)')
    .eq('client_id', user.id)
    .order('created_at', { ascending: false })

  if (bookingsError) {
    return { error: bookingsError.message }
  }

  // Calculate stats
  const activeProjects = projects?.filter(p => p.status === 'open' || p.status === 'in_progress') || []
  const totalSpent = bookings?.reduce((sum, b) => sum + (parseFloat(b.total_amount?.toString() || '0')), 0) || 0
  const uniqueProviders = new Set(bookings?.map(b => b.provider_id) || []).size
  
  // Get active bookings with provider details
  const activeBookings = bookings?.filter(b => 
    b.status === 'confirmed' || b.status === 'in_progress'
  ) || []

  return {
    data: {
      projects: projects || [],
      bookings: bookings || [],
      activeProjects,
      activeBookings,
      stats: {
        totalSpent,
        activeProjectsCount: activeProjects.length,
        providersEngaged: uniqueProviders,
        totalProjects: projects?.length || 0,
      }
    }
  }
}
