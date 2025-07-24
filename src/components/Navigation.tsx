"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { AuthCard } from "./AuthCard"

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Features", href: "#features" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  // Removed scroll state since nav is now always opaque

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        "bg-white/90 backdrop-blur-sm border-b border-gray-200" // Removed conditional transparency, always opaque
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-primary"
            >
              <rect width="32" height="32" rx="8" fill="currentColor" />
              <path
                d="M8 16C8 11.5817 11.5817 8 16 8C20.4183 8 24 11.5817 24 16C24 20.4183 20.4183 24 16 24C11.5817 24 8 20.4183 8 16Z"
                fill="white"
              />
              <path
                d="M16 12V20M12 16H20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <span className="text-xl font-bold text-foreground">CredVeda</span>
          </Link>

          {/* Desktop Navigation & CTA */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-gray-dark hover:text-foreground transition-colors font-medium"
                onClick={(e) => {
                  e.preventDefault();
                  const targetId = item.href.substring(1);
                  const targetElement = document.getElementById(targetId);
                  if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                {item.label}
              </Link>
            ))}
            <Button 
              variant="primary" 
              size="default"
              onClick={() => setIsAuthOpen(true)}
            >
              Sign Up
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-gray-dark hover:text-foreground"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "md:hidden transition-all duration-300 ease-in-out",
            "bg-white border-t border-gray-200 shadow-lg rounded-b-lg", // Added rounded bottom corners
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
          )}
        >
          <div className="py-6 px-2 space-y-2 bg-white"> {/* Increased padding for better spacing */}
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block px-4 py-3 text-gray-dark hover:text-foreground hover:bg-gray-light rounded-md transition-colors font-medium"
                onClick={(e) => {
                  e.preventDefault();
                  const targetId = item.href.substring(1);
                  const targetElement = document.getElementById(targetId);
                  if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                  }
                  setIsOpen(false);
                }}
              >
                {item.label}
              </Link>
            ))}
            <div className="px-4 pt-4">
              <Button 
                variant="primary" 
                size="default" 
                className="w-full"
                onClick={() => {
                  setIsAuthOpen(true)
                  setIsOpen(false)
                }}
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Auth Card Modal */}
      <AuthCard 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
      />
    </nav>
  )
}
