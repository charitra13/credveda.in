'use client'

import React from "react"
import { motion } from "framer-motion"
import { 
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
      className="py-12 sm:py-16 lg:py-24"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
          variants={itemVariants}
        >
          <p className="text-sm font-semibold text-primary mb-2">Our Features</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Master Every Aspect of Your Financial Journey
          </h2>
          <p className="text-base sm:text-lg text-gray-dark">
            From credit analysis and payment reminders to loan comparison and expert connections – 
            everything you need to make informed financial decisions.
          </p>
        </motion.div>

        {/* Responsive Grid Layout */}
        <motion.div
          className="grid grid-cols-1 xl:grid-cols-5 gap-6 sm:gap-8"
          variants={sectionVariants}
        >
          {/* Left Column - Mobile: Full width, Desktop: 2/5 */}
          <div className="xl:col-span-2 flex flex-col gap-6 sm:gap-8">
            
            {/* AI Powered Insights Card */}
            <motion.div 
              className="bg-white p-4 sm:p-6 rounded-lg shadow-md flex flex-col min-h-[400px] sm:min-h-[450px] xl:min-h-[500px]"
              variants={itemVariants}
            >
              <div className="flex-shrink-0 mb-4 sm:mb-6">
                <p className="text-sm font-semibold text-primary mb-2">AI Powered Insights</p>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Know Your True Credit Worth</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4">
                  Our AI analyzes your complete financial profile using SHAP technology, revealing hidden credit strengths and giving you the confidence to negotiate better loan terms.
                </p>
                <a href="#" className="text-blue-600 font-semibold hover:underline text-sm sm:text-base">
                  Analyse My Profile →
                </a>
              </div>
              
              {/* Responsive Image Placeholder */}
              <div className="bg-gray-200 rounded-lg flex-grow min-h-[200px] sm:min-h-[250px] flex items-center justify-center">
                <span className="text-gray-500 text-sm">Image Placeholder 1</span>
              </div>
            </motion.div>

            {/* Bottom Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-6 sm:gap-8">
              
              {/* Financial Advisors Card */}
              <motion.div 
                className="bg-white p-4 sm:p-6 rounded-lg shadow-md flex flex-col h-[280px] sm:h-[320px] md:h-[340px] xl:h-[320px]"
                variants={itemVariants}
              >
                <div className="flex-shrink-0 flex flex-col h-full">
                  <Users className="h-6 w-6 sm:h-8 sm:w-8 text-primary mb-3 sm:mb-4 flex-shrink-0" />
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 flex-shrink-0 line-clamp-2">
                    Connect with Financial Advisors who Actually Care
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-4 flex-grow line-clamp-3 sm:line-clamp-4 md:line-clamp-3 lg:line-clamp-4 overflow-hidden">
                    Access our network of 500+ verified DSAs and NBFCs who compete to offer you the best rates, not just any rate.
                  </p>
                  <div className="flex-shrink-0 mt-auto">
                    <a href="#" className="text-blue-600 font-semibold hover:underline text-sm sm:text-base">
                      Connect with Advisors →
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Navigation Card */}
              <motion.div 
                className="bg-white p-4 sm:p-6 rounded-lg shadow-md flex flex-col h-[280px] sm:h-[320px] md:h-[340px] xl:h-[320px]"
                variants={itemVariants}
              >
                <div className="flex-shrink-0 flex flex-col h-full">
                  <Navigation className="h-6 w-6 sm:h-8 sm:w-8 text-primary mb-3 sm:mb-4 flex-shrink-0" />
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 flex-shrink-0 line-clamp-2">
                    Navigate your Financial Journey Effortlessly
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-4 flex-grow line-clamp-3 sm:line-clamp-4 md:line-clamp-3 lg:line-clamp-4 overflow-hidden">
                    Clean, intuitive interface designed for real people, not finance experts.
                  </p>
                  <div className="flex-shrink-0 mt-auto">
                    <a href="#" className="text-blue-600 font-semibold hover:underline text-sm sm:text-base">
                      Explore Platform →
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Column - Mobile: Full width, Desktop: 3/5 */}
          <div className="xl:col-span-3 flex flex-col gap-6 sm:gap-8">
            
            {/* Payment Reminders Card */}
            <motion.div 
              className="bg-white p-4 sm:p-6 rounded-lg shadow-md"
              variants={itemVariants}
            >
              {/* Mobile: Stack vertically, Desktop: Horizontal layout */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 xl:gap-8">
                
                {/* Image - Mobile: Full width, Desktop: 1/3 */}
                <div className="w-full sm:w-1/3 flex-shrink-0">
                  <div className="bg-gray-200 rounded-lg shadow-md aspect-square sm:aspect-[4/3] xl:aspect-square flex items-center justify-center min-h-[200px] sm:min-h-[150px] xl:min-h-[180px]">
                    <span className="text-gray-500 text-sm">Image Placeholder 2</span>
                  </div>
                </div>
                
                {/* Content - Mobile: Full width, Desktop: 2/3 */}
                <div className="w-full sm:w-2/3 flex flex-col justify-center">
                  <p className="text-sm font-semibold text-primary mb-2">Peace of Mind</p>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">Never Miss Another Payment Deadline</h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-4">
                    Set smart reminders across all your loans with WhatsApp and SMS alerts, keeping your credit score healthy.
                  </p>
                  <a href="#" className="text-blue-600 font-semibold hover:underline text-sm sm:text-base">
                    Set Reminders →
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Loan Comparison Card */}
            <motion.div 
              className="bg-white p-4 sm:p-6 rounded-lg shadow-md flex flex-col min-h-[400px] sm:min-h-[450px] lg:min-h-[500px]"
              variants={itemVariants}
            >
              {/* Content Section */}
              <div className="flex-shrink-0 mb-4 sm:mb-6 xl:mb-8">
                <p className="text-sm font-semibold text-primary mb-2">Smart Comparison</p>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Compare Loan Offers Side by Side Instantly</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4">
                  See exactly which lender offers the best terms for your specific profile, with transparent breakdowns of all costs and benefits.
                </p>
                <a href="#" className="text-blue-600 font-semibold hover:underline text-sm sm:text-base">
                  Compare Loans →
                </a>
              </div>

              {/* Image Section - Responsive */}
              <div className="bg-gray-200 rounded-lg shadow-md flex-grow min-h-[200px] sm:min-h-[250px] xl:min-h-[300px] flex items-center justify-center">
                <span className="text-gray-500 text-sm">Image Placeholder 3</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}