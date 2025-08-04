'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useLoading } from '../providers/LoadingProvider'

export default function PageTransition({ children }) {
  const pathname = usePathname()
  const { showGlobalLoading, hideGlobalLoading } = useLoading()

  useEffect(() => {
    // Mostrar loading ao iniciar mudança de página
    showGlobalLoading('Carregando página...')
    
    // Esconder loading após um breve delay para dar tempo da página carregar
    const timer = setTimeout(() => {
      hideGlobalLoading()
    }, 500)

    return () => {
      clearTimeout(timer)
      hideGlobalLoading()
    }
  }, [pathname, showGlobalLoading, hideGlobalLoading])

  return children
}
