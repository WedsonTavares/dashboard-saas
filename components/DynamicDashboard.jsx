"use client"

import React, { useState, useEffect } from 'react'
import { motion } from "framer-motion"
import { getDashboardData } from '../lib/supabase-queries'
import Statcard from './StatCard'
import { DollarSign, ShoppingBag, Users, SquareActivity } from 'lucide-react'

const DynamicDashboard = () => {
    const [dashboardData, setDashboardData] = useState({
        totalSales: 0,
        totalProducts: 0,
        totalClients: 0,
        totalOrders: 0
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadDashboardData()
    }, [])

    const loadDashboardData = async () => {
        setLoading(true)
        try {
            const data = await getDashboardData()
            setDashboardData(data)
        } catch (error) {
            console.error('Erro ao carregar dados do dashboard:', error)
        } finally {
            setLoading(false)
        }
    }

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'USD'
        }).format(value)
    }

    const formatNumber = (value) => {
        return new Intl.NumberFormat('pt-BR').format(value)
    }

    if (loading) {
        return (
            <motion.div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                {[1, 2, 3, 4].map((index) => (
                    <div key={index} className='bg-[#1e1e1e] backdrop-blur-md shadow-lg rounded-xl border border-[#1f1f1f] animate-pulse'>
                        <div className='px-4 py-5 sm:p-6'>
                            <div className='flex items-center'>
                                <div className='w-5 h-5 bg-gray-600 rounded mr-2'></div>
                                <div className='w-24 h-4 bg-gray-600 rounded'></div>
                            </div>
                            <div className='w-20 h-8 bg-gray-600 rounded mt-2'></div>
                        </div>
                    </div>
                ))}
            </motion.div>
        )
    }

    return (
        <motion.div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
        >
            <Statcard 
                name="Receita Total" 
                icon={DollarSign} 
                value={formatCurrency(dashboardData.totalSales)} 
            />
            <Statcard 
                name="Total Clientes" 
                icon={Users} 
                value={formatNumber(dashboardData.totalClients)} 
            />
            <Statcard 
                name="Total Produtos" 
                icon={ShoppingBag} 
                value={formatNumber(dashboardData.totalProducts)} 
            />
            <Statcard 
                name="Total Pedidos" 
                icon={SquareActivity} 
                value={formatNumber(dashboardData.totalOrders)} 
            />
        </motion.div>
    )
}

export default DynamicDashboard
