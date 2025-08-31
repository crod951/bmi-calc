import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { useTheme } from "@/hooks/use-theme"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-teal-500 focus-visible:ring-teal-500/50 focus-visible:ring-[3px] aria-invalid:ring-red-500/20 aria-invalid:border-red-500 transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "",
        secondary: "",
        destructive: "",
        outline: "",
        green: "",
        yellow: "",
        red: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const Comp = asChild ? Slot : "span"

  const getVariantClasses = () => {
    switch (variant) {
      case 'default':
        return isDark 
          ? "border-transparent bg-sky-700 text-sky-200 hover:bg-sky-800" 
          : "border-transparent bg-sky-600 text-white hover:bg-sky-700";
      case 'secondary':
        return isDark 
          ? "border-transparent bg-gray-700 text-gray-200 hover:bg-gray-600" 
          : "border-transparent bg-gray-100 text-gray-900 hover:bg-gray-200";
      case 'destructive':
        return isDark 
          ? "border-transparent bg-red-700 text-red-200 hover:bg-red-800" 
          : "border-transparent bg-red-600 text-white hover:bg-red-700";
      case 'outline':
        return isDark 
          ? "text-gray-200 border-gray-600 hover:bg-gray-800" 
          : "text-gray-900 border-gray-300 hover:bg-gray-50 hover:text-gray-900";
      case 'green':
        return isDark 
          ? "bg-green-900 text-green-200 hover:bg-green-800 border border-green-400" 
          : "bg-green-100 text-green-800 hover:bg-green-200 border border-green-200";
      case 'yellow':
        return isDark 
          ? "bg-yellow-900 text-yellow-200 hover:bg-yellow-800 border border-yellow-400" 
          : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border border-yellow-200";
      case 'red':
        return isDark 
          ? "bg-red-900 text-red-200 hover:bg-red-800 border border-red-400" 
          : "bg-red-100 text-red-800 hover:bg-red-200 border border-red-200";
      default:
        return isDark 
          ? "border-transparent bg-sky-700 text-sky-200 hover:bg-sky-800" 
          : "border-transparent bg-sky-600 text-white hover:bg-sky-700";
    }
  };

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), getVariantClasses(), className)}
      {...props}
    />
  )
}

export { Badge }
