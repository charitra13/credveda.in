"use client"

import DashboardLayout from '@/components/dashboard/DashboardLayout'
import ProfileAnalyzer from '@/components/dashboard/ProfileAnalyzer'
import { DashboardTooltipProvider } from '@/components/dashboard/ui/tooltip'
import '../dashboard.css'

export default function ProfilePage() {
  return (
    <DashboardTooltipProvider>
      <DashboardLayout currentPage="profile">
        <ProfileAnalyzer />
      </DashboardLayout>
    </DashboardTooltipProvider>
  )
}
