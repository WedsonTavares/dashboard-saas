"use client";

import React, { useState, useEffect } from 'react'
import { motion } from "framer-motion";
import { getOrders } from '../../lib/supabase-queries'
import { Edit, Search, Trash2, RefreshCw, Save } from 'lucide-react';

const OrdersTable = () => {

    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const [filteredOrders, setFilteredOrders] = useState([])
    const [editingRow, setEditingRow] = useState(null)
    const [saving, setSaving] = useState(false)

    // Carregar pedidos do Supabase
    useEffect(() => {
        loadOrders()
    }, [])

    // Filtrar pedidos quando searchTerm ou orders mudarem
    useEffect(() => {
        const filtered = orders.filter((order) =>
            order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.email.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setFilteredOrders(filtered)
    }, [searchTerm, orders])

    const loadOrders = async () => {
        setLoading(true)
        try {
            const data = await getOrders()
            setOrders(data || [])
        } catch (error) {
            console.error('Erro ao carregar pedidos:', error)
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
            const orderToUpdate = orders.find(o => o.id === id)
            const updatedOrder = await updateOrder(id, {
                status: orderToUpdate.status,
                total: orderToUpdate.total
            })
            
            if (updatedOrder) {
                console.log('Pedido atualizado com sucesso!')
                setEditingRow(null)
            }
        } catch (error) {
            console.error('Erro ao salvar pedido:', error)
            alert('Erro ao salvar pedido. Tente novamente.')
        } finally {
            setSaving(false)
        }
    }

    const handleChange = (id, field, value) => {
        setOrders(prevOrders =>
            prevOrders.map(order =>
                order.id === id ? { ...order, [field]: field === 'total' ? Number(value) : value } : order
            )
        )
    }

    const handleDelete = async (id) => {
        const order = orders.find(o => o.id === id)
        const confirmDelete = window.confirm(`Tem certeza que deseja excluir o pedido "${order?.id}"?`)

        if (confirmDelete) {
            setSaving(true)
            try {
                const deletedOrder = await deleteOrder(id)
                if (deletedOrder) {
                    setOrders(prevOrders => prevOrders.filter(order => order.id !== id))
                    console.log('Pedido excluído com sucesso!')
                }
            } catch (error) {
                console.error('Erro ao excluir pedido:', error)
                alert('Erro ao excluir pedido. Tente novamente.')
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
                            mx-2 md:mx-0'>
            <div className='flex flex-col md:flex-row justify-between items-center mb-6 gap-4 md:gap-0'>
                <div className='flex items-center gap-3'>
                    <h2 className='text-lg md:text-xl font-semibold text-gray-100 text-center md:text-left'>
                        Lista de Pedidos
                    </h2>
                    <button
                        onClick={loadOrders}
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
                        placeholder='Pesquisar pedidos...'
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
                        <p className='text-gray-400'>Carregando pedidos...</p>
                    </div>
                ) : (
                <table className='min-w-full divide-y divide-gray-100'>
                    <thead>
                        <tr>
                            {["Pedido",
                                "Cliente",
                                "Total",
                                "Status",
                                "Data",
                                "Cidade",
                                "Ações",
                            ].map((header) => (
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
                        {filteredOrders.map((order) => (
                            <motion.tr
                                key={order.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1, duration: 0.3 }}
                                className='flex flex-col md:table-row mb-4 md:mb-0 border-b md:border-b-0 border-gray-700 md:border-none p-2 md:p-0'
                            >
                                {/* mobile */}

                                <td className='md:hidden px-3 py-2'>
                                    <div className='flex items-center justify-between'>
                                        <div className='flex flex-col'>
                                            <div className='text-sm font-medium text-gray-100'>{order.id}</div>
                                            <div className='text-xs text-gray-100'>{order.client}</div>
                                            <div className='text-xs text-gray-400'>{order.email}</div>
                                        </div>
                                        <div className='flex space-x-1 -mt-1 -mr-1'>
                                            <button 
                                                className='text-indigo-500 hover:text-indigo-300 cursor-pointer'
                                                onClick={() => editingRow === order.id ?
                                                    handleSaveClick(order.id) :
                                                    handleEditClick(order.id)}
                                                disabled={saving}
                                            >
                                                {editingRow === order.id ?
                                                    (saving ? <RefreshCw size={16} className="animate-spin" /> : <Save size={16} />) :
                                                    <Edit size={16} />}
                                            </button>
                                            <button 
                                                className='text-red-500 hover:text-red-300 cursor-pointer'
                                                onClick={() => handleDelete(order.id)}
                                                disabled={saving}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className='mt-2 text-xs text-gray-300'>
                                        <div>Total: {editingRow === order.id ? (
                                            <input 
                                                type="number" 
                                                step="0.01"
                                                className='bg-transparent text-white border border-gray-400 w-20 text-center text-xs ml-1'
                                                value={order.total}
                                                onChange={(e) => handleChange(order.id, 'total', e.target.value)}
                                            />
                                        ) : `$${order.total.toFixed(2)}`}</div>
                                        <div className='flex items-center gap-1'>
                                            Status:
                                            {editingRow === order.id ? (
                                                <select 
                                                    className='bg-gray-700 text-white border border-gray-400 text-xs ml-1 px-1 rounded'
                                                    value={order.status}
                                                    onChange={(e) => handleChange(order.id, 'status', e.target.value)}
                                                >
                                                    <option value="Pendente">Pendente</option>
                                                    <option value="Processando">Processando</option>
                                                    <option value="Entregue">Entregue</option>
                                                    <option value="Cancelado">Cancelado</option>
                                                </select>
                                            ) : (
                                                <span className={`px-2 inline-flex font-semibold rounded-full 
                                                    ${order.status === 'Entregue' ? 'bg-green-400 text-green-800' :
                                                        order.status === 'Pendente' ? 'bg-yellow-400 text-yellow-800' :
                                                            'bg-red-500 text-red-100'}`}>
                                                    {order.status}
                                                </span>
                                            )}
                                        </div>
                                        <div className=''>Data: {order.date}</div>
                                        <div>Cidade: {order.country}</div>
                                    </div>
                                </td>
                                {/* desktop */}
                                <td className='hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100'>
                                    {order.id}
                                </td>
                                <td className='hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100'>
                                    {order.client}
                                </td>
                                <td className='hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100'>
                                    {editingRow === order.id ? (
                                        <input 
                                            type="number" 
                                            step="0.01"
                                            className='bg-transparent text-white border border-gray-400 w-20 text-center'
                                            value={order.total}
                                            onChange={(e) => handleChange(order.id, 'total', e.target.value)}
                                        />
                                    ) : `$ ${order.total.toFixed(2)}`}
                                </td>

                                <td className='hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100'>
                                    {editingRow === order.id ? (
                                        <select 
                                            className='bg-gray-700 text-white border border-gray-400 px-2 py-1 rounded'
                                            value={order.status}
                                            onChange={(e) => handleChange(order.id, 'status', e.target.value)}
                                        >
                                            <option value="Pendente">Pendente</option>
                                            <option value="Processando">Processando</option>
                                            <option value="Entregue">Entregue</option>
                                            <option value="Cancelado">Cancelado</option>
                                        </select>
                                    ) : (
                                        <span className={`px-2 inline-flex font-semibold rounded-full 
                                                    ${order.status === 'Entregue' ? 'bg-green-400 text-green-800' :
                                                order.status === 'Pendente' ? 'bg-yellow-400 text-yellow-800' :
                                                    'bg-red-500 text-red-100'}`}>
                                            {order.status}
                                        </span>
                                    )}
                                </td>

                                <td className='hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300'>
                                    {(() => {
                                        // Tenta converter datas tipo 'Jan 30, 2025' para '30/01/2025'
                                        const date = new Date(order.date);
                                        if (!isNaN(date)) {
                                            return date.toLocaleDateString('pt-BR');
                                        }
                                        // Se não for possível converter, mostra o valor original
                                        return order.date;
                                    })()}
                                </td>
                                <td className='hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300'>
                                    {order.country}
                                </td>
                                <td className='hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300'>
                                    <div className='flex scroll-px-1 -ml-2'></div>
                                    <button 
                                        className='text-indigo-500 hover:text-indigo-300 mr-2 cursor-pointer'
                                        onClick={() => editingRow === order.id ?
                                            handleSaveClick(order.id) :
                                            handleEditClick(order.id)}
                                        disabled={saving}
                                    >
                                        {editingRow === order.id ?
                                            (saving ? <RefreshCw size={16} className="animate-spin" /> : <Save size={16} />) :
                                            <Edit size={16} />}
                                    </button>
                                    <button 
                                        className='text-red-500 hover:text-red-300 cursor-pointer'
                                        onClick={() => handleDelete(order.id)}
                                        disabled={saving}
                                    >
                                        <Trash2 size={16} />
                                    </button>
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

export default OrdersTable;