"use client";

import React, { useState, useEffect } from 'react'
import { motion } from "framer-motion";
import { getClients } from '../../lib/supabase-queries'
import { Edit, Search, Trash2, RefreshCw, Save } from 'lucide-react';
import Image from 'next/image';

const ClientsTable = () => {

    const [clients, setClients] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const [filteredClients, setFilteredClients] = useState([])
    const [editingRow, setEditingRow] = useState(null)
    const [saving, setSaving] = useState(false)

    // Carregar clientes do Supabase
    useEffect(() => {
        loadClients()
    }, [])

    // Filtrar clientes quando searchTerm ou clients mudarem
    useEffect(() => {
        const filtered = clients.filter((client) =>
            client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.country.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setFilteredClients(filtered)
    }, [searchTerm, clients])

    const loadClients = async () => {
        setLoading(true)
        try {
            const data = await getClients()
            setClients(data || [])
        } catch (error) {
            console.error('Erro ao carregar clientes:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleSearch = (event) => {
        setSearchTerm(event.target.value)
    }

    const handleEditClick = (id) => {
        setEditingRow(id)
    }

    const handleSaveClick = async (id) => {
        setSaving(true)
        try {
            const clientToUpdate = clients.find(c => c.id === id)
            const updatedClient = await updateClient(id, {
                name: clientToUpdate.name,
                email: clientToUpdate.email,
                phone_number: clientToUpdate.phone_number,
                country: clientToUpdate.country
            })
            
            if (updatedClient) {
                console.log('Cliente atualizado com sucesso!')
                setEditingRow(null)
            }
        } catch (error) {
            console.error('Erro ao salvar cliente:', error)
            alert('Erro ao salvar cliente. Tente novamente.')
        } finally {
            setSaving(false)
        }
    }

    const handleChange = (id, field, value) => {
        setClients(prevClients =>
            prevClients.map(client =>
                client.id === id ? { ...client, [field]: value } : client
            )
        )
    }

    const handleDelete = async (id) => {
        const client = clients.find(c => c.id === id)
        const confirmDelete = window.confirm(`Tem certeza que deseja excluir o cliente "${client?.name}"?`)

        if (confirmDelete) {
            setSaving(true)
            try {
                const deletedClient = await deleteClient(id)
                if (deletedClient) {
                    setClients(prevClients => prevClients.filter(client => client.id !== id))
                    console.log('Cliente excluído com sucesso!')
                }
            } catch (error) {
                console.error('Erro ao excluir cliente:', error)
                alert('Erro ao excluir cliente. Tente novamente.')
            } finally {
                setSaving(false)
            }
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className='bg-[#1e1e1e] backdrop-blur-md shadow-lg rounded-xl p-4 md:p-6 border-[#1f1f1f] border 
                            mx-2 md:mx-0'
        >
            <div className='flex flex-col md:flex-row justify-between items-center mb-6 gap-4 md:gap-0'>
                <div className='flex items-center gap-3'>
                    <h2 className='text-lg md:text-xl font-semibold text-gray-100 text-center md:text-left'>
                        Lista de Clientes
                    </h2>
                    <button
                        onClick={loadClients}
                        disabled={loading}
                        className='p-2 text-gray-400 hover:text-gray-200 transition-colors
                                 disabled:opacity-50 disabled:cursor-not-allowed'
                        title='Atualizar dados'
                    >
                        <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
                    </button>
                </div>
                <div className='relative w-full md:w-auto'>
                    <input
                        type="text"
                        placeholder='Pesquisar clientes...'
                        value={searchTerm}
                        onChange={handleSearch}
                        className='bg-[#2f2f2f] text-white placeholder:text-gray-400 rounded-lg pl-10 py-2 pr-4 w-full md:w-64
                    focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200 text-sm'
                    />
                    <Search className='absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400' size={18} />
                </div>
            </div>
            
            <div className='overflow-x-auto'>
                {loading ? (
                    <div className='text-center py-8'>
                        <RefreshCw className='animate-spin mx-auto text-gray-400 mb-2' size={24} />
                        <p className='text-gray-400'>Carregando clientes...</p>
                    </div>
                ) : (
                <table className='min-w-full divide-y divide-gray-100'>
                    <thead>
                        <tr>
                            {["Cliente", "ID", "Email", "Telefone", "País", "Ações"].map((header) => (
                                <th
                                    key={header}
                                    className='px-3 md:px-6 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider md:table-cell'
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-700'>
                        {filteredClients.map((client) => (
                            <motion.tr
                                key={client.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1, duration: 0.3 }}
                                className={`flex flex-col md:table-row mb-4 md:mb-0 border-b md:border-b-0 border-gray-700 md:border-none p-2 md:p-0 ${
                                    editingRow === client.id ? 'bg-[#2f2f2f] ring-gray-500' : ""
                                }`}
                            >
                                {/* Mobile Layout */}
                                <td className='md:hidden px-3 py-2'>
                                    <div className='flex items-center justify-between'>
                                        <div className='flex items-center'>
                                            <Image 
                                                src={client.image || '/images/user1.jpg'} 
                                                alt={client.name} 
                                                width={36} 
                                                height={36} 
                                                className='w-9 h-9 rounded-full'
                                            />
                                            <div className='ml-3'>
                                                <div className='text-sm font-medium text-gray-100'>
                                                    {editingRow === client.id ? (
                                                        <input 
                                                            type="text"
                                                            className='bg-transparent text-white border border-gray-400 text-sm'
                                                            value={client.name}
                                                            onChange={(e) => handleChange(client.id, 'name', e.target.value)}
                                                        />
                                                    ) : client.name}
                                                </div>
                                                <div className='text-xs text-gray-400'>
                                                    ID: {client.id}
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex space-x-1 -mt-1 -mr-1'>
                                            <button 
                                                className='text-indigo-500 hover:text-indigo-300 cursor-pointer'
                                                onClick={() => editingRow === client.id ?
                                                    handleSaveClick(client.id) :
                                                    handleEditClick(client.id)}
                                                disabled={saving}
                                            >
                                                {editingRow === client.id ?
                                                    (saving ? <RefreshCw size={14} className="animate-spin" /> : <Save size={14} />) :
                                                    <Edit size={14} />}
                                            </button>
                                            <button 
                                                className='text-red-500 hover:text-red-300 cursor-pointer'
                                                onClick={() => handleDelete(client.id)}
                                                disabled={saving}
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className='mt-2 text-xs text-gray-300'>
                                        <div>Email: {editingRow === client.id ? (
                                            <input 
                                                type="email"
                                                className='bg-transparent text-white border border-gray-400 text-xs ml-1 w-full mt-1'
                                                value={client.email}
                                                onChange={(e) => handleChange(client.id, 'email', e.target.value)}
                                            />
                                        ) : client.email}</div>
                                        <div>Telefone: {editingRow === client.id ? (
                                            <input 
                                                type="text"
                                                className='bg-transparent text-white border border-gray-400 text-xs ml-1'
                                                value={client.phone_number}
                                                onChange={(e) => handleChange(client.id, 'phone_number', e.target.value)}
                                            />
                                        ) : client.phone_number}</div>
                                        <div>País: {editingRow === client.id ? (
                                            <input 
                                                type="text"
                                                className='bg-transparent text-white border border-gray-400 text-xs ml-1'
                                                value={client.country}
                                                onChange={(e) => handleChange(client.id, 'country', e.target.value)}
                                            />
                                        ) : client.country}</div>
                                    </div>
                                </td>

                                {/* Desktop Layout */}
                                <td className='hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100'>
                                    <div className='flex items-center'>
                                        <Image
                                            src={client.image || '/images/user1.jpg'}
                                            alt={client.name}
                                            width={40}
                                            height={40}
                                            className='w-10 h-10 rounded-full'
                                        />
                                        <div className='ml-4'>
                                            {editingRow === client.id ? (
                                                <input 
                                                    type="text"
                                                    className='bg-transparent text-white border border-gray-400'
                                                    value={client.name}
                                                    onChange={(e) => handleChange(client.id, 'name', e.target.value)}
                                                />
                                            ) : client.name}
                                        </div>
                                    </div>
                                </td>

                                <td className='hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300'>
                                    {client.id}
                                </td>

                                <td className='hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300'>
                                    {editingRow === client.id ? (
                                        <input 
                                            type="email"
                                            className='bg-transparent text-white border border-gray-400 w-48'
                                            value={client.email}
                                            onChange={(e) => handleChange(client.id, 'email', e.target.value)}
                                        />
                                    ) : client.email}
                                </td>

                                <td className='hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300'>
                                    {editingRow === client.id ? (
                                        <input 
                                            type="text"
                                            className='bg-transparent text-white border border-gray-400 w-32'
                                            value={client.phone_number}
                                            onChange={(e) => handleChange(client.id, 'phone_number', e.target.value)}
                                        />
                                    ) : client.phone_number}
                                </td>

                                <td className='hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300'>
                                    {editingRow === client.id ? (
                                        <input 
                                            type="text"
                                            className='bg-transparent text-white border border-gray-400 w-24'
                                            value={client.country}
                                            onChange={(e) => handleChange(client.id, 'country', e.target.value)}
                                        />
                                    ) : client.country}
                                </td>

                                <td className='hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300'>
                                    <div className='flex space-x-1'>
                                        <button 
                                            className='text-indigo-500 hover:text-indigo-300 cursor-pointer'
                                            onClick={() => editingRow === client.id ?
                                                handleSaveClick(client.id) :
                                                handleEditClick(client.id)}
                                            disabled={saving}
                                        >
                                            {editingRow === client.id ?
                                                (saving ? <RefreshCw size={16} className="animate-spin" /> : <Save size={16} />) :
                                                <Edit size={16} />}
                                        </button>
                                        <button 
                                            className='text-red-500 hover:text-red-300 cursor-pointer'
                                            onClick={() => handleDelete(client.id)}
                                            disabled={saving}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
                )}
            </div>
        </motion.div>
    )
}

export default ClientsTable;
