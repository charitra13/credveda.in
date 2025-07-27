"use client"

import DashboardLayout from '@/components/dashboard/DashboardLayout'
import UserProfile from '@/components/dashboard/UserProfile'
import { DashboardTooltipProvider } from '@/components/dashboard/ui/tooltip'
import '../dashboard.css'

export default function SettingsPage() {
  return (
    <DashboardTooltipProvider>
      <DashboardLayout currentPage="settings">
        <UserProfile />
      </DashboardLayout>
    </DashboardTooltipProvider>
  )
}
