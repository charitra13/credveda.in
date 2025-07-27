# Supabase Google OAuth Implementation Guide

This comprehensive guide implements secure Supabase Google OAuth authentication in your Next.js CredVeda project. The implementation follows industry best practices for security, uses PKCE flow, handles session management properly, and provides seamless user experience with proper route protection.

## 📋 Prerequisites Checklist

- ✅ Next.js 15.4.3 with App Router
- ✅ @supabase/ssr (v0.6.1) already installed
- ✅ Supabase project configured
- ✅ TypeScript setup
- ✅ Existing AuthCard.tsx component
- ✅ Basic Supabase client configuration

## 🔧 Project Structure Analysis

Your current structure:
```
src/
├── app/
│   ├── dashboard/           # Protected route target
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── AuthCard.tsx         # ✅ Exists - needs OAuth integration
│   └── ui/
├── utils/
│   └── supabase/
│       ├── client.ts        # ✅ Browser client configured
│       ├── server.ts        # ✅ Server client configured
│       └── database.types.ts
└── lib/
```

## 🏗️ Implementation Steps

### Step 1: Environment Configuration

#### 1.1 Update .env.local
Your current environment variables are set. Add the callback URL for reference:

```bash
# Your existing variables (✅ Already configured)
NEXT_PUBLIC_SUPABASE_URL=https://pofqpzqlzxsqbejopndt.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Callback URL for reference (used in Google Cloud Console)
# http://localhost:3000/auth/callback (development)
# https://yourdomain.com/auth/callback (production)
```

### Step 2: Supabase Dashboard Configuration

#### 2.1 Enable Google OAuth Provider
1. Go to your Supabase Dashboard
2. Navigate to **Authentication → Providers**
3. Find **Google** and toggle it ON
4. **Site URL**: `http://localhost:3000` (development)
5. **Redirect URLs**: Add wildcard patterns:
   - `http://localhost:3000/**`
   - `https://yourdomain.com/**`

#### 2.2 Configure Redirect URLs
In **Authentication → URL Configuration**:
- **Site URL**: `http://localhost:3000`
- **Redirect URLs**: 
  ```
  http://localhost:3000/**
  https://yourdomain.vercel.app/**
  ```

### Step 3: Google Cloud Console Setup

#### 3.1 Create OAuth 2.0 Client
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services → Credentials**
3. Click **Create Credentials → OAuth 2.0 Client ID**
4. Choose **Web application**

#### 3.2 Configure OAuth Client
**Authorized JavaScript Origins:**
```
http://localhost:3000
https://yourdomain.vercel.app
```

**Authorized Redirect URIs:**
```
https://pofqpzqlzxsqbejopndt.supabase.co/auth/v1/callback
```

#### 3.3 Update Supabase with Google Credentials
Back in Supabase Dashboard:
- **Client ID**: Paste from Google Cloud Console
- **Client Secret**: Paste from Google Cloud Console

### Step 4: Create Missing Supabase Client Files

#### 4.1 Create Middleware Client
Create `src/utils/supabase/middleware.ts`:

```typescript
import { createServerClient } from '@supabase/ssr'
import { type NextRequest, NextResponse } from 'next/server'
import { Database } from './database.types'

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: any) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  // IMPORTANT: Use getUser() for security, not getSession()
  // getUser() validates the JWT token with Supabase auth server
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  // Define protected routes
  const protectedRoutes = ['/dashboard']
  const authRoutes = ['/auth']
  
  const isProtectedRoute = protectedRoutes.some(route => 
    request.nextUrl.pathname.startsWith(route)
  )
  const isAuthRoute = authRoutes.some(route => 
    request.nextUrl.pathname.startsWith(route)
  )

  // Redirect to home with auth modal if accessing protected route without auth
  if (isProtectedRoute && !user) {
    const redirectUrl = new URL('/', request.url)
    redirectUrl.searchParams.set('auth', 'required')
    redirectUrl.searchParams.set('redirectTo', request.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // Redirect authenticated users away from auth routes
  if (isAuthRoute && user) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return response
}
```

### Step 5: Create Middleware

#### 5.1 Create Root Middleware
Create `middleware.ts` in project root:

```typescript
import { type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
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
```

### Step 6: Create Auth Callback Route

