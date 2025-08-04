'use client'

import { usePathname } from 'next/navigation'
import { Header, Sidebar } from './layout'
import PageTransition from './layout/PageTransition'

export function ConditionalLayout({ children }) {
  const pathname = usePathname()
  
  // Rotas que não devem mostrar sidebar e header
  const authRoutes = ['/login', '/register', '/forgot-password']
  const isAuthRoute = authRoutes.includes(pathname)
  
  if (isAuthRoute) {
    // Layout para páginas de autenticação (tela cheia, centralizada)
    return (
      <div className="min-h-screen flex items-center justify-center">
        {children}
      </div>
    )
  }
  
  // Layout padrão do dashboard (com sidebar e header)
  return (
    <PageTransition>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-auto">
          <Header />
          <main className="flex-1 overflow-auto p-6">
            {children}
          </main>
        </div>
      </div>
    </PageTransition>
  )
}
