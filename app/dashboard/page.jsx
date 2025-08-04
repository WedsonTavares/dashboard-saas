"use client"

import { redirect } from 'next/navigation'
import { createServerSupabase } from '../../utils/supabase/server'
import { DynamicDashboard } from '../../components/dashboard'
import React from 'react'
import { motion } from "framer-motion"
import { 
  SalesOverviewChart, 
  CategoryDistributionChart, 
  OrderDistributionChart, 
  ProductPerformanceChart 
} from '../../components/features/analytics'

export default function DashboardPage() {
  return (
    <div className='flex-1 overflow-auto relative z-10'>
      <main className='max-w-7xl mx-auto py-4 px-4 lg:px-8'>
        {/* Dashboard Dinâmico com dados do Supabase */}
        <div className='mb-6'>
          <h2 className='text-2xl font-semibold text-gray-100 mb-2'>
            Dashboard Analytics
          </h2>
          <p className='text-gray-400'>
            Estatísticas atualizadas com dados do banco de dados
          </p>
        </div>
        
        <DynamicDashboard />

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          <SalesOverviewChart />
          <CategoryDistributionChart />
          <OrderDistributionChart />
          <ProductPerformanceChart />
        </div>
      </main>
    </div>
  )
}
