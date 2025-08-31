import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/hooks/use-theme"
 
export function ModeToggle() {
  const { theme, setTheme } = useTheme()
 
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }
 
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-200 shadow-lg"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Moon className="h-5 w-5 text-slate-700" />
      ) : (
        <Sun className="h-5 w-5 text-yellow-300" />
      )}
    </button>
  )
}
