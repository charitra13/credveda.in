"use client"

import React, { useState } from 'react'
import { 
  LayoutDashboard, 
  User, 
  CreditCard, 
  Bell, 
  TrendingUp, 
  Settings,
  HelpCircle,
  Menu,
  X,
  LogOut,
  ChevronDown
} from 'lucide-react'
import { cn } from '@/lib/dashboard/utils'
import { useUserData, getUserInitials } from '@/hooks/useUserData'
import { DashboardButton } from '@/components/dashboard/ui/button'

interface DashboardLayoutProps {
  children: React.ReactNode
  currentPage: string
}

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, current: true },
  { name: 'Profile Analyzer', href: '/dashboard/profile', icon: User, current: false },
  { name: 'Credit Score', href: '/dashboard/credit-score', icon: CreditCard, current: false },
  { name: 'EMI Reminders', href: '/dashboard/emi-reminders', icon: Bell, current: false },
  { name: 'NBFC Comparison', href: '/dashboard/nbfc-comparison', icon: TrendingUp, current: false },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings, current: false },
  { name: 'Help & Support', href: '/dashboard/help', icon: HelpCircle, current: false },
]

export default function DashboardLayout({ children, currentPage }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const { userData, loading } = useUserData()

  const updatedNavigation = navigation.map(item => ({
    ...item,
    current: item.href === `/dashboard/${currentPage}` || (currentPage === 'dashboard' && item.name === 'Dashboard')
  }))

  // Show loading state while fetching user data
  if (loading || !userData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your profile...</p>
        </div>
      </div>
    )
  }

  const userInitials = getUserInitials(userData.name)

  return (
    <div className="dashboard-layout flex h-screen bg-gray-50">
      {/* Mobile menu overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Sidebar header - FIXED HEIGHT */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-sidebar">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CV</span>
              </div>
              <span className="ml-3 text-lg font-semibold text-foreground">CredVeda</span>
            </div>
            <DashboardButton
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </DashboardButton>
          </div>

          {/* User info - UPDATED WITH REAL DATA */}
          <div className="p-6 border-b border-sidebar">
            <div className="flex items-center">
              {userData.avatar ? (
                <img 
                  src={userData.avatar} 
                  alt={userData.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                  <span className="text-white font-medium text-sm">
                    {userInitials}
                  </span>
                </div>
              )}
              <div className="ml-3">
                <p className="text-sm font-medium text-foreground">{userData.name}</p>
                <p className="text-xs text-gray-dark">{userData.email}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-1">
            {updatedNavigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                  item.current
                    ? "bg-primary text-white"
                    : "text-gray-dark hover:bg-gray-100 hover:text-foreground"
                )}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </a>
            ))}
          </nav>

          {/* Sidebar footer */}
          <div className="p-4 border-t border-sidebar">
            <DashboardButton
              variant="ghost"
              className="w-full justify-start text-gray-dark hover:text-foreground"
              onClick={() => {
                console.log('Logout clicked')
              }}
            >
              <LogOut className="w-5 h-5 mr-3" />
              Logout
            </DashboardButton>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex flex-col flex-1 w-full">
        {/* FIXED: Top navigation bar with proper alignment */}
        <header className="sticky top-0 z-30 flex h-16 bg-white border-b border-gray-200 lg:border-none">
          <div className="flex items-center justify-between w-full px-4 sm:px-6 lg:px-8">
            
            {/* Left side: Mobile menu button */}
            <div className="flex items-center">
              <DashboardButton
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </DashboardButton>
              
              {/* CredVeda branding for mobile (hidden on desktop as it's in sidebar) */}
              <div className="flex items-center ml-3 lg:hidden">
                <div className="w-7 h-7 bg-gradient-primary rounded-md flex items-center justify-center">
                  <span className="text-white font-bold text-xs">CV</span>
                </div>
                <span className="ml-2 text-base font-semibold text-foreground">CredVeda</span>
              </div>
            </div>

            {/* Right side: Notifications and Profile - PROPERLY ALIGNED */}
            <div className="flex items-center space-x-3">
              {/* Notifications */}
              <DashboardButton 
                variant="ghost" 
                size="icon" 
                className="relative hover:bg-gray-100"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-danger rounded-full border-2 border-white"></span>
              </DashboardButton>

              {/* Profile dropdown - UPDATED WITH REAL DATA */}
              <div className="relative">
                <DashboardButton
                  variant="ghost"
                  className="flex items-center space-x-2 hover:bg-gray-100 px-2 py-1.5"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                >
                  {userData.avatar ? (
                    <img 
                      src={userData.avatar} 
                      alt={userData.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                      <span className="text-white font-medium text-xs">
                        {userInitials}
                      </span>
                    </div>
                  )}
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium text-foreground">{userData.name}</p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </DashboardButton>

                {/* Dropdown menu - FIXED POSITIONING */}
                {profileDropdownOpen && (
                  <>
                    {/* Backdrop for mobile */}
                    <div 
                      className="fixed inset-0 z-10 sm:hidden"
                      onClick={() => setProfileDropdownOpen(false)}
                    />
                    
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                      <div className="py-2">
                        {/* User info in dropdown for mobile - UPDATED WITH REAL DATA */}
                        <div className="px-4 py-2 border-b border-gray-100 sm:hidden">
                          <p className="text-sm font-medium text-foreground">{userData.name}</p>
                          <p className="text-xs text-gray-500">{userData.email}</p>
                        </div>
                        
                        <a 
                          href="/dashboard/profile" 
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <User className="h-4 w-4 mr-3" />
                          Your Profile
                        </a>
                        <a 
                          href="/dashboard/settings" 
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <Settings className="h-4 w-4 mr-3" />
                          Settings
                        </a>
                        <hr className="my-1" />
                        <button 
                          className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          onClick={() => console.log('Logout clicked')}
                        >
                          <LogOut className="h-4 w-4 mr-3" />
                          Logout
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 pb-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}