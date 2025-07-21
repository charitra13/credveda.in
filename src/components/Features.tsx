'use client'

import React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { 
  Calculator, 
  UserCheck, 
  BarChart3,
  ArrowRight
} from "lucide-react"

const features = [
  {
    title: "Know Your True Credit Worth",
    description: "Our AI analyzes your complete financial profile using SHAP technology, revealing hidden credit strengths and giving you the confidence to negotiate better loan terms.",
    buttonText: "Analyze My Profile",
    icon: Calculator,
    accent: "primary"
  },
  {
    title: "Never Miss Another Payment Deadline",
    description: "Set smart reminders across all your loans with WhatsApp and SMS alerts, keeping your credit score intact.",
    buttonText: "Set Reminders",
    icon: UserCheck,
    accent: "secondary"
  },
  {
    title: "Compare Loan Offers Side by Side Instantly",
    description: "See exactly which lender offers the best terms for your specific profile, with transparent breakdown of all costs and benefits.",
    buttonText: "Compare Loans",
    icon: BarChart3,
    accent: "accent"
  }
]

const stats = [
  {
    value: "500+",
    label: "Connect with Financial Advisors who Actually Care",
    description: "Access our network of 500+ verified DSAs and NBFCs who compete to offer you the best loans - no bias, only trust.",
    buttonText: "Connect with Advisors"
  },
  {
    value: "1/1",
    label: "Navigate your Financial Journey Effortlessly",
    description: "Clean, intuitive interface designed for real people, not finance experts.",
    buttonText: "Explore Platform"
  }
]

export function Features() {
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
      className="py-16 lg:py-24 gradient-section"
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

        {/* Feature Cards Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          variants={sectionVariants}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              variants={itemVariants}
            >
              <div className={`inline-flex p-3 rounded-lg mb-6 ${
                feature.accent === 'primary' ? 'bg-primary/10 text-primary' :
                feature.accent === 'secondary' ? 'bg-secondary/10 text-secondary' :
                'bg-accent/10 text-accent'
              }`}>
                <feature.icon size={24} />
              </div>
              
              <h3 className="text-xl font-bold text-foreground mb-4">
                {feature.title}
              </h3>
              
              <p className="text-gray-dark mb-6">
                {feature.description}
              </p>
              
              <Button 
                variant="ghost" 
                className="group p-0 h-auto font-semibold text-primary hover:text-primary-dark"
              >
                {feature.buttonText}
                <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          className="grid md:grid-cols-2 gap-8"
          variants={sectionVariants}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              variants={itemVariants}
            >
              <div className="flex items-start gap-6">
                <div className="text-5xl font-bold text-primary">
                  {stat.value}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {stat.label}
                  </h3>
                  <p className="text-gray-dark mb-4">
                    {stat.description}
                  </p>
                  <Button 
                    variant="ghost" 
                    className="group p-0 h-auto font-semibold text-primary hover:text-primary-dark"
                  >
                    {stat.buttonText}
                    <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}
