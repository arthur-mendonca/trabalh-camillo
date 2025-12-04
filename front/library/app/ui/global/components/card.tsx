import type * as React from "react"
import { cn } from "@/lib/utils"

// Card component - removed complex grid layouts and data attributes
function Card({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)} {...props} />
}

// CardHeader - basic flex container with padding
function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
}

// Simplified CardTitle - basic heading with semibold font
function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props} />
}

// Simplified CardContent - just padding
function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("p-6 pt-0", className)} {...props} />
}

// Simplified CardFooter - basic flex container
function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex items-center p-6 pt-0", className)} {...props} />
}

export { Card, CardHeader, CardFooter, CardTitle, CardContent }
