import { Sidebar } from '@/features/workspace/components/sidebar'
import { getWorkspaces } from '@/features/workspace/actions/get-workspace'

export default async function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  const workspaces = await getWorkspaces()

  return (
    <section className='mx-auto grid grid-cols-1 md:grid-cols-12 gap-4 p-4'>
      <div className='md:col-span-3 lg:col-span-2'>
        <Sidebar workspaces={workspaces} />
      </div>
      <div className=' md:col-span-9 lg:col-span-10'>{children}</div>
    </section>
  )
}
