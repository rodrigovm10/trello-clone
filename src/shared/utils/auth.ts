import { SupabaseClient, User } from '@supabase/supabase-js'
import { createClient } from '@/db/supabase/server'
import { Database } from '../types/supabase'

export const withAuth = async <T>(
  handler: (user: User, supabase: SupabaseClient<Database>) => Promise<T>
): Promise<T> => {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('User not authenticated')
  }

  return handler(user, supabase)
}
