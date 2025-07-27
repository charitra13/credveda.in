"use client"

import React, { useState } from 'react'
import { 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  Target,
  HelpCircle,
  CheckCircle
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
import { cn, mockCreditAnalysis, getTierInfo } from '@/lib/dashboard/utils'

// Mock historical data for demonstration
const mockHistoricalData = [
  { month: 'Jan 2024', score: 680 },
  { month: 'Feb 2024', score: 692 },
  { month: 'Mar 2024', score: 705 },
  { month: 'Apr 2024', score: 718 },
  { month: 'May 2024', score: 720 },
  { month: 'Jun 2024', score: 745 }
]

const mockCreditUtilization = [
  { cardName: 'HDFC Credit Card', limit: 200000, used: 45000, utilization: 22.5 },
  { cardName: 'ICICI Bank Card', limit: 150000, used: 38000, utilization: 25.3 },
  { cardName: 'Axis Bank Card', limit: 100000, used: 15000, utilization: 15.0 }
]

export default function CreditScore() {
  const [activeTab, setActiveTab] = useState('overview')
  const tierInfo = getTierInfo(mockCreditAnalysis.tier)

  const totalLimit = mockCreditUtilization.reduce((sum, card) => sum + card.limit, 0)
  const totalUsed = mockCreditUtilization.reduce((sum, card) => sum + card.used, 0)
  const overallUtilization = (totalUsed / totalLimit) * 100

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Credit Score Dashboard</h1>
          <p className="text-gray-dark">Track your credit health and improvement progress</p>
        </div>
        <DashboardTooltipProvider>
          <DashboardTooltip>
            <DashboardTooltipTrigger asChild>
              <DashboardButton variant="ghost" size="icon">
                <HelpCircle className="h-5 w-5" />
              </DashboardButton>
            </DashboardTooltipTrigger>
            <DashboardTooltipContent>
              <p>Your credit score is updated monthly. Higher scores unlock better loan rates.</p>
            </DashboardTooltipContent>
          </DashboardTooltip>
        </DashboardTooltipProvider>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'history', label: 'History' },
          { id: 'utilization', label: 'Utilization' },
          { id: 'improvement', label: 'Improvement' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors",
              activeTab === tab.id 
                ? "bg-white text-primary shadow-sm" 
                : "text-gray-600 hover:text-gray-900"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Credit Score Card */}
          <DashboardCard className="lg:col-span-2">
            <DashboardCardHeader>
              <DashboardCardTitle>Current Credit Score</DashboardCardTitle>
              <DashboardCardDescription>Last updated: {new Date().toLocaleDateString('en-IN')}</DashboardCardDescription>
            </DashboardCardHeader>
            <DashboardCardContent>
              <div className="flex items-center justify-between mb-6">
                <div className="text-center">
                  <div className="text-5xl font-bold text-primary mb-2">
                    {mockCreditAnalysis.creditScore}
                  </div>
                  <div className={cn("inline-flex items-center px-3 py-1 rounded-full text-sm border", tierInfo.bgColor, tierInfo.color, tierInfo.borderColor)}>
                    <CheckCircle className="h-4 w-4 mr-1" />
                    {tierInfo.label}
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center text-success mb-2">
                    <TrendingUp className="h-5 w-5 mr-1" />
                    <span className="text-lg font-semibold">+{mockCreditAnalysis.creditScore - mockCreditAnalysis.previousScore}</span>
                  </div>
                  <div className="text-sm text-gray-dark">vs last month</div>
                </div>
              </div>

              {/* Score Range */}
              <div className="relative">
                <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                  <div 
                    className="h-4 rounded-full bg-gradient-primary" 
                    style={{ width: `${(mockCreditAnalysis.creditScore / 850) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Poor<br/>300-549</span>
                  <span>Fair<br/>550-649</span>
                  <span>Good<br/>650-749</span>
                  <span>Excellent<br/>750-850</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">{tierInfo.description}</p>
              </div>
            </DashboardCardContent>
          </DashboardCard>

          {/* Score Factors */}
          <DashboardCard>
            <DashboardCardHeader>
              <DashboardCardTitle>Score Factors</DashboardCardTitle>
              <DashboardCardDescription>Key metrics affecting your score</DashboardCardDescription>
            </DashboardCardHeader>
            <DashboardCardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Payment History</span>
                <span className="text-sm font-medium text-success">Excellent</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Credit Utilization</span>
                <span className="text-sm font-medium text-success">{overallUtilization.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Credit Age</span>
                <span className="text-sm font-medium text-warning">5.2 years</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Credit Mix</span>
                <span className="text-sm font-medium text-success">Good</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Recent Inquiries</span>
                <span className="text-sm font-medium text-success">2 (Good)</span>
              </div>
            </DashboardCardContent>
          </DashboardCard>
        </div>
      )}

      {/* History Tab */}
      {activeTab === 'history' && (
        <div className="space-y-6">
          <DashboardCard>
            <DashboardCardHeader>
              <DashboardCardTitle>Score Trend (6 Months)</DashboardCardTitle>
              <DashboardCardDescription>Your credit score improvement over time</DashboardCardDescription>
            </DashboardCardHeader>
            <DashboardCardContent>
              <div className="space-y-4">
                {mockHistoricalData.map((data, index) => {
                  const isLatest = index === mockHistoricalData.length - 1
                  const previousScore = index > 0 ? mockHistoricalData[index - 1].score : data.score
                  const change = data.score - previousScore
                  
                  return (
                    <div key={data.month} className={cn("flex items-center justify-between p-3 rounded-lg", isLatest ? "bg-primary/5 border border-primary/20" : "bg-gray-50")}>
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className={cn("font-medium", isLatest ? "text-primary" : "text-foreground")}>
                          {data.month}
                        </span>
                        {isLatest && <span className="text-xs bg-primary text-white px-2 py-1 rounded-full">Current</span>}
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={cn("text-2xl font-bold", isLatest ? "text-primary" : "text-foreground")}>
                          {data.score}
                        </span>
                        {change !== 0 && (
                          <div className={cn("flex items-center text-sm", change > 0 ? "text-success" : "text-danger")}>
                            {change > 0 ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                            {Math.abs(change)}
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </DashboardCardContent>
          </DashboardCard>
        </div>
      )}

      {/* Utilization Tab */}
      {activeTab === 'utilization' && (
        <div className="space-y-6">
          <DashboardCard>
            <DashboardCardHeader>
              <DashboardCardTitle>Credit Utilization Overview</DashboardCardTitle>
              <DashboardCardDescription>Keep utilization below 30% for optimal credit health</DashboardCardDescription>
            </DashboardCardHeader>
            <DashboardCardContent>
              <div className="mb-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">
                  {overallUtilization.toFixed(1)}%
                </div>
                <div className="text-sm text-gray-600">Overall Utilization</div>
                <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
                  <div 
                    className={cn("h-3 rounded-full", overallUtilization <= 30 ? "bg-success" : "bg-warning")}
                    style={{ width: `${Math.min(overallUtilization, 100)}%` }}
                  ></div>
                </div>
              </div>

              <div className="space-y-4">
                {mockCreditUtilization.map((card, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-medium">{card.cardName}</span>
                      <span className={cn("text-sm font-semibold", card.utilization <= 30 ? "text-success" : "text-warning")}>
                        {card.utilization.toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div 
                        className={cn("h-2 rounded-full", card.utilization <= 30 ? "bg-success" : "bg-warning")}
                        style={{ width: `${Math.min(card.utilization, 100)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>₹{card.used.toLocaleString()} used</span>
                      <span>₹{card.limit.toLocaleString()} limit</span>
                    </div>
                  </div>
                ))}
              </div>
            </DashboardCardContent>
          </DashboardCard>
        </div>
      )}

      {/* Improvement Tab */}
      {activeTab === 'improvement' && (
        <div className="space-y-6">
          <DashboardCard>
            <DashboardCardHeader>
              <DashboardCardTitle>Score Improvement Plan</DashboardCardTitle>
              <DashboardCardDescription>Actionable steps to boost your credit score</DashboardCardDescription>
            </DashboardCardHeader>
            <DashboardCardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "Reduce Credit Utilization",
                    description: "Pay down balances to below 30% utilization",
                    impact: "High",
                    timeframe: "1-2 months",
                    status: "in-progress"
                  },
                  {
                    title: "Set Up Autopay",
                    description: "Ensure all payments are made on time",
                    impact: "High", 
                    timeframe: "Immediate",
                    status: "completed"
                  },
                  {
                    title: "Check Credit Report",
                    description: "Review for errors and dispute if necessary",
                    impact: "Medium",
                    timeframe: "1 month",
                    status: "pending"
                  },
                  {
                    title: "Increase Credit Limits",
                    description: "Request limit increases on existing cards",
                    impact: "Medium",
                    timeframe: "2-3 months",
                    status: "pending"
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg">
                    <div className={cn("w-3 h-3 rounded-full mt-1", 
                      item.status === 'completed' ? 'bg-success' :
                      item.status === 'in-progress' ? 'bg-warning' : 'bg-gray-300'
                    )}></div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{item.title}</h4>
                        <div className="flex space-x-2">
                          <span className={cn("text-xs px-2 py-1 rounded-full",
                            item.impact === 'High' ? 'bg-red-100 text-red-700' :
                            item.impact === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-green-100 text-green-700'
                          )}>
                            {item.impact} Impact
                          </span>
                          <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                            {item.timeframe}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-center">
                <DashboardButton variant="primary">
                  <Target className="h-4 w-4 mr-2" />
                  Set Score Goal
                </DashboardButton>
              </div>
            </DashboardCardContent>
          </DashboardCard>
        </div>
      )}
    </div>
  )
}
