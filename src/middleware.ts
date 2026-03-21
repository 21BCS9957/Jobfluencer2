import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          )
          response = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const path = request.nextUrl.pathname

  // Public routes that don't require authentication
  const publicRoutes = ['/auth/login', '/auth/register', '/auth/reset-password', '/auth/verify-email', '/', '/browse', '/how-it-works']
  const isPublicRoute = publicRoutes.some(route => path.startsWith(route))

  // If not logged in and trying to access protected route
  if (!user && !isPublicRoute) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  // If logged in, check role-based access
  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role, phone, city, bio')
      .eq('id', user.id)
      .single()

    // Client routes protection
    if (path.startsWith('/client')) {
      if (profile?.role !== 'client') {
        return NextResponse.redirect(new URL('/', request.url))
      }

      // Check if profile is complete
      const isComplete = profile.phone && profile.city && profile.bio
      
      // If trying to access dashboard but profile incomplete, redirect to onboarding
      if (!isComplete && path === '/client/dashboard') {
        return NextResponse.redirect(new URL('/client/onboarding', request.url))
      }

      // If profile is complete and trying to access onboarding, redirect to dashboard
      if (isComplete && path === '/client/onboarding') {
        return NextResponse.redirect(new URL('/client/dashboard', request.url))
      }
    }

    // Provider routes protection
    if (path.startsWith('/provider')) {
      if (profile?.role !== 'provider') {
        return NextResponse.redirect(new URL('/', request.url))
      }

      // Check if provider profile is complete
      const { data: providerProfile } = await supabase
        .from('provider_profiles')
        .select('categories')
        .eq('id', user.id)
        .single()

      const isComplete = 
        profile.phone && 
        profile.city && 
        profile.bio && 
        providerProfile?.categories && 
        providerProfile.categories.length > 0

      // If trying to access dashboard but profile incomplete, redirect to onboarding
      if (!isComplete && path === '/provider/dashboard') {
        return NextResponse.redirect(new URL('/provider/onboarding', request.url))
      }

      // If profile is complete and trying to access onboarding, redirect to dashboard
      if (isComplete && path === '/provider/onboarding') {
        return NextResponse.redirect(new URL('/provider/dashboard', request.url))
      }
    }

    // Redirect logged-in users away from auth pages
    if (path.startsWith('/auth/login') || path.startsWith('/auth/register')) {
      if (profile?.role === 'client') {
        return NextResponse.redirect(new URL('/client/dashboard', request.url))
      } else if (profile?.role === 'provider') {
        return NextResponse.redirect(new URL('/provider/dashboard', request.url))
      }
    }
  }

  return response
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
