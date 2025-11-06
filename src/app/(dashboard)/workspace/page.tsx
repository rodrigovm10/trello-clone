import { redirect } from 'next/navigation'
import { createDefaultWorkspace } from '@/features/workspace/actions/create-workspace'
import { getDefaultWorkspace } from '@/features/workspace/actions/get-workspace'

export default async function WorkspacePage() {
  const defaultWorkspace = await getDefaultWorkspace()

  if (!defaultWorkspace) {
    const workspace = await createDefaultWorkspace()

    redirect(`/workspace/${workspace?.id}`)
  }

  redirect(`/workspace/${defaultWorkspace.id}`)
}
