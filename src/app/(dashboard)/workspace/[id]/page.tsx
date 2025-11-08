import { Separator } from '@/components/ui/separator'
import { getBoardsByWorkspaceId } from '@/features/board/actions/get-boards'
import { CreateNewBoard } from '@/features/board/components/create-new-board'
import { getWorkspace } from '@/features/workspace/actions/get-workspace'
import { WorkspaceAvatar } from '@/features/workspace/components/workspace-avatar'
import { LayoutGrid } from 'lucide-react'

export default async function WorkspacePage({ params }: { params: { id: string } }) {
  const { id } = await params

  const workspace = await getWorkspace(id)

  const boards = await getBoardsByWorkspaceId(workspace?.id || '')

  return (
    <div className='px-4 sm:px-6 md:px-8 lg:px-10'>
      <header className='flex flex-col gap-2'>
        <div className='flex flex-row items-center gap-2 mb-4 sm:mb-6 md:mb-8 lg:mb-10'>
          <WorkspaceAvatar
            workspaceName={workspace?.name || ''}
            showName={false}
            size='xl'
            classText='text-xl sm:text-2xl font-bold'
          />
          <h1 className='text-xl sm:text-2xl font-bold truncate'>{workspace.name}</h1>
        </div>
        <Separator className='h-px sm:h-0.5 md:h-1 w-full' />
      </header>
      <section className='space-y-4 mt-6 sm:mt-8 ml-0 sm:ml-2 md:ml-4'>
        <h2 className='text-base sm:text-lg font-bold flex flex-row items-center gap-2'>
          <LayoutGrid className='w-4 h-4 sm:w-5 sm:h-5' />
          <span>Your boards</span>
        </h2>
        <section className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 md:gap-8'>
          {boards.map(board => (
            <div
              key={board.id}
              className='flex flex-col gap-2 w-full h-32 min-w-0 rounded-lg cursor-pointer hover:brightness-80 transition-all duration-200'
              style={{ background: board.backgorund }}
            >
              <div className='mt-auto bg-black/80 w-full rounded-b-lg'>
                <h3 className='text-xs sm:text-sm md:text-base text-white px-2 py-1.5 truncate'>
                  {board.title}
                </h3>
              </div>
            </div>
          ))}
          <CreateNewBoard
            workspaceId={id}
            className='w-full min-w-0 rounded-lg'
          />
        </section>
      </section>
    </div>
  )
}
