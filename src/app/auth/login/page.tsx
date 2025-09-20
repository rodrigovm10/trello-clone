import { redirect } from 'next/navigation'
import { createClient } from '@/db/supabase/server'
import { LoginCard } from '@/features/auth/components/login-card'

export default async function LoginPage() {
  const supabase = createClient()

  const { data } = await (await supabase).auth.getUser()

  if (data.user) {
    redirect('/')
  }

  return <LoginCard />
}
