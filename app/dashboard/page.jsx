import { redirect } from 'next/navigation'
import { createServerSupabase } from '../../utils/supabase/server'
import OverviewPage from "../overview/page"

export default async function DashboardPage() {
  const supabase = createServerSupabase()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) redirect('/login')

  return <OverviewPage />
}
