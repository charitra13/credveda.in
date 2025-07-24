"use client"

import React, { useState } from "react"
import { Navigation } from "./Navigation"
import { AuthCard } from "./AuthCard"

export function Header() {
  const [isAuthOpen, setIsAuthOpen] = useState(false)

  return (
    <>
      <header className="relative">
        <Navigation onAuthOpen={() => setIsAuthOpen(true)} />
        {/* Spacer to account for fixed navigation */}
        <div className="h-16" />
      </header>
      
      {/* Auth Card Modal */}
      <AuthCard 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
      />
    </>
  )
}
