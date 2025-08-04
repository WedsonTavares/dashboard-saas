'use client'

import { motion } from 'framer-motion'

export default function Loading({ 
  size = 'md', 
  text = 'Carregando...', 
  fullScreen = false,
  overlay = false 
}) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  }

  const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center space-y-4">
      {/* Spinner principal */}
      <div className="relative">
        <motion.div
          className={`${sizeClasses[size]} border-4 border-[#2f2f2f] border-t-blue-500 rounded-full`}
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Spinner interno */}
        <motion.div
          className={`absolute inset-2 border-2 border-[#404040] border-b-purple-500 rounded-full`}
          animate={{ rotate: -360 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Texto com animação */}
      {text && (
        <motion.p
          className={`${textSizes[size]} text-gray-300 font-medium`}
          initial={{ opacity: 0.6 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          {text}
        </motion.p>
      )}

      {/* Dots animados */}
      <div className="flex space-x-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-blue-500 rounded-full"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
      </div>
    </div>
  )

  if (fullScreen) {
    return (
      <motion.div
        className={`fixed inset-0 z-50 flex items-center justify-center ${
          overlay ? 'bg-black/80 backdrop-blur-sm' : 'bg-[#1e1e1e]'
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <LoadingSpinner />
        </motion.div>
      </motion.div>
    )
  }

  return (
    <div className="flex items-center justify-center p-4">
      <LoadingSpinner />
    </div>
  )
}

// Componente de loading inline para botões
export function ButtonLoading({ size = 'sm' }) {
  const sizeClasses = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5'
  }

  return (
    <motion.div
      className={`${sizeClasses[size]} border-2 border-white/30 border-t-white rounded-full`}
      animate={{ rotate: 360 }}
      transition={{
        duration: 0.8,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  )
}

// Componente de loading para páginas
export function PageLoading({ text = 'Carregando página...', logo = false }) {
  return (
    <div className="min-h-screen bg-[#1e1e1e] flex items-center justify-center">
      <div className="text-center space-y-6">
        {logo && (
          <motion.div
            className="text-4xl font-bold text-white mb-8"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Dashboard SaaS
          </motion.div>
        )}
        
        <Loading size="xl" text={text} />
        
        {/* Barra de progresso simulada */}
        <div className="w-64 h-1 bg-[#2f2f2f] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: 2,
              ease: "easeInOut"
            }}
          />
        </div>
      </div>
    </div>
  )
}
