"use client"
import React, { useState, useEffect } from 'react'
import { Pie, ResponsiveContainer, PieChart, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ["#FBC02D", "#03A9F4", "#EF4444", "#8BC34A"];


const OrderDistribuitionChart = () => {

  const [orderStatusData, setOrderStatusData] = useState([])

  useEffect(() => {
    fetch('/data/data.json')
      .then((res) => res.json())
      .then((data) => setOrderStatusData(data.orderStatus))
  }, [])

  return (
    <div className='bg-[#1e1e1e] backdrop-blur-md shadow-lg rounded-xl 
    p-4 md:p-6 border border-[#1f1f1f] mx-2 md:mx-0'
    >
      <h2 className='text-base md:text-xl font-semibold text-gray-100 text-center md:text-left'>
        Status do Pedido
        <div className='w-full h-64 md:h-80'>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={orderStatusData}
                cx='50%'
                cy='50%'
                outerRadius={70}
                dataKey='value'
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                labelLine={{ stroke: "#9ca3af" }}
              >
                {orderStatusData.map((entry, index) => (
                  <Cell
                    Key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(31,41,55,0.8)',
                  borderColor: '#4b5563',
                  borderRadius: '8px',
                  padding: '8px',
                  fontSize: '12px'
                }}
                itemStyle={{ color: '#e5e7b' }}
                cursor={{ fill: 'rgba(255,255,255, 0.1)' }}
              />
              <Legend
                iconType='circle'
                layout='horizontal'
                align='center'
                wrapperStyle={{ fontSize: 12 }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </h2>
    </div>
  )
}

export default OrderDistribuitionChart