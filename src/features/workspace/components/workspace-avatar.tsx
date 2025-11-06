import { cn } from '@/lib/utils'

export function WorkspaceAvatar({
  workspaceName,
  showName = true,
  className = '',
  size = 'md',
  classText = '',
}: {
  workspaceName: string
  showName?: boolean
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  classText?: string
}) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span
        className={cn(
          'bg-secondary rounded-lg p-2 flex items-center justify-center',
          size === 'sm' && 'w-6 h-6',
          size === 'md' && 'w-8 h-8',
          size === 'lg' && 'w-10 h-10',
          size === 'xl' && 'w-12 h-12',
          classText
        )}
      >
        {workspaceName.at(0)?.toUpperCase()}
      </span>
      {showName && workspaceName}
    </div>
  )
}
