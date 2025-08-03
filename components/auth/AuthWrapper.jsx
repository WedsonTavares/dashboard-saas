'use client'

import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { usePathname } from 'next/navigation'

const AuthWrapper = ({ children }) => {
  const { user, loading } = useAuth()
  const pathname = usePathname()

  // Rotas públicas que não precisam de autenticação
  const publicRoutes = ['/auth']
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route))

  // Loading screen para verificação inicial
  if (loading) {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-400">Verificando autenticação...</p>
        </div>
      </div>
    )
  }

  // Para rotas públicas, sempre renderizar o conteúdo
  if (isPublicRoute) {
    return <>{children}</>
  }

  // Para rotas protegidas, só renderizar se usuário estiver logado
  // O middleware já cuida do redirecionamento
  if (!user) {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-400">Redirecionando...</p>
        </div>
      </div>
    )
  }

  // Usuário autenticado, renderizar conteúdo completo
  return <>{children}</>
}
        </div>
      </div>
    )
  }

  // Se não estiver logado e estiver tentando acessar uma rota protegida
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route))
  if (!user && !isPublicRoute) {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-red-400">Acesso não autorizado</p>
          <p className="text-gray-500 text-sm mt-1">Redirecionando para login...</p>
        </div>
      </div>
    )
  }

  // Renderizar apenas se estiver na rota de auth ou logado
  if (isPublicRoute || user) {
    return children
  }

  return null
}

export default AuthWrapper
