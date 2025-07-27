"use client"

import DashboardLayout from '@/components/dashboard/DashboardLayout'
import CreditScore from '@/components/dashboard/CreditScore'
import { DashboardTooltipProvider } from '@/components/dashboard/ui/tooltip'
import '../dashboard.css'

export default function CreditScorePage() {
  return (
    <DashboardTooltipProvider>
      <DashboardLayout currentPage="credit-score">
        <CreditScore />
      </DashboardLayout>
    </DashboardTooltipProvider>
  )
}
