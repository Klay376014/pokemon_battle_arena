import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { usePlayerData } from '@/hooks/usePlayerData'

interface AuthGuardProps {
  children: React.ReactNode
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { user, loading: authLoading } = useAuthStore()
  const { isLoading: playerDataLoading } = usePlayerData()
  const navigate = useNavigate()

  useEffect(() => {
    if (!authLoading && !user) {
      // 如果沒有登入，導向認證頁面
      navigate('/auth')
    }
  }, [user, authLoading, navigate])

  // 顯示載入畫面 - 當認證或玩家資料正在加載時
  if (authLoading || playerDataLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-spin">⚡</div>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
            載入中...
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            正在初始化 Pokemon Battle Arena
          </p>
        </div>
      </div>
    )
  }

  // 如果沒有登入，不渲染子組件（會被導向認證頁面）
  if (!user) {
    return null
  }

  // 如果已登入且玩家資料已加載完成，渲染子組件
  return <>{children}</>
}



