'use client'

import { cn } from '@/lib/utils'
import { Workspace } from '@/shared/types/tables'
import { CreateWorkspace } from './create-workspace'
import { WorkspaceList } from './workspace-sidebar-list'

interface SidebarProps {
  workspaces: Workspace[]
  isMobile?: boolean
  className?: string
}

export function Sidebar({ workspaces, isMobile = false, className }: SidebarProps) {
  return (
    <aside
      aria-label='Sidebar'
      className={cn('hidden md:flex flex-col gap-2 h-full w-full ', isMobile && 'flex', className)}
    >
      <div className='flex items-center justify-between gap-8'>
        <h2 className='text-lg font-bold'>Workspaces</h2>
        <CreateWorkspace />
      </div>
      <WorkspaceList workspaces={workspaces} />
    </aside>
  )
}
