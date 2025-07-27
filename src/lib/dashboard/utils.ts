import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Mock data utilities for dashboard
export const mockUser = {
  id: "1",
  name: "Rahul Sharma",
  email: "rahul.sharma@example.com",
  avatar: "/api/placeholder/40/40",
  phone: "+91 98765 43210",
  location: "Mumbai, Maharashtra",
  joinedDate: "2024-01-15",
  creditScore: 745,
  tier: "green" as const,
  totalLoans: 3,
  totalAmount: 125000,
  onTimePayments: 95.5
}

export const mockCreditAnalysis = {
  creditScore: 745,
  tier: "green" as const,
  previousScore: 720,
  factors: [
    { name: "Payment History", score: 90, impact: "positive", weight: 0.35 },
    { name: "Credit Utilization", score: 85, impact: "positive", weight: 0.30 },
    { name: "Length of Credit History", score: 75, impact: "neutral", weight: 0.15 },
    { name: "Types of Credit", score: 80, impact: "positive", weight: 0.10 },
    { name: "Recent Credit", score: 70, impact: "negative", weight: 0.10 }
  ],
  recommendations: [
    "Keep credit utilization below 30%",
    "Continue making timely payments",
    "Consider diversifying credit types"
  ],
  riskLevel: "Low",
  loanReadiness: 85
}

export const mockEMIReminders = [
  {
    id: "1",
    lenderName: "HDFC Bank",
    amount: 15000,
    dueDate: "2024-02-05",
    status: "upcoming",
    loanType: "Personal Loan",
    accountNumber: "****1234"
  },
  {
    id: "2", 
    lenderName: "Bajaj Finserv",
    amount: 8500,
    dueDate: "2024-02-10",
    status: "upcoming",
    loanType: "Consumer Loan",
    accountNumber: "****5678"
  },
  {
    id: "3",
    lenderName: "Tata Capital",
    amount: 12000,
    dueDate: "2024-01-28",
    status: "paid",
    loanType: "Business Loan",
    accountNumber: "****9012"
  }
]

export const mockNBFCs = [
  {
    id: "1",
    name: "Bajaj Finserv",
    interestRate: 10.99,
    processingFee: 2.5,
    maxLoanAmount: 500000,
    minLoanAmount: 50000,
    tenure: "12-60 months",
    rating: 4.5,
    approvalTime: "24 hours",
    category: "Personal Loan"
  },
  {
    id: "2",
    name: "Tata Capital",
    interestRate: 11.49,
    processingFee: 3.0,
    maxLoanAmount: 1000000,
    minLoanAmount: 100000,
    tenure: "12-84 months", 
    rating: 4.3,
    approvalTime: "48 hours",
    category: "Business Loan"
  },
  {
    id: "3",
    name: "Mahindra Finance",
    interestRate: 12.99,
    processingFee: 2.0,
    maxLoanAmount: 300000,
    minLoanAmount: 25000,
    tenure: "6-48 months",
    rating: 4.1,
    approvalTime: "72 hours",
    category: "Consumer Loan"
  },
  {
    id: "4",
    name: "Shriram Finance",
    interestRate: 13.49,
    processingFee: 2.75,
    maxLoanAmount: 750000,
    minLoanAmount: 75000,
    tenure: "12-72 months",
    rating: 4.2,
    approvalTime: "24 hours",
    category: "Vehicle Loan"
  }
]

export const getTierInfo = (tier: string) => {
  const tiers = {
    green: {
      label: "Excellent",
      color: "text-green-700",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      description: "Great credit profile! You qualify for the best rates."
    },
    yellow: {
      label: "Good",
      color: "text-yellow-700", 
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      description: "Good credit profile with room for improvement."
    },
    red: {
      label: "Needs Improvement",
      color: "text-red-700",
      bgColor: "bg-red-50", 
      borderColor: "border-red-200",
      description: "Focus on improving payment history and reducing utilization."
    }
  }
  return tiers[tier as keyof typeof tiers] || tiers.yellow
}

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount)
}

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
