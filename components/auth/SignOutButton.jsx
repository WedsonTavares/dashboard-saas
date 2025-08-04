'use client'
import { useRouter } from 'next/navigation'
import { createBrowserSupabase } from '../../utils/supabase/client'
import { LogOut } from 'lucide-react'
import { useState } from 'react'
import { useLoading } from '../providers/LoadingProvider'
import { ButtonLoading } from '../ui/Loading'

export default function SignOutButton() {
  const supabase = createBrowserSupabase()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { withDbLoading } = useLoading()

  const handleSignOut = async () => {
    setLoading(true)
    
    await withDbLoading(
      async () => {
        await supabase.auth.signOut()
        // Não fazer router.replace aqui, deixar o AuthGuard gerenciar
        // O AuthGuard detectará SIGNED_OUT e redirecionará
      },
      'Fazendo logout...'
    )
    
    setLoading(false)
  }

  return (
    <button 
      onClick={handleSignOut}
      disabled={loading}
      className="w-full px-4 py-2 text-left text-gray-300 hover:bg-[#404040] hover:text-white transition-colors flex items-center space-x-2 disabled:opacity-50"
    >
      {loading ? (
        <>
          <ButtonLoading size="sm" />
          <span>Saindo...</span>
        </>
      ) : (
        <>
          <LogOut className='w-4 h-4' />
          <span>Sair</span>
        </>
      )}
    </button>
  )
}
