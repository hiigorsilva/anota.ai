import {
  type MiddlewareConfig,
  type NextRequest,
  NextResponse,
} from 'next/server'

const publicRoutes = [
  { path: '/sign-in', whenAuthenticated: 'redirect' },
  { path: '/register', whenAuthenticated: 'redirect' },
  { path: '/pricing', whenAuthenticated: 'next' },
] as const

const REDIRECT_WHEN_NOT_AUTHENTICATED = '/sign-in'
const REDIRECT_WHEN_AUTHENTICATED = '/'

export default function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  const publicRoute = publicRoutes.find(route => route.path === path)
  const authToken = req.cookies.get('authjs.session-token') // Aqui pode pegar o token do cookie

  // Não autenticado e acessando rota pública
  if (!authToken && publicRoute) {
    return NextResponse.next()
  }

  // Não autenticado e acessando rota privada
  if (!authToken && !publicRoute) {
    const redirecturl = req.nextUrl.clone()
    redirecturl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED
    return NextResponse.redirect(redirecturl)
  }

  // Autenticado e acessando rota pública (login e register)
  if (
    authToken &&
    publicRoute &&
    publicRoute.whenAuthenticated === 'redirect'
  ) {
    const redirecturl = req.nextUrl.clone()
    redirecturl.pathname = REDIRECT_WHEN_AUTHENTICATED
    return NextResponse.redirect(redirecturl)
  }

  // Autenticado e acessando rota privada
  if (authToken && !publicRoute) {
    // Aqui pode checar se o TOKEN está espirado
    // Se sim, remover cockie e redirecionar para a tela de login

    // Se nao, deixar passar
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config: MiddlewareConfig = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
