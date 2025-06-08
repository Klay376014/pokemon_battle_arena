import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export default function TeamEditor() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-all duration-300">
      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-8 text-gray-800 dark:text-gray-200">
            隊伍編輯器
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-12">
            在這裡管理你的寶可夢隊伍配置！
          </p>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-12 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="text-6xl mb-6">◉</div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              隊伍管理系統開發中...
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              即將推出完整的隊伍編輯功能
            </p>
            
            <Link to="/">
              <Button variant="outline" size="lg">
                返回首頁
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
