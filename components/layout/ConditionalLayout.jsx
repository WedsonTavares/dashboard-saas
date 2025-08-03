'use client'

import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { usePathname } from 'next/navigation'
import { Header, Sidebar } from './index'

const ConditionalLayout = ({ children }) => {
  const { user, loading, initialized } = useAuth()
  const pathname = usePathname()
  
  // Rotas públicas que não precisam do layout completo
  const publicRoutes = ['/auth']
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route))

  // Loading screen
  if (loading || !initialized) {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-400">Carregando...</p>
        </div>
      </div>
    )
  }

  // Para rotas públicas (como /auth), renderizar apenas o conteúdo
  if (isPublicRoute) {
    return <main className="min-h-screen">{children}</main>
  }

  // Para rotas protegidas, só renderizar o layout completo se usuário estiver logado
  if (!user && initialized) {
    // Se não há usuário e a inicialização terminou, mostrar loading enquanto o middleware redireciona
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-400">Redirecionando para login...</p>
        </div>
      </div>
    )
  }

  // Layout completo com sidebar e header para usuários autenticados
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto w-full">
          <Header />
          <main>{children}</main>
        </div>
      </div>
    </div>
  )
}

export default ConditionalLayout
