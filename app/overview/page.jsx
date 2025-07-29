"use client"

import Statcard from '../../components/StatCard'
import { DollarSign, ShoppingBag, SquareActivity, User, Users } from 'lucide-react'
import React from 'react'
import { motion } from "framer-motion"
import SalesOverviewChart from '../../components/SalesOverviewChart'
import CategoryDisribuitionChart from '../../components/CategoryDisribuitionChart'
import OrderDistribuitionChart from '../../components/OrderDistribuitionChart'
import ProductPerformanceChart from '../../components/ProductPerformanceChart'

const OverviewPage = () => {
    return (
        <div className='flex-1 overflow-auto relative z-10'>
            <main className='max-w-7xl mx-auto py-4 px-4 lg:px-8'>
                <motion.div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <Statcard name="Vendas Totais" icon={DollarSign} value="$182,450" />
                    <Statcard name="Total Clientes" icon={Users} value="$1,437" />
                    <Statcard name="Total Produtos" icon={ShoppingBag} value="$674" />
                    <Statcard name="Estoque" icon={SquareActivity} value="$12,845" />
                </motion.div>

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                    <SalesOverviewChart />
                    <CategoryDisribuitionChart />
                    <OrderDistribuitionChart />
                    <ProductPerformanceChart />
                </div>
            </main>
        </div>
    )
}

export default OverviewPage