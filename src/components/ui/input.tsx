import * as React from "react"

import { cn } from "@/lib/utils"
import { useTheme } from "@/hooks/use-theme"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur();
    }
  };

  return (
    <input
      type={type}
      data-slot="input"
      onKeyDown={handleKeyDown}
      className={cn(
        "file:text-gray-900 dark:file:text-gray-100 placeholder:text-gray-500/40 dark:placeholder:text-gray-400/40 selection:bg-teal-600 selection:text-white flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base shadow-sm transition-colors outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        isDark 
          ? "border-gray-600 bg-gray-800 text-gray-100 placeholder:text-gray-400" 
          : "border-slate-200 bg-gray-100 text-gray-900 placeholder:text-gray-500",
        "focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50",
        "aria-invalid:ring-red-500/20 aria-invalid:border-red-500",
        className
      )}
      {...props}
    />
  )
}

export { Input }
