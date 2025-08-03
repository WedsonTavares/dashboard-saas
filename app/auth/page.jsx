'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../../contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  LogIn,
  UserPlus,
  AlertCircle
} from 'lucide-react'

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState(null)
  const [successMessage, setSuccessMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [cameFromLoginError, setCameFromLoginError] = useState(false)

  const { user, signIn, signUp, loading, initialized } = useAuth()
  const router = useRouter()

  // Redirecionar se já estiver logado (só após inicialização)
  useEffect(() => {
    if (initialized && user && !loading) {
      console.log('[AUTH] User authenticated, redirecting to dashboard...')
      // Pequeno delay para evitar conflitos de renderização
      const timer = setTimeout(() => {
        router.replace('/dashboard')
      }, 250)
      
      return () => clearTimeout(timer)
    }
  }, [user, router, loading, initialized])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (error) setError(null) // Limpar erro ao digitar
  }

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError({
        message: 'Por favor, preencha todos os campos',
        type: 'VALIDATION_ERROR',
        showCreateAccount: false
      })
      return false
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError({
        message: 'As senhas não coincidem',
        type: 'VALIDATION_ERROR',
        showCreateAccount: false
      })
      return false
    }

    if (formData.password.length < 6) {
      setError({
        message: 'A senha deve ter pelo menos 6 caracteres',
        type: 'VALIDATION_ERROR',
        showCreateAccount: false
      })
      return false
    }

    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm() || isLoading) return

    setIsLoading(true)
    setError(null)

    try {
      if (isLogin) {
        console.log('[UI] Attempting login for:', formData.email)
        const { data, error } = await signIn(formData.email, formData.password)
        
        if (error) {
          console.error('[UI] Login failed:', error.type || 'UNKNOWN_ERROR', ':', error.message)
          
          // Detectar se pode ser conta não encontrada e sugerir criação
          if (error.type === 'INVALID_CREDENTIALS' && error.suggestion === 'account_not_found') {
            setError({
              message: error.message,
              type: error.type,
              showCreateAccount: true
            })
          } else {
            // Exibir mensagem de erro específica
            setError({
              message: error.message,
              type: error.type,
              showCreateAccount: false
            })
          }
          
          // Log adicional para debugging em produção
          if (error.details) {
            console.debug('[UI] Error details:', error.details)
          }
          
          setIsLoading(false)
        } else if (data?.user) {
          console.log('[UI] Login successful, user authenticated')
          setError(null) // Limpar qualquer erro anterior
          // Não fazer redirecionamento manual aqui, deixar o useEffect cuidar
        }
      } else {
        console.log('[UI] Attempting registration for:', formData.email)
        const { data, error } = await signUp(formData.email, formData.password)
        
        if (error) {
          console.error('[UI] Registration failed:', error.type || 'UNKNOWN_ERROR', ':', error.message)
          
          // Exibir mensagem de erro específica
          setError({
            message: error.message,
            type: error.type,
            showCreateAccount: false
          })
          
          // Log adicional para debugging em produção
          if (error.details) {
            console.debug('[UI] Error details:', error.details)
          }
          
          setIsLoading(false)
        } else if (data?.user) {
          console.log('[UI] Registration successful')
          setError(null) // Limpar erros
          
          setSuccessMessage('Conta criada com sucesso! Agora faça login com suas credenciais.')
          
          // Mudar para modo login após um breve delay
          setTimeout(() => {
            setIsLogin(true)
            setSuccessMessage('')
            setCameFromLoginError(false)
            setFormData({
              email: formData.email,
              password: '',
              confirmPassword: ''
            })
          }, 2000)
          
          setIsLoading(false)
        } else {
          setError({
            message: 'Erro inesperado ao criar conta. Tente novamente.',
            type: 'UNEXPECTED_ERROR',
            showCreateAccount: false
          })
          setIsLoading(false)
        }
      }
    } catch (err) {
      console.error('[UI] Auth error:', err)
      
      // Tratamento profissional de erros de conexão/sistema
      let errorMessage = 'Erro inesperado do sistema. Tente novamente em alguns instantes.'
      
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        errorMessage = 'Problema de conexão com o servidor. Verifique sua internet e tente novamente.'
      } else if (err.name === 'AbortError') {
        errorMessage = 'Operação cancelada. Tente novamente.'
      } else if (err.message.includes('network')) {
        errorMessage = 'Erro de rede. Verifique sua conexão e tente novamente.'
      }
      
      setError({
        message: errorMessage,
        type: 'SYSTEM_ERROR',
        showCreateAccount: false
      })
      
      setIsLoading(false)
    }
    // Não resetar isLoading aqui para login, deixar o useEffect cuidar
  }

  const toggleMode = () => {
    setIsLogin(!isLogin)
    setError(null)
    setSuccessMessage('')
    setCameFromLoginError(false)
    setFormData({
      email: '',
      password: '',
      confirmPassword: ''
    })
  }

  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-[#1e1e1e] rounded-lg border border-[#2f2f2f] p-6 sm:p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              {isLogin ? 'Fazer Login' : 'Criar Conta'}
            </h1>
            <p className="text-gray-400 text-sm sm:text-base">
              {isLogin 
                ? 'Acesse sua conta para continuar' 
                : cameFromLoginError
                  ? 'Vamos criar sua conta com este email'
                  : 'Crie sua conta para começar'
              }
            </p>
          </div>

          {/* Info Message for users coming from login error */}
          {!isLogin && cameFromLoginError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg"
            >
              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5">
                  ℹ️
                </div>
                <div className="flex-1">
                  <h4 className="text-blue-300 font-medium text-sm mb-1">
                    Criando Nova Conta
                  </h4>
                  <p className="text-blue-400 text-sm leading-relaxed">
                    Parece que este email ainda não tem uma conta. Vamos criar uma agora!
                  </p>
                  <p className="text-blue-300/70 text-xs mt-2">
                    💡 Depois de criar a conta, você poderá fazer login normalmente
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Success Message */}
          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 bg-green-900/20 border border-green-500/30 rounded-lg"
            >
              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5">
                  ✓
                </div>
                <div className="flex-1">
                  <h4 className="text-green-300 font-medium text-sm mb-1">
                    Sucesso!
                  </h4>
                  <p className="text-green-400 text-sm leading-relaxed">
                    {successMessage}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 bg-red-900/20 border border-red-500/30 rounded-lg"
            >
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="text-red-300 font-medium text-sm mb-1">
                    Erro de Autenticação
                  </h4>
                  <p className="text-red-400 text-sm leading-relaxed mb-3">
                    {typeof error === 'string' ? error : error?.message || 'Erro desconhecido'}
                  </p>
                  
                  {/* Sugestão de criar conta para credenciais inválidas */}
                  {error?.showCreateAccount && isLogin && (
                    <div className="bg-red-800/30 rounded-lg p-3 border border-red-600/30">
                      <p className="text-red-300 text-sm mb-2">
                        🔍 <strong>Conta não encontrada?</strong>
                      </p>
                      <p className="text-red-300/80 text-xs mb-3">
                        Se você não tem uma conta ainda, pode criar uma agora mesmo.
                      </p>
                      <button
                        onClick={() => {
                          setIsLogin(false)
                          setError(null)
                          setCameFromLoginError(true)
                          setFormData({
                            email: formData.email, // Manter o email digitado
                            password: '',
                            confirmPassword: ''
                          })
                        }}
                        className="bg-red-600 hover:bg-red-500 text-white text-xs px-3 py-1.5 rounded-md transition-colors"
                      >
                        Criar Nova Conta
                      </button>
                    </div>
                  )}
                  
                  {/* Dicas contextuais para outros erros */}
                  {!error?.showCreateAccount && typeof error === 'object' && error?.type === 'INVALID_CREDENTIALS' && (
                    <p className="text-red-300/70 text-xs mt-2">
                      💡 Dica: Verifique se o email e senha estão corretos
                    </p>
                  )}
                  {typeof error === 'string' && error.includes('registrado') && (
                    <p className="text-red-300/70 text-xs mt-2">
                      💡 Dica: Tente fazer login ou use outro email
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-[#2f2f2f] text-white pl-10 pr-4 py-3 rounded-lg border border-[#404040] focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="seu@email.com"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full bg-[#2f2f2f] text-white pl-10 pr-12 py-3 rounded-lg border border-[#404040] focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password - Only for registration */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Confirmar Senha
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full bg-[#2f2f2f] text-white pl-10 pr-4 py-3 rounded-lg border border-[#404040] focus:border-blue-500 focus:outline-none transition-colors"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  {isLogin ? (
                    <LogIn className="w-4 h-4" />
                  ) : (
                    <UserPlus className="w-4 h-4" />
                  )}
                  <span>{isLogin ? 'Entrar' : 'Criar Conta'}</span>
                </>
              )}
            </button>
          </form>

          {/* Toggle Mode */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}
              <button
                onClick={toggleMode}
                className="ml-1 text-blue-400 hover:text-blue-300 font-medium transition-colors"
              >
                {isLogin ? 'Criar conta' : 'Fazer login'}
              </button>
            </p>
          </div>

          {/* Botão de teste de erro - APENAS PARA DEBUG */}
          <div className="mt-4 text-center">
            <button
              onClick={() => {
                console.log('[DEBUG] Testando erro...')
                setError({
                  message: 'Teste: Email ou senha incorretos.',
                  type: 'INVALID_CREDENTIALS',
                  showCreateAccount: true
                })
                console.log('[DEBUG] Erro setado:', {
                  message: 'Teste: Email ou senha incorretos.',
                  type: 'INVALID_CREDENTIALS',
                  showCreateAccount: true
                })
              }}
              className="text-xs text-gray-500 hover:text-gray-400 transition-colors"
            >
              🧪 Testar erro de credenciais
            </button>
          </div>
        </div>

        {/* Aviso para Cadastro */}
        {!isLogin && (
          <div className="mt-6 p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
            <p className="text-yellow-400 text-xs">
              ⚠️ Novo cadastro pode precisar de confirmação de email dependendo das configurações do Supabase.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default AuthPage
