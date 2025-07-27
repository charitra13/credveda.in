"use client"

import DashboardLayout from '@/components/dashboard/DashboardLayout'
import NBFCComparison from '@/components/dashboard/NBFCComparison'
import { DashboardTooltipProvider } from '@/components/dashboard/ui/tooltip'
import '../dashboard.css'

export default function NBFCComparisonPage() {
  return (
    <DashboardTooltipProvider>
      <DashboardLayout currentPage="nbfc-comparison">
        <NBFCComparison />
      </DashboardLayout>
    </DashboardTooltipProvider>
  )
}
