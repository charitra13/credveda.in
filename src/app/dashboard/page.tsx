"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import Dashboard from '@/components/dashboard/Dashboard'
import { DashboardTooltipProvider } from '@/components/dashboard/ui/tooltip'
import './dashboard.css'

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/?auth=required&redirectTo=/dashboard')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect via useEffect
  }

  return (
    <DashboardTooltipProvider>
      <DashboardLayout currentPage="dashboard">
        <Dashboard />
      </DashboardLayout>
    </DashboardTooltipProvider>
  )
}
