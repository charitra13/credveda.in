import * as React from "react"

import { cn } from "@/lib/dashboard/utils"

const DashboardCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "dashboard-card",
      className
    )}
    {...props}
  />
))
DashboardCard.displayName = "DashboardCard"

const DashboardCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
DashboardCardHeader.displayName = "DashboardCardHeader"

const DashboardCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
DashboardCardTitle.displayName = "DashboardCardTitle"

const DashboardCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-gray-dark", className)}
    {...props}
  />
))
DashboardCardDescription.displayName = "DashboardCardDescription"

const DashboardCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
DashboardCardContent.displayName = "DashboardCardContent"

const DashboardCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
DashboardCardFooter.displayName = "DashboardCardFooter"

export { 
  DashboardCard, 
  DashboardCardHeader, 
  DashboardCardFooter, 
  DashboardCardTitle, 
  DashboardCardDescription, 
  DashboardCardContent 
}
