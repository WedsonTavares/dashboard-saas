-- ================================================
-- CONFIGURAÇÃO CORRETA DO SUPABASE PARA AUTENTICAÇÃO
-- ================================================

-- 1. PRIMEIRO: Remover políticas RLS se existirem (apenas se necessário)
-- DROP POLICY IF EXISTS "Enable read access for all users" ON auth.users;
-- DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON auth.users;

-- 2. CONFIGURAÇÃO BÁSICA DE AUTENTICAÇÃO
-- (Não mexer na tabela auth.users - ela é gerenciada pelo Supabase)

-- 3. CRIAR TABELA DE PERFIS PERSONALIZADA (se necessário)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  website TEXT,
  PRIMARY KEY (id)
);

-- 4. CONFIGURAR RLS NA TABELA PROFILES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 5. POLÍTICAS PARA A TABELA PROFILES
CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile." ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile." ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- 6. FUNÇÃO PARA CRIAR PERFIL AUTOMATICAMENTE
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 7. TRIGGER PARA CRIAR PERFIL AUTOMATICAMENTE
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
