import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export default function Battle() {
  return (
    <div>
      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-8 text-gray-800 dark:text-gray-200">
            戰鬥頁面
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-12">
            這裡將會是激烈的寶可夢對戰場地！
          </p>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-12 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="text-6xl mb-6">⚔️</div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              戰鬥系統開發中...
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              即將推出完整的寶可夢對戰體驗
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

