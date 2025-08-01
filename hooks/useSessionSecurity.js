'use client'

import { useEffect, useCallback } from 'react'
import { useAuth } from '../contexts/AuthContext'

// Hook personalizado para gerenciar segurança de sessão
export const useSessionSecurity = () => {
  const { user, signOut, checkSession } = useAuth()

  // Verificar atividade do usuário para logout automático por inatividade
  const handleUserActivity = useCallback(() => {
    if (user) {
      localStorage.setItem('lastActivity', Date.now().toString())
    }
  }, [user])

  // Verificar se a sessão expirou por inatividade
  const checkInactivity = useCallback(() => {
    if (!user) return

    const lastActivity = localStorage.getItem('lastActivity')
    if (lastActivity) {
      const timeSinceLastActivity = Date.now() - parseInt(lastActivity)
      const maxInactivity = 30 * 60 * 1000 // 30 minutos

      if (timeSinceLastActivity > maxInactivity) {
        console.log('[SECURITY] Session expired due to inactivity')
        signOut()
      }
    }
  }, [user, signOut])

  // Verificar integridade da sessão
  const verifySessionIntegrity = useCallback(async () => {
    if (!user) return

    try {
      const session = await checkSession(true)
      if (!session || !session.user) {
        console.log('[SECURITY] Session integrity check failed - logging out')
        signOut()
      }
    } catch (error) {
      console.error('[SECURITY] Session verification failed:', error)
      signOut()
    }
  }, [user, checkSession, signOut])

  useEffect(() => {
    if (!user) return

    // Adicionar listeners para atividade do usuário
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click']
    
    events.forEach(event => {
      document.addEventListener(event, handleUserActivity, true)
    })

    // Verificar inatividade a cada minuto
    const inactivityInterval = setInterval(checkInactivity, 60000)

    // Verificar integridade da sessão a cada 5 minutos
    const integrityInterval = setInterval(verifySessionIntegrity, 5 * 60 * 1000)

    // Verificar se a aba está sendo fechada para fazer logout
    const handleBeforeUnload = () => {
      if (user) {
        // Limpar dados sensíveis ao fechar a aba (opcional)
        localStorage.removeItem('lastActivity')
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    // Cleanup
    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleUserActivity, true)
      })
      clearInterval(inactivityInterval)
      clearInterval(integrityInterval)
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [user, handleUserActivity, checkInactivity, verifySessionIntegrity])

  return {
    user,
    isAuthenticated: !!user
  }
}

// Hook para validação de permissões (futuro uso com roles)
export const usePermissions = () => {
  const { user } = useAuth()

  const hasPermission = useCallback((permission) => {
    if (!user) return false
    
    // Por enquanto, todos os usuários autenticados têm todas as permissões
    // No futuro, isso pode ser expandido para verificar roles/permissions
    return true
  }, [user])

  const hasRole = useCallback((role) => {
    if (!user) return false
    
    // Implementação futura para roles
    return user.user_metadata?.role === role || false
  }, [user])

  return {
    hasPermission,
    hasRole,
    isAdmin: hasRole('admin'),
    isUser: hasRole('user') || hasRole('admin')
  }
}
