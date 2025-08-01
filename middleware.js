import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

export async function middleware(req) {
  // Pular middleware para recursos estáticos
  if (
    req.nextUrl.pathname.includes('_next') ||
    req.nextUrl.pathname.includes('/favicon.ico') ||
    req.nextUrl.pathname.match(/\.(png|jpg|jpeg|gif|svg|css|js|ico)$/)
  ) {
    return NextResponse.next()
  }

  let res = NextResponse.next({
    request: {
      headers: req.headers,
    },
  })

  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          get(name) {
            return req.cookies.get(name)?.value
          },
          set(name, value, options) {
            req.cookies.set({
              name,
              value,
              ...options,
            })
            res = NextResponse.next({
              request: {
                headers: req.headers,
              },
            })
            res.cookies.set({
              name,
              value,
              ...options,
            })
          },
          remove(name, options) {
            req.cookies.set({
              name,
              value: '',
              ...options,
            })
            res = NextResponse.next({
              request: {
                headers: req.headers,
              },
            })
            res.cookies.set({
              name,
              value: '',
              ...options,
            })
          },
        },
      }
    )

    // Verificar autenticação SIMPLES
    const { data: { user } } = await supabase.auth.getUser()

    // Rotas públicas
    const publicRoutes = ['/auth']
    const isPublicRoute = publicRoutes.includes(req.nextUrl.pathname)

    // LÓGICA SIMPLES: 
    // Se não tem usuário E não está em rota pública → redirecionar para /auth
    if (!user && !isPublicRoute) {
      return NextResponse.redirect(new URL('/auth', req.url))
    }

    // Se tem usuário E está tentando acessar /auth → redirecionar para /
    if (user && isPublicRoute) {
      return NextResponse.redirect(new URL('/', req.url))
    }

    return res

  } catch (error) {
    console.error('[MIDDLEWARE ERROR]:', error.message)
    // Em caso de erro, permitir acesso para evitar loop
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
