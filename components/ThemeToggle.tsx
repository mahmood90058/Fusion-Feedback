import { useTheme } from 'next-themes'
import React from 'react'
import { Button } from './ui/button'
import { Moon, Sun } from 'lucide-react'

const ThemeToggle = () => {
    const {theme, setTheme}= useTheme()
  return (
    <Button variant="ghost" size="icon" onClick={()=>setTheme(theme==="light" ? "dark" :"light" )}>
        <Sun className='h-5 w-5 rotate-0 scale-100 transition-all dark:rotate-2'/>
        <Moon className='absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0'/>
        <span className='sr-only'>Toggle theme</span>
    </Button>
  )
}

export default ThemeToggle
