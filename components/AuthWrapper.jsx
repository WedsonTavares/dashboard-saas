'use client'

import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { usePathname, useRouter } from 'next/navigation'

const AuthWrapper = ({ children }) => {
  const { user, loading } = useAuth()
  const pathname = usePathname()
  const router = useRouter()
  const [isInitialized, setIsInitialized] = useState(false)

  // Rotas públicas que não precisam de autenticação
  const publicRoutes = ['/auth']

  useEffect(() => {
    if (!loading) {
      setIsInitialized(true)
      
      const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route))
      
      // Log de auditoria
      console.log(`[AUTH] Route access attempt: ${pathname} - User: ${user?.email || 'anonymous'} - Public: ${isPublicRoute}`)
      
      // Se não estiver logado e não for uma rota pública, redirecionar para login
      if (!user && !isPublicRoute) {
        console.log(`[SECURITY] Redirecting unauthorized access from ${pathname} to /auth`)
        router.push('/auth')
        return
      }
      
      // Se estiver logado e tentar acessar a página de auth, redirecionar para home
      if (user && pathname === '/auth') {
        console.log(`[AUTH] Authenticated user ${user.email} redirected from auth to dashboard`)
        router.push('/')
        return
      }
    }
  }, [user, loading, pathname, router])

  // Loading screen melhorado
  if (loading || !isInitialized) {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-400">Verificando autenticação...</p>
          <div className="mt-2 text-xs text-gray-500">
            Carregando de forma segura
          </div>
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
