# CredVeda Supabase Authentication Integration - Gemini CLI Guide

## 🎯 **Problem Analysis**
Your dashboard currently shows "Rahul Sharma" mock data instead of your actual Google account information from Supabase authentication. The components are using hardcoded `mockUser` data instead of real authenticated user data.

**Project Path**: `/Users/charitra/Developer/Accodyn Tech/CredVeda/credveda-in copy`

---

## 📋 **Files That Need Changes**

### **Current Issue**: Components importing `mockUser`
- `src/components/dashboard/DashboardLayout.tsx` 
- `src/components/dashboard/Dashboard.tsx`
- `src/components/dashboard/ProfileAnalyzer.tsx` 
- `src/components/dashboard/UserProfile.tsx`

---

## 🛠️ **Step-by-Step Implementation**

### **CHANGE 1: Create Real User Data Hook**

**File**: `src/hooks/useUserData.ts` (NEW FILE)

**Action**: CREATE NEW FILE

**Content**:
```typescript
"use client"

import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'

// Interface matching the expected user data structure
export interface UserData {
  id: string
  name: string
  email: string
  avatar?: string
  phone?: string
  location?: string
  joinedDate: string
  creditScore: number
  tier: 'green' | 'yellow' | 'red'
  totalLoans: number
  totalAmount: number
  onTimePayments: number
}

// Hook to get real user data from Supabase authentication
export function useUserData(): {
  userData: UserData | null
  loading: boolean
  error: string | null
} {
  const { user, loading: authLoading } = useAuth()
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (authLoading) {
      return // Wait for auth to complete
    }

    if (!user) {
      setUserData(null)
      setLoading(false)
      setError('No authenticated user')
      return
    }

    try {
      // Map Supabase user data to our UserData interface
      const { user_metadata, email, id, created_at, identities } = user

      // Get name from different possible sources
      const getName = (): string => {
        // Try Google OAuth name first
        if (user_metadata?.full_name) return user_metadata.full_name
        if (user_metadata?.name) return user_metadata.name
        
        // Try from identity providers (Google, etc.)
        const googleIdentity = identities?.find(identity => identity.provider === 'google')
        if (googleIdentity?.identity_data?.full_name) {
          return googleIdentity.identity_data.full_name
        }
        if (googleIdentity?.identity_data?.name) {
          return googleIdentity.identity_data.name
        }

        // Fallback to email prefix
        if (email) {
          return email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
        }

        return 'User'
      }

      // Get avatar from Google or other sources
      const getAvatar = (): string | undefined => {
        if (user_metadata?.avatar_url) return user_metadata.avatar_url
        if (user_metadata?.picture) return user_metadata.picture
        
        const googleIdentity = identities?.find(identity => identity.provider === 'google')
        if (googleIdentity?.identity_data?.avatar_url) {
          return googleIdentity.identity_data.avatar_url
        }
        if (googleIdentity?.identity_data?.picture) {
          return googleIdentity.identity_data.picture
        }

        return undefined
      }

      // Map to our UserData structure
      const mappedUserData: UserData = {
        id: id,
        name: getName(),
        email: email || 'No email provided',
        avatar: getAvatar(),
        phone: user_metadata?.phone || undefined,
        location: user_metadata?.location || 'India', // Default location
        joinedDate: created_at || new Date().toISOString(),
        // Default credit data - in production, fetch from your database
        creditScore: 720, // Default score for new users
        tier: 'yellow' as const, // Default tier for new users
        totalLoans: 0,
        totalAmount: 0,
        onTimePayments: 100
      }

      setUserData(mappedUserData)
      setError(null)
    } catch (err) {
      console.error('Error mapping user data:', err)
      setError('Failed to process user data')
      setUserData(null)
    } finally {
      setLoading(false)
    }
  }, [user, authLoading])

  return { userData, loading, error }
}

// Helper function to get user initials
export function getUserInitials(name: string): string {
  return name
    .split(' ')
    .map(part => part.charAt(0).toUpperCase())
    .join('')
    .slice(0, 2) // Limit to 2 characters
}

// Helper function to get display name (first name only)
export function getDisplayName(fullName: string): string {
  return fullName.split(' ')[0]
}
```

