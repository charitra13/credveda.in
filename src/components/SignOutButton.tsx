"use client"

import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/useAuth"
import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

export function SignOutButton() {
  const { signOut } = useAuth()
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <Button 
      onClick={handleSignOut}
      variant="outline"
      size="sm"
      className="flex items-center gap-2"
    >
      <LogOut size={16} />
      Sign Out
    </Button>
  )
} 