"use client"

import React, { useState } from 'react'
import { 
  Bell, 
  Plus, 
  Calendar, 
  CreditCard,
  CheckCircle,
  Clock,
  AlertTriangle,
  Settings,
  HelpCircle,
  Phone,
  Mail,
  MessageSquare
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
import { cn, mockEMIReminders, formatCurrency, formatDate } from '@/lib/dashboard/utils'

export default function EMIReminders() {
  const [activeTab, setActiveTab] = useState('reminders')
  const [showAddForm, setShowAddForm] = useState(false)

  const getStatusInfo = (status: string) => {
    switch(status) {
      case 'paid':
        return { color: 'text-success', bgColor: 'bg-success/10', icon: CheckCircle, label: 'Paid' }
      case 'upcoming':
        return { color: 'text-warning', bgColor: 'bg-warning/10', icon: Clock, label: 'Upcoming' }
      case 'overdue':
        return { color: 'text-danger', bgColor: 'bg-danger/10', icon: AlertTriangle, label: 'Overdue' }
      default:
        return { color: 'text-gray-500', bgColor: 'bg-gray-100', icon: Clock, label: 'Unknown' }
    }
  }

  const AddReminderForm = () => (
    <DashboardCard>
      <DashboardCardHeader>
        <DashboardCardTitle>Add New EMI Reminder</DashboardCardTitle>
        <DashboardCardDescription>Set up automated reminders for your loan payments</DashboardCardDescription>
      </DashboardCardHeader>
      <DashboardCardContent>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Lender Name</label>
              <input 
                type="text" 
                placeholder="e.g., HDFC Bank"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Loan Type</label>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary">
                <option>Personal Loan</option>
                <option>Home Loan</option>
                <option>Car Loan</option>
                <option>Business Loan</option>
                <option>Credit Card</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">EMI Amount</label>
              <input 
                type="number" 
                placeholder="25000"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Due Date</label>
              <input 
                type="date"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Remind Me</label>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary">
                <option>3 days before</option>
                <option>1 day before</option>
                <option>On due date</option>
                <option>Custom</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Account Number</label>
              <input 
                type="text" 
                placeholder="****1234"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Reminder Channels</label>
            <div className="flex space-x-4">
              {[
                { id: 'whatsapp', label: 'WhatsApp', icon: MessageSquare },
                { id: 'sms', label: 'SMS', icon: Phone },
                { id: 'email', label: 'Email', icon: Mail }
              ].map((channel) => (
                <label key={channel.id} className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <channel.icon className="h-4 w-4" />
                  <span className="text-sm">{channel.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <DashboardButton variant="outline" onClick={() => setShowAddForm(false)}>
              Cancel
            </DashboardButton>
            <DashboardButton variant="primary" onClick={() => setShowAddForm(false)}>
              Add Reminder
            </DashboardButton>
          </div>
        </form>
      </DashboardCardContent>
    </DashboardCard>
  )

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">EMI Reminders</h1>
          <p className="text-gray-dark">Never miss a payment with automated reminders</p>
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
                <p>Set up reminders via WhatsApp, SMS, or Email to never miss EMI payments</p>
              </DashboardTooltipContent>
            </DashboardTooltip>
          </DashboardTooltipProvider>
          <DashboardButton 
            variant="primary" 
            onClick={() => setShowAddForm(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Reminder
          </DashboardButton>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {[
          { id: 'reminders', label: 'Active Reminders' },
          { id: 'settings', label: 'Settings' },
          { id: 'history', label: 'Payment History' }
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

      {showAddForm && <AddReminderForm />}

      {/* Active Reminders Tab */}
      {activeTab === 'reminders' && (
        <div className="space-y-4">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <DashboardCard>
              <DashboardCardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total EMIs</p>
                    <p className="text-2xl font-bold">3</p>
                  </div>
                  <CreditCard className="h-8 w-8 text-primary" />
                </div>
              </DashboardCardContent>
            </DashboardCard>
            <DashboardCard>
              <DashboardCardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">This Month</p>
                    <p className="text-2xl font-bold text-primary">₹35,500</p>
                  </div>
                  <Calendar className="h-8 w-8 text-warning" />
                </div>
              </DashboardCardContent>
            </DashboardCard>
            <DashboardCard>
              <DashboardCardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Next Due</p>
                    <p className="text-2xl font-bold text-warning">5 days</p>
                  </div>
                  <Bell className="h-8 w-8 text-warning" />
                </div>
              </DashboardCardContent>
            </DashboardCard>
          </div>

          {/* EMI List */}
          <div className="space-y-4">
            {mockEMIReminders.map((emi) => {
              const statusInfo = getStatusInfo(emi.status)
              const StatusIcon = statusInfo.icon
              
              return (
                <DashboardCard key={emi.id} className="hover:shadow-md transition-shadow">
                  <DashboardCardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={cn("p-3 rounded-full", statusInfo.bgColor)}>
                          <StatusIcon className={cn("h-6 w-6", statusInfo.color)} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{emi.lenderName}</h3>
                          <p className="text-sm text-gray-600">{emi.loanType} • {emi.accountNumber}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <div className="flex items-center text-sm text-gray-500">
                              <Calendar className="h-4 w-4 mr-1" />
                              Due: {formatDate(emi.dueDate)}
                            </div>
                            <div className={cn("text-xs px-2 py-1 rounded-full", statusInfo.bgColor, statusInfo.color)}>
                              {statusInfo.label}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-foreground">
                          {formatCurrency(emi.amount)}
                        </div>
                        <div className="flex items-center space-x-2 mt-2">
                          <DashboardTooltipProvider>
                            <DashboardTooltip>
                              <DashboardTooltipTrigger asChild>
                                <DashboardButton variant="ghost" size="sm">
                                  <Settings className="h-4 w-4" />
                                </DashboardButton>
                              </DashboardTooltipTrigger>
                              <DashboardTooltipContent>
                                <p>Edit reminder settings</p>
                              </DashboardTooltipContent>
                            </DashboardTooltip>
                          </DashboardTooltipProvider>
                          {emi.status === 'upcoming' && (
                            <DashboardButton variant="primary" size="sm">
                              Pay Now
                            </DashboardButton>
                          )}
                        </div>
                      </div>
                    </div>
                  </DashboardCardContent>
                </DashboardCard>
              )
            })}
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <DashboardCard>
          <DashboardCardHeader>
            <DashboardCardTitle>Notification Settings</DashboardCardTitle>
            <DashboardCardDescription>Customize how and when you receive reminders</DashboardCardDescription>
          </DashboardCardHeader>
          <DashboardCardContent className="space-y-6">
            <div>
              <h4 className="font-medium mb-4">Default Reminder Timing</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['3 days before', '1 day before', 'On due date', 'Day after'].map((timing) => (
                  <label key={timing} className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" defaultChecked={timing !== 'Day after'} />
                    <span className="text-sm">{timing}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-4">Communication Channels</h4>
              <div className="space-y-4">
                {[
                  { id: 'whatsapp', label: 'WhatsApp', icon: MessageSquare, number: '+91 98765 43210' },
                  { id: 'sms', label: 'SMS', icon: Phone, number: '+91 98765 43210' },
                  { id: 'email', label: 'Email', icon: Mail, number: 'rahul.sharma@example.com' }
                ].map((channel) => (
                  <div key={channel.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <channel.icon className="h-5 w-5 text-gray-500" />
                      <div>
                        <div className="font-medium">{channel.label}</div>
                        <div className="text-sm text-gray-600">{channel.number}</div>
                      </div>
                    </div>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span className="ml-2 text-sm">Enabled</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <DashboardButton variant="primary">Save Settings</DashboardButton>
            </div>
          </DashboardCardContent>
        </DashboardCard>
      )}

      {/* Payment History Tab */}
      {activeTab === 'history' && (
        <DashboardCard>
          <DashboardCardHeader>
            <DashboardCardTitle>Payment History</DashboardCardTitle>
            <DashboardCardDescription>Track your EMI payment records</DashboardCardDescription>
          </DashboardCardHeader>
          <DashboardCardContent>
            <div className="space-y-4">
              {mockEMIReminders.filter(emi => emi.status === 'paid').map((emi) => (
                <div key={emi.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <div>
                      <div className="font-medium">{emi.lenderName}</div>
                      <div className="text-sm text-gray-600">Paid on {formatDate(emi.dueDate)}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{formatCurrency(emi.amount)}</div>
                    <div className="text-sm text-success">On Time</div>
                  </div>
                </div>
              ))}
            </div>
          </DashboardCardContent>
        </DashboardCard>
      )}
    </div>
  )
}
