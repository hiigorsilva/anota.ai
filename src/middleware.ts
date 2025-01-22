import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// ROTAS PÚBLICAS QUE NÃO SÃO PROTEGIDAS PELO CLERK
const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)'])

// PROTEÇÃO DE ROTAS PARA TODAS RESTANTES
export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
