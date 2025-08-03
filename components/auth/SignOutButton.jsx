'use client'
import { useRouter } from 'next/navigation'
import { createBrowserSupabase } from '../../utils/supabase/client'
import { LogOut } from 'lucide-react'
import { useState } from 'react'

export default function SignOutButton() {
  const supabase = createBrowserSupabase()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleSignOut = async () => {
    setLoading(true)
    await supabase.auth.signOut()
    router.replace('/login')
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
          <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
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
