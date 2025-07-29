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

  // SIMPLIFIED: Remove conflicting header, let DashboardLayout handle all UI
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  )
}