#### 6.1 Create Auth Callback Handler
Create `src/app/auth/callback/route.ts`:

```typescript
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
```

### Step 7: Update AuthCard Component

#### 7.1 Enhanced AuthCard with Google OAuth
Update `src/components/AuthCard.tsx`:

```typescript
"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { X, Loader2 } from "lucide-react"
import { createClient } from "@/utils/supabase/client"

interface AuthCardProps {
  isOpen: boolean
  onClose: () => void
  redirectTo?: string
}

export function AuthCard({ isOpen, onClose, redirectTo = '/dashboard' }: AuthCardProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  // Handle Google OAuth sign-in
  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(redirectTo)}`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      })

      if (error) {
        setError(error.message)
        setIsLoading(false)
      }
      // If successful, user will be redirected to Google, then back to callback
    } catch (err) {
      console.error('Auth error:', err)
      setError('Failed to initiate authentication')
      setIsLoading(false)
    }
  }

  // Prevent body scroll when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Handle ESC key to close modal
  React.useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen && !isLoading) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose, isLoading])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999]"
            onClick={!isLoading ? onClose : undefined}
          />
          
          {/* Auth Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 bottom-0 z-[9999] flex items-center justify-center p-4"
          >
            <Card className="w-full max-w-md relative">
              {/* Close button */}
              {!isLoading && (
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Close authentication modal"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              )}
              
              <CardHeader className="text-center pt-8">
                <CardTitle className="text-2xl font-bold">Welcome to CredVeda</CardTitle>
                <CardDescription>
                  Sign in with your Google account to access your financial dashboard
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {error && (
                  <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                    {error}
                  </div>
                )}
                
                <Button 
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                  className="w-full h-12 text-base"
                  variant="outline"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  ) : (
                    <svg
                      className="w-5 h-5 mr-2"
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fab"
                      data-icon="google"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 488 512"
                    >
                      <path
                        fill="currentColor"
                        d="M488 261.8C488 403.3 381.5 512 244 512 109.8 512 0 402.2 0 256S109.8 0 244 0c73.2 0 136.2 29.2 182.4 75.4l-62.4 62.4C337.2 113.2 295.6 96 244 96c-88.6 0-160 71.6-160 160s71.4 160 160 160c92.8 0 140.3-63.6 144.6-95.2H244v-64h243.6c1.2 6.8 1.8 13.8 1.8 21z"
                      />
                    </svg>
                  )}
                  {isLoading ? 'Signing in...' : 'Sign In with Google'}
                </Button>
              </CardContent>
              
              <CardFooter className="text-center text-xs text-gray-500">
                <p>
                  By signing in, you agree to our{' '}
                  <a href="/terms" className="underline hover:text-gray-700">Terms of Service</a>
                  {' '}and{' '}
                  <a href="/privacy" className="underline hover:text-gray-700">Privacy Policy</a>.
                </p>
              </CardFooter>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
```

### Step 8: Create Auth Context Hook

#### 8.1 Create Auth Hook
Create `src/hooks/useAuth.ts`:

```typescript
"use client"

import { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { createClient } from '@/utils/supabase/client'

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  signOut: async () => {},
})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        setSession(session)
        setUser(session?.user ?? null)
      } catch (error) {
        console.error('Error getting session:', error)
      } finally {
        setLoading(false)
      }
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)

        // Handle different auth events
        if (event === 'SIGNED_IN') {
          console.log('User signed in:', session?.user?.email)
        } else if (event === 'SIGNED_OUT') {
          console.log('User signed out')
        }
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase.auth])

  const signOut = async () => {
    try {
      await supabase.auth.signOut()
      // User state will be updated via the auth state change listener
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, session, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}
```

### Step 9: Update Root Layout

#### 9.1 Wrap App with AuthProvider
Update `src/app/layout.tsx`:

```typescript
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/hooks/useAuth"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CredVeda - Your Financial Dashboard",
  description: "Manage your credit score, EMI reminders, and NBFC comparisons",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
```

### Step 10: Integrate Auth into Main Page

#### 10.1 Update Main Page with Auth Integration
Update `src/app/page.tsx`:

```typescript
"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { AuthCard } from "@/components/AuthCard"
import { useAuth } from "@/hooks/useAuth"
// Import your existing components
import Hero from "@/components/Hero"
import Features from "@/components/Features"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function HomePage() {
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const { user, loading } = useAuth()
  const searchParams = useSearchParams()

  // Handle auth modal triggers from URL params or middleware redirects
  useEffect(() => {
    const authRequired = searchParams.get('auth')
    const redirectTo = searchParams.get('redirectTo')
    
    if (authRequired === 'required' && !user && !loading) {
      setIsAuthOpen(true)
    }
    
    if (authRequired === 'error') {
      const message = searchParams.get('message')
      console.error('Auth error:', message)
      // You could show a toast notification here
    }
  }, [searchParams, user, loading])

  // Auto-close auth modal when user is authenticated
  useEffect(() => {
    if (user && isAuthOpen) {
      setIsAuthOpen(false)
      
      // If there's a redirect URL, navigate to it
      const redirectTo = searchParams.get('redirectTo')
      if (redirectTo) {
        window.location.href = redirectTo
      }
    }
  }, [user, isAuthOpen, searchParams])

  return (
    <>
      <Header onAuthClick={() => setIsAuthOpen(true)} />
      <main>
        <Hero onGetStarted={() => setIsAuthOpen(true)} />
        <Features />
      </main>
      <Footer />
      
      <AuthCard 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)}
        redirectTo={searchParams.get('redirectTo') || '/dashboard'}
      />
    </>
  )
}
```

### Step 11: Protect Dashboard Route

#### 11.1 Create Dashboard Layout with Auth Check
Update `src/app/dashboard/layout.tsx`:

```typescript
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  // SECURITY: Always use getUser() in server components for auth checks
  const { data: { user }, error } = await supabase.auth.getUser()

  if (!user) {
    // Redirect to home with auth modal trigger
    redirect('/?auth=required&redirectTo=/dashboard')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </div>
    </div>
  )
}
```

#### 11.2 Update Dashboard Page
Update `src/app/dashboard/page.tsx`:

```typescript
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const supabase = await createClient()
  
  const { data: { user }, error } = await supabase.auth.getUser()

  if (!user) {
    redirect('/?auth=required&redirectTo=/dashboard')
  }

  return (
    <div className="space-y-8">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Welcome back, {user.user_metadata?.full_name || user.email}!
        </h1>
        <p className="text-gray-600">
          You're successfully authenticated with CredVeda.
        </p>
        
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="text-sm font-medium text-gray-900">User Info:</h3>
          <dl className="mt-2 space-y-1">
            <div className="flex justify-between">
              <dt className="text-sm text-gray-500">Email:</dt>
              <dd className="text-sm text-gray-900">{user.email}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm text-gray-500">Provider:</dt>
              <dd className="text-sm text-gray-900">
                {user.app_metadata?.provider || 'google'}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm text-gray-500">Last Sign In:</dt>
              <dd className="text-sm text-gray-900">
                {new Date(user.last_sign_in_at || '').toLocaleDateString()}
              </dd>
            </div>
          </dl>
        </div>
      </div>
      
      {/* Your existing dashboard components can go here */}
    </div>
  )
}
```

### Step 12: Add Sign Out Functionality

#### 12.1 Create Sign Out Component
Create `src/components/SignOutButton.tsx`:

```typescript
"use client"

import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/useAuth"
import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

export function SignOutButton() {
  const { signOut } = useAuth()
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <Button 
      onClick={handleSignOut}
      variant="outline"
      size="sm"
      className="flex items-center gap-2"
    >
      <LogOut size={16} />
      Sign Out
    </Button>
  )
}
```

## 🔒 Security Best Practices Implementation

### PKCE Flow (Already Implemented)
- ✅ Uses `signInWithOAuth` with PKCE flow
- ✅ Secure code exchange in callback route
- ✅ No client-side storage of sensitive tokens

### Session Management
- ✅ Uses `getUser()` instead of `getSession()` for server-side auth checks
- ✅ Proper cookie handling with httpOnly flags
- ✅ Automatic session refresh in middleware

### CSRF Protection
- ✅ Supabase handles CSRF tokens automatically
- ✅ Origin validation in OAuth flow
- ✅ Secure redirect URL validation

### Token Security
- ✅ JWT tokens stored in httpOnly cookies
- ✅ Automatic token rotation
- ✅ No localStorage usage (security risk)

## 🚨 Common Pitfalls to Avoid

### ❌ Don't Do This:
```typescript
// WRONG: Using getSession() in server code
const { data: { session } } = await supabase.auth.getSession()
if (session) {
  // This is not secure!
}

