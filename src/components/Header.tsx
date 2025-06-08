import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ThemeToggle from './themeToggle'
import LanguageSwitcher from './LanguageSwitcher'
import { useAuthStore } from '@/store/authStore'
import { Button } from './ui/button'

export default function Header() {
  const { t } = useTranslation()
  const location = useLocation()
  const { user, logout } = useAuthStore()
  
  // 檢查是否在主頁
  const isHome = location.pathname === '/' || location.pathname === '/auth'
  
  return (
    <header className="flex-none z-50 flex justify-between items-center p-6 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="flex items-center space-x-4">
        {!isHome && (
          <Link to="/" className="text-2xl hover:scale-110 transition-transform">
            ←
          </Link>
        )}
        <div className="text-4xl">⚔️</div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-red-600 bg-clip-text text-transparent">
          {t('app.title')}
        </h1>
      </div>
      <div className="flex items-center space-x-2">
        {user && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => logout()}
            className="text-sm mr-2"
          >
            {t('auth.logout')}
          </Button>
        )}
        <LanguageSwitcher />
        <ThemeToggle />
      </div>
    </header>
  )
}



