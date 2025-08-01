import React from 'react'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import ClientsTable from '../../components/ClientsTable'

const ClientsPage = () => {
    return (
        <div className='flex h-screen bg-[#0a0a0a] text-gray-100 overflow-hidden'>
            <div className='fixed inset-0 z-0'>
                <div className='absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a] opacity-80' />
                <div className='absolute inset-0 backdrop-blur-sm' />
            </div>

            <Sidebar />
            <div className='flex-1 flex flex-col overflow-hidden relative z-10'>
                <Header />
                <main className='flex-1 overflow-x-hidden overflow-y-auto bg-transparent'>
                    <div className='container mx-auto px-6 py-8'>
                        <div className='mb-8'>
                            <h1 className='text-3xl font-semibold text-gray-100'>Clientes</h1>
                            <p className='text-gray-400 mt-2'>Gerencie seus clientes</p>
                        </div>
                        <ClientsTable />
                    </div>
                </main>
            </div>
        </div>
    )
}

export default ClientsPage
