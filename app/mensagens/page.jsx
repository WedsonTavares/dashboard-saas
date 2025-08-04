'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Mail, 
  Search, 
  Send, 
  Trash2, 
  Star, 
  Archive,
  MoreVertical,
  Paperclip,
  Filter,
  CheckCircle,
  Clock,
  User,
  ArrowLeft,
  AlertCircle,
  MessageSquare
} from 'lucide-react'

const MensagensPage = () => {
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('all')
  const [showMobileView, setShowMobileView] = useState('inbox')

  const messages = [
    {
      id: 1,
      from: 'Ethan Carter',
      email: 'ethan.carter@example.com',
      subject: 'Problema com pedido #A7B9D31',
      preview: 'Olá, estou tendo dificuldades com meu pedido...',
      body: 'Olá,\n\nEstou tendo dificuldades com meu pedido #A7B9D31. O produto não foi entregue na data prevista. Poderiam verificar o status?\n\nObrigado,\nEthan Carter',
      time: '10:30',
      date: 'Hoje',
      isRead: false,
      isStarred: true,
      hasAttachment: false,
      priority: 'high',
      category: 'support'
    },
    {
      id: 2,
      from: 'Sophia Mitchell',
      email: 'sophia.mitchell@example.com',
      subject: 'Feedback sobre produto',
      preview: 'Gostaria de compartilhar minha experiência...',
      body: 'Olá,\n\nGostaria de compartilhar minha experiência com o produto que comprei. Estou muito satisfeita com a qualidade e o atendimento.\n\nParabéns pela excelência!\n\nSophia Mitchell',
      time: '09:15',
      date: 'Hoje',
      isRead: true,
      isStarred: false,
      hasAttachment: true,
      priority: 'normal',
      category: 'feedback'
    },
    {
      id: 3,
      from: 'William Thompson',
      email: 'william.thompson@example.com',
      subject: 'Solicitação de reembolso',
      preview: 'Preciso solicitar o reembolso do pedido...',
      body: 'Prezados,\n\nPreciso solicitar o reembolso do pedido #B8C2E42. O produto chegou com defeito e não atende às minhas necessidades.\n\nAguardo retorno.\n\nWilliam Thompson',
      time: '16:45',
      date: 'Ontem',
      isRead: true,
      isStarred: false,
      hasAttachment: false,
      priority: 'high',
      category: 'support'
    },
    {
      id: 4,
      from: 'Emma Johnson',
      email: 'emma.johnson@example.com',
      subject: 'Dúvida sobre entrega',
      preview: 'Quando meu pedido será entregue?',
      body: 'Olá,\n\nFiz um pedido há uma semana e ainda não recebi informações sobre a entrega. Poderiam me atualizar sobre o status?\n\nObrigada,\nEmma Johnson',
      time: '14:20',
      date: 'Ontem',
      isRead: false,
      isStarred: false,
      hasAttachment: false,
      priority: 'normal',
      category: 'inquiry'
    },
    {
      id: 5,
      from: 'Sistema Dashboard',
      email: 'sistema@dashboard.com',
      subject: 'Backup automático concluído',
      preview: 'O backup diário foi realizado com sucesso...',
      body: 'Prezado usuário,\n\nO backup automático do sistema foi concluído com sucesso às 02:00.\n\nTodos os dados estão seguros e atualizados.\n\nSistema Automatizado',
      time: '02:00',
      date: '2 dias atrás',
      isRead: true,
      isStarred: false,
      hasAttachment: false,
      priority: 'low',
      category: 'system'
    }
  ]

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.preview.toLowerCase().includes(searchTerm.toLowerCase())
    
    if (filter === 'all') return matchesSearch
    if (filter === 'unread') return matchesSearch && !message.isRead
    if (filter === 'starred') return matchesSearch && message.isStarred
    return matchesSearch && message.category === filter
  })

  const handleSelectMessage = (message) => {
    setSelectedMessage(message)
    setShowMobileView('message')
  }

  const handleBackToInbox = () => {
    setShowMobileView('inbox')
    setSelectedMessage(null)
  }

  const markAsRead = (id) => {
    console.log(`Marking message ${id} as read`)
  }

  const unreadCount = messages.filter(m => !m.isRead).length

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-red-500'
      case 'normal': return 'border-l-blue-500'
      case 'low': return 'border-l-gray-500'
      default: return 'border-l-gray-500'
    }
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'support': return AlertCircle
      case 'feedback': return MessageSquare
      case 'inquiry': return Mail
      case 'system': return CheckCircle
      default: return Mail
    }
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
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="mb-4 sm:mb-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Mensagens</h1>
              <p className="text-sm sm:text-base text-gray-400">
                Gerencie suas comunicações e mensagens ({unreadCount} não lidas)
              </p>
            </div>
            
            {/* Stats Cards - Mobile Responsive */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              <div className="bg-[#2f2f2f] rounded-lg p-3 sm:p-4">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                  <div>
                    <p className="text-xs sm:text-sm text-gray-400">Total</p>
                    <p className="text-sm sm:text-lg font-semibold text-white">{messages.length}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#2f2f2f] rounded-lg p-3 sm:p-4">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                  <div>
                    <p className="text-xs sm:text-sm text-gray-400">Não lidas</p>
                    <p className="text-sm sm:text-lg font-semibold text-white">{unreadCount}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#2f2f2f] rounded-lg p-3 sm:p-4 col-span-2 sm:col-span-1">
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                  <div>
                    <p className="text-xs sm:text-sm text-gray-400">Favoritas</p>
                    <p className="text-sm sm:text-lg font-semibold text-white">
                      {messages.filter(m => m.isStarred).length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row h-[calc(100vh-180px)]">
          {/* Sidebar - Inbox */}
          <div className={`${showMobileView === 'inbox' ? 'block' : 'hidden lg:block'} w-full lg:w-1/3 xl:w-1/4 bg-[#1e1e1e] border-r border-[#2f2f2f]`}>
            {/* Search and Filters */}
            <div className="p-4 sm:p-6 border-b border-[#2f2f2f]">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Buscar mensagens..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#2f2f2f] text-white pl-10 pr-4 py-2 sm:py-3 rounded-lg border border-[#404040] focus:border-blue-500 focus:outline-none text-sm"
                />
              </div>

              {/* Filter Buttons */}
              <div className="flex flex-wrap gap-2">
                {[
                  { key: 'all', label: 'Todas', icon: Mail },
                  { key: 'unread', label: 'Não lidas', icon: Clock },
                  { key: 'starred', label: 'Favoritas', icon: Star },
                  { key: 'support', label: 'Suporte', icon: AlertCircle }
                ].map(({ key, label, icon: Icon }) => (
                  <button
                    key={key}
                    onClick={() => setFilter(key)}
                    className={`flex items-center space-x-1 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm transition-colors ${
                      filter === key
                        ? 'bg-blue-600 text-white'
                        : 'bg-[#2f2f2f] text-gray-400 hover:bg-[#404040] hover:text-white'
                    }`}
                  >
                    <Icon className="w-3 h-3" />
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Messages List */}
            <div className="overflow-y-auto h-[calc(100%-140px)]">
              {filteredMessages.map((message) => {
                const CategoryIcon = getCategoryIcon(message.category)
                return (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    whileHover={{ backgroundColor: '#2f2f2f' }}
                    onClick={() => handleSelectMessage(message)}
                    className={`p-3 sm:p-4 border-b border-[#2f2f2f] cursor-pointer transition-colors ${
                      selectedMessage?.id === message.id ? 'bg-[#2f2f2f]' : ''
                    } ${!message.isRead ? 'border-l-4 ' + getPriorityColor(message.priority) : ''}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2 min-w-0 flex-1">
                        <CategoryIcon className="w-3 h-3 text-gray-500 flex-shrink-0" />
                        <h3 className={`text-sm font-medium text-white truncate ${
                          !message.isRead ? 'font-bold' : ''
                        }`}>
                          {message.from}
                        </h3>
                        {message.isStarred && <Star className="w-3 h-3 text-yellow-500 flex-shrink-0" />}
                        {message.hasAttachment && <Paperclip className="w-3 h-3 text-gray-400 flex-shrink-0" />}
                      </div>
                      <div className="flex flex-col items-end flex-shrink-0 ml-2">
                        <span className="text-xs text-gray-400">{message.time}</span>
                        {!message.isRead && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-1"></div>
                        )}
                      </div>
                    </div>
                    <h4 className={`text-sm text-white mb-1 truncate ${
                      !message.isRead ? 'font-semibold' : ''
                    }`}>
                      {message.subject}
                    </h4>
                    <p className="text-xs text-gray-400 line-clamp-2">
                      {message.preview}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-500">{message.date}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        message.priority === 'high' ? 'bg-red-900/20 text-red-400' :
                        message.priority === 'normal' ? 'bg-blue-900/20 text-blue-400' :
                        'bg-gray-900/20 text-gray-400'
                      }`}>
                        {message.priority === 'high' ? 'Alta' : message.priority === 'normal' ? 'Normal' : 'Baixa'}
                      </span>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Message Content */}
          <div className={`${showMobileView === 'message' ? 'block' : 'hidden lg:block'} flex-1 bg-[#121212] flex flex-col`}>
            {selectedMessage ? (
              <>
                {/* Message Header */}
                <div className="bg-[#1e1e1e] border-b border-[#2f2f2f] p-4 sm:p-6">
                  <div className="flex items-start justify-between">
                    <div className="min-w-0 flex-1">
                      <button
                        onClick={handleBackToInbox}
                        className="lg:hidden flex items-center text-blue-500 mb-3 text-sm hover:text-blue-400 transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Voltar para inbox
                      </button>
                      
                      <div className="flex items-center space-x-2 mb-2">
                        {React.createElement(getCategoryIcon(selectedMessage.category), {
                          className: "w-4 h-4 text-gray-400"
                        })}
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          selectedMessage.priority === 'high' ? 'bg-red-900/20 text-red-400' :
                          selectedMessage.priority === 'normal' ? 'bg-blue-900/20 text-blue-400' :
                          'bg-gray-900/20 text-gray-400'
                        }`}>
                          {selectedMessage.priority === 'high' ? 'Prioridade Alta' : 
                           selectedMessage.priority === 'normal' ? 'Prioridade Normal' : 'Prioridade Baixa'}
                        </span>
                      </div>
                      
                      <h2 className="text-lg sm:text-xl font-bold text-white mb-2 break-words">
                        {selectedMessage.subject}
                      </h2>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-sm text-gray-400">
                        <span className="mb-1 sm:mb-0">De: {selectedMessage.from}</span>
                        <span className="mb-1 sm:mb-0">{selectedMessage.email}</span>
                        <span>{selectedMessage.date} às {selectedMessage.time}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 sm:space-x-2 ml-4">
                      <button className="p-2 text-gray-400 hover:text-white hover:bg-[#2f2f2f] rounded-lg transition-colors">
                        <Star className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-white hover:bg-[#2f2f2f] rounded-lg transition-colors">
                        <Archive className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-red-400 hover:text-red-300 hover:bg-[#2f2f2f] rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-white hover:bg-[#2f2f2f] rounded-lg transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Message Body */}
                <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
                  <div className="bg-[#1e1e1e] rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
                    <pre className="text-sm sm:text-base text-gray-200 whitespace-pre-wrap font-sans leading-relaxed">
                      {selectedMessage.body}
                    </pre>
                  </div>

                  {/* Reply Section */}
                  <div className="bg-[#1e1e1e] rounded-lg p-4 sm:p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Responder</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Para:</label>
                          <input
                            type="email"
                            value={selectedMessage.email}
                            readOnly
                            className="w-full bg-[#2f2f2f] text-gray-400 px-3 py-2 rounded-lg border border-[#404040]"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Assunto:</label>
                          <input
                            type="text"
                            value={`Re: ${selectedMessage.subject}`}
                            className="w-full bg-[#2f2f2f] text-white px-3 py-2 rounded-lg border border-[#404040] focus:border-blue-500 focus:outline-none"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Mensagem:</label>
                        <textarea
                          rows={6}
                          className="w-full bg-[#2f2f2f] text-white px-3 py-2 rounded-lg border border-[#404040] focus:border-blue-500 focus:outline-none resize-none"
                          placeholder="Digite sua resposta..."
                        />
                      </div>
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
                        <button className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
                          <Paperclip className="w-4 h-4" />
                          <span className="text-sm">Anexar arquivo</span>
                        </button>
                        <div className="flex items-center space-x-2 w-full sm:w-auto">
                          <button className="flex-1 sm:flex-none px-4 py-2 bg-[#2f2f2f] text-gray-300 rounded-lg hover:bg-[#404040] transition-colors">
                            Rascunho
                          </button>
                          <button className="flex-1 sm:flex-none px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                            <Send className="w-4 h-4" />
                            <span>Enviar</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center p-4">
                <div className="text-center">
                  <Mail className="w-16 h-16 sm:w-20 sm:h-20 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-400 mb-2">
                    Selecione uma mensagem
                  </h3>
                  <p className="text-sm sm:text-base text-gray-500">
                    Escolha uma mensagem da lista para visualizar seu conteúdo
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default MensagensPage
