'use client'

import { useAuth } from '../../contexts/AuthContext'
import OverviewPage from "../overview/page"

export default function DashboardPage() {
  const { user, loading, initialized } = useAuth()

  // Aguardar inicialização
  if (!initialized || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#121212]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-300">Carregando dashboard...</p>
        </div>
      </div>
    )
  }

  // Se não há usuário, o middleware vai redirecionar
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

  // Se não há usuário, não mostrar nada
  if (!user) {
    return null
  }

  // Usuário autenticado, mostrar dashboard
  return <OverviewPage />
}
