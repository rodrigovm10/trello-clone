import { Workspace } from '@/shared/types/tables'
import { WorkspaceItem } from './workspace-item'

interface WorkspaceListProps {
  workspaces: Workspace[]
}

export function WorkspaceList({ workspaces }: WorkspaceListProps) {
  return (
    <>
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
