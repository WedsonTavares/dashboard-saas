'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { createBrowserSupabase } from '../../utils/supabase/client'
import { PageLoading } from '../ui/Loading'

export default function AuthGuard({ children }) {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [initialCheck, setInitialCheck] = useState(true)
  const [shouldRedirect, setShouldRedirect] = useState(null)
  const router = useRouter()
  const pathname = usePathname()
  const supabase = createBrowserSupabase()

  // Rotas que não precisam de autenticação
  const publicRoutes = ['/login', '/register', '/forgot-password']
  const isPublicRoute = publicRoutes.includes(pathname)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Erro ao verificar sessão:', error)
          setIsAuthenticated(false)
        } else {
          setIsAuthenticated(!!session)
          
          // Se está logado e tentando acessar login, marcar para redirecionamento
          if (session && pathname === '/login') {
            setShouldRedirect('/dashboard')
            return
          }
        }
      } catch (error) {
        console.error('Erro na verificação de autenticação:', error)
        setIsAuthenticated(false)
      } finally {
        setIsLoading(false)
        setInitialCheck(false)
      }
    }

    if (initialCheck) {
      checkAuth()
    }

    // Escutar mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setIsAuthenticated(!!session)
        
        if (event === 'SIGNED_OUT') {
          setShouldRedirect('/login')
        } else if (event === 'SIGNED_IN' && isPublicRoute) {
          setShouldRedirect('/dashboard')
        }
        
        // Não mostrar loading após mudanças de estado
        setIsLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [supabase.auth, isPublicRoute, pathname, initialCheck])

  // Effect separado para redirecionamentos
  useEffect(() => {
    if (shouldRedirect) {
      router.replace(shouldRedirect)
      setShouldRedirect(null)
    }
  }, [shouldRedirect, router])

  // Effect para verificar autenticação após carregamento inicial
  useEffect(() => {
    if (!isLoading && !isAuthenticated && !isPublicRoute) {
      setShouldRedirect('/login')
    }
  }, [isLoading, isAuthenticated, isPublicRoute])

  // Mostrar loading apenas no primeiro check E apenas se não for rota pública
  if (isLoading && initialCheck && !isPublicRoute) {
    return <PageLoading text="Verificando autenticação..." logo />
  }

  // Se é rota pública, mostrar sempre (sem loading extra)
  if (isPublicRoute) {
    return children
  }

  // Se não está autenticado em rota privada, mostrar loading até redirecionamento
  if (!isAuthenticated) {
    return null // Não mostrar loading, redirecionamento será rápido
  }

  // Usuário autenticado em rota privada
  return children
}