---

### **CHANGE 2: Update DashboardLayout Component**

**File**: `src/components/dashboard/DashboardLayout.tsx`

**Action**: REPLACE IMPORTS AND USER DATA USAGE

**Find and Replace**:

**OLD Import Line**:
```typescript
import { cn, mockUser } from '@/lib/dashboard/utils'
```

**NEW Import Lines**:
```typescript
import { cn } from '@/lib/dashboard/utils'
import { useUserData, getUserInitials } from '@/hooks/useUserData'
```

**OLD User Data Usage** (Multiple locations in the file):
```typescript
{mockUser.name.split(' ').map(n => n[0]).join('')}
```
```typescript
{mockUser.name}
```
```typescript
{mockUser.email}
```

**NEW User Data Usage** - Replace the component content with:
```typescript
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
```

---

### **CHANGE 3: Update Dashboard Component**

**File**: `src/components/dashboard/Dashboard.tsx`

**Action**: REPLACE IMPORTS AND UPDATE USER DATA USAGE

**Find and Replace**:

**OLD Import Line**:
```typescript
import { cn, mockUser, mockCreditAnalysis, mockEMIReminders, getTierInfo, formatCurrency, formatDate } from '@/lib/dashboard/utils'
```

**NEW Import Lines**:
```typescript
import { cn, mockCreditAnalysis, mockEMIReminders, getTierInfo, formatCurrency, formatDate } from '@/lib/dashboard/utils'
import { useUserData, getDisplayName } from '@/hooks/useUserData'
```

**OLD Welcome Message**:
```typescript
<h1 className="text-2xl font-bold text-foreground">Welcome back, {mockUser.name.split(` `)[0]}!</h1>
```

**NEW Welcome Message** - Add this at the beginning of the component:
```typescript
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

  // ... rest of the component variables

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section - UPDATED */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Welcome back, {getDisplayName(userData.name)}!</h1>
          <p className="text-gray-dark">Here&apos;s your financial health overview</p>
        </div>
        {/* ... rest of the component remains the same */}
```

---

### **CHANGE 4: Update ProfileAnalyzer Component**

**File**: `src/components/dashboard/ProfileAnalyzer.tsx`

**Action**: REPLACE IMPORTS (No user data changes needed in this component)

**Find and Replace**:

**OLD Import Line**:
```typescript
import { cn, mockCreditAnalysis, getTierInfo } from '@/lib/dashboard/utils'
```

**NEW Import Lines** (No changes needed - this component doesn't use user data):
```typescript
import { cn, mockCreditAnalysis, getTierInfo } from '@/lib/dashboard/utils'
```

---

### **CHANGE 5: Update UserProfile Component**

**File**: `src/components/dashboard/UserProfile.tsx`

**Action**: REPLACE IMPORTS AND UPDATE USER DATA USAGE

**Find and Replace**:

**OLD Import Line**:
```typescript
import { cn, mockUser, mockCreditAnalysis, getTierInfo, formatDate } from '@/lib/dashboard/utils'
```

**NEW Import Lines**:
```typescript
import { cn, mockCreditAnalysis, getTierInfo, formatDate } from '@/lib/dashboard/utils'
import { useUserData, getUserInitials } from '@/hooks/useUserData'
```

**OLD Component State**:
```typescript
const [profileData, setProfileData] = useState(mockUser)
```

**NEW Component Logic** - Replace the beginning of the component:
```typescript
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

  // ... rest of the component logic remains the same
```

**Also Update Avatar Display** in the Profile Tab section:
```typescript
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
    {/* ... rest remains the same */}
```

---

## 🛠️ **Gemini CLI Commands**

### **Execute All Changes**

```bash
# Navigate to project directory
cd "/Users/charitra/Developer/Accodyn Tech/CredVeda/credveda-in copy"

# COMMAND 1: Create the new user data hook
gemini create-file src/hooks/useUserData.ts \
  --content="[PASTE CHANGE 1 CONTENT HERE]"

# COMMAND 2: Update DashboardLayout imports
gemini edit src/components/dashboard/DashboardLayout.tsx \
  --find="import { cn, mockUser } from '@/lib/dashboard/utils'" \
  --replace="import { cn } from '@/lib/dashboard/utils'
import { useUserData, getUserInitials } from '@/hooks/useUserData'"

# COMMAND 3: Replace DashboardLayout component function
gemini edit src/components/dashboard/DashboardLayout.tsx \
  --find="export default function DashboardLayout({ children, currentPage }: DashboardLayoutProps) {" \
  --replace-function-with="[PASTE DASHBOARDLAYOUT FUNCTION FROM CHANGE 2]"

# COMMAND 4: Update Dashboard imports  
gemini edit src/components/dashboard/Dashboard.tsx \
  --find="import { cn, mockUser, mockCreditAnalysis, mockEMIReminders, getTierInfo, formatCurrency, formatDate } from '@/lib/dashboard/utils'" \
  --replace="import { cn, mockCreditAnalysis, mockEMIReminders, getTierInfo, formatCurrency, formatDate } from '@/lib/dashboard/utils'
import { useUserData, getDisplayName } from '@/hooks/useUserData'"

# COMMAND 5: Update Dashboard welcome message
gemini edit src/components/dashboard/Dashboard.tsx \
  --find="export default function Dashboard() {" \
  --replace-function-with="[PASTE DASHBOARD FUNCTION FROM CHANGE 3]"

# COMMAND 6: Update UserProfile imports
gemini edit src/components/dashboard/UserProfile.tsx \
  --find="import { cn, mockUser, mockCreditAnalysis, getTierInfo, formatDate } from '@/lib/dashboard/utils'" \
  --replace="import { cn, mockCreditAnalysis, getTierInfo, formatDate } from '@/lib/dashboard/utils'
import { useUserData, getUserInitials } from '@/hooks/useUserData'"

# COMMAND 7: Update UserProfile component logic
gemini edit src/components/dashboard/UserProfile.tsx \
  --find="export default function UserProfile() {" \
  --replace-function-with="[PASTE USERPROFILE FUNCTION FROM CHANGE 5]"
```

---

## 📋 **Verification Steps**

### **After Implementation:**

```bash
# 1. Install dependencies (if needed)
npm install

# 2. Check TypeScript compilation
npm run type-check

# 3. Start development server
npm run dev

# 4. Test the changes
open http://localhost:3000/dashboard
```

### **Expected Results:**
✅ **Dashboard shows your Google account name** instead of "Rahul Sharma"  
✅ **Email shows your actual Gmail address**  
✅ **Avatar displays your Google profile picture** (if available)  
✅ **Welcome message uses your first name**  
✅ **All user references throughout dashboard are personalized**  
✅ **Loading states while fetching user data**  
✅ **Fallbacks for missing user information**  

---

## 🚨 **Rollback Instructions**

If issues occur:

```bash
# Restore original files
git checkout HEAD -- src/components/dashboard/DashboardLayout.tsx
git checkout HEAD -- src/components/dashboard/Dashboard.tsx
git checkout HEAD -- src/components/dashboard/UserProfile.tsx

# Remove the new hook file
rm src/hooks/useUserData.ts
```

---

## 🔍 **Testing Checklist**

### **Authentication Flow:**
- [ ] Login with Google account works
- [ ] Dashboard loads with your actual name
- [ ] Email address matches your Google account
- [ ] Profile picture shows (if you have one set in Google)
- [ ] User initials display correctly if no profile picture
- [ ] Loading states appear briefly during data fetch
- [ ] Error handling works if authentication fails

### **User Data Display:**
- [ ] Sidebar shows real user info
- [ ] Header profile dropdown shows real data
- [ ] Welcome message uses your first name
- [ ] Profile page shows real information
- [ ] All user references are consistent across dashboard

---

## 🎯 **Next Steps (Optional Enhancements)**

1. **Database Integration**: Store additional user profile data in Supabase database
2. **Profile Editing**: Allow users to update their profile information  
3. **Credit Score Integration**: Connect to real credit scoring APIs
4. **Logout Functionality**: Implement proper sign-out flow
5. **Avatar Upload**: Allow users to upload custom profile pictures

---

**Ready for Gemini CLI execution!** This will replace all mock user data with your actual Google account information from Supabase authentication.