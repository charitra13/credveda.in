'use client'

import React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { 
  ArrowRight,
  Users,
  Navigation
} from "lucide-react"

export function Features() {
  // Animation variants for section and items
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <motion.section 
      className="py-16 lg:py-24"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          variants={itemVariants}
        >
          <p className="text-sm font-semibold text-primary mb-2">Our Features</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Master Every Aspect of Your Financial Journey
          </h2>
          <p className="text-lg text-gray-dark">
            From credit analysis and payment reminders to loan comparison and expert connections – 
            everything you need to make informed financial decisions.
          </p>
        </motion.div>

        {/* Grid Layout */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-5 gap-8"
          variants={sectionVariants}
        >
          {/* Left Column */}
          <div className="lg:col-span-2 flex flex-col gap-8 lg:h-[850px]">
            {/* Top Card */}
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md flex flex-col h-[510px]"
              variants={itemVariants}
            >
              <p className="text-sm font-semibold text-primary mb-2">AI Powered Insights</p>
              <h3 className="text-xl font-semibold mb-2">Know Your True Credit Worth</h3>
              <p className="text-gray-600 mb-4">
                Our AI analyzes your complete financial profile using SHAP technology, revealing hidden credit strengths and giving you the confidence to negotiate better loan terms.
              </p>
              <a href="#" className="text-blue-600 font-semibold hover:underline mb-6">Analyse My Profile →</a>
              
              <div className="bg-gray-200 rounded-lg flex-grow flex items-center justify-center">
                <span className="text-gray-500">Image Placeholder 1</span>
              </div>
            </motion.div>

            {/* Bottom Grid Wrapper with flex-grow */}
            <div className="flex-grow">
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full"
                variants={itemVariants}
              >
                {/* First Smaller Card */}
                <div className="bg-white p-6 rounded-lg shadow-md flex flex-col h-full">
                  <Users className="h-8 w-8 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Connect with Financial Advisors who Actually Care</h3>
                  <p className="text-gray-600 mb-4 flex-grow">
                    Access our network of 500+ verified DSAs and NBFCs who compete to offer you the best rates, not just any rate.
                  </p>
                  <a href="#" className="text-blue-600 font-semibold hover:underline">Connect with Advisors →</a>
                </div>

                {/* Second Smaller Card */}
                <div className="bg-white p-6 rounded-lg shadow-md flex flex-col h-full">
                  <Navigation className="h-8 w-8 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Navigate your Financial Journey Effortlessly</h3>
                  <p className="text-gray-600 mb-4 flex-grow">
                    Clean, intuitive interface designed for real people, not finance experts.
                  </p>
                  <a href="#" className="text-blue-600 font-semibold hover:underline">Explore Platform →</a>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-3 flex flex-col gap-8 lg:h-[850px]">
            {/* Top Card */}
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md flex h-[278px]"
              variants={itemVariants}
            >
              <div className="bg-gray-200 rounded-lg shadow-md w-1/3 flex items-center justify-center mr-8">
                <span className="text-gray-500">Image Placeholder 2</span>
              </div>
              <div className="w-2/3 flex flex-col justify-center">
                <p className="text-sm font-semibold text-primary mb-2">Peace of Mind</p>
                <h3 className="text-xl font-semibold mb-2">Never Miss Another Payment Deadline</h3>
                <p className="text-gray-600 mb-4 flex-grow">
                  Set smart reminders across all your loans with WhatsApp and SMS alerts, keeping your credit score healthy.
                </p>
                <a href="#" className="text-blue-600 font-semibold hover:underline">Set Reminders →</a>
              </div>
            </motion.div>

            {/* Bottom Card Wrapper with flex-grow */}
            <div className="flex-grow">
              <motion.div 
                className="bg-white p-6 rounded-lg shadow-md h-full flex flex-col"
                variants={itemVariants}
              >
                {/* Compare Loans content */}
                <div className="mb-8">
                  <p className="text-sm font-semibold text-primary mb-2">Smart Comparison</p>
                  <h3 className="text-xl font-semibold mb-2">Compare Loan Offers Side by Side Instantly</h3>
                  <p className="text-gray-600 mb-4">
                    See exactly which lender offers the best terms for your specific profile, with transparent breakdowns of all costs and benefits.
                  </p>
                  <a href="#" className="text-blue-600 font-semibold hover:underline">Compare Loans →</a>
                </div>

                {/* Bottom image */}
                <div className="bg-gray-200 rounded-lg shadow-md flex-grow flex items-center justify-center">
                  <span className="text-gray-500">Image Placeholder 3</span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}