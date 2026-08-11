import * as React from "react"
import { cn } from "@/utils/cn"

const Section = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <section
    ref={ref}
    className={cn("py-8 md:py-12", className)}
    {...props}
  />
))
Section.displayName = "Section"

export { Section }
