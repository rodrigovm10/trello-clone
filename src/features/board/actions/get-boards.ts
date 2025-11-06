'use server'

import { Board } from '@/shared/types/tables'
import { withAuth } from '@/shared/utils/auth'

export const getBoardsByWorkspaceId = async (workspaceId: string) => {
  return withAuth<Board[]>(async (_, supabase) => {
    const { data, error } = await supabase.from('board').select('*').eq('workspace_id', workspaceId)

    if (error) {
      throw new Error(error.message)
    }

    return data
  })
}
