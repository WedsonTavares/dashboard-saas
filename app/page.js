import { redirect } from 'next/navigation'
import { createServerSupabase } from '../utils/supabase/server'

export default async function Home() {
  const supabase = createServerSupabase()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/login')
  } else {
    redirect('/dashboard')
  }
}
