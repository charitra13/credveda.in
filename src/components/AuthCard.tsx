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

      const { error } = await supabase.auth.signInWithOAuth({
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