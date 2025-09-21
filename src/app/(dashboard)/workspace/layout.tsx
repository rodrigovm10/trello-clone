import { createClient } from '@/db/supabase/server'
import { getWorkspaces } from '@/features/workspace/actions/get-workspace'
import { Sidebar } from '@/features/workspace/components/sidebar'
import { redirect } from 'next/dist/server/api-utils'

export default async function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  const workspaces = await getWorkspaces()

  return (
    <section className='mx-auto flex max-w-7xl p-4'>
      <Sidebar workspaces={workspaces} />
      {children}
    </section>
  )
}
