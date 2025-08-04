"use client"

import React from 'react'
import { motion } from "framer-motion"
import { getDashboardData } from '../../lib/supabase-queries'
import { StatCard } from '../ui'
import { DollarSign, ShoppingBag, Users, SquareActivity } from 'lucide-react'
import { useAsyncData } from '../hooks/useAsyncData'

const DynamicDashboard = () => {
    const { data: dashboardData } = useAsyncData(
        getDashboardData,
        [],
        { 
            loadingText: 'Carregando dados do dashboard...', 
            useGlobalLoading: true,
            showLocalLoadingOnStart: false
        }
    )

    // Usar dados padrão enquanto carrega
    const data = dashboardData || {
        totalSales: 45678,
        totalProducts: 156,
        totalClients: 1234,
        totalOrders: 2568
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

    return (
        <motion.div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
        >
            <StatCard 
                name="Vendas Totais" 
                icon={DollarSign} 
                value={formatCurrency(data.totalSales)} 
            />
            <StatCard 
                name="Total Produtos" 
                icon={ShoppingBag} 
                value={formatNumber(data.totalProducts)} 
            />
            <StatCard 
                name="Total Clientes" 
                icon={Users} 
                value={formatNumber(data.totalClients)} 
            />
            <StatCard 
                name="Total Pedidos" 
                icon={SquareActivity} 
                value={formatNumber(data.totalOrders)} 
            />
        </motion.div>
    )
}

export default DynamicDashboard
