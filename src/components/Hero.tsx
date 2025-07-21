'use client'

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { User } from "lucide-react"

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: -50, opacity: 0, filter: 'blur(8px)' },
    visible: {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  return (
    <section className="relative overflow-hidden gradient-bg">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <motion.div 
          className="grid lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Content */}
          <div className="space-y-8">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight"
              variants={itemVariants}
            >
              We exist because —
              <br />
              <span className="text-gradient">
                &ldquo;Sign here, Sir&rdquo;
              </span>{" "}
              isn&apos;t a financial advice.
            </motion.h1>
            
            <motion.p 
              className="text-lg text-gray-dark max-w-lg"
              variants={itemVariants}
            >
              CredVeda is a financial awareness tool for the Indian loan payment ecosystem 
              with smart EMI Reminders, compare loan offers instantly, and connect 
              with 500+ trusted financial advisors to secure the best rates.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              variants={itemVariants}
            >
              <Button variant="primary" size="lg">
                Analyze Profile
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/auth">Sign Up</Link>
              </Button>
            </motion.div>
          </div>
          
          {/* Right Content - Hero Image Placeholder */}
          <motion.div 
            className="relative"
            variants={itemVariants}
          >
            <div className="bg-gradient-to-br from-gray-light to-gray-medium rounded-2xl aspect-[4/3] flex items-center justify-center shadow-2xl">
              <div className="bg-white/50 backdrop-blur-sm rounded-full p-8">
                <User size={80} className="text-gray-dark" />
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -z-10 top-8 right-8 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -z-10 bottom-8 left-8 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
