'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import ukFlag from '../../public/images/uk.png'
import { Bell, ChevronDown, LogOut, User } from 'lucide-react'
import admin from '../../public/images/admin.jpg'
import { useAuth } from '../../contexts/AuthContext'

const Header = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [isLoggingOut, setIsLoggingOut] = useState(false)
    const { user, signOut, loading } = useAuth()
    const router = useRouter()

    const handleSignOut = async () => {
        try {
            setIsLoggingOut(true)
            setIsDropdownOpen(false)
            console.log('[HEADER] Iniciando logout...')
            
            await signOut()
            
            console.log('[HEADER] Logout realizado, redirecionando...')
            router.replace('/auth')
            
        } catch (error) {
            console.error('[HEADER] Erro no logout:', error)
            // Mesmo com erro, tentar redirecionar
            router.replace('/auth')
        } finally {
            setIsLoggingOut(false)
        }
    }

    return (
        <header className='bg-[#1e1e1e] shadow-lg border-b border-[#1f1f1f] mx-4 sm:mx-6 lg:mx-8 mt-4 mb-2 rounded-lg'>
            <div className='max-w-7xl mx-auto py-4 px-4 sm:px-6 flex items-center justify-between'>
                <h1 className='text-lg sm:text-xl lg:text-2xl font-semibold text-gray-100'>
                    Dashboard
                </h1>
                <div className='flex items-center space-x-3 sm:space-x-6'>
                    <Image
                        src={ukFlag}
                        alt="country flag"
                        width={25}
                        height={18}
                        className="rounded-full cursor-pointer"
                    />
                    <div className='relative'>
                        <Bell className='w-5 sm:w-6 h-5 sm:h-6 text-gray-300 cursor-pointer hover:text-white' />
                    </div>
                    
                    {/* User Menu Dropdown */}
                    <div className='relative'>
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className='flex items-center space-x-2 sm:space-x-3 hover:bg-[#2f2f2f] rounded-lg p-2 transition-colors'
                        >
                            <Image
                                src={admin}
                                alt='admin'
                                width={35}
                                height={35}
                                className='rounded-full border border-gray-600' 
                            />
                            <div className='hidden sm:block'>
                                <span className='text-gray-100 font-medium'>
                                    {user?.email?.split('@')[0] || 'Usuário'}
                                </span>
                            </div>
                            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Dropdown Menu */}
                        {isDropdownOpen && (
                            <div className='absolute right-0 mt-2 w-48 bg-[#2f2f2f] rounded-lg shadow-lg border border-[#404040] py-2 z-50'>
                                <div className='px-4 py-2 border-b border-[#404040]'>
                                    <p className='text-sm text-gray-400'>Logado como:</p>
                                    <p className='text-sm text-white font-medium truncate'>
                                        {user?.email}
                                    </p>
                                </div>
                                
                                <button className='w-full px-4 py-2 text-left text-gray-300 hover:bg-[#404040] hover:text-white transition-colors flex items-center space-x-2'>
                                    <User className='w-4 h-4' />
                                    <span>Perfil</span>
                                </button>
                                
                                <button 
                                    onClick={handleSignOut}
                                    disabled={isLoggingOut}
                                    className='w-full px-4 py-2 text-left text-gray-300 hover:bg-[#404040] hover:text-white transition-colors flex items-center space-x-2 disabled:opacity-50'
                                >
                                    {isLoggingOut ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                                            <span>Saindo...</span>
                                        </>
                                    ) : (
                                        <>
                                            <LogOut className='w-4 h-4' />
                                            <span>Sair</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header