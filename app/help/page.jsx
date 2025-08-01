'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  HelpCircle, 
  Search, 
  ChevronDown, 
  ChevronRight,
  Book,
  MessageCircle,
  Mail,
  Phone,
  Download,
  ExternalLink,
  FileText,
  Video,
  Users
} from 'lucide-react'

const HelpPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('getting-started')
  const [expandedFaq, setExpandedFaq] = useState(null)

  const categories = [
    { id: 'getting-started', name: 'Primeiros Passos', icon: Book },
    { id: 'account', name: 'Conta e Perfil', icon: Users },
    { id: 'billing', name: 'Cobrança', icon: FileText },
    { id: 'technical', name: 'Problemas Técnicos', icon: HelpCircle },
    { id: 'features', name: 'Recursos', icon: Video }
  ]

  const faqs = [
    {
      id: 1,
      category: 'getting-started',
      question: 'Como começar a usar o dashboard?',
      answer: 'Para começar, acesse o painel principal onde você encontrará todas as ferramentas disponíveis. Recomendamos começar pela seção Overview para ter uma visão geral dos seus dados.'
    },
    {
      id: 2,
      category: 'getting-started',
      question: 'Como navegar pelo sistema?',
      answer: 'Use a barra lateral esquerda para navegar entre as diferentes seções. Cada ícone representa uma funcionalidade específica do sistema.'
    },
    {
      id: 3,
      category: 'account',
      question: 'Como alterar minha senha?',
      answer: 'Vá para Configurações > Segurança e clique em "Alterar Senha". Digite sua senha atual e a nova senha duas vezes para confirmar.'
    },
    {
      id: 4,
      category: 'account',
      question: 'Como atualizar informações do perfil?',
      answer: 'Acesse a seção Configurações > Perfil para editar suas informações pessoais, incluindo nome, email e preferências.'
    },
    {
      id: 5,
      category: 'billing',
      question: 'Como visualizar minhas faturas?',
      answer: 'Todas as faturas estão disponíveis na seção Cobrança do seu painel administrativo. Você pode baixar PDFs das faturas anteriores.'
    },
    {
      id: 6,
      category: 'technical',
      question: 'O que fazer se o sistema estiver lento?',
      answer: 'Primeiro, verifique sua conexão com a internet. Se o problema persistir, tente limpar o cache do navegador ou contate o suporte técnico.'
    },
    {
      id: 7,
      category: 'features',
      question: 'Como usar os gráficos e relatórios?',
      answer: 'Os gráficos são interativos - você pode clicar nos elementos para ver mais detalhes. Use os filtros disponíveis para personalizar a visualização dos dados.'
    }
  ]

  const resources = [
    { name: 'Guia do Usuário (PDF)', type: 'pdf', size: '2.3 MB', icon: FileText },
    { name: 'Tutorial em Vídeo', type: 'video', duration: '15 min', icon: Video },
    { name: 'API Documentation', type: 'link', url: '#', icon: ExternalLink },
    { name: 'Templates e Exemplos', type: 'zip', size: '1.8 MB', icon: Download }
  ]

  const filteredFaqs = faqs.filter(faq => 
    faq.category === activeCategory &&
    (faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
     faq.answer.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const toggleFaq = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id)
  }

  return (
    <div className="flex-1 bg-[#121212] min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="h-full"
      >
        {/* Header */}
        <div className="bg-[#1e1e1e] border-b border-[#2f2f2f] p-4 sm:p-6 lg:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Central de Ajuda</h1>
          <p className="text-sm sm:text-base text-gray-400">Encontre respostas para suas dúvidas e aprenda a usar nossa plataforma</p>
        </div>

        <div className="p-4 sm:p-6 lg:p-8">
          {/* Search */}
          <div className="mb-6 sm:mb-8">
            <div className="relative max-w-2xl">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
              <input
                type="text"
                placeholder="Buscar na documentação..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 sm:py-3 bg-[#1e1e1e] border border-[#2f2f2f] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 text-sm sm:text-base"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 sm:gap-8">
            {/* Sidebar com Categorias */}
            <div className="xl:col-span-1 order-2 xl:order-1">
              <div className="bg-[#1e1e1e] rounded-lg p-4 sm:p-6 border border-[#2f2f2f] mb-4 sm:mb-6">
                <h3 className="text-lg font-semibold mb-4 text-white">Categorias</h3>
                <nav className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-1 gap-2">
                  {categories.map((category) => {
                    const IconComponent = category.icon
                    return (
                      <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={`flex items-center p-3 rounded-lg text-left transition-colors text-sm sm:text-base ${
                          activeCategory === category.id 
                            ? 'bg-blue-600 text-white' 
                            : 'text-gray-300 hover:bg-[#2f2f2f] hover:text-white'
                        }`}
                      >
                        <IconComponent className="mr-2 sm:mr-3 h-4 w-4 flex-shrink-0" />
                        <span className="truncate">{category.name}</span>
                      </button>
                    )
                  })}
                </nav>
              </div>

              {/* Contato */}
              <div className="bg-[#1e1e1e] rounded-lg p-4 sm:p-6 border border-[#2f2f2f]">
                <h3 className="text-lg font-semibold mb-4 text-white">Precisa de mais ajuda?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-3">
                  <button className="flex items-center p-3 text-gray-300 hover:bg-[#2f2f2f] hover:text-white rounded-lg transition-colors text-sm">
                    <MessageCircle className="mr-2 sm:mr-3 h-4 w-4 flex-shrink-0" />
                    <span>Chat ao vivo</span>
                  </button>
                  <button className="flex items-center p-3 text-gray-300 hover:bg-[#2f2f2f] hover:text-white rounded-lg transition-colors text-sm">
                    <Mail className="mr-2 sm:mr-3 h-4 w-4 flex-shrink-0" />
                    <span>Enviar email</span>
                  </button>
                  <button className="flex items-center p-3 text-gray-300 hover:bg-[#2f2f2f] hover:text-white rounded-lg transition-colors text-sm">
                    <Phone className="mr-2 sm:mr-3 h-4 w-4 flex-shrink-0" />
                    <span>Ligar suporte</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Conteúdo Principal */}
            <div className="xl:col-span-3 order-1 xl:order-2">
              {/* FAQ */}
              <div className="bg-[#1e1e1e] rounded-lg p-4 sm:p-6 border border-[#2f2f2f] mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-white">Perguntas Frequentes</h2>
                <div className="space-y-3 sm:space-y-4">
                  {filteredFaqs.length > 0 ? (
                    filteredFaqs.map((faq) => (
                      <div key={faq.id} className="border border-[#2f2f2f] rounded-lg">
                        <button
                          onClick={() => toggleFaq(faq.id)}
                          className="w-full flex items-center justify-between p-3 sm:p-4 text-left hover:bg-[#2f2f2f] transition-colors"
                        >
                          <span className="font-medium text-white text-sm sm:text-base pr-4">{faq.question}</span>
                          {expandedFaq === faq.id ? (
                            <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 flex-shrink-0" />
                          ) : (
                            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 flex-shrink-0" />
                          )}
                        </button>
                        {expandedFaq === faq.id && (
                          <div className="px-3 sm:px-4 pb-3 sm:pb-4">
                            <p className="text-gray-400 leading-relaxed text-sm sm:text-base">{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6 sm:py-8">
                      <HelpCircle className="h-12 w-12 sm:h-16 sm:w-16 text-gray-600 mx-auto mb-4" />
                      <p className="text-gray-400 text-sm sm:text-base">Nenhuma pergunta encontrada para esta categoria.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Recursos */}
              <div className="bg-[#1e1e1e] rounded-lg p-4 sm:p-6 border border-[#2f2f2f]">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-white">Recursos e Downloads</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
                  {resources.map((resource, index) => {
                    const IconComponent = resource.icon
                    return (
                      <div key={index} className="flex items-center p-3 sm:p-4 border border-[#2f2f2f] rounded-lg hover:bg-[#2f2f2f] transition-colors cursor-pointer">
                        <div className="flex-shrink-0">
                          <IconComponent className="h-6 w-6 sm:h-8 sm:w-8 text-blue-400" />
                        </div>
                        <div className="ml-3 sm:ml-4 flex-grow min-w-0">
                          <h4 className="font-medium text-white text-sm sm:text-base truncate">{resource.name}</h4>
                          <p className="text-xs sm:text-sm text-gray-400">
                            {resource.size && `${resource.size} • `}
                            {resource.duration && `${resource.duration} • `}
                            {resource.type.toUpperCase()}
                          </p>
                        </div>
                        <Download className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 flex-shrink-0 ml-2" />
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default HelpPage
