'use client'

import { useAuth } from '../contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import OverviewPage from "./overview/page"

export default function Home() {
  const { user, loading, initialized } = useAuth()
  const router = useRouter()

  // Aguardar inicialização do auth antes de qualquer ação
  useEffect(() => {
    if (!initialized) return // Aguardar inicialização

    if (!user && !loading) {
      // Usuário não logado, o middleware já vai redirecionar
      console.log('[HOME] User not authenticated, middleware will handle redirect')
      return
    }

    if (user && !loading) {
      // Usuário logado, mostrar dashboard
      console.log('[HOME] User authenticated, showing dashboard')
    }
  }, [user, loading, initialized, router])

  // Mostrar loading enquanto inicializa
  if (!initialized || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#121212]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-300">Carregando...</p>
        </div>
      </div>
    )
  }

  // Se não há usuário, middleware vai redirecionar
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#121212]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-300">Redirecionando...</p>
        </div>
      </div>
    )
  }

  // Usuário autenticado, mostrar dashboard
  return <OverviewPage />
}
