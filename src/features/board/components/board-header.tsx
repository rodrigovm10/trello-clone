import { Separator } from '@/components/ui/separator'
import { WorkspaceAvatar } from '@/features/workspace/components/workspace-avatar'

export function BoardHeader({ workspaceName }: { workspaceName: string }) {
  return (
    <header className='flex flex-col gap-2'>
      <div className='flex flex-row items-center gap-2 mb-4 sm:mb-6 md:mb-8 lg:mb-10'>
        <WorkspaceAvatar
          workspaceName={workspaceName}
          showName={false}
          size='xl'
          classText='text-xl sm:text-2xl font-bold'
        />
        <h1 className='text-xl sm:text-2xl font-bold truncate'>{workspaceName}</h1>
      </div>
      <Separator className='h-px sm:h-0.5 md:h-1 w-full' />
    </header>
  )
}
