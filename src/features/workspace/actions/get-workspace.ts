'use server'

import { createClient } from '@/db/supabase/server'

export async function getDefaultWorkspace() {
  const supabase = await createClient()

  const { data: user } = await supabase.auth.getUser()

  if (!user.user?.id) {
    throw new Error('User not found')
  }

  const { data, error } = await supabase
    .from('workspace')
    .select('*')
    .eq('user_id', user.user?.id)
    .eq('is_default', true)
    .single()

  if (error) {
    return null
  }

  return data
}

export async function getWorkspaces() {
  const supabase = await createClient()

  const { data, error } = await supabase.from('workspace').select('*')

  if (error) {
    throw new Error(error.message)
  }

  return data
}
