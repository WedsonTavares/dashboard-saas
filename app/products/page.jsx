"use client"

import React from 'react'
import { motion } from "framer-motion"
import { ChartBarDecreasing, DollarSign, ShoppingBag, SquareActivity } from 'lucide-react'
import { StatCard } from '../../components/ui'
import { ProductsTable } from '../../components/tables'
import { useAsyncData } from '../../components/hooks/useAsyncData'
import { getProducts, getDashboardData } from '../../lib/supabase-queries'
import Loading from '../../components/ui/Loading'

const Productspage = () => {
    const { data: dashboardData } = useAsyncData(
        getDashboardData,
        [],
        { 
            loadingText: 'Carregando estatísticas...', 
            useGlobalLoading: true,
            showLocalLoadingOnStart: false
        }
    )

    const { data: products } = useAsyncData(
        getProducts,
        [],
        { 
            loadingText: 'Carregando produtos...', 
            useGlobalLoading: true,
            showLocalLoadingOnStart: false
        }
    )

    return (
        <div className='flex-1 overflow-auto relative z-10'>
            <main className='max-w-7xl mx-auto px-4 lg:px-8  py-6 '>
                <motion.div className=' grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <StatCard name="Total Produtos" icon={ShoppingBag} value={dashboardData?.totalProducts || "4,352"} />
                    <StatCard name="Total Pedidos" icon={SquareActivity} value={dashboardData?.totalOrders || "1,234"} />
                    <StatCard name="Total Clientes" icon={DollarSign} value={dashboardData?.totalClients || "567"} />
                    <StatCard name="Total Receita" icon={ChartBarDecreasing} value={`$${dashboardData?.totalSales || "12,345"}`} />
                </motion.div>

                <ProductsTable products={products} />
            </main>
        </div>
    )
}

export default Productspage
