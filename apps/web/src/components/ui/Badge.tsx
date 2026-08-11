import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/utils/cn"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-cmrl-blue-500 focus:ring-offset-2 dark:focus:ring-cmrl-blue-300",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-cmrl-blue-600 text-white hover:bg-cmrl-blue-700",
        success:
          "border-transparent bg-semantic-success text-white hover:bg-emerald-600",
        info:
          "border-transparent bg-semantic-info text-white hover:bg-blue-600",
        warning:
          "border-transparent bg-semantic-warning text-white hover:bg-amber-600",
        danger:
          "border-transparent bg-semantic-danger text-white hover:bg-red-600",
        neutral:
          "border-transparent bg-semantic-neutral text-white hover:bg-gray-600",
        special:
          "border-transparent bg-semantic-special text-white hover:bg-purple-600",
        outline: "text-slate-950 dark:text-gray-50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
