'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserSupabase } from '../../utils/supabase/client'

export default function LoginPage() {
  const supabase = createBrowserSupabase()
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setErrorMsg('E-mail ou senha inválidos')
    } else {
      router.replace('/dashboard')
    }
    setLoading(false)
  }

  return (
    <div className="h-screen w-screen flex">
      {/* Lado esquerdo - Welcome Section (Maior) */}
      <div className="hidden lg:flex lg:w-2/3 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden">
        {/* Background decorativo */}
        <div className="absolute inset-0">
          {/* Formas orgânicas */}
          <div className="absolute top-20 left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-32 right-16 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
          
          {/* Elementos geométricos */}
          <div className="absolute top-32 right-32 w-2 h-2 bg-white/30 rounded-full"></div>
          <div className="absolute top-36 right-36 w-2 h-2 bg-white/30 rounded-full"></div>
          <div className="absolute top-40 right-40 w-2 h-2 bg-white/30 rounded-full"></div>
          <div className="absolute top-44 right-44 w-2 h-2 bg-white/30 rounded-full"></div>
          
          <div className="absolute top-96 left-32 w-1 h-8 bg-white/20"></div>
          <div className="absolute top-96 left-36 w-8 h-1 bg-white/20"></div>
          
          <div className="absolute bottom-96 right-64 w-1 h-8 bg-white/20"></div>
          <div className="absolute bottom-96 right-60 w-8 h-1 bg-white/20"></div>
          
          <div className="absolute bottom-48 left-48 w-4 h-4 border border-white/20 rounded-full"></div>
          <div className="absolute top-64 left-64 w-6 h-6 border border-white/20 rounded-full"></div>
          
          {/* Linhas orgânicas */}
          <svg className="absolute bottom-20 left-20 w-64 h-64 text-white/10" viewBox="0 0 200 200" fill="none">
            <path d="M20 50C50 30, 80 70, 120 50C160 30, 180 80, 180 120C180 160, 130 180, 90 160C50 140, 20 100, 20 50Z" stroke="currentColor" strokeWidth="2" fill="none"/>
          </svg>
          
          <svg className="absolute top-32 right-20 w-48 h-48 text-white/10" viewBox="0 0 200 200" fill="none">
            <path d="M40 60C70 40, 100 80, 140 60C180 40, 160 100, 120 120C80 140, 40 100, 40 60Z" stroke="currentColor" strokeWidth="2" fill="none"/>
          </svg>
        </div>
        
        {/* Conteúdo da seção de boas-vindas */}
        <div className="relative z-10 flex flex-col justify-center px-16 xl:px-24 text-white">
          <h1 className="text-5xl xl:text-6xl font-bold mb-6 leading-tight">
            Bem-vindo de volta!
          </h1>
          <p className="text-xl xl:text-2xl text-blue-100 leading-relaxed max-w-lg">
            Você pode fazer login para acessar com sua conta existente.
          </p>
        </div>
      </div>
      
      {/* Lado direito - Formulário (Menor) */}
      <div className="w-full lg:w-1/3 flex items-center justify-center bg-white px-6 sm:px-8 lg:px-12">
        <div className="w-full max-w-sm">
          
          {/* Header do formulário */}
          <div className="text-center mb-8">
            <h2 className="text-2xl xl:text-3xl font-bold text-gray-800 mb-2">
              Fazer Login
            </h2>
            <p className="text-gray-600 text-sm xl:text-base">
              Digite suas credenciais para acessar sua conta
            </p>
          </div>
          
          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Nome de usuário ou e-mail
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  type="email"
                  placeholder="Nome de usuário ou e-mail"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Senha
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Senha"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            
            {/* Opções adicionais */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-gray-600">
                <input type="checkbox" className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                Lembrar de mim
              </label>
              <a href="#" className="text-blue-600 hover:text-blue-500 font-medium">
                Esqueceu a senha?
              </a>
            </div>
            
            {errorMsg && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center space-x-3">
                <svg className="h-5 w-5 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-red-600 text-sm">{errorMsg}</span>
              </div>
            )}
            
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Entrando...</span>
                </div>
              ) : (
                'Fazer Login'
              )}
            </button>
          </form>
          
          {/* Footer do formulário */}
          <div className="text-center mt-6">
            <p className="text-gray-600 text-sm">
              Novo aqui? 
              <a href="#" className="text-blue-600 hover:text-blue-500 font-medium ml-1">
                Criar uma Conta
              </a>
            </p>
          </div>
        </div>
      </div>
      
      {/* Versão mobile - overlay no modo mobile */}
      <div className="lg:hidden fixed inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 flex items-center justify-center">
        <div className="w-full max-w-sm mx-4 bg-white rounded-2xl shadow-2xl p-8">
          
          {/* Header mobile */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Fazer Login
            </h2>
            <p className="text-gray-600 text-sm">
              Acesse sua conta para continuar
            </p>
          </div>
          
          {/* Formulário mobile */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                E-mail
              </label>
              <input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Senha
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-4 pr-12 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            
            {errorMsg && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-center">
                <span className="text-red-600 text-sm">{errorMsg}</span>
              </div>
            )}
            
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition-colors disabled:cursor-not-allowed"
            >
              {loading ? 'Entrando...' : 'Fazer Login'}
            </button>
          </form>
          
          <div className="text-center mt-6">
            <p className="text-gray-600 text-sm">
              Dashboard SaaS - Sistema Seguro
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
