"use client"

import React, { useState, useEffect } from 'react'
import { 
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit3,
  Save,
  Camera,
  Shield,
  Bell,
  CreditCard,
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
import { cn, mockCreditAnalysis, getTierInfo } from '@/lib/dashboard/utils'
import { useUserData, getUserInitials } from '@/hooks/useUserData'

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState('profile')
  const { userData, loading } = useUserData()
  const [profileData, setProfileData] = useState(userData)
  
  // Update profileData when userData changes
  useEffect(() => {
    if (userData) {
      setProfileData(userData)
    }
  }, [userData])

  if (loading || !userData || !profileData) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading profile...</p>
        </div>
      </div>
    )
  }

  const tierInfo = getTierInfo(mockCreditAnalysis.tier)
  const userInitials = getUserInitials(profileData.name)

  const handleSave = () => {
    setIsEditing(false)
    // Here you would normally save to backend
    console.log('Profile saved:', profileData)
  }

  const personalInfo = [
    { label: 'Full Name', value: profileData.name, icon: User, key: 'name' },
    { label: 'Email Address', value: profileData.email, icon: Mail, key: 'email' },
    { label: 'Phone Number', value: profileData.phone, icon: Phone, key: 'phone' },
    { label: 'Location', value: profileData.location, icon: MapPin, key: 'location' },
    { label: 'Member Since', value: new Date(profileData.joinedDate).toLocaleDateString(), icon: Calendar, key: 'joinedDate', readonly: true }
  ]

  const creditStats = [
    { label: 'Credit Score', value: profileData.creditScore, trend: '+25', color: 'text-primary' },
    { label: 'Total Loans', value: profileData.totalLoans, trend: '', color: 'text-foreground' },
    { label: 'Total Amount', value: `₹${profileData.totalAmount.toLocaleString()}`, trend: '', color: 'text-foreground' },
    { label: 'On-time Payments', value: `${profileData.onTimePayments}%`, trend: '+2.5%', color: 'text-success' }
  ]

  // ... rest of the component logic remains the same

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Profile Management</h1>
          <p className="text-gray-dark">Manage your personal information and preferences</p>
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
                <p>Keep your profile updated to get personalized loan recommendations</p>
              </DashboardTooltipContent>
            </DashboardTooltip>
          </DashboardTooltipProvider>
          {!isEditing ? (
            <DashboardButton variant="primary" onClick={() => setIsEditing(true)}>
              <Edit3 className="h-4 w-4 mr-2" />
              Edit Profile
            </DashboardButton>
          ) : (
            <div className="flex space-x-2">
              <DashboardButton variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </DashboardButton>
              <DashboardButton variant="primary" onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </DashboardButton>
            </div>
          )}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {[
          { id: 'profile', label: 'Personal Info' },
          { id: 'credit', label: 'Credit Stats' },
          { id: 'preferences', label: 'Preferences' },
          { id: 'security', label: 'Security' }
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

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Picture and Tier */}
<DashboardCard>
  <DashboardCardContent className="p-6 text-center">
    <div className="relative inline-block mb-4">
      {profileData.avatar ? (
        <img 
          src={profileData.avatar} 
          alt={profileData.name}
          className="w-24 h-24 rounded-full object-cover"
        />
      ) : (
        <div className="w-24 h-24 rounded-full bg-gradient-primary flex items-center justify-center text-white text-2xl font-bold">
          {userInitials}
        </div>
      )}
      {isEditing && (
        <DashboardButton 
          size="icon" 
          variant="outline" 
          className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
        >
          <Camera className="h-4 w-4" />
        </DashboardButton>
      )}
    </div>
              <h3 className="text-lg font-semibold mb-2">{profileData.name}</h3>
              <div className={cn("inline-flex items-center px-3 py-1 rounded-full text-sm border mb-4", tierInfo.bgColor, tierInfo.color, tierInfo.borderColor)}>
                <CreditCard className="h-4 w-4 mr-1" />
                {tierInfo.label} Member
              </div>
              <p className="text-sm text-gray-600">{tierInfo.description}</p>
            </DashboardCardContent>
          </DashboardCard>

          {/* Personal Information */}
          <DashboardCard className="lg:col-span-2">
            <DashboardCardHeader>
              <DashboardCardTitle>Personal Information</DashboardCardTitle>
              <DashboardCardDescription>Your basic profile details</DashboardCardDescription>
            </DashboardCardHeader>
            <DashboardCardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {personalInfo.map((info, index) => {
                  const Icon = info.icon
                  return (
                    <div key={index} className="space-y-2">
                      <label className="flex items-center text-sm font-medium text-gray-700">
                        <Icon className="h-4 w-4 mr-2" />
                        {info.label}
                      </label>
                      {isEditing && !info.readonly ? (
                        <input
                          type={info.key === 'email' ? 'email' : info.key === 'phone' ? 'tel' : 'text'}
                          value={info.value}
                          onChange={(e) =>
                            setProfileData((prev) =>
                              prev ? { ...prev, [info.key]: e.target.value } : null
                            )
                          }
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                      ) : (
                        <div className="p-3 bg-gray-50 rounded-lg text-gray-900">
                          {info.value}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </DashboardCardContent>
          </DashboardCard>
        </div>
      )}

      {/* Credit Stats Tab */}
      {activeTab === 'credit' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {creditStats.map((stat, index) => (
              <DashboardCard key={index}>
                <DashboardCardContent className="p-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">{stat.label}</p>
                    <p className={cn("text-2xl font-bold mb-1", stat.color)}>{stat.value}</p>
                    {stat.trend && (
                      <p className="text-sm text-success">{stat.trend} this month</p>
                    )}
                  </div>
                </DashboardCardContent>
              </DashboardCard>
            ))}
          </div>

          <DashboardCard>
            <DashboardCardHeader>
              <DashboardCardTitle>Credit History Summary</DashboardCardTitle>
              <DashboardCardDescription>Overview of your credit journey with CredVeda</DashboardCardDescription>
            </DashboardCardHeader>
            <DashboardCardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-700">15</div>
                    <div className="text-sm text-green-600">Months Active</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-700">98.2%</div>
                    <div className="text-sm text-blue-600">Success Rate</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-700">₹8.5L</div>
                    <div className="text-sm text-purple-600">Credit Accessed</div>
                  </div>
                </div>
              </div>
            </DashboardCardContent>
          </DashboardCard>
        </div>
      )}

      {/* Preferences Tab */}
      {activeTab === 'preferences' && (
        <div className="space-y-6">
          <DashboardCard>
            <DashboardCardHeader>
              <DashboardCardTitle>Notification Preferences</DashboardCardTitle>
              <DashboardCardDescription>Choose how you want to receive updates and reminders</DashboardCardDescription>
            </DashboardCardHeader>
            <DashboardCardContent>
              <div className="space-y-4">
                {[
                  { id: 'email', label: 'Email Notifications', description: 'Credit score updates, loan matches, and EMI reminders' },
                  { id: 'sms', label: 'SMS Notifications', description: 'Urgent reminders and alerts' },
                  { id: 'whatsapp', label: 'WhatsApp Messages', description: 'EMI reminders and tips' },
                  { id: 'push', label: 'Push Notifications', description: 'Real-time updates on mobile app' }
                ].map((pref) => (
                  <div key={pref.id} className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg">
                    <Bell className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{pref.label}</h4>
                          <p className="text-sm text-gray-600">{pref.description}</p>
                        </div>
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded" defaultChecked />
                          <span className="ml-2 text-sm">Enabled</span>
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </DashboardCardContent>
          </DashboardCard>

          <DashboardCard>
            <DashboardCardHeader>
              <DashboardCardTitle>Data Sharing Preferences</DashboardCardTitle>
              <DashboardCardDescription>Control how your data is used for personalized recommendations</DashboardCardDescription>
            </DashboardCardHeader>
            <DashboardCardContent>
              <div className="space-y-4">
                {[
                  { id: 'analytics', label: 'Anonymous Analytics', description: 'Help us improve our services' },
                  { id: 'marketing', label: 'Personalized Offers', description: 'Receive targeted loan offers from NBFCs' },
                  { id: 'credit', label: 'Credit Monitoring', description: 'Allow continuous credit score monitoring' }
                ].map((pref) => (
                  <div key={pref.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h4 className="font-medium">{pref.label}</h4>
                      <p className="text-sm text-gray-600">{pref.description}</p>
                    </div>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded" defaultChecked={pref.id !== 'marketing'} />
                      <span className="ml-2 text-sm">Allow</span>
                    </label>
                  </div>
                ))}
              </div>
            </DashboardCardContent>
          </DashboardCard>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          <DashboardCard>
            <DashboardCardHeader>
              <DashboardCardTitle>Security Settings</DashboardCardTitle>
              <DashboardCardDescription>Manage your account security and privacy</DashboardCardDescription>
            </DashboardCardHeader>
            <DashboardCardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-green-600" />
                    <div>
                      <h4 className="font-medium">Two-Factor Authentication</h4>
                      <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                    </div>
                  </div>
                  <DashboardButton variant="outline" size="sm">
                    Enable
                  </DashboardButton>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-gray-500" />
                    <div>
                      <h4 className="font-medium">Password</h4>
                      <p className="text-sm text-gray-600">Last changed 2 months ago</p>
                    </div>
                  </div>
                  <DashboardButton variant="outline" size="sm">
                    Change
                  </DashboardButton>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-blue-600" />
                    <div>
                      <h4 className="font-medium">Login Sessions</h4>
                      <p className="text-sm text-gray-600">Manage active sessions across devices</p>
                    </div>
                  </div>
                  <DashboardButton variant="outline" size="sm">
                    View All
                  </DashboardButton>
                </div>
              </div>
            </DashboardCardContent>
          </DashboardCard>

          <DashboardCard>
            <DashboardCardHeader>
              <DashboardCardTitle>Data Management</DashboardCardTitle>
              <DashboardCardDescription>Control your personal data and account</DashboardCardDescription>
            </DashboardCardHeader>
            <DashboardCardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="font-medium">Download Your Data</h4>
                    <p className="text-sm text-gray-600">Get a copy of your account data</p>
                  </div>
                  <DashboardButton variant="outline" size="sm">
                    Download
                  </DashboardButton>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="font-medium">Delete Account</h4>
                    <p className="text-sm text-gray-600">Permanently remove your account and data</p>
                  </div>
                  <DashboardButton variant="destructive" size="sm">
                    Delete
                  </DashboardButton>
                </div>
              </div>
            </DashboardCardContent>
          </DashboardCard>
        </div>
      )}
    </div>
  )
}
