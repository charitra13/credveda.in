"use client"

import React, { useState } from 'react'
import { 
  Upload, 
  FileText, 
  AlertCircle, 
  CheckCircle, 
  TrendingUp, 
  TrendingDown,
  HelpCircle,
  RefreshCw
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

export default function ProfileAnalyzer() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [hasReport, setHasReport] = useState(true) // Set to true for demo
  
  const tierInfo = getTierInfo(mockCreditAnalysis.tier)

  const handleFileUpload = () => {
    setIsAnalyzing(true)
    setTimeout(() => {
      setIsAnalyzing(false)
      setHasReport(true)
    }, 3000)
  }

  const handleRefresh = () => {
    setIsAnalyzing(true)
    setTimeout(() => {
      setIsAnalyzing(false)
    }, 2000)
  }

  if (!hasReport) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Credit Profile Analyzer</h1>
          <DashboardTooltipProvider>
            <DashboardTooltip>
              <DashboardTooltipTrigger asChild>
                <DashboardButton variant="ghost" size="icon">
                  <HelpCircle className="h-5 w-5" />
                </DashboardButton>
              </DashboardTooltipTrigger>
              <DashboardTooltipContent>
                <p>Upload your CIBIL report to get AI-powered credit analysis with actionable insights</p>
              </DashboardTooltipContent>
            </DashboardTooltip>
          </DashboardTooltipProvider>
        </div>

        <DashboardCard className="max-w-2xl mx-auto">
          <DashboardCardHeader className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Upload className="h-8 w-8 text-primary" />
            </div>
            <DashboardCardTitle>Upload Your Credit Report</DashboardCardTitle>
            <DashboardCardDescription>
              Upload your CIBIL report to get comprehensive AI analysis with SHAP explanations
            </DashboardCardDescription>
          </DashboardCardHeader>
          <DashboardCardContent>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  Drag and drop your CIBIL report here, or
                </p>
                <DashboardButton 
                  onClick={handleFileUpload}
                  disabled={isAnalyzing}
                  className="mx-auto"
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      Choose File
                    </>
                  )}
                </DashboardButton>
              </div>
              <p className="text-xs text-gray-500 mt-4">
                Supports PDF files up to 10MB. Your data is secure and encrypted.
              </p>
            </div>
          </DashboardCardContent>
        </DashboardCard>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Credit Profile Analysis</h1>
          <p className="text-gray-dark">AI-powered insights with SHAP explanations</p>
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
                <p>SHAP values show how each factor contributes to your credit score</p>
              </DashboardTooltipContent>
            </DashboardTooltip>
          </DashboardTooltipProvider>
          <DashboardButton 
            variant="outline" 
            onClick={handleRefresh}
            disabled={isAnalyzing}
          >
            {isAnalyzing ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4 mr-2" />
            )}
            Refresh Analysis
          </DashboardButton>
        </div>
      </div>

      {/* Credit Score Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard className="md:col-span-1">
          <DashboardCardHeader className="text-center">
            <DashboardCardTitle>Credit Score</DashboardCardTitle>
            <div className="flex items-center justify-center space-x-2 mt-4">
              <div className="text-4xl font-bold text-primary">{mockCreditAnalysis.creditScore}</div>
              <div className="flex flex-col items-start">
                <div className={cn("flex items-center text-sm px-2 py-1 rounded-full border", tierInfo.bgColor, tierInfo.color, tierInfo.borderColor)}>
                  <CheckCircle className="h-4 w-4 mr-1" />
                  {tierInfo.label}
                </div>
                <div className="flex items-center text-sm text-success mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +{mockCreditAnalysis.creditScore - mockCreditAnalysis.previousScore} from last month
                </div>
              </div>
            </div>
          </DashboardCardHeader>
          <DashboardCardContent>
            <div className="text-center">
              <p className="text-sm text-gray-dark mb-4">{tierInfo.description}</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="h-2 rounded-full bg-gradient-primary" 
                  style={{ width: `${(mockCreditAnalysis.creditScore / 850) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>300</span>
                <span>850</span>
              </div>
            </div>
          </DashboardCardContent>
        </DashboardCard>

        <DashboardCard className="md:col-span-2">
          <DashboardCardHeader>
            <DashboardCardTitle>Risk Assessment</DashboardCardTitle>
            <DashboardCardDescription>Overall loan readiness and risk profile</DashboardCardDescription>
          </DashboardCardHeader>
          <DashboardCardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-700">{mockCreditAnalysis.loanReadiness}%</div>
                <div className="text-sm text-green-600">Loan Readiness</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-lg font-semibold text-blue-700">{mockCreditAnalysis.riskLevel}</div>
                <div className="text-sm text-blue-600">Risk Level</div>
              </div>
            </div>
          </DashboardCardContent>
        </DashboardCard>
      </div>

      {/* SHAP Analysis */}
      <DashboardCard>
        <DashboardCardHeader>
          <div className="flex items-center justify-between">
            <div>
              <DashboardCardTitle>SHAP Factor Analysis</DashboardCardTitle>
              <DashboardCardDescription>How each factor impacts your credit score</DashboardCardDescription>
            </div>
            <DashboardTooltipProvider>
              <DashboardTooltip>
                <DashboardTooltipTrigger asChild>
                  <DashboardButton variant="ghost" size="icon">
                    <HelpCircle className="h-5 w-5" />
                  </DashboardButton>
                </DashboardTooltipTrigger>
                <DashboardTooltipContent>
                  <p>SHAP values quantify the contribution of each factor to your credit score</p>
                </DashboardTooltipContent>
              </DashboardTooltip>
            </DashboardTooltipProvider>
          </div>
        </DashboardCardHeader>
        <DashboardCardContent>
          <div className="space-y-4">
            {mockCreditAnalysis.factors.map((factor, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className={cn(
                    "p-2 rounded-full",
                    factor.impact === 'positive' ? 'bg-green-100' : 
                    factor.impact === 'negative' ? 'bg-red-100' : 'bg-yellow-100'
                  )}>
                    {factor.impact === 'positive' ? (
                      <TrendingUp className={cn("h-4 w-4", "text-green-600")} />
                    ) : factor.impact === 'negative' ? (
                      <TrendingDown className={cn("h-4 w-4", "text-red-600")} />
                    ) : (
                      <AlertCircle className={cn("h-4 w-4", "text-yellow-600")} />
                    )}
                  </div>
                  <div>
                    <div className="font-medium">{factor.name}</div>
                    <div className="text-sm text-gray-dark">
                      Weight: {(factor.weight * 100).toFixed(0)}% | Score: {factor.score}/100
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className={cn(
                        "h-2 rounded-full",
                        factor.impact === 'positive' ? 'bg-green-500' : 
                        factor.impact === 'negative' ? 'bg-red-500' : 'bg-yellow-500'
                      )}
                      style={{ width: `${factor.score}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium w-8">{factor.score}</span>
                </div>
              </div>
            ))}
          </div>
        </DashboardCardContent>
      </DashboardCard>

      {/* Recommendations */}
      <DashboardCard>
        <DashboardCardHeader>
          <DashboardCardTitle>Improvement Recommendations</DashboardCardTitle>
          <DashboardCardDescription>Actionable steps to improve your credit profile</DashboardCardDescription>
        </DashboardCardHeader>
        <DashboardCardContent>
          <div className="space-y-3">
            {mockCreditAnalysis.recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-blue-800">{recommendation}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-center">
            <DashboardButton variant="primary">
              Get Detailed Report
            </DashboardButton>
          </div>
        </DashboardCardContent>
      </DashboardCard>
    </div>
  )
}
