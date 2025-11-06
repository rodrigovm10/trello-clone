'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Workspace } from '@/shared/types/tables'
import { buttonVariants } from '@/components/ui/button'
import { ChevronDown, LayoutGrid, Settings, Logs } from 'lucide-react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { usePathname } from 'next/navigation'
import { WorkspaceAvatar } from './workspace-avatar'

export function WorkspaceItem({ workspace }: { workspace: Workspace }) {
  const pathname = usePathname()
  const isActive = pathname.includes(workspace.id)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <CollapsibleTrigger
        className={`${buttonVariants({
          variant: 'ghost',
          size: 'sm',
          className: `w-full justify-start p-6 ${isActive && !isOpen ? 'bg-secondary' : ''}`,
        })}`}
      >
        <div className='flex items-center justify-between w-full'>
          <WorkspaceAvatar workspaceName={workspace.name} />
          <span>
            <ChevronDown size={16} />
          </span>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className='[&>a]:justify-start [&>a]:pl-6'>
        <Link
          href={`/workspace/${workspace.id}`}
          className={buttonVariants({
            variant: 'ghost',
            size: 'sm',
            className: `w-full ${isActive ? 'bg-secondary' : ''}`,
          })}
        >
          <LayoutGrid size={16} />
          Boards
        </Link>
        <Link
          href={`/workspace/${workspace.id}`}
          className={buttonVariants({
            variant: 'ghost',
            size: 'sm',
            className: 'w-full',
          })}
        >
          <Logs size={16} />
          Activity
        </Link>
        <Link
          href={`/workspace/${workspace.id}`}
          className={buttonVariants({
            variant: 'ghost',
            size: 'sm',
            className: 'w-full',
          })}
        >
          <Settings size={16} />
          Settings
        </Link>
      </CollapsibleContent>
    </Collapsible>
  )
}
