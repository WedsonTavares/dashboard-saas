// Funções para buscar dados do Supabase
import { supabase } from './supabase.js'

// Buscar todos os produtos
export async function getProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('id')
  
  if (error) {
    console.error('Erro ao buscar produtos:', error)
    return []
  }
  return data || []
}

// Buscar todos os clientes
export async function getClients() {
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .order('id')
  
  if (error) {
    console.error('Erro ao buscar clientes:', error)
    return []
  }
  return data || []
}

// Buscar todos os pedidos
export async function getOrders() {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('id')
  
  if (error) {
    console.error('Erro ao buscar pedidos:', error)
    return []
  }
  
  return data || []
}

// Buscar dados para os gráficos do dashboard
export async function getDashboardData() {
  try {
    const [products, clients, orders] = await Promise.all([
      getProducts(),
      getClients(),
      getOrders()
    ])

    return {
      products,
      clients,
      orders,
      // Dados calculados para os gráficos
      totalSales: orders.reduce((sum, order) => sum + (order.total || 0), 0),
      totalProducts: products.length,
      totalClients: clients.length,
      totalOrders: orders.length
    }
  } catch (error) {
    console.error('Erro ao buscar dados do dashboard:', error)
    return {
      products: [],
      clients: [],
      orders: [],
      totalSales: 0,
      totalProducts: 0,
      totalClients: 0,
      totalOrders: 0
    }
  }
}

// Atualizar produto
export async function updateProduct(id, updates) {
  const { data, error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', id)
    .select()
  
  if (error) {
    console.error('Erro ao atualizar produto:', error)
    return null
  }
  return data[0]
}

// Excluir produto
export async function deleteProduct(id) {
  const { data, error } = await supabase
    .from('products')
    .delete()
    .eq('id', id)
    .select()
  
  if (error) {
    console.error('Erro ao excluir produto:', error)
    return null
  }
  return data[0]
}

// Atualizar cliente
export async function updateClient(id, updates) {
  const { data, error } = await supabase
    .from('clients')
    .update(updates)
    .eq('id', id)
    .select()
  
  if (error) {
    console.error('Erro ao atualizar cliente:', error)
    return null
  }
  return data[0]
}

// Excluir cliente
export async function deleteClient(id) {
  const { data, error } = await supabase
    .from('clients')
    .delete()
    .eq('id', id)
    .select()
  
  if (error) {
    console.error('Erro ao excluir cliente:', error)
    return null
  }
  return data[0]
}

// Atualizar pedido
export async function updateOrder(id, updates) {
  const { data, error } = await supabase
    .from('orders')
    .update(updates)
    .eq('id', id)
    .select()
  
  if (error) {
    console.error('Erro ao atualizar pedido:', error)
    return null
  }
  return data[0]
}

// Excluir pedido
export async function deleteOrder(id) {
  const { data, error } = await supabase
    .from('orders')
    .delete()
    .eq('id', id)
    .select()
  
  if (error) {
    console.error('Erro ao excluir pedido:', error)
    return null
  }
  return data[0]
}

// Buscar estatísticas de vendas para gráficos
export async function getSalesStats() {
  // Por enquanto retornamos dados mock, depois podemos calcular do banco
  return [
    { name: "Jan", sales: 4200 },
    { name: "Fev", sales: 3800 },
    { name: "Mar", sales: 5100 },
    { name: "Abr", sales: 4600 },
    { name: "Mai", sales: 5400 },
    { name: "Jun", sales: 7200 },
    { name: "Jul", sales: 6100 },
    { name: "Ago", sales: 2900 },
    { name: "Set", sales: 6800 },
    { name: "Out", sales: 6300 },
    { name: "Nov", sales: 7100 },
    { name: "Dez", sales: 7500 }
  ]
}
