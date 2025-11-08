import { LayoutGrid } from 'lucide-react'
import { BoardList } from '@/features/board/components/board-list'
import { BoardHeader } from '@/features/board/components/board-header'
import { getWorkspace } from '@/features/workspace/actions/get-workspace'
import { getBoardsByWorkspaceId } from '@/features/board/actions/get-boards'

export default async function WorkspacePage({ params }: { params: { id: string } }) {
  const { id } = await params

  const workspace = await getWorkspace(id)

  const boards = await getBoardsByWorkspaceId(workspace?.id || '')

  return (
    <div className='px-4 sm:px-6 md:px-8 lg:px-10 space-y-4'>
      <BoardHeader workspaceName={workspace?.name || ''} />
      <BoardList
        boards={boards}
        workspaceId={id}
      />
    </div>
  )
}
