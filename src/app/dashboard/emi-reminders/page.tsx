"use client"

import DashboardLayout from '@/components/dashboard/DashboardLayout'
import EMIReminders from '@/components/dashboard/EMIReminders'
import { DashboardTooltipProvider } from '@/components/dashboard/ui/tooltip'
import '../dashboard.css'

export default function EMIRemindersPage() {
  return (
    <DashboardTooltipProvider>
      <DashboardLayout currentPage="emi-reminders">
        <EMIReminders />
      </DashboardLayout>
    </DashboardTooltipProvider>
  )
}
