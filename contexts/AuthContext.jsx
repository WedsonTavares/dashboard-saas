'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
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
  const [initialized, setInitialized] = useState(false)

  // Verificar sessão inicial APENAS UMA VEZ
  useEffect(() => {
    let mounted = true

    const initializeAuth = async () => {
      if (initialized) return
      
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (mounted) {
          if (error) {
            console.error('[AUTH] Session error:', error.message)
            setUser(null)
          } else if (session?.user) {
            setUser(session.user)
            console.log(`[AUTH] User session restored: ${session.user.email}`)
          } else {
            setUser(null)
          }
          
          setLoading(false)
          setInitialized(true)
        }
      } catch (error) {
        console.error('[AUTH] Init error:', error)
        if (mounted) {
          setUser(null)
          setLoading(false)
          setInitialized(true)
        }
      }
    }

    initializeAuth()

    return () => {
      mounted = false
    }
  }, [initialized])

  // Listener para mudanças de autenticação
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log(`[AUTH] Auth state changed: ${event}`)

        if (event === 'SIGNED_IN' && session?.user) {
          setUser(session.user)
          setLoading(false)
        } else if (event === 'SIGNED_OUT') {
          setUser(null)
          setLoading(false)
        } else if (event === 'TOKEN_REFRESHED' && session) {
          setUser(session.user)
        }
        // Removido INITIAL_SESSION para evitar conflitos
      }
    )

    return () => subscription?.unsubscribe()
  }, [])

  const signUp = async (email, password) => {
    setLoading(true)
    try {
      // Validações básicas
      if (!email || !password) {
        return { error: { message: 'Email e senha são obrigatórios', type: 'VALIDATION_ERROR' } }
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        return { error: { message: 'Formato de email inválido', type: 'VALIDATION_ERROR' } }
      }

      if (password.length < 6) {
        return { error: { message: 'Senha deve ter pelo menos 6 caracteres', type: 'VALIDATION_ERROR' } }
      }

      console.log('[AUTH] Creating new account for:', email)

      const { data, error } = await supabase.auth.signUp({
        email: email.toLowerCase().trim(),
        password
      })
      
      if (error) {
        console.error('[AUTH] Registration error:', error.message)
        
        // Tratamento profissional de erros específicos
        if (error.message.includes('User already registered')) {
          return { 
            error: { 
              message: 'Este email já está registrado. Tente fazer login ou use outro email.',
              type: 'USER_EXISTS'
            } 
          }
        }
        
        if (error.message.includes('Invalid email')) {
          return { 
            error: { 
              message: 'Email inválido. Verifique o formato e tente novamente.',
              type: 'INVALID_EMAIL'
            } 
          }
        }
        
        if (error.message.includes('Password')) {
          return { 
            error: { 
              message: 'Senha muito fraca. Use pelo menos 6 caracteres com letras e números.',
              type: 'WEAK_PASSWORD'
            } 
          }
        }
        
        if (error.message.includes('rate')) {
          return { 
            error: { 
              message: 'Muitas tentativas de registro. Aguarde alguns minutos e tente novamente.',
              type: 'RATE_LIMIT'
            } 
          }
        }
        
        // Erro genérico mas informativo
        return { 
          error: { 
            message: 'Erro ao criar conta. Tente novamente ou entre em contato com o suporte.',
            type: 'REGISTRATION_ERROR',
            details: error.message
          } 
        }
      }

      if (data?.user) {
        console.log('[AUTH] Account created successfully for:', email)
        return { data, error: null }
      }

      return { 
        error: { 
          message: 'Erro inesperado ao criar conta. Tente novamente.',
          type: 'UNEXPECTED_ERROR'
        } 
      }
    } catch (error) {
      console.error('[AUTH] Registration failed:', error)
      return { 
        error: { 
          message: 'Erro interno do sistema. Tente novamente em alguns minutos.',
          type: 'SYSTEM_ERROR',
          details: error.message
        } 
      }
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email, password) => {
    setLoading(true)
    try {
      // Validações básicas
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

      console.log('[AUTH] Attempting login for:', email)

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase().trim(),
        password
      })
      
      if (error) {
        console.error('[AUTH] Login failed:', error.message)
        setLoading(false)
        
        // Tratamento profissional de erros específicos
        if (error.message.includes('Invalid login credentials')) {
          return { 
            error: { 
              message: 'Email ou senha incorretos.',
              type: 'INVALID_CREDENTIALS',
              suggestion: 'account_not_found'
            } 
          }
        }
        
        if (error.message.includes('Email not confirmed')) {
          return { 
            error: { 
              message: 'Conta não confirmada. Entre em contato com o suporte.',
              type: 'EMAIL_NOT_CONFIRMED'
            } 
          }
        }
        
        if (error.message.includes('Too many requests')) {
          return { 
            error: { 
              message: 'Muitas tentativas de login. Tente novamente em alguns minutos.',
              type: 'RATE_LIMIT'
            } 
          }
        }
        
        if (error.message.includes('Network')) {
          return { 
            error: { 
              message: 'Problema de conexão. Verifique sua internet e tente novamente.',
              type: 'NETWORK_ERROR'
            } 
          }
        }
        
        // Erro genérico mas informativo
        return { 
          error: { 
            message: 'Erro ao fazer login. Tente novamente ou entre em contato com o suporte.',
            type: 'UNKNOWN_ERROR',
            details: error.message
          } 
        }
      }

      if (data?.user) {
        setUser(data.user)
        console.log('[AUTH] Login successful for:', data.user.email)
        setLoading(false)
        return { data, error: null }
      }

      setLoading(false)
      return { 
        error: { 
          message: 'Login falhou. Tente novamente.',
          type: 'LOGIN_FAILED'
        } 
      }
    } catch (error) {
      console.error('[AUTH] Login error:', error)
      setLoading(false)
      return { 
        error: { 
          message: 'Erro interno do sistema. Tente novamente em alguns minutos.',
          type: 'SYSTEM_ERROR',
          details: error.message
        } 
      }
    }
  }

  const signOut = async () => {
    setLoading(true)
    try {
      console.log('[AUTH] Starting sign out process...')
      
      // Primeiro limpar o estado local
      setUser(null)
      
      // Limpar dados locais
      if (typeof window !== 'undefined') {
        localStorage.clear()
        sessionStorage.clear()
      }
      
      // Depois fazer logout no Supabase
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        console.error('[AUTH] Sign out error:', error.message)
      } else {
        console.log('[AUTH] User signed out successfully')
      }

      return { error: null }
    } catch (error) {
      console.error('[AUTH] Sign out failed:', error)
      setUser(null) // Limpar usuário mesmo se houver erro
      return { error }
    } finally {
      setLoading(false)
    }
  }

  const value = {
    user,
    loading,
    initialized,
    signUp,
    signIn,
    signOut
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
