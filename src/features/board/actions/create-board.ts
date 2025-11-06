'use server'

import { Board } from '@/shared/types/tables'
import { withAuth } from '@/shared/utils/auth'
import { revalidatePath } from 'next/cache'

interface CreateBoardParams {
  title: string
  background: string
  workspaceId: string
}

export async function createBoard({ title, background, workspaceId }: CreateBoardParams) {
  return withAuth<Board>(async (_, supabase) => {
    const { data, error } = await supabase
      .from('board')
      .insert({
        title,
        backgorund: background,
        workspace_id: workspaceId,
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating board:', error)
      throw new Error('Failed to create board')
    }

    revalidatePath(`/workspace/${workspaceId}`)

    return data
  })
}
