"use client"

import React from 'react'
import { 
  CreditCard, 
  TrendingUp, 
  Bell, 
  Target,
  ArrowUpRight,
  AlertCircle,
  CheckCircle,
  Calendar,
  Building2,
  Zap,
  HelpCircle
} from 'lucide-react'
import { 
  DashboardCard, 
  DashboardCardContent, 
  DashboardCardDescription, 
  DashboardCardHeader, 
  DashboardCardTitle 
} from '@/components/dashboard/ui/card'
import { DashboardButton } from '@/components/dashboard/ui/button'
import { 
  DashboardTooltip, 
  DashboardTooltipContent, 
  DashboardTooltipProvider, 
  DashboardTooltipTrigger 
} from '@/components/dashboard/ui/tooltip'
import { cn, mockCreditAnalysis, mockEMIReminders, getTierInfo, formatCurrency, formatDate } from '@/lib/dashboard/utils'
import { useUserData, getDisplayName } from '@/hooks/useUserData'

export default function Dashboard() {
  const { userData, loading } = useUserData()
  
  if (loading || !userData) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  const tierInfo = getTierInfo(mockCreditAnalysis.tier)
  const upcomingEMIs = mockEMIReminders.filter(emi => emi.status === 'upcoming')
  const nextEMI = upcomingEMIs[0]

  const quickActions = [
    {
      title: "Upload CIBIL Report",
      description: "Get AI-powered credit analysis",
      icon: CreditCard,
      color: "bg-primary/10 text-primary",
      href: "/dashboard/profile"
    },
    {
      title: "Set EMI Reminder",
      description: "Never miss a payment",
      icon: Bell,
      color: "bg-warning/10 text-warning",
      href: "/dashboard/emi-reminders"
    },
    {
      title: "Compare NBFCs",
      description: "Find best loan rates",
      icon: TrendingUp,
      color: "bg-secondary/10 text-secondary",
      href: "/dashboard/nbfc-comparison"
    },
    {
      title: "Improve Score",
      description: "Get personalized tips",
      icon: Target,
      color: "bg-accent/10 text-accent",
      href: "/dashboard/credit-score"
    }
  ]

  const recentInsights = [
    {
      title: "Credit Utilization Improved",
      description: "Your utilization dropped to 22.5% this month",
      type: "positive",
      timestamp: "2 hours ago"
    },
    {
      title: "New NBFC Match Found",
      description: "Bajaj Finserv offers 10.99% interest rate",
      type: "info",
      timestamp: "1 day ago"
    },
    {
      title: "EMI Due Tomorrow",
      description: "HDFC Bank EMI of ₹15,000 due tomorrow",
      type: "warning",
      timestamp: "Just now"
    }
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section - UPDATED */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Welcome back, {getDisplayName(userData.name)}!</h1>
          <p className="text-gray-dark">Here&apos;s your financial health overview</p>
        </div>
        <div className="flex items-center space-x-2">
          <DashboardTooltipProvider>
            <DashboardTooltip>
              <DashboardTooltipTrigger asChild>
                <DashboardButton variant="ghost" size="icon">
                  <HelpCircle className="h-5 w-5" />
                </DashboardButton>
              </DashboardTooltipTrigger>
              <DashboardTooltipContent>
                <p>Need help? Click here for onboarding tips and feature explanations</p>
              </DashboardTooltipContent>
            </DashboardTooltip>
          </DashboardTooltipProvider>
          <DashboardButton variant="primary">
            <Zap className="h-4 w-4 mr-2" />
            Quick Analysis
          </DashboardButton>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Credit Score */}
        <DashboardCard className="hover:shadow-md transition-shadow">
          <DashboardCardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Credit Score</p>
                <div className="flex items-center space-x-2">
                  <p className="text-2xl font-bold text-primary">{mockCreditAnalysis.creditScore}</p>
                  <div className={cn("text-xs px-2 py-1 rounded-full border", tierInfo.bgColor, tierInfo.color, tierInfo.borderColor)}>
                    {tierInfo.label}
                  </div>
                </div>
                <div className="flex items-center text-sm text-success mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +{mockCreditAnalysis.creditScore - mockCreditAnalysis.previousScore} this month
                </div>
              </div>
              <CreditCard className="h-8 w-8 text-primary" />
            </div>
          </DashboardCardContent>
        </DashboardCard>

        {/* Loan Readiness */}
        <DashboardCard className="hover:shadow-md transition-shadow">
          <DashboardCardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Loan Readiness</p>
                <p className="text-2xl font-bold text-secondary">{mockCreditAnalysis.loanReadiness}%</p>
                <p className="text-sm text-gray-500 mt-1">{mockCreditAnalysis.riskLevel} Risk</p>
              </div>
              <Target className="h-8 w-8 text-secondary" />
            </div>
          </DashboardCardContent>
        </DashboardCard>

        {/* Active EMIs */}
        <DashboardCard className="hover:shadow-md transition-shadow">
          <DashboardCardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active EMIs</p>
                <p className="text-2xl font-bold text-foreground">{mockEMIReminders.length}</p>
                <p className="text-sm text-gray-500 mt-1">Total: ₹35,500/month</p>
              </div>
              <Bell className="h-8 w-8 text-warning" />
            </div>
          </DashboardCardContent>
        </DashboardCard>

        {/* NBFC Matches */}
        <DashboardCard className="hover:shadow-md transition-shadow">
          <DashboardCardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">NBFC Matches</p>
                <p className="text-2xl font-bold text-accent">12</p>
                <p className="text-sm text-accent mt-1">Best: 10.99% APR</p>
              </div>
              <Building2 className="h-8 w-8 text-accent" />
            </div>
          </DashboardCardContent>
        </DashboardCard>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Credit Profile Overview */}
        <DashboardCard className="lg:col-span-2">
          <DashboardCardHeader>
            <div className="flex items-center justify-between">
              <div>
                <DashboardCardTitle>Credit Profile Overview</DashboardCardTitle>
                <DashboardCardDescription>Your current financial standing</DashboardCardDescription>
              </div>
              <DashboardButton variant="outline" size="sm">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                View Details
              </DashboardButton>
            </div>
          </DashboardCardHeader>
          <DashboardCardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Score Progress */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium">Score Progress</h4>
                  <span className="text-sm text-success font-medium">+25 this month</span>
                </div>
                <div className="relative">
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="h-3 rounded-full bg-gradient-primary" 
                      style={{ width: `${(mockCreditAnalysis.creditScore / 850) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>300</span>
                    <span className="font-medium text-primary">{mockCreditAnalysis.creditScore}</span>
                    <span>850</span>
                  </div>
                </div>
              </div>

              {/* Key Factors */}
              <div>
                <h4 className="font-medium mb-4">Key Factors</h4>
                <div className="space-y-2">
                  {mockCreditAnalysis.factors.slice(0, 3).map((factor, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{factor.name}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-1.5">
                          <div 
                            className={cn("h-1.5 rounded-full", 
                              factor.impact === 'positive' ? 'bg-success' : 
                              factor.impact === 'negative' ? 'bg-danger' : 'bg-warning'
                            )}
                            style={{ width: `${factor.score}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{factor.score}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="font-medium mb-3">Top Recommendations</h4>
              <div className="space-y-2">
                {mockCreditAnalysis.recommendations.slice(0, 2).map((rec, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700">{rec}</p>
                  </div>
                ))}
              </div>
            </div>
          </DashboardCardContent>
        </DashboardCard>

        {/* Sidebar Content */}
        <div className="space-y-6">
          {/* Next EMI */}
          {nextEMI && (
            <DashboardCard>
              <DashboardCardHeader>
                <DashboardCardTitle className="text-lg">Next EMI Due</DashboardCardTitle>
                <DashboardCardDescription>Don&apos;t miss your upcoming payment</DashboardCardDescription>
              </DashboardCardHeader>
              <DashboardCardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{nextEMI.lenderName}</span>
                    <span className="text-lg font-bold text-primary">{formatCurrency(nextEMI.amount)}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>Due: {formatDate(nextEMI.dueDate)}</span>
                  </div>
                  <div className="flex space-x-2">
                    <DashboardButton variant="primary" size="sm" className="flex-1">
                      Pay Now
                    </DashboardButton>
                    <DashboardButton variant="outline" size="sm">
                      Remind Me
                    </DashboardButton>
                  </div>
                </div>
              </DashboardCardContent>
            </DashboardCard>
          )}

          {/* Recent Insights */}
          <DashboardCard>
            <DashboardCardHeader>
              <DashboardCardTitle className="text-lg">Recent Insights</DashboardCardTitle>
              <DashboardCardDescription>Latest updates on your profile</DashboardCardDescription>
            </DashboardCardHeader>
            <DashboardCardContent>
              <div className="space-y-3">
                {recentInsights.map((insight, index) => {
                  const Icon = insight.type === 'positive' ? CheckCircle :
                             insight.type === 'warning' ? AlertCircle :
                             Bell

                  return (
                    <div key={index} className="flex items-start space-x-3">
                      <div className={cn("p-2 rounded-full", 
                        insight.type === 'positive' ? 'bg-success/10' :
                        insight.type === 'warning' ? 'bg-warning/10' : 'bg-primary/10'
                      )}>
                        <Icon className={cn("h-4 w-4",
                          insight.type === 'positive' ? 'text-success' :
                          insight.type === 'warning' ? 'text-warning' : 'text-primary'
                        )} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{insight.title}</p>
                        <p className="text-xs text-gray-600">{insight.description}</p>
                        <p className="text-xs text-gray-500 mt-1">{insight.timestamp}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </DashboardCardContent>
          </DashboardCard>
        </div>
      </div>

      {/* Quick Actions */}
      <DashboardCard>
        <DashboardCardHeader>
          <DashboardCardTitle>Quick Actions</DashboardCardTitle>
          <DashboardCardDescription>Common tasks to improve your credit profile</DashboardCardDescription>
        </DashboardCardHeader>
        <DashboardCardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon
              return (
                <div key={index} className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                  <div className={cn("p-3 rounded-lg", action.color)}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm">{action.title}</h4>
                    <p className="text-xs text-gray-600">{action.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </DashboardCardContent>
      </DashboardCard>

      {/* Onboarding Tips */}
      <DashboardCard className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
        <DashboardCardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <HelpCircle className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-primary mb-2">Getting Started with CredVeda</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="space-y-1">
                  <p className="font-medium">1. Upload Your CIBIL Report</p>
                  <p className="text-gray-600">Get AI-powered analysis with SHAP explanations</p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium">2. Set EMI Reminders</p>
                  <p className="text-gray-600">Never miss payments with multi-channel alerts</p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium">3. Compare NBFC Rates</p>
                  <p className="text-gray-600">Find the best loan offers tailored to your profile</p>
                </div>
              </div>
            </div>
          </div>
        </DashboardCardContent>
      </DashboardCard>
    </div>
  )
}
