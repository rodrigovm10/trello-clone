import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Workspace } from '@/shared/types/tables'
import { WorkspaceItem } from './workspace-item'

interface WorkspaceListProps {
  workspaces: Workspace[]
}

export function WorkspaceList({ workspaces }: WorkspaceListProps) {
  return (
    <>
      <div className='flex items-center justify-between gap-8'>
        <h2 className='text-lg font-bold'>Workspaces</h2>
        <Button
          variant='ghost'
          size='icon'
          className='rounded-full'
        >
          <Plus size={16} />
        </Button>
      </div>
      <ul className='flex flex-col gap-2 '>
        {workspaces.map(workspace => (
          <li key={workspace.id}>
            <WorkspaceItem workspace={workspace} />
          </li>
        ))}
      </ul>
    </>
  )
}
