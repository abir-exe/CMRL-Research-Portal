import * as React from "react"
import { cn } from "@/utils/cn"

const PageContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full",
      className
    )}
    {...props}
  />
))
PageContainer.displayName = "PageContainer"

export { PageContainer }
