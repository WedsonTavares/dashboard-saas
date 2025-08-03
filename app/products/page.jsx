"use client"

import React from 'react'
import { motion } from "framer-motion"
import { ChartBarDecreasing, DollarSign, ShoppingBag, SquareActivity } from 'lucide-react'
import { StatCard } from '../../components/ui'
import { ProductsTable } from '../../components/tables'


const Productspage = () => {
    return (
        <div className='flex-1 overflow-auto relative z-10'>
            <main className='max-w-7xl mx-auto px-4 lg:px-8  py-6 '>
                <motion.div className=' grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <StatCard name="Total Produtos" icon={ShoppingBag} value={"4,352"} />
                    <StatCard name="Total Pedidos" icon={SquareActivity} value={"1,234"} />
                    <StatCard name="Total Clientes" icon={DollarSign} value={"567"} />
                    <StatCard name="Total Receita" icon={ChartBarDecreasing} value={"$12,345"} />
                </motion.div>

                <ProductsTable />
            </main>
        </div>
    )
}

export default Productspage
