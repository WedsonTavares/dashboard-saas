'use client'

import { createContext, useContext, useState, useCallback } from 'react'
import Loading from '../ui/Loading'

const LoadingContext = createContext()

export function LoadingProvider({ children }) {
  const [loadingStates, setLoadingStates] = useState({})
  const [globalLoading, setGlobalLoading] = useState(false)
  const [loadingText, setLoadingText] = useState('Carregando...')

  // Função para mostrar loading global
  const showGlobalLoading = useCallback((text = 'Carregando...') => {
    setLoadingText(text)
    setGlobalLoading(true)
  }, [])

  // Função para esconder loading global
  const hideGlobalLoading = useCallback(() => {
    setGlobalLoading(false)
  }, [])

  // Função para mostrar loading específico
  const showLoading = useCallback((key, text = 'Carregando...') => {
    setLoadingStates(prev => ({
      ...prev,
      [key]: { active: true, text }
    }))
  }, [])

  // Função para esconder loading específico
  const hideLoading = useCallback((key) => {
    setLoadingStates(prev => {
      const newState = { ...prev }
      delete newState[key]
      return newState
    })
  }, [])

  // Função para executar ação com loading
  const withLoading = useCallback(async (action, text = 'Carregando...', global = false) => {
    const key = global ? 'global' : `action_${Date.now()}`
    
    try {
      if (global) {
        showGlobalLoading(text)
      } else {
        showLoading(key, text)
      }
      
      const result = await action()
      return result
    } finally {
      if (global) {
        hideGlobalLoading()
      } else {
        hideLoading(key)
      }
    }
  }, [showGlobalLoading, hideGlobalLoading, showLoading, hideLoading])

  // Função para requisições do banco de dados
  const withDbLoading = useCallback(async (action, text = 'Conectando ao banco...') => {
    return withLoading(action, text, true)
  }, [withLoading])

  // Função para navegação entre páginas
  const withPageLoading = useCallback(async (action, text = 'Carregando página...') => {
    return withLoading(action, text, true)
  }, [withLoading])

  // Verificar se tem algum loading ativo
  const isLoading = useCallback((key) => {
    if (key) {
      return !!loadingStates[key]
    }
    return globalLoading || Object.keys(loadingStates).length > 0
  }, [loadingStates, globalLoading])

  const value = {
    loadingStates,
    globalLoading,
    loadingText,
    showGlobalLoading,
    hideGlobalLoading,
    showLoading,
    hideLoading,
    withLoading,
    withDbLoading,
    withPageLoading,
    isLoading
  }

  return (
    <LoadingContext.Provider value={value}>
      {children}
      {globalLoading && (
        <Loading 
          fullScreen 
          overlay 
          size="xl" 
          text={loadingText} 
        />
      )}
    </LoadingContext.Provider>
  )
}

export function useLoading() {
  const context = useContext(LoadingContext)
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider')
  }
  return context
}
