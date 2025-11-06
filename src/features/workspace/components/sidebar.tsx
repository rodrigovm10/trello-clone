'use client'

import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import { WorkspaceItem } from './workspace-item'
import { Workspace } from '@/shared/types/tables'
import { CreateWorkspace } from './create-workspace'

interface SidebarProps {
  workspaces: Workspace[]
  isMobile?: boolean
  className?: string
}

export function Sidebar({ workspaces, isMobile = false, className }: SidebarProps) {
  return (
    <section
      aria-label='Sidebar'
      className={cn(
        'hidden md:flex flex-col gap-2 h-full w-64 mr-4',
        isMobile && 'flex',
        className
      )}
    >
      <div className='flex items-center justify-between gap-8'>
        <h2 className='text-lg font-bold'>Workspaces</h2>
        <CreateWorkspace />
      </div>
      <ul className='flex flex-col gap-2 '>
        {workspaces.map(workspace => (
          <li
            key={workspace.id}
            className=''
          >
            <WorkspaceItem workspace={workspace} />
          </li>
        ))}
      </ul>
    </section>
  )
}
