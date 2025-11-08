import { LayoutGrid } from 'lucide-react'
import { Board } from '@/shared/types/tables'
import { CreateNewBoard } from './create-new-board'

interface BoardListProps {
  boards: Board[]
  workspaceId: string
}

export function BoardList({ boards, workspaceId }: BoardListProps) {
  return (
    <section className='space-y-4'>
      <h2 className='text-base sm:text-lg font-bold flex flex-row items-center gap-2'>
        <LayoutGrid className='w-4 h-4 sm:w-5 sm:h-5' />
        <span>Your boards</span>
      </h2>

      <ul className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 md:gap-8'>
        {boards.map(board => (
          <li
            key={board.id}
            className='flex flex-col gap-2 w-full h-32 min-w-0 rounded-lg cursor-pointer hover:brightness-80 transition-all duration-200'
            style={{ background: board.backgorund }}
          >
            <div className='mt-auto bg-black/80 w-full rounded-b-lg'>
              <h3 className='text-xs sm:text-sm md:text-base text-white px-2 py-1.5 truncate'>
                {board.title}
              </h3>
            </div>
          </li>
        ))}
        <li>
          <CreateNewBoard
            workspaceId={workspaceId}
            className='w-full min-w-0 h-32 rounded-lg col-span-full'
          />
        </li>
      </ul>
    </section>
  )
}
