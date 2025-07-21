'use client'

import React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { 
  Calculator, 
  UserCheck, 
  BarChart3,
  ArrowRight,
  Users,
  DraftingCompass,
  ImageIcon, // Add this import
  LucideIcon
} from "lucide-react"

// Type definitions for bento items
type BentoItem = 
  | {
      type: "feature";
      title: string;
      description: string;
      buttonText: string;
      icon: LucideIcon;
      className: string;
    }
  | {
      type: "feature-with-image";
      title: string;
      description: string;
      buttonText: string;
      icon: LucideIcon;
      className: string;
    }
  | {
      type: "stat";
      value: string;
      label: string;
      description: string;
      buttonText: string;
      icon: LucideIcon;
      className: string;
    }
  | {
      type: "placeholder";
      className: string;
    };

// The new unified array for the bento grid
const bentoItems: BentoItem[] = [
  {
    type: "feature",
    title: "Know Your True Credit Worth",
    description: "Our AI analyzes your complete financial profile using SHAP technology, revealing hidden credit strengths and giving you the confidence to negotiate better loan terms.",
    buttonText: "Analyze My Profile",
    icon: Calculator,
    className: "md:col-span-1",
  },
  {
    type: "feature-with-image",
    title: "Never Miss Another Payment Deadline",
    description: "Set smart reminders across all your loans with WhatsApp and SMS alerts, keeping your credit score intact.",
    buttonText: "Set Reminders",
    icon: UserCheck,
    className: "md:col-span-2",
  },
  {
    type: "placeholder",
    className: "md:col-span-1 md:row-span-2",
  },
  {
    type: "feature",
    title: "Compare Loan Offers Side by Side Instantly",
    description: "See exactly which lender offers the best terms for your specific profile, with transparent breakdown of all costs and benefits.",
    buttonText: "Compare Loans",
    icon: BarChart3,
    className: "md:col-span-2",
  },
  {
    type: "stat",
    value: "500+",
    label: "Connect with Financial Advisors who Actually Care",
    description: "Access our network of 500+ verified DSAs and NBFCs who compete to offer you the best loans - no bias, only trust.",
    buttonText: "Connect with Advisors",
    icon: Users,
    className: "md:col-span-1",
  },
  {
    type: "stat",
    value: "1/1",
    label: "Navigate your Financial Journey Effortlessly",
    description: "Clean, intuitive interface designed for real people, not finance experts.",
    buttonText: "Explore Platform",
    icon: DraftingCompass,
    className: "md:col-span-1",
  },
  {
    type: "placeholder",
    className: "md:col-span-1",
  },
];

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

        {/* Bento Grid Layout */}
        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={sectionVariants}
        >
          {bentoItems.map((item, index) => (
            <motion.div
              key={index}
              className={cn(
                "bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col",
                item.className
              )}
              variants={itemVariants}
            >
              {item.type === "feature" && (
                <div className="p-8 flex flex-col flex-grow">
                  <div className="inline-flex p-3 rounded-lg mb-6 bg-primary/10 text-primary w-fit">
                    {React.createElement(item.icon, { size: 24 })}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-dark mb-6 flex-grow">
                    {item.description}
                  </p>
                  <Button
                    variant="ghost"
                    className="group p-0 h-auto font-semibold text-primary hover:text-primary-dark self-start"
                  >
                    {item.buttonText}
                    <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              )}

              {item.type === "feature-with-image" && (
                <div className="grid grid-cols-3 gap-6 p-8 flex-grow">
                  <div className="col-span-1 bg-gray-medium rounded-lg flex items-center justify-center">
                     <ImageIcon size={40} className="text-gray-dark" />
                  </div>
                  <div className="col-span-2 flex flex-col">
                      <h3 className="text-xl font-bold text-foreground mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-dark mb-4 flex-grow">
                        {item.description}
                      </p>
                      <Button
                        variant="ghost"
                        className="group p-0 h-auto font-semibold text-primary hover:text-primary-dark self-start"
                      >
                        {item.buttonText}
                        <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                      </Button>
                  </div>
                </div>
              )}

              {item.type === "stat" && (
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-start gap-4 mb-4">
                    {React.createElement(item.icon, { size: 24, className: "text-primary mt-1" })}
                    <h3 className="text-xl font-bold text-foreground">
                      {item.label}
                    </h3>
                  </div>
                  <p className="text-gray-dark mb-6 flex-grow">
                    {item.description}
                  </p>
                  <Button
                    variant="ghost"
                    className="group p-0 h-auto font-semibold text-primary hover:text-primary-dark self-start mt-auto"
                  >
                    {item.buttonText}
                    <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              )}

              {item.type === "placeholder" && (
                <div className="bg-gray-medium rounded-2xl flex items-center justify-center min-h-[200px] aspect-square">
                  <ImageIcon size={48} className="text-gray-dark" />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}
