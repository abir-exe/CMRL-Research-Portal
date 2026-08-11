import * as React from "react"
import { AlertTriangle } from "lucide-react"
import { cn } from "@/utils/cn"
import { Button } from "./Button"

interface ErrorStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  message?: string
  onRetry?: () => void
}

export function ErrorState({
  title = "Something went wrong",
  message = "An error occurred while loading this data.",
  onRetry,
  className,
  ...props
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-lg border border-red-200 bg-red-50 p-8 text-center dark:border-red-900/50 dark:bg-red-950/20",
        className
      )}
      {...props}
    >
      <AlertTriangle className="h-10 w-10 text-semantic-danger" />
      <h3 className="mt-4 text-lg font-semibold text-red-900 dark:text-red-400">
        {title}
      </h3>
      {message && (
        <p className="mt-2 text-sm text-red-700 dark:text-red-300">
          {message}
        </p>
      )}
      {onRetry && (
        <Button
          variant="destructive"
          className="mt-6"
          onClick={onRetry}
        >
          Try again
        </Button>
      )}
    </div>
  )
}
