import * as React from "react"
import { cn } from "@/utils/cn"

interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "row" | "col"
  spacing?: "sm" | "md" | "lg" | "none"
  align?: "start" | "center" | "end" | "stretch" | "baseline"
  justify?: "start" | "center" | "end" | "between" | "around"
}

const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  (
    {
      className,
      direction = "col",
      spacing = "md",
      align,
      justify,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex",
          direction === "col" ? "flex-col" : "flex-row",
          {
            "gap-2": spacing === "sm",
            "gap-4": spacing === "md",
            "gap-8": spacing === "lg",
            "gap-0": spacing === "none",
          },
          align && `items-${align}`,
          justify && `justify-${justify}`,
          className
        )}
        {...props}
      />
    )
  }
)
Stack.displayName = "Stack"

export { Stack }
