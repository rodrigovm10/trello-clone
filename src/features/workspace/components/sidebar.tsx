import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

import {
  Plus,
  ChevronsUpDown,
  ChevronsDown,
  ChevronDown,
  LayoutGrid,
  Settings,
  Logs,
} from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { Workspace } from '@/shared/types/tables'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface SidebarProps {
  workspaces: Workspace[]
}

export function Sidebar({ workspaces }: SidebarProps) {
  return (
    <section
      aria-label='Sidebar'
      className='flex flex-col gap-2 h-full w-64'
    >
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
          <li
            key={workspace.id}
            className=''
          >
            <Collapsible>
              <CollapsibleTrigger
                className={`${buttonVariants({
                  variant: 'ghost',
                  size: 'sm',
                  className: 'w-full justify-start p-6',
                })}`}
              >
                <div className='flex items-center justify-between w-full'>
                  <div className='flex items-center gap-2'>
                    <span className='bg-secondary rounded-lg p-2 '>
                      {workspace.name.at(0)?.toUpperCase()}
                    </span>
                    {workspace.name}
                  </div>
                  <span>
                    <ChevronDown
                      size={16}
                      className='transition-transform duration-300'
                    />
                  </span>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className={cn(`[&>a]:justify-start [&>a]:pl-6`)}>
                <Link
                  href={`/workspace/${workspace.id}`}
                  className={buttonVariants({
                    variant: 'ghost',
                    size: 'sm',
                    className: 'w-full',
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
          </li>
        ))}
      </ul>
    </section>
  )
}
