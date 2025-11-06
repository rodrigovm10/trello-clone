'use server'

import { createClient } from '@/db/supabase/server'
import { createWorkspaceMember } from '@/shared/actions/workspace-member'
import { revalidatePath } from 'next/cache'

export async function createDefaultWorkspace() {
  const supabase = await createClient()

  const { data: user } = await supabase.auth.getUser()

  const userId = user.user?.id

  if (!userId) throw new Error('No authenticated user found')

  const { data: workspace, error } = await supabase
    .from('workspace')
    .insert({ name: 'Trello Workspace', user_id: userId, is_default: true })
    .select()
    .single()

  if (error) {
    console.error('Failed to create workspace:', error.message)
    return null
  }

  const member = await createWorkspaceMember({
    workspaceId: workspace?.id || '',
    userId,
    role: 'admin',
  })

  console.log('member', member)

  if (typeof member === 'string') {
    console.error('Failed to create workspace member:', member)
  }

  return workspace
}

export async function createWorkspace(name: string) {
  const supabase = await createClient()

  const { data: user } = await supabase.auth.getUser()

  const { data, error } = await supabase
    .from('workspace')
    .insert({ name, user_id: user.user?.id })
    .select()
    .single()

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/workspace')

  return data
}
