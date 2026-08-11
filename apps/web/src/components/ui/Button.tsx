import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/utils/cn"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cmrl-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-cmrl-blue-300",
  {
    variants: {
      variant: {
        default: "bg-cmrl-blue-600 text-white hover:bg-cmrl-blue-700 dark:bg-cmrl-blue-600 dark:hover:bg-cmrl-blue-700",
        destructive: "bg-semantic-danger text-white hover:bg-red-600 dark:hover:bg-red-600",
        outline: "border border-gray-200 bg-white hover:bg-gray-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-gray-50",
        secondary: "bg-gray-100 text-slate-900 hover:bg-gray-200 dark:bg-slate-800 dark:text-gray-50 dark:hover:bg-slate-700",
        ghost: "hover:bg-gray-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-gray-50",
        link: "text-cmrl-blue-600 underline-offset-4 hover:underline dark:text-cmrl-blue-400",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
