import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

export async function middleware(req) {
  // Log de segurança para monitoramento
  const userAgent = req.headers.get('user-agent') || 'unknown'
  const ip = req.ip || req.headers.get('x-forwarded-for') || 'unknown'
  
  let res = NextResponse.next({
    request: {
      headers: req.headers,
    },
  })

  // Adicionar headers de segurança
  res.headers.set('X-Content-Type-Options', 'nosniff')
  res.headers.set('X-Frame-Options', 'DENY')
  res.headers.set('X-XSS-Protection', '1; mode=block')
  res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  res.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')

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

    // Verificar autenticação com timeout reduzido
    const { data: { user }, error } = await Promise.race([
      supabase.auth.getUser(),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Auth timeout')), 2000)
      )
    ])

    if (error) {
      console.error(`Auth error for IP ${ip}:`, error.message)
      // Se erro de timeout ou conexão, permitir acesso temporário para evitar loop
      if (error.message.includes('timeout') || error.message.includes('network')) {
        return res
      }
    }

    // Rotas públicas (apenas auth)
    const publicRoutes = ['/auth']
    const isPublicRoute = publicRoutes.some(route => req.nextUrl.pathname.startsWith(route))
    
    // Rotas de API públicas (se houver)
    const isApiRoute = req.nextUrl.pathname.startsWith('/api/')
    
    // Log de tentativa de acesso para auditoria (apenas para rotas importantes)
    if (!isApiRoute && !req.nextUrl.pathname.includes('_next')) {
      console.log(`[AUTH] ${new Date().toISOString()} - IP: ${ip} - Path: ${req.nextUrl.pathname} - User: ${user?.email || 'anonymous'}`)
    }

    // Proteção total: TODAS as rotas precisam de autenticação exceto /auth
    if (!user && !isPublicRoute) {
      console.log(`[SECURITY] Unauthorized access attempt to ${req.nextUrl.pathname} from IP ${ip}`)
      
      // Limpar cookies de autenticação por segurança
      const response = NextResponse.redirect(new URL('/auth', req.url))
      response.cookies.delete('sb-access-token')
      response.cookies.delete('sb-refresh-token')
      
      return response
    }

    // Se logado e tentando acessar auth, redirecionar para dashboard
    if (user && isPublicRoute) {
      console.log(`[AUTH] Authenticated user ${user.email} redirected from auth to dashboard`)
      return NextResponse.redirect(new URL('/', req.url))
    }

    // Validação adicional de segurança para usuários autenticados
    if (user) {
      // Simplesmente validar se o usuário tem ID válido
      if (!user.id || !user.email) {
        console.error(`[SECURITY] Invalid user data for ${user?.email || 'unknown'}`)
        const response = NextResponse.redirect(new URL('/auth', req.url))
        response.cookies.delete('sb-access-token')
        response.cookies.delete('sb-refresh-token')
        return response
      }
    }

    return res

  } catch (error) {
    console.error(`[MIDDLEWARE ERROR] IP: ${ip} - Path: ${req.nextUrl.pathname} - Error:`, error.message)
    
    // Em caso de erro, redirecionar para auth por segurança
    const response = NextResponse.redirect(new URL('/auth', req.url))
    response.cookies.delete('sb-access-token')
    response.cookies.delete('sb-refresh-token')
    
    return response
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
