'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Bell, 
  CheckCircle, 
  AlertTriangle, 
  Info, 
  X,
  Clock,
  Trash2,
  Settings,
  Filter,
  MoreVertical,
  Eye,
  EyeOff
} from 'lucide-react'

const NotificacoesPage = () => {
  const [filter, setFilter] = useState('all')
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'success',
      title: 'Pedido processado com sucesso',
      message: 'O pedido #A7B9D31 foi processado e está sendo preparado para envio.',
      time: '5 min atrás',
      isRead: false,
      icon: CheckCircle,
      color: 'text-green-400',
      bgColor: 'bg-green-900/20'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Estoque baixo',
      message: 'O produto "Smartphone" está com apenas 5 unidades em estoque.',
      time: '15 min atrás',
      isRead: false,
      icon: AlertTriangle,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-900/20'
    },
    {
      id: 3,
      type: 'info',
      title: 'Nova mensagem recebida',
      message: 'Você recebeu uma nova mensagem de Sophia Mitchell.',
      time: '30 min atrás',
      isRead: true,
      icon: Info,
      color: 'text-blue-400',
      bgColor: 'bg-blue-900/20'
    },
    {
      id: 4,
      type: 'error',
      title: 'Falha na sincronização',
      message: 'Erro ao sincronizar dados com o servidor. Tentando novamente...',
      time: '1 hora atrás',
      isRead: true,
      icon: X,
      color: 'text-red-400',
      bgColor: 'bg-red-900/20'
    },
    {
      id: 5,
      type: 'success',
      title: 'Backup concluído',
      message: 'O backup automático foi realizado com sucesso às 02:00.',
      time: '2 horas atrás',
      isRead: true,
      icon: CheckCircle,
      color: 'text-green-400',
      bgColor: 'bg-green-900/20'
    },
    {
      id: 6,
      type: 'info',
      title: 'Novo usuário registrado',
      message: 'Um novo usuário se registrou na plataforma.',
      time: '3 horas atrás',
      isRead: true,
      icon: Info,
      color: 'text-blue-400',
      bgColor: 'bg-blue-900/20'
    }
  ])

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true
    if (filter === 'unread') return !notification.isRead
    return notification.type === filter
  })

  const markAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, isRead: true } : notification
    ))
  }

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, isRead: true })))
  }

  const unreadCount = notifications.filter(n => !n.isRead).length

  return (
    <div className="flex-1 min-h-screen p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Central de Notificações</h1>
          <p className="text-gray-400">Gerencie todas as suas notificações e alertas</p>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-[#1e1e1e] rounded-lg p-6 border border-[#2f2f2f]">
            <div className="flex items-center">
              <Bell className="h-8 w-8 text-blue-400" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Total</p>
                <p className="text-2xl font-bold text-white">{notifications.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-[#1e1e1e] rounded-lg p-6 border border-[#2f2f2f]">
            <div className="flex items-center">
              <EyeOff className="h-8 w-8 text-yellow-400" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Não lidas</p>
                <p className="text-2xl font-bold text-white">{unreadCount}</p>
              </div>
            </div>
          </div>
          <div className="bg-[#1e1e1e] rounded-lg p-6 border border-[#2f2f2f]">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-400" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Sucesso</p>
                <p className="text-2xl font-bold text-white">{notifications.filter(n => n.type === 'success').length}</p>
              </div>
            </div>
          </div>
          <div className="bg-[#1e1e1e] rounded-lg p-6 border border-[#2f2f2f]">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-red-400" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Alertas</p>
                <p className="text-2xl font-bold text-white">{notifications.filter(n => n.type === 'warning' || n.type === 'error').length}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filtros */}
          <div className="lg:col-span-1">
            <div className="bg-[#1e1e1e] rounded-lg p-6 border border-[#2f2f2f]">
              <h3 className="text-lg font-semibold mb-4 flex items-center text-white">
                <Filter className="mr-2 h-5 w-5" />
                Filtros
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => setFilter('all')}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    filter === 'all' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-[#2f2f2f] hover:text-white'
                  }`}
                >
                  Todas ({notifications.length})
                </button>
                <button
                  onClick={() => setFilter('unread')}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    filter === 'unread' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-[#2f2f2f] hover:text-white'
                  }`}
                >
                  Não lidas ({unreadCount})
                </button>
                <button
                  onClick={() => setFilter('success')}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    filter === 'success' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-[#2f2f2f] hover:text-white'
                  }`}
                >
                  Sucesso
                </button>
                <button
                  onClick={() => setFilter('warning')}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    filter === 'warning' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-[#2f2f2f] hover:text-white'
                  }`}
                >
                  Avisos
                </button>
                <button
                  onClick={() => setFilter('info')}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    filter === 'info' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-[#2f2f2f] hover:text-white'
                  }`}
                >
                  Informações
                </button>
                <button
                  onClick={() => setFilter('error')}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    filter === 'error' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-[#2f2f2f] hover:text-white'
                  }`}
                >
                  Erros
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-[#2f2f2f]">
                <button
                  onClick={markAllAsRead}
                  className="w-full flex items-center justify-center p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Marcar todas como lidas
                </button>
              </div>
            </div>
          </div>

          {/* Lista de Notificações */}
          <div className="lg:col-span-3">
            <div className="space-y-4">
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map((notification) => {
                  const IconComponent = notification.icon
                  return (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`bg-[#1e1e1e] rounded-lg p-6 border transition-all ${
                        !notification.isRead 
                          ? 'border-blue-500/50 shadow-lg' 
                          : 'border-[#2f2f2f] hover:border-[#3f3f3f]'
                      }`}
                    >
                      <div className="flex items-start">
                        <div className={`flex-shrink-0 ${notification.bgColor} p-2 rounded-lg`}>
                          <IconComponent className={`h-5 w-5 ${notification.color}`} />
                        </div>
                        <div className="ml-4 flex-grow">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className={`text-lg font-semibold ${!notification.isRead ? 'text-white' : 'text-gray-300'}`}>
                                {notification.title}
                              </h4>
                              <p className="text-gray-400 mt-1">{notification.message}</p>
                              <div className="flex items-center mt-2 text-sm text-gray-500">
                                <Clock className="h-4 w-4 mr-1" />
                                {notification.time}
                              </div>
                            </div>
                            <div className="flex space-x-2 ml-4">
                              {!notification.isRead && (
                                <button
                                  onClick={() => markAsRead(notification.id)}
                                  className="p-2 text-gray-400 hover:text-blue-400 hover:bg-[#2f2f2f] rounded-lg transition-colors"
                                  title="Marcar como lida"
                                >
                                  <Eye className="h-4 w-4" />
                                </button>
                              )}
                              <button
                                onClick={() => deleteNotification(notification.id)}
                                className="p-2 text-gray-400 hover:text-red-400 hover:bg-[#2f2f2f] rounded-lg transition-colors"
                                title="Excluir notificação"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                              <button className="p-2 text-gray-400 hover:text-white hover:bg-[#2f2f2f] rounded-lg transition-colors">
                                <MoreVertical className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                })
              ) : (
                <div className="text-center py-12">
                  <Bell className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-400 mb-2">Nenhuma notificação encontrada</h3>
                  <p className="text-gray-500">Não há notificações que correspondam ao filtro selecionado.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default NotificacoesPage
