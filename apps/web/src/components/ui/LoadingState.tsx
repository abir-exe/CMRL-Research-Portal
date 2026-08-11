import * as React from "react"
import { Loader2 } from "lucide-react"
import { cn } from "@/utils/cn"

interface LoadingStateProps extends React.HTMLAttributes<HTMLDivElement> {
  message?: string
  size?: "sm" | "default" | "lg"
}

export function LoadingState({
  message = "Loading...",
  size = "default",
  className,
  ...props
}: LoadingStateProps) {
  const iconSizes = {
    sm: 16,
    default: 24,
    lg: 32,
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-8 text-gray-500 dark:text-gray-400",
        className
      )}
      {...props}
    >
      <Loader2
        className="animate-spin text-cmrl-blue-600 dark:text-cmrl-blue-500"
        size={iconSizes[size]}
      />
      {message && (
        <p className={cn("mt-4 text-sm font-medium", size === "lg" && "text-base")}>
          {message}
        </p>
      )}
    </div>
  )
}
