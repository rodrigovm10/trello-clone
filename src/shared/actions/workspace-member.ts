'use server'

import { createClient } from '@/db/supabase/server'
import { RoleMember, WorkspaceMember } from '../types/tables'

interface CreateWorkspaceMemberParams {
  workspaceId: string
  userId: string
  role: RoleMember
}

export async function createWorkspaceMember({
  workspaceId,
  userId,
  role,
}: CreateWorkspaceMemberParams): Promise<WorkspaceMember | string> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('workspace_members')
    .insert({
      workspace_id: workspaceId,
      user_id: userId,
      role,
    })
    .select()
    .single()

  if (error) {
    console.error('Failed to create workspace member:', error.message)
    return 'Error adding workspace member'
  }

  return data
}
