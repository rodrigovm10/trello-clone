'use server'

import { createClient } from '@/db/supabase/server'

export async function createDefaultWorkspace() {
  const supabase = await createClient()

  const { data: user } = await supabase.auth.getUser()

  const { data, error } = await supabase
    .from('workspace')
    .insert({ name: 'Trello Workspace', user_id: user.user?.id, is_default: true })
    .select()
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function createWorkspace(name: string) {
  const supabase = await createClient()

  const { data, error } = await supabase.from('workspace').insert({ name }).select().single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}
