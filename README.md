# 📊 Dashboard SaaS

Um dashboard completo e moderno construído com Next.js 15, React, Tailwind CSS e Supabase, oferecendo uma experiência de usuário premium para gerenciamento de dados empresariais.

## ✨ Funcionalidades

### 🔐 **Autenticação Completa**
- Login/logout com Supabase Auth
- Proteção de rotas com middleware
- Sessões persistentes com cookies
- Redirecionamento automático baseado em autenticação

### 📈 **Dashboard Interativo**
- **Overview**: Métricas principais e gráficos em tempo real
- **Produtos**: CRUD completo com busca e filtros
- **Pedidos**: Gerenciamento de pedidos com edição inline
- **Clientes**: Sistema de gestão de clientes
- **Vendas**: Análises de vendas com visualizações avançadas
- **Usuários**: Gestão de usuários do sistema

### 🎨 **Interface Moderna**
- Design responsivo para desktop e mobile
- Tema dark elegante
- Animações suaves com Framer Motion
- Componentes reutilizáveis e modulares
- Ícones com Lucide React

### 📱 **Responsividade Total**
- Layout adaptativo para todos os dispositivos
- Sidebar colapsível em mobile
- Tabelas responsivas com scroll horizontal
- Interface otimizada para touch

## 🚀 Tecnologias

- **Frontend**: Next.js 15, React 18, Tailwind CSS
- **Backend**: Supabase (PostgreSQL)
- **Autenticação**: Supabase Auth com SSR
- **Animações**: Framer Motion
- **Ícones**: Lucide React
- **Deployment**: Vercel-ready

## 📁 Estrutura do Projeto

```
dashboard-saas/
├── app/                          # App Router (Next.js 15)
│   ├── login/                   # Página de login
│   ├── dashboard/               # Dashboard principal
│   ├── overview/                # Visão geral
│   ├── products/                # Gestão de produtos
│   ├── orders/                  # Gestão de pedidos
│   ├── clients/                 # Gestão de clientes
│   ├── sales/                   # Análises de vendas
│   ├── users/                   # Gestão de usuários
│   ├── mensagens/               # Sistema de mensagens
│   ├── notificacoes/            # Centro de notificações
│   ├── configuracoes/           # Configurações do sistema
│   └── help/                    # Central de ajuda
├── components/                   # Componentes React
│   ├── auth/                    # Componentes de autenticação
│   ├── layout/                  # Layout (Header, Sidebar)
│   ├── ui/                      # Componentes de UI base
│   ├── tables/                  # Tabelas especializadas
│   ├── features/                # Funcionalidades específicas
│   └── dashboard/               # Componentes do dashboard
├── lib/                         # Bibliotecas e queries
├── utils/                       # Utilitários TypeScript
├── public/                      # Assets estáticos
└── middleware.ts                # Middleware de autenticação
```

## 🛠️ Instalação e Configuração

### 1. **Clone o Repositório**
```bash
git clone https://github.com/WedsonTavares/dashboard-saas.git
cd dashboard-saas
```

### 2. **Instale as Dependências**
```bash
npm install
```

### 3. **Configure as Variáveis de Ambiente**
```bash
# Copie o arquivo de exemplo
cp .env.local.example .env.local

# Edite .env.local com suas credenciais do Supabase
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_publica_aqui
```

### 4. **Configure o Supabase**

#### 📊 **Estrutura do Banco de Dados**
```sql
-- Tabela de produtos
CREATE TABLE products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock INTEGER NOT NULL,
  sales INTEGER DEFAULT 0,
  image TEXT
);

-- Tabela de pedidos
CREATE TABLE orders (
  id TEXT PRIMARY KEY,
  customer_name TEXT NOT NULL,
  status TEXT NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  date TIMESTAMP DEFAULT NOW()
);

-- Tabela de clientes
CREATE TABLE clients (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  status TEXT NOT NULL,
  total_orders INTEGER DEFAULT 0,
  image TEXT
);
```

#### 🔒 **Row Level Security (RLS)**
```sql
-- Habilitar RLS nas tabelas
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

-- Políticas de acesso (exemplo para usuários autenticados)
CREATE POLICY "Enable read access for authenticated users" ON products
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Enable all access for authenticated users" ON products
    FOR ALL USING (auth.role() = 'authenticated');
```

### 5. **Execute o Projeto**
```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar produção
npm start
```

## 🎯 Credenciais de Teste

Para testar o sistema, use:
- **Email**: `wedsonsobral@gmail.com`
- **Senha**: `99028461`

## 🏗️ Arquitetura e Padrões

### 📦 **Padrão de Arquivos**
- **`.jsx`**: Componentes React e páginas
- **`.js`**: Arquivos de configuração e índices
- **`.ts`**: Utilitários TypeScript, queries e middleware

### 🔧 **Configurações**
- **TypeScript**: Configuração híbrida JS/TS
- **ESLint**: Linting para qualidade de código
- **Tailwind CSS**: Configuração personalizada
- **PostCSS**: Processamento de CSS

### 🛡️ **Segurança**
- Middleware de autenticação
- Proteção de rotas sensíveis
- Validação de dados server-side
- Variáveis de ambiente protegidas

## 🔧 Scripts Disponíveis

```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build para produção
npm run start        # Iniciar servidor de produção
npm run lint         # Executar ESLint
```

## 📈 Funcionalidades Avançadas

### 🔄 **CRUD Completo**
- **Create**: Adicionar novos registros
- **Read**: Listagem com busca e filtros
- **Update**: Edição inline e formulários
- **Delete**: Remoção com confirmação

### 📊 **Visualizações de Dados**
- Gráficos interativos
- Métricas em tempo real
- Filtros dinâmicos
- Exportação de dados

### 🎨 **UI/UX Premium**
- Design system consistente
- Microinterações
- Loading states
- Error handling
- Feedback visual

## 🚀 Deploy

### **Vercel (Recomendado)**
1. Conecte seu repositório GitHub
2. Configure as variáveis de ambiente
3. Deploy automático

### **Outras Plataformas**
- Netlify
- Railway
- DigitalOcean App Platform

## 🤝 Contribuindo

1. Fork o projeto
2. Crie sua feature branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👤 Autor

**Wedson Tavares**
- GitHub: [@WedsonTavares](https://github.com/WedsonTavares)
- LinkedIn: [Wedson Tavares](https://linkedin.com/in/wedson-tavares)

---

## 🎥 Referências

Projeto inspirado no tutorial: [Dashboard SaaS Tutorial](https://www.youtube.com/watch?v=jewFL6c_1k0&t=55s&ab_channel=RiseofCoding)

---

⭐ **Se este projeto te ajudou, considere dar uma estrela!**