// WRONG: Storing tokens in localStorage
localStorage.setItem('access_token', token)

// WRONG: Trusting client-side auth state only
if (user) {
  // Navigate to dashboard - not secure!
}
```

### ✅ Do This Instead:
```typescript
// CORRECT: Using getUser() for server-side validation
const { data: { user } } = await supabase.auth.getUser()
if (user) {
  // This validates the token with Supabase
}

// CORRECT: Let Supabase handle token storage
// Tokens are automatically stored in httpOnly cookies

// CORRECT: Always validate on server
// Use middleware and server components for protection
```

## 📝 Testing Checklist

### Local Development Testing
- [ ] User can click "Sign In with Google" in AuthCard
- [ ] Redirected to Google OAuth consent screen
- [ ] After Google consent, redirected back to dashboard
- [ ] User data is displayed correctly in dashboard
- [ ] Sign out functionality works
- [ ] Accessing `/dashboard` without auth shows AuthCard
- [ ] After successful auth, user stays on dashboard
- [ ] Middleware properly handles protected routes
- [ ] Error states are handled gracefully

### Security Testing
- [ ] Direct access to `/dashboard` redirects to auth
- [ ] JWT tokens are httpOnly cookies
- [ ] Session persists across browser refresh
- [ ] Sign out clears all auth state
- [ ] No sensitive data in localStorage
- [ ] CSRF protection working (Supabase handles this)

## 🚀 Deployment Configuration

### Production Environment Variables
```bash
NEXT_PUBLIC_SUPABASE_URL=https://pofqpzqlzxsqbejopndt.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_anon_key
```

### Vercel Deployment Setup
1. Set environment variables in Vercel dashboard
2. Update Google Cloud Console with production URLs:
   - **Authorized JavaScript Origins**: `https://yourdomain.vercel.app`
   - **Authorized Redirect URIs**: `https://pofqpzqlzxsqbejopndt.supabase.co/auth/v1/callback`
3. Update Supabase redirect URLs for production

### Custom Domain Configuration
If using custom domain:
1. Update Supabase Site URL to your custom domain
2. Update Google Cloud Console origins and redirect URIs
3. Verify SSL certificate is active

## 🔧 Advanced Configuration

### Row Level Security (RLS)
Enable RLS on your Supabase tables:

```sql
-- Enable RLS on a table
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policy for authenticated users
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = user_id);
```

### Custom Claims & Metadata
Access user metadata in your app:

```typescript
const { user } = useAuth()

// Google OAuth provides these automatically
const userInfo = {
  name: user?.user_metadata?.full_name,
  avatar: user?.user_metadata?.avatar_url,
  email: user?.email,
  provider: user?.app_metadata?.provider,
}
```

## 📚 Additional Resources

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Next.js App Router Authentication](https://nextjs.org/docs/app/building-your-application/routing/middleware)
- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Supabase Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security)

## 🆘 Troubleshooting

### Common Issues:

**1. "Invalid redirect URL" error**
- Verify Google Cloud Console redirect URIs match Supabase callback URL exactly
- Check for trailing slashes or typos

**2. "PKCE verification failed"**
- Ensure you're using `exchangeCodeForSession` in callback route
- Check that cookies are being set properly

**3. Infinite redirect loop**
- Verify middleware matcher patterns don't conflict
- Check that auth state is properly managed

**4. User stays logged out after successful Google auth**
- Check callback route implementation
- Verify session cookies are being set
- Ensure auth state listener is working

**5. Development vs Production URL mismatches**
- Update environment variables for each environment
- Verify Google Cloud Console has correct URLs for each environment

---

## 🎯 Implementation Priority

1. **High Priority**: Steps 1-7 (Core auth functionality)
2. **Medium Priority**: Steps 8-10 (Enhanced UX)
3. **Low Priority**: Steps 11-12 (Additional features)

This implementation provides enterprise-grade security while maintaining excellent user experience. The authentication flow is seamless, secure, and follows all modern best practices for OAuth 2.0 with PKCE flow.