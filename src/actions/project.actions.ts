'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { ProjectInput } from '@/lib/validations'

export async function createProject(data: ProjectInput & { client_id: string }) {
  const supabase = await createClient()

  const { data: project, error } = await supabase
    .from('projects')
    // @ts-ignore - Supabase type inference issue
    .insert([data])
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/client/my-projects')
  return { data: project }
}

export async function getProjects(filters?: {
  status?: string
  category?: string
  client_id?: string
}) {
  const supabase = await createClient()

  let query = supabase.from('projects').select('*, client:profiles(*)')

  if (filters?.status) {
    query = query.eq('status', filters.status)
  }
  if (filters?.category) {
    query = query.eq('category', filters.category)
  }
  if (filters?.client_id) {
    query = query.eq('client_id', filters.client_id)
  }

  const { data, error } = await query.order('created_at', { ascending: false })

  if (error) {
    return { error: error.message }
  }

  return { data }
}

export async function getProject(id: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('projects')
    .select('*, client:profiles(*)')
    .eq('id', id)
    .single()

  if (error) {
    return { error: error.message }
  }

  return { data }
}

export async function updateProject(id: string, updates: Partial<ProjectInput>) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('projects')
    // @ts-ignore - Supabase type inference issue
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/client/my-projects')
  return { data }
}
