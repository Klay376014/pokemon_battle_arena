import { Button } from '@/components/ui/button'
import { useThemeStore } from '@/store/themeStore'

export default function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useThemeStore()
  
  return (
    <>
      <Button variant="outline" className="cursor-pointer px-2" onClick={toggleTheme}>
          {isDarkMode ? '☀️' : '🌙'}
      </Button>
    </>
  )
}