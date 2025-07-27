import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  // SECURITY: Always use getUser() in server components for auth checks
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    // Redirect to home with auth modal trigger
    redirect('/?auth=required&redirectTo=/dashboard')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              Welcome, {user.user_metadata?.full_name || user.email}
            </span>
          </div>
        </div>
        {children}
      </div>
    </div>
  )
} 