"use client"

import React, { useState } from 'react'
import { 
  Star,
  Clock,
  Calculator,
  ExternalLink,
  HelpCircle,
  Search
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
import { cn, mockNBFCs, formatCurrency } from '@/lib/dashboard/utils'

export default function NBFCComparison() {
  const [activeTab, setActiveTab] = useState('compare')
  const [filterLoanType, setFilterLoanType] = useState('all')
  const [sortBy, setSortBy] = useState('interestRate')
  const [loanAmount, setLoanAmount] = useState(200000)
  const [loanTenure, setLoanTenure] = useState(36)

  const filteredNBFCs = mockNBFCs
    .filter(nbfc => filterLoanType === 'all' || nbfc.category === filterLoanType)
    .sort((a, b) => {
      switch(sortBy) {
        case 'interestRate':
          return a.interestRate - b.interestRate
        case 'processingFee':
          return a.processingFee - b.processingFee
        case 'rating':
          return b.rating - a.rating
        default:
          return 0
      }
    })

  const calculateEMI = (principal: number, rate: number, tenure: number) => {
    const monthlyRate = rate / (12 * 100)
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / (Math.pow(1 + monthlyRate, tenure) - 1)
    return Math.round(emi)
  }

  const calculateTotalCost = (principal: number, emi: number, tenure: number, processingFeePercent: number) => {
    const totalPayment = emi * tenure
    const processingFee = (principal * processingFeePercent) / 100
    return totalPayment + processingFee
  }

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={cn("h-4 w-4", i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300")} 
      />
    ))
  }

  const LoanCalculator = () => (
    <DashboardCard>
      <DashboardCardHeader>
        <DashboardCardTitle>Loan Calculator</DashboardCardTitle>
        <DashboardCardDescription>Adjust loan parameters to see updated comparisons</DashboardCardDescription>
      </DashboardCardHeader>
      <DashboardCardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Loan Amount</label>
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="200000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Tenure (Months)</label>
            <input
              type="number"
              value={loanTenure}
              onChange={(e) => setLoanTenure(Number(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="36"
            />
          </div>
        </div>
      </DashboardCardContent>
    </DashboardCard>
  )

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">NBFC Comparison</h1>
          <p className="text-gray-dark">Compare interest rates and terms from top NBFCs</p>
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
                <p>Compare loan offers from verified NBFCs to find the best deal</p>
              </DashboardTooltipContent>
            </DashboardTooltip>
          </DashboardTooltipProvider>
          <DashboardButton variant="outline">
            <Search className="h-4 w-4 mr-2" />
            Find More Lenders
          </DashboardButton>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {[
          { id: 'compare', label: 'Compare Rates' },
          { id: 'calculator', label: 'EMI Calculator' },
          { id: 'eligibility', label: 'Check Eligibility' }
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

      {/* Filters and Calculator */}
      {activeTab === 'compare' && (
        <>
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              <select
                value={filterLoanType}
                onChange={(e) => setFilterLoanType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="all">All Loan Types</option>
                <option value="Personal Loan">Personal Loan</option>
                <option value="Business Loan">Business Loan</option>
                <option value="Consumer Loan">Consumer Loan</option>
                <option value="Vehicle Loan">Vehicle Loan</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="interestRate">Sort by Interest Rate</option>
                <option value="processingFee">Sort by Processing Fee</option>
                <option value="rating">Sort by Rating</option>
              </select>
            </div>

            <div className="flex-1" />

            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Loan Amount:</span>
              <input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-24 px-2 py-1 border border-gray-300 rounded text-sm"
              />
            </div>
          </div>

          {/* NBFC Comparison Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredNBFCs.map((nbfc) => {
              const emi = calculateEMI(loanAmount, nbfc.interestRate, loanTenure)
              const totalCost = calculateTotalCost(loanAmount, emi, loanTenure, nbfc.processingFee)
              const isEligible = loanAmount >= nbfc.minLoanAmount && loanAmount <= nbfc.maxLoanAmount

              return (
                <DashboardCard key={nbfc.id} className={cn("hover:shadow-lg transition-shadow", !isEligible && "opacity-75")}>
                  <DashboardCardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <DashboardCardTitle className="text-lg">{nbfc.name}</DashboardCardTitle>
                        <DashboardCardDescription>{nbfc.category}</DashboardCardDescription>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1">
                          {getRatingStars(nbfc.rating)}
                          <span className="text-sm text-gray-600 ml-1">{nbfc.rating}</span>
                        </div>
                      </div>
                    </div>
                  </DashboardCardHeader>
                  <DashboardCardContent>
                    <div className="space-y-4">
                      {/* Key Details */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-primary/5 rounded-lg">
                          <div className="text-2xl font-bold text-primary">{nbfc.interestRate}%</div>
                          <div className="text-sm text-gray-600">Interest Rate</div>
                        </div>
                        <div className="text-center p-3 bg-secondary/5 rounded-lg">
                          <div className="text-2xl font-bold text-secondary">{formatCurrency(emi)}</div>
                          <div className="text-sm text-gray-600">Monthly EMI</div>
                        </div>
                      </div>

                      {/* Additional Details */}
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Processing Fee</span>
                          <span className="font-medium">{nbfc.processingFee}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Loan Range</span>
                          <span className="font-medium">
                            {formatCurrency(nbfc.minLoanAmount)} - {formatCurrency(nbfc.maxLoanAmount)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Tenure</span>
                          <span className="font-medium">{nbfc.tenure}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Approval Time</span>
                          <span className="font-medium flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {nbfc.approvalTime}
                          </span>
                        </div>
                        <div className="flex justify-between border-t pt-2 mt-3">
                          <span className="text-gray-600">Total Cost</span>
                          <span className="font-semibold">{formatCurrency(totalCost)}</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-2">
                        {isEligible ? (
                          <>
                            <DashboardButton variant="primary" className="flex-1">
                              Apply Now
                            </DashboardButton>
                            <DashboardButton variant="outline" size="icon">
                              <ExternalLink className="h-4 w-4" />
                            </DashboardButton>
                          </>
                        ) : (
                          <DashboardButton variant="outline" className="flex-1" disabled>
                            Not Eligible
                          </DashboardButton>
                        )}
                      </div>

                      {!isEligible && (
                        <div className="text-xs text-center text-gray-500 bg-gray-50 p-2 rounded">
                          Loan amount should be between {formatCurrency(nbfc.minLoanAmount)} - {formatCurrency(nbfc.maxLoanAmount)}
                        </div>
                      )}
                    </div>
                  </DashboardCardContent>
                </DashboardCard>
              )
            })}
          </div>
        </>
      )}

      {/* Calculator Tab */}
      {activeTab === 'calculator' && (
        <div className="max-w-4xl mx-auto space-y-6">
          <LoanCalculator />
          
          <DashboardCard>
            <DashboardCardHeader>
              <DashboardCardTitle>EMI Breakdown</DashboardCardTitle>
              <DashboardCardDescription>Detailed calculation for your loan</DashboardCardDescription>
            </DashboardCardHeader>
            <DashboardCardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredNBFCs.slice(0, 3).map((nbfc) => {
                  const emi = calculateEMI(loanAmount, nbfc.interestRate, loanTenure)
                  const totalInterest = (emi * loanTenure) - loanAmount
                  const processingFee = (loanAmount * nbfc.processingFee) / 100

                  return (
                    <div key={nbfc.id} className="text-center p-4 border border-gray-200 rounded-lg">
                      <h4 className="font-semibold mb-4">{nbfc.name}</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Principal</span>
                          <span>{formatCurrency(loanAmount)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Interest</span>
                          <span>{formatCurrency(totalInterest)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Processing Fee</span>
                          <span>{formatCurrency(processingFee)}</span>
                        </div>
                        <div className="flex justify-between font-semibold border-t pt-2">
                          <span>Monthly EMI</span>
                          <span className="text-primary">{formatCurrency(emi)}</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </DashboardCardContent>
          </DashboardCard>
        </div>
      )}

      {/* Eligibility Tab */}
      {activeTab === 'eligibility' && (
        <div className="max-w-2xl mx-auto">
          <DashboardCard>
            <DashboardCardHeader>
              <DashboardCardTitle>Loan Eligibility Checker</DashboardCardTitle>
              <DashboardCardDescription>Check your eligibility across different NBFCs</DashboardCardDescription>
            </DashboardCardHeader>
            <DashboardCardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Monthly Income</label>
                    <input type="number" placeholder="50000" className="w-full p-3 border border-gray-300 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Employment Type</label>
                    <select className="w-full p-3 border border-gray-300 rounded-lg">
                      <option>Salaried</option>
                      <option>Self Employed</option>
                      <option>Business Owner</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Age</label>
                    <input type="number" placeholder="30" className="w-full p-3 border border-gray-300 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">City</label>
                    <input type="text" placeholder="Mumbai" className="w-full p-3 border border-gray-300 rounded-lg" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Existing EMIs</label>
                    <input type="number" placeholder="15000" className="w-full p-3 border border-gray-300 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Company Type</label>
                    <select className="w-full p-3 border border-gray-300 rounded-lg">
                      <option>MNC</option>
                      <option>Public Sector</option>
                      <option>Private Limited</option>
                      <option>Partnership</option>
                    </select>
                  </div>
                </div>

                <DashboardButton variant="primary" className="w-full">
                  <Calculator className="h-4 w-4 mr-2" />
                  Check Eligibility
                </DashboardButton>
              </div>

              {/* Mock Eligibility Results */}
              <div className="mt-6 space-y-3">
                <h4 className="font-medium">Eligibility Results</h4>
                {filteredNBFCs.slice(0, 4).map((nbfc, index) => (
                  <div key={nbfc.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <span className="font-medium">{nbfc.name}</span>
                    <div className="flex items-center space-x-2">
                      <span className={cn(
                        "px-2 py-1 rounded-full text-xs",
                        index < 3 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      )}>
                        {index < 3 ? "Eligible" : "Not Eligible"}
                      </span>
                      {index < 3 && (
                        <span className="text-sm text-gray-600">
                          Up to {formatCurrency(Math.floor(Math.random() * 500000) + 100000)}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </DashboardCardContent>
          </DashboardCard>
        </div>
      )}
    </div>
  )
}
