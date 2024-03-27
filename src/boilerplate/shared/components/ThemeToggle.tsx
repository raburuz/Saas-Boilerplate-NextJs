"use client"

/* LIBRARIES */
import { useTheme } from "next-themes"
import { Laptop, Moon, Sun } from "lucide-react"

/* BOILERPLATE */
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shadcn/ui/dropdown-menu"
import { Button } from "@/shadcn/ui/button"

/* COMPONENT */
export const ThemeToggle = () => {
  
  //Hook
  const { setTheme } = useTheme()
 
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            <div className="flex flex-row items-center gap-4">
              <Sun className="w-4" />
              <span>Light</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            <div className="flex flex-row items-center gap-4">
              <Moon className="w-4" />
              <span>Dark</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            <div className="flex flex-row items-center gap-4">
              <Laptop className="w-4" />
              <span>System</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}