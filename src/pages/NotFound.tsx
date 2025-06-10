import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import Header from '@/components/Header'
import ScrollToTop from '@/components/ScrollToTop'

export default function NotFound() {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gradient-to-br from-yellow-50 to-red-50 dark:from-gray-900 dark:to-gray-800 transition-all duration-300">
      <ScrollToTop />
      <Header />
      <main className="flex-1 overflow-auto flex items-center justify-center">
        <div className="container mx-auto px-6 py-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-12 shadow-lg border border-gray-200 dark:border-gray-700 text-center max-w-md mx-auto">
            <div className="text-8xl mb-6">😵</div>
            <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              404
            </h2>
            <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-6">
              頁面走失了！
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              看來這隻寶可夢跑到野外去了，我們找不到您要訪問的頁面。
            </p>
            
            <Link to="/">
              <Button size="lg" className="bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-600 hover:to-red-600 text-white">
                返回首頁
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}



