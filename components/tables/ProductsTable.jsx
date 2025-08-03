"use client"

import React, { useMemo, useState, useEffect } from 'react'
import { getProducts, updateProduct, deleteProduct } from '../../lib/supabase-queries'
import { motion } from "framer-motion"
import { Edit, Save, Search, Trash2, RefreshCw } from 'lucide-react'
import Image from 'next/image'

const ProductsTable = () => {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const [editingRow, setEditingRow] = useState(null)
    const [saving, setSaving] = useState(false)

    // Carregar produtos do Supabase
    useEffect(() => {
        loadProducts()
    }, [])

    const loadProducts = async () => {
        setLoading(true)
        try {
            const data = await getProducts()
            setProducts(data || [])
        } catch (error) {
            console.error('Erro ao carregar produtos:', error)
        } finally {
            setLoading(false)
        }
    }

    const filteredProducts = useMemo(() => {
        return products.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.toLowerCase())
        )
    }, [searchTerm, products]);

    const handleEditClick = (id) => {
        setEditingRow(id);
    }

    const handleSaveClick = async (id) => {
        setSaving(true)
        try {
            const productToUpdate = products.find(p => p.id === id)
            const updatedProduct = await updateProduct(id, {
                price: productToUpdate.price,
                stock: productToUpdate.stock,
                sales: productToUpdate.sales
            })
            
            if (updatedProduct) {
                setEditingRow(null)
            }
        } catch (error) {
            console.error('Erro ao salvar produto:', error)
            alert('Erro ao salvar produto. Tente novamente.')
        } finally {
            setSaving(false)
        }
    }

    const handleChange = (id, field, value) => {
        if (!/^\d*\.?\d*$/.test(value)) return; //allow only numbers and decimal

        setProducts(prevProducts =>
            prevProducts.map(product =>
                product.id === id ? { ...product, [field]: Number(value) } : product
            )
        );
    }
    const handleDelete = async (id) => {
        const product = products.find(p => p.id === id)
        const confirmDelete = window.confirm(`Tem certeza que deseja excluir o produto "${product?.name}"?`)

        if (confirmDelete) {
            setSaving(true)
            try {
                const deletedProduct = await deleteProduct(id)
                if (deletedProduct) {
                    // Remove do estado local
                    setProducts(prevProducts => prevProducts.filter(product => product.id !== id))
                }
            } catch (error) {
                console.error('Erro ao excluir produto:', error)
                alert('Erro ao excluir produto. Tente novamente.')
            } finally {
                setSaving(false)
            }
        }
    }

    return (
        <motion.div className='bg-[#1e1e1e] backdrop-blur-md shadow-lg rounded-xl p-4 md:p-6
    border border-[#1f1f1f] mx-2 md:mx-0 mb-8'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}>

            <div className='flex flex-col md:flex-row justify-between items-center mb-6 gap-4
         md:gap-0'>
                <div className='flex items-center gap-3'>
                    <h2 className='text-lg md:text-xl font-semibold text-gray-100 text-center md:text-left'>
                        Lista de Produtos
                    </h2>
                    <button
                        onClick={loadProducts}
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
                        onChange={(e) => setSearchTerm(e.target.value)}
                        value={searchTerm}
                        type="text"
                        placeholder='Buscar produto...'
                        className='bg-[#2f2f2f] text-white placeholder-gray-400 rounded-lg pr-4 pl-10 py-2 w-full md:w-64       
                                    focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200 text-sm'
                    />
                    <Search className='absolute left-3 top-2.5  text-gray-400' size={18} />
                </div>
            </div>
            <div className='overflow-x-auto'>
                {loading ? (
                    <div className='text-center py-8'>
                        <RefreshCw className='animate-spin mx-auto text-gray-400 mb-2' size={24} />
                        <p className='text-gray-400'>Carregando produtos...</p>
                    </div>
                ) : (
                <table className='min-w-full divide-y divide-gray-700'>
                    <thead>
                        <tr>
                            {[
                                "Nome",
                                "Id Produto",
                                "Categoria",
                                "Preço",
                                "Estoque",
                                "Vendas",
                                "Ações"
                            ].map((header) => (
                                <th key={header} className='px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider
                                hidden md:table-cell'>
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className='divide-y  divide-gray-700'>
                        {filteredProducts.map(product => (
                            <motion.tr
                                key={product.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1, duration: 0.3 }}
                                className={`flex flex-col md:mb-0 md:table-row mb-4 border-b md:border-b-0 border-gray-700 md:border-none p-2 md:p-0 ${editingRow === product.id ? 'bg-[#2f2f2f] ring-gray-500' : ""
                                    }`}
                            >
                                <td className='md:hidden px-3 py-2'>
                                    <div className='flex items-center justify-between'>
                                        <div className='flex items-center'>
                                            <Image src={product.image} alt={product.name} width={36} height={36} className='w-9 h-9 rounded-full'
                                            />
                                            <div className='ml-3'>
                                                <div className='text-sm font-medium text-gray-100'>
                                                    {product.name}
                                                </div>
                                                <div className='text-xs text-gray-400'>
                                                    ID: {product.id}
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex space-x-1 -mt-1 -mr-1'>
                                            <button className='text-indigo-500 hover:text-indigo-300 cursor-pointer'
                                                onClick={() => editingRow === product.id ?
                                                    handleSaveClick(product.id) :
                                                    handleEditClick(product.id)}
                                                disabled={saving}
                                            >
                                                {editingRow === product.id ?
                                                    (saving ? <RefreshCw size={14} className="animate-spin" /> : <Save size={14} />) :
                                                    (<Edit size={14} />)}
                                            </button>
                                            <button className='text-red-500 hover:text-red-300 cursor-pointer'
                                                onClick={() => handleDelete(product.id)}
                                                disabled={saving}
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className='mt-2 text-xs text-gray-300'>
                                        <div>Categoria: {product.category}</div>
                                        {["Preço", "Estoque", "Vendas"].map((field) => (
                                            <div key={field}>
                                                <span className='capitalize'>
                                                    {field === "Preço" ? "price" : field === "Estoque" ? "stock" : field === "Vendas" ? "sales" : field}:
                                                </span>
                                                {editingRow === product.id ?
                                                    <input type='text'
                                                        className='bg-transparent text-white border border-gray-400 w-16 text-center text-xs ml-1'
                                                        value={field === "Preço" ? product.price : field === "Estoque" ? product.stock : field === "Vendas" ? product.sales : product[field]}
                                                        onChange={(e) => handleChange(product.id, field === "Preço" ? "price" : field === "Estoque" ? "stock" : field === "Vendas" ? "sales" : field, e.target.value)}
                                                    />
                                                    : (field === "Preço" ? (
                                                        `$${product.price.toFixed(2)}`
                                                    ) : (field === "Estoque" ? (
                                                        `${product.stock}`
                                                    ) : (field === "Vendas" ? (
                                                        `${product.sales}`
                                                    ) : (
                                                        `${product[field]}`
                                                    ))))

                                                }
                                            </div>
                                        ))}
                                    </div>
                                </td>

                                <td className='hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100'>
                                    <div className='flex items-center'>
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            width={40}
                                            height={40}
                                            className='w-10 h-10 rounded-full'
                                        />
                                        <div className='ml-4'>{product.name}</div>
                                    </div>
                                </td>

                                <td className='hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300'>
                                    {product.id}
                                </td>
                                <td className='hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300'>
                                    {product.category}
                                </td>
                                {["Preço", "Estoque", "Vendas"].map((field) => (
                                    <td
                                        key={field}
                                        className={`hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300 ${editingRow === product.id ? "border border-gray-400" : ""}`}
                                    >
                                        {editingRow === product.id ? (
                                            <input
                                                type="text"
                                                className='bg-transparent text-white border-none outline-none w-16 text-center'
                                                value={field === "Preço" ? product.price !== undefined ? product.price : "" : field === "Estoque" ? product.stock !== undefined ? product.stock : "" : field === "Vendas" ? product.sales !== undefined ? product.sales : "" : ""}
                                                onChange={(e) =>
                                                    handleChange(product.id, field === "Preço" ? "price" : field === "Estoque" ? "stock" : field === "Vendas" ? "sales" : field, e.target.value)}
                                            />
                                        ) : (
                                            field === "Preço" ? `$${product.price.toFixed(2)}` : field === "Estoque" ? product.stock : field === "Vendas" ? product.sales : null
                                        )}
                                    </td>
                                ))}

                                <td className='hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300'
                                >
                                    <div className='flex space-x-1'>
                                        <button
                                            className='text-indigo-500 hover:text-indigo-300 cursor-pointer'
                                            onClick={() => editingRow === product.id ?
                                                handleSaveClick(product.id) :
                                                handleEditClick(product.id)}
                                            disabled={saving}
                                        >
                                            {editingRow === product.id ?
                                                (saving ? <RefreshCw size={18} className="animate-spin" /> : <Save size={18} />) :
                                                (<Edit size={18} />)}
                                        </button>
                                        <button 
                                            className='text-red-500 hover:text-red-300 cursor-pointer' 
                                            onClick={() => handleDelete(product.id)}
                                            disabled={saving}
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
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

export default ProductsTable