"use client"

import React from "react"
import { Navigation } from "./Navigation"

interface HeaderProps {
  onAuthClick?: () => void
}

export function Header({ onAuthClick }: HeaderProps) {
  return (
    <>
      <header className="relative">
        <Navigation onAuthOpen={onAuthClick} />
        {/* Spacer to account for fixed navigation */}
        <div className="h-16" />
      </header>
    </>
  )
}
