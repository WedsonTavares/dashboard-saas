'use client'

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [sessionTimeout, setSessionTimeout] = useState(null)
  
  // Cache de sessão para performance
  const [sessionCache, setSessionCache] = useState(null)
  const [lastSessionCheck, setLastSessionCheck] = useState(0)

  // Verificar sessão com cache
  const checkSession = useCallback(async (forceRefresh = false) => {
    const now = Date.now()
    const cacheExpiry = 30000 // 30 segundos

    if (!forceRefresh && sessionCache && (now - lastSessionCheck) < cacheExpiry) {
      return sessionCache
    }

    try {
      const { data: { session }, error } = await supabase.auth.getSession()
      
      if (error) {
        console.error('[AUTH] Session check error:', error.message)
        setSessionCache(null)
        setUser(null)
        return null
      }

      setSessionCache(session)
      setLastSessionCheck(now)
      
      if (session?.user) {
        setUser(session.user)
        
        // Configurar timeout de sessão
        if (session.expires_at) {
          const expiresAt = new Date(session.expires_at * 1000)
          const timeUntilExpiry = expiresAt.getTime() - now
          
          if (timeUntilExpiry > 0) {
            if (sessionTimeout) clearTimeout(sessionTimeout)
            
            const timeout = setTimeout(() => {
              console.log('[AUTH] Session expired, logging out')
              signOut()
            }, timeUntilExpiry)
            
            setSessionTimeout(timeout)
          }
        }
      } else {
        setUser(null)
      }

      return session
    } catch (error) {
      console.error('[AUTH] Session check failed:', error)
      setSessionCache(null)
      setUser(null)
      return null
    }
  }, [sessionCache, lastSessionCheck, sessionTimeout])

  const signUp = async (email, password) => {
    setLoading(true)
    try {
      // Validações de segurança
      if (!email || !password) {
        return { error: { message: 'Email e senha são obrigatórios' } }
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        return { error: { message: 'Formato de email inválido' } }
      }

      if (password.length < 6) {
        return { error: { message: 'Senha deve ter pelo menos 6 caracteres' } }
      }

      // Verificar força da senha
      const hasUpperCase = /[A-Z]/.test(password)
      const hasLowerCase = /[a-z]/.test(password)
      const hasNumbers = /\d/.test(password)
      
      if (!hasUpperCase || !hasLowerCase || !hasNumbers) {
        return { 
          error: { 
            message: 'Senha deve conter: 1 maiúscula, 1 minúscula e 1 número' 
          } 
        }
      }

      const { data, error } = await supabase.auth.signUp({
        email: email.toLowerCase().trim(),
        password,
        options: {
          emailRedirectTo: undefined, // Sem confirmação de email
          data: {
            email_confirm: false // Desabilitar confirmação de email
          }
        }
      })
      
      if (error) {
        console.error('[AUTH] Sign up error:', error.message)
        return { error }
      }

      console.log(`[AUTH] New user registered: ${email}`)
      return { data, error: null }
    } catch (error) {
      console.error('[AUTH] Sign up failed:', error)
      return { error: { message: 'Erro interno. Tente novamente.' } }
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email, password) => {
    setLoading(true)
    try {
      // Validações de segurança
      if (!email || !password) {
        return { error: { message: 'Email e senha são obrigatórios' } }
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        return { error: { message: 'Formato de email inválido' } }
      }

      if (password.length < 6) {
        return { error: { message: 'Senha deve ter pelo menos 6 caracteres' } }
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase().trim(),
        password
      })
      
      if (error) {
        console.error('[AUTH] Sign in error:', error.message)
        console.warn(`[SECURITY] Failed login attempt for email: ${email}`)
        return { error }
      }

      if (data?.user) {
        setUser(data.user)
        setSessionCache(data.session)
        setLastSessionCheck(Date.now())
        console.log(`[AUTH] Successful login for user: ${data.user.email}`)
      }

      return { data, error: null }
    } catch (error) {
      console.error('[AUTH] Sign in failed:', error)
      return { error: { message: 'Erro interno. Tente novamente.' } }
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    setLoading(true)
    try {
      // Limpar timeout de sessão
      if (sessionTimeout) {
        clearTimeout(sessionTimeout)
        setSessionTimeout(null)
      }

      // Limpar cache
      setSessionCache(null)
      setLastSessionCheck(0)

      const { error } = await supabase.auth.signOut()
      
      if (error) {
        console.error('[AUTH] Sign out error:', error.message)
      }

      setUser(null)
      console.log('[AUTH] User signed out successfully')
      
      // Limpar dados sensíveis
      if (typeof window !== 'undefined') {
        localStorage.clear()
        sessionStorage.clear()
      }

      return { error: null }
    } catch (error) {
      console.error('[AUTH] Sign out failed:', error)
      return { error }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let mounted = true

    // Verificar sessão inicial
    checkSession(true).finally(() => {
      if (mounted) {
        setLoading(false)
      }
    })

    // Listener para mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return

        console.log(`[AUTH] Auth state changed: ${event}`)

        if (event === 'SIGNED_IN' && session?.user) {
          setUser(session.user)
          setSessionCache(session)
          setLastSessionCheck(Date.now())
        } else if (event === 'SIGNED_OUT') {
          setUser(null)
          setSessionCache(null)
          setLastSessionCheck(0)
        } else if (event === 'TOKEN_REFRESHED' && session) {
          setSessionCache(session)
          setLastSessionCheck(Date.now())
        }
      }
    )

    return () => {
      mounted = false
      subscription?.unsubscribe()
      if (sessionTimeout) {
        clearTimeout(sessionTimeout)
      }
    }
  }, [checkSession, sessionTimeout])

  // Verificação periódica (a cada 5 minutos)
  useEffect(() => {
    const interval = setInterval(() => {
      if (user) {
        checkSession(true)
      }
    }, 5 * 60 * 1000)

    return () => clearInterval(interval)
  }, [user, checkSession])

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signOut,
    checkSession
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
