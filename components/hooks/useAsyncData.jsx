'use client'

import { useState, useEffect, useCallback } from 'react'
import { useLoading } from '../providers/LoadingProvider'

export function useAsyncData(asyncFunction, dependencies = [], options = {}) {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const { withDbLoading } = useLoading()
  
  const {
    loadingText = 'Carregando dados...',
    useGlobalLoading = true,
    onSuccess,
    onError,
    showLocalLoadingOnStart = false // Nova opção para controlar loading local
  } = options

  const fetchData = useCallback(async () => {
    if (!showLocalLoadingOnStart) {
      setIsLoading(false) // Não mostrar loading local se global está ativo
    } else {
      setIsLoading(true)
    }
    setError(null)

    try {
      const loadingFunction = async () => {
        const result = await asyncFunction()
        setData(result)
        if (onSuccess) onSuccess(result)
        return result
      }

      if (useGlobalLoading) {
        await withDbLoading(loadingFunction, loadingText)
      } else {
        setIsLoading(true)
        await loadingFunction()
      }
    } catch (err) {
      setError(err)
      if (onError) onError(err)
      console.error('Erro ao carregar dados:', err)
    } finally {
      setIsLoading(false)
    }
  }, [asyncFunction, withDbLoading, loadingText, useGlobalLoading, onSuccess, onError, showLocalLoadingOnStart])

  useEffect(() => {
    fetchData()
  }, dependencies)

  const refetch = useCallback(() => {
    fetchData()
  }, [fetchData])

  return {
    data,
    error,
    isLoading,
    refetch
  }
}

// Hook específico para múltiplas queries
export function useMultipleAsyncData(queries, options = {}) {
  const [data, setData] = useState({})
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const { withDbLoading } = useLoading()
  
  const {
    loadingText = 'Carregando dados...',
    useGlobalLoading = true
  } = options

  const fetchAllData = useCallback(async () => {
    setIsLoading(true)
    
    try {
      const loadingFunction = async () => {
        const promises = Object.entries(queries).map(async ([key, asyncFunction]) => {
          try {
            const result = await asyncFunction()
            return { key, result, error: null }
          } catch (error) {
            return { key, result: null, error }
          }
        })

        const results = await Promise.all(promises)
        
        const newData = {}
        const newErrors = {}
        
        results.forEach(({ key, result, error }) => {
          if (error) {
            newErrors[key] = error
          } else {
            newData[key] = result
          }
        })
        
        setData(newData)
        setErrors(newErrors)
      }

      if (useGlobalLoading) {
        await withDbLoading(loadingFunction, loadingText)
      } else {
        await loadingFunction()
      }
    } catch (err) {
      console.error('Erro ao carregar múltiplos dados:', err)
    } finally {
      setIsLoading(false)
    }
  }, [queries, withDbLoading, loadingText, useGlobalLoading])

  useEffect(() => {
    fetchAllData()
  }, [fetchAllData])

  return {
    data,
    errors,
    isLoading,
    refetch: fetchAllData
  }
}
