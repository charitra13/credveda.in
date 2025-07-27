import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    const supabase = await createClient()
    
    try {
      const { data, error } = await supabase.auth.exchangeCodeForSession(code)
      
      if (!error && data.user) {
        // Successful authentication
        const redirectUrl = new URL(next, origin)
        return NextResponse.redirect(redirectUrl)
      } else {
        // Authentication failed
        console.error('Auth error:', error)
        const errorUrl = new URL('/', origin)
        errorUrl.searchParams.set('auth', 'error')
        errorUrl.searchParams.set('message', error?.message || 'Authentication failed')
        return NextResponse.redirect(errorUrl)
      }
    } catch (err) {
      console.error('Auth callback error:', err)
      const errorUrl = new URL('/', origin)
      errorUrl.searchParams.set('auth', 'error')
      errorUrl.searchParams.set('message', 'Authentication service error')
      return NextResponse.redirect(errorUrl)
    }
  }

  // No code present, redirect to home
  return NextResponse.redirect(new URL('/', origin))
} 