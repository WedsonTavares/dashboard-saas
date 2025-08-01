'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Database, 
  Palette, 
  Globe,
  Moon,
  Sun,
  Save,
  RefreshCw
} from 'lucide-react'

const ConfiguracoesPage = () => {
  const [theme, setTheme] = useState('light')
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true
  })
  const [profile, setProfile] = useState({
    name: 'Admin User',
    email: 'admin@dashboard.com',
    role: 'Administrador'
  })

  const handleSave = () => {
    // Simular salvamento
    alert('Configurações salvas com sucesso!')
  }

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="mb-6 lg:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Configurações</h1>
          <p className="text-sm sm:text-base text-gray-400">Gerencie suas preferências e configurações do sistema</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
          {/* Menu de Configurações */}
          <div className="xl:col-span-1 order-2 xl:order-1">
            <div className="bg-[#1e1e1e] rounded-lg shadow-sm p-4 sm:p-6 border border-[#2f2f2f]">
              <h2 className="text-base sm:text-lg font-semibold mb-4 flex items-center text-white">
                <Settings className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Categorias
              </h2>
              <nav className="space-y-2">
                <a href="#perfil" className="flex items-center p-2 sm:p-3 rounded-lg bg-blue-600 text-white text-sm sm:text-base">
                  <User className="mr-2 sm:mr-3 h-4 w-4" />
                  Perfil
                </a>
                <a href="#notificacoes" className="flex items-center p-2 sm:p-3 rounded-lg hover:bg-[#2f2f2f] text-gray-300 hover:text-white transition-colors text-sm sm:text-base">
                  <Bell className="mr-2 sm:mr-3 h-4 w-4" />
                  Notificações
                </a>
                <a href="#seguranca" className="flex items-center p-2 sm:p-3 rounded-lg hover:bg-[#2f2f2f] text-gray-300 hover:text-white transition-colors text-sm sm:text-base">
                  <Shield className="mr-2 sm:mr-3 h-4 w-4" />
                  Segurança
                </a>
                <a href="#aparencia" className="flex items-center p-2 sm:p-3 rounded-lg hover:bg-[#2f2f2f] text-gray-300 hover:text-white transition-colors text-sm sm:text-base">
                  <Palette className="mr-2 sm:mr-3 h-4 w-4" />
                  Aparência
                </a>
                <a href="#sistema" className="flex items-center p-2 sm:p-3 rounded-lg hover:bg-[#2f2f2f] text-gray-300 hover:text-white transition-colors text-sm sm:text-base">
                  <Database className="mr-2 sm:mr-3 h-4 w-4" />
                  Sistema
                </a>
              </nav>
            </div>
          </div>

          {/* Conteúdo das Configurações */}
          <div className="xl:col-span-2 space-y-6 order-1 xl:order-2">
            
            {/* Perfil */}
            <div id="perfil" className="bg-[#1e1e1e] rounded-lg shadow-sm p-4 sm:p-6 border border-[#2f2f2f]">
              <h3 className="text-base sm:text-lg font-semibold mb-4 flex items-center text-white">
                <User className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Informações do Perfil
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Nome</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                    className="w-full p-2 sm:p-3 bg-[#2f2f2f] border border-[#3f3f3f] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 text-sm sm:text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                    className="w-full p-2 sm:p-3 bg-[#2f2f2f] border border-[#3f3f3f] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 text-sm sm:text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Função</label>
                  <select
                    value={profile.role}
                    onChange={(e) => setProfile({...profile, role: e.target.value})}
                    className="w-full p-2 sm:p-3 bg-[#2f2f2f] border border-[#3f3f3f] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white text-sm sm:text-base"
                  >
                    <option value="Administrador">Administrador</option>
                    <option value="Editor">Editor</option>
                    <option value="Visualizador">Visualizador</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Notificações */}
            <div id="notificacoes" className="bg-[#1e1e1e] rounded-lg shadow-sm p-4 sm:p-6 border border-[#2f2f2f]">
              <h3 className="text-base sm:text-lg font-semibold mb-4 flex items-center text-white">
                <Bell className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Preferências de Notificação
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-white text-sm sm:text-base">Notificações por Email</h4>
                    <p className="text-xs sm:text-sm text-gray-400">Receba atualizações importantes por email</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.email}
                    onChange={(e) => setNotifications({...notifications, email: e.target.checked})}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-500 rounded bg-[#2f2f2f] flex-shrink-0"
                  />
                </div>
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-white text-sm sm:text-base">Notificações Push</h4>
                    <p className="text-xs sm:text-sm text-gray-400">Receba notificações push no navegador</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.push}
                    onChange={(e) => setNotifications({...notifications, push: e.target.checked})}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-500 rounded bg-[#2f2f2f] flex-shrink-0"
                  />
                </div>
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-white text-sm sm:text-base">SMS</h4>
                    <p className="text-xs sm:text-sm text-gray-400">Receba alertas críticos por SMS</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.sms}
                    onChange={(e) => setNotifications({...notifications, sms: e.target.checked})}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-500 rounded bg-[#2f2f2f] flex-shrink-0"
                  />
                </div>
              </div>
            </div>

            {/* Aparência */}
            <div id="aparencia" className="bg-[#1e1e1e] rounded-lg shadow-sm p-4 sm:p-6 border border-[#2f2f2f]">
              <h3 className="text-base sm:text-lg font-semibold mb-4 flex items-center text-white">
                <Palette className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Aparência
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Tema</label>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <button
                      onClick={() => setTheme('light')}
                      className={`flex items-center justify-center p-3 rounded-lg border-2 transition-colors text-sm sm:text-base ${
                        theme === 'light' ? 'border-blue-500 bg-blue-600 text-white' : 'border-gray-500 bg-[#2f2f2f] text-gray-300 hover:bg-[#3f3f3f]'
                      }`}
                    >
                      <Sun className="mr-2 h-4 w-4" />
                      Claro
                    </button>
                    <button
                      onClick={() => setTheme('dark')}
                      className={`flex items-center justify-center p-3 rounded-lg border-2 transition-colors text-sm sm:text-base ${
                        theme === 'dark' ? 'border-blue-500 bg-blue-600 text-white' : 'border-gray-500 bg-[#2f2f2f] text-gray-300 hover:bg-[#3f3f3f]'
                      }`}
                    >
                      <Moon className="mr-2 h-4 w-4" />
                      Escuro
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Idioma</label>
                  <select className="w-full p-2 sm:p-3 bg-[#2f2f2f] border border-[#3f3f3f] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white text-sm sm:text-base">
                    <option value="pt-BR">Português (Brasil)</option>
                    <option value="en-US">English (US)</option>
                    <option value="es-ES">Español</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4">
              <button className="flex items-center justify-center px-4 py-2 border border-gray-500 rounded-lg hover:bg-[#2f2f2f] text-gray-300 hover:text-white transition-colors text-sm sm:text-base">
                <RefreshCw className="mr-2 h-4 w-4" />
                Restaurar Padrões
              </button>
              <button 
                onClick={handleSave}
                className="flex items-center justify-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
              >
                <Save className="mr-2 h-4 w-4" />
                Salvar Alterações
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default ConfiguracoesPage
