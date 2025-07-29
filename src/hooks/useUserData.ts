"use client"

import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'

// Interface matching the expected user data structure
export interface UserData {
  id: string
  name: string
  email: string
  avatar?: string
  phone?: string
  location?: string
  joinedDate: string
  creditScore: number
  tier: 'green' | 'yellow' | 'red'
  totalLoans: number
  totalAmount: number
  onTimePayments: number
}

// Hook to get real user data from Supabase authentication
export function useUserData(): {
  userData: UserData | null
  loading: boolean
  error: string | null
} {
  const { user, loading: authLoading } = useAuth()
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (authLoading) {
      return // Wait for auth to complete
    }

    if (!user) {
      setUserData(null)
      setLoading(false)
      setError('No authenticated user')
      return
    }

    try {
      // Map Supabase user data to our UserData interface
      const { user_metadata, email, id, created_at, identities } = user

      // Get name from different possible sources
      const getName = (): string => {
        // Try Google OAuth name first
        if (user_metadata?.full_name) return user_metadata.full_name
        if (user_metadata?.name) return user_metadata.name
        
        // Try from identity providers (Google, etc.)
        const googleIdentity = identities?.find(identity => identity.provider === 'google')
        if (googleIdentity?.identity_data?.full_name) {
          return googleIdentity.identity_data.full_name
        }
        if (googleIdentity?.identity_data?.name) {
          return googleIdentity.identity_data.name
        }

        // Fallback to email prefix
        if (email) {
          return email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
        }

        return 'User'
      }

      // Get avatar from Google or other sources
      const getAvatar = (): string | undefined => {
        if (user_metadata?.avatar_url) return user_metadata.avatar_url
        if (user_metadata?.picture) return user_metadata.picture
        
        const googleIdentity = identities?.find(identity => identity.provider === 'google')
        if (googleIdentity?.identity_data?.avatar_url) {
          return googleIdentity.identity_data.avatar_url
        }
        if (googleIdentity?.identity_data?.picture) {
          return googleIdentity.identity_data.picture
        }

        return undefined
      }

      // Map to our UserData structure
      const mappedUserData: UserData = {
        id: id,
        name: getName(),
        email: email || 'No email provided',
        avatar: getAvatar(),
        phone: user_metadata?.phone || undefined,
        location: user_metadata?.location || 'India', // Default location
        joinedDate: created_at || new Date().toISOString(),
        // Default credit data - in production, fetch from your database
        creditScore: 720, // Default score for new users
        tier: 'yellow' as const, // Default tier for new users
        totalLoans: 0,
        totalAmount: 0,
        onTimePayments: 100
      }

      setUserData(mappedUserData)
      setError(null)
    } catch (err) {
      console.error('Error mapping user data:', err)
      setError('Failed to process user data')
      setUserData(null)
    } finally {
      setLoading(false)
    }
  }, [user, authLoading])

  return { userData, loading, error }
}

// Helper function to get user initials
export function getUserInitials(name: string): string {
  return name
    .split(' ')
    .map(part => part.charAt(0).toUpperCase())
    .join('')
    .slice(0, 2) // Limit to 2 characters
}

// Helper function to get display name (first name only)
export function getDisplayName(fullName: string): string {
  return fullName.split(' ')[0]
}
