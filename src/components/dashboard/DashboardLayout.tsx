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
import { cn, mockUser } from '@/lib/dashboard/utils'
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

  const updatedNavigation = navigation.map(item => ({
    ...item,
    current: item.href === `/dashboard/${currentPage}` || (currentPage === 'dashboard' && item.name === 'Dashboard')
  }))

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
          {/* Sidebar header */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-sidebar">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CV</span>
              </div>
              <span className="ml-2 text-lg font-semibold text-foreground">CredVeda</span>
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

          {/* User info */}
          <div className="p-6 border-b border-sidebar">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                <span className="text-white font-medium text-sm">
                  {mockUser.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-foreground">{mockUser.name}</p>
                <p className="text-xs text-gray-dark">{mockUser.email}</p>
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
                // Handle logout
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
        {/* Top navigation bar */}
        <div className="sticky top-0 z-30 flex h-20 bg-white border-b border-gray-200 lg:border-none">
          <div className="flex items-center justify-between w-full px-4 sm:px-6 lg:px-8">
            <DashboardButton
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </DashboardButton>

            <div className="flex items-center space-x-4 ml-auto">
              {/* Notifications */}
              <DashboardButton variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-3 w-3 bg-danger rounded-full text-xs"></span>
              </DashboardButton>

              {/* Profile dropdown */}
              <div className="relative">
                <DashboardButton
                  variant="ghost"
                  className="flex items-center space-x-2"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                    <span className="text-white font-medium text-xs">
                      {mockUser.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </DashboardButton>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="py-1">
                      <a href="/dashboard/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        Your Profile
                      </a>
                      <a href="/dashboard/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        Settings
                      </a>
                      <hr className="my-1" />
                      <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 pb-8">
          {children}
        </main>
      </div>
    </div>
  )
}
