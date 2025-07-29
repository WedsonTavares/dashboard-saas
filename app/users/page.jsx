"use client";

import Statcard from '../../components/StatCard';
import React from 'react'
import { motion } from "framer-motion";
import { RotateCcw, UserCheck, UserPlus, Users, UsersIcon } from 'lucide-react';
import UsersTable from '../../components/UsersTable';

const UsersPage = () => {
    return (
        <div className='flex-1 overflow-hidden relative z-10'>
            <main className='max-w-7xl mx-auto px-4 lg:px-8 py-6'>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className=" grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                    <Statcard
                        name="Total de Clientes"
                        icon={UsersIcon}
                        value="1,437"
                    />
                    <Statcard
                        name="Novos Clientes"
                        icon={UserPlus}
                        value="860"
                    />
                    <Statcard
                        name="Clientes Ativos"
                        icon={UserCheck}
                        value="4080"
                    />
                    <Statcard
                        name="Total de Clientes"
                        icon={RotateCcw}
                        value="2730"
                    />
                </motion.div>

                <UsersTable />
            </main>
        </div>
    )
}

export default UsersPage