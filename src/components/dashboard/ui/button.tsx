import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/dashboard/utils"

const dashboardButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-white shadow hover:bg-primary-dark",
        primary:
          "gradient-primary text-white shadow-lg hover:shadow-xl hover:scale-105",
        accent:
          "gradient-accent text-white shadow-lg hover:shadow-xl hover:scale-105",
        success:
          "gradient-success text-white shadow-lg hover:shadow-xl hover:scale-105",
        outline:
          "border border-gray-300 bg-transparent hover:bg-gray-light hover:shadow-xl hover:scale-105",
        ghost: "hover:bg-gray-light hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        destructive: "gradient-danger text-white shadow-lg hover:shadow-xl",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-lg px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface DashboardButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof dashboardButtonVariants> {
  asChild?: boolean
}

const DashboardButton = React.forwardRef<HTMLButtonElement, DashboardButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(dashboardButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
DashboardButton.displayName = "DashboardButton"

export { DashboardButton, dashboardButtonVariants }
