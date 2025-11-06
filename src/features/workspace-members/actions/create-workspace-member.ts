'use server'

import { createClient } from '@/db/supabase/server'

export async function createWorkspaceMember(workspaceId: string, userId: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('workspace_members')
    .insert({
      workspace_id: workspaceId,
      user_id: userId,
    })
    .select()
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}
