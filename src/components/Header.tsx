import React from "react"
import { Navigation } from "./Navigation"

export function Header() {
  return (
    <header className="relative">
      <Navigation />
      {/* Spacer to account for fixed navigation */}
      <div className="h-16" />
    </header>
  )
}
