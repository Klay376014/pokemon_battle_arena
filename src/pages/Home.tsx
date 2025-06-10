import { Link } from 'react-router-dom'
import { usePlayerStore } from '@/store/playerStore'
import { Button } from '@/components/ui/button'
import { PokemonCard } from '@/components/PokemonCard'

export default function Home() {
  const { playerName, playerTeam, winStreak, biggestWinStreak, totalWins } = usePlayerStore()

  return (
    <div>
      {/* Main Content */}
      <main>
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            歡迎回來, {playerName}! ◉
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            準備好進入激烈的寶可夢對戰了嗎？選擇你的戰略，訓練你的隊伍，成為最強的訓練師！
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">總勝場</p>
                <p className="text-3xl font-bold text-green-600">{totalWins}</p>
              </div>
              <div className="text-4xl">🏆</div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">連勝紀錄</p>
                <p className="text-3xl font-bold text-orange-600">{biggestWinStreak}</p>
              </div>
              <div className="text-4xl">🔥</div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">目前勝場</p>
                <p className="text-3xl font-bold text-blue-600">{winStreak}</p>
              </div>
              <div className="text-4xl">⭐</div>
            </div>
          </div>
        </div>

        {/* Team Preview */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 mb-12">
          <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200 flex items-center">
            <span className="mr-3">◆</span>
            你的隊伍
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {playerTeam.map((pokemon, index) => (
              <PokemonCard
                key={index}
                pokemon={pokemon}
              />
            ))}
          </div>
        </div>
        
        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Link to="/battle" className="block">
            <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/30 dark:to-orange-900/30 rounded-xl p-8 text-center border border-red-200 dark:border-red-800 hover:shadow-lg transition-all duration-200 h-full">
              <div className="text-5xl mb-4">⚔️</div>
              <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-200">
                開始對戰
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                挑戰其他訓練師，測試你的戰術！
              </p>
              <Button className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600">
                進入對戰
              </Button>
            </div>
          </Link>

          <Link to="/team-editor" className="block">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl p-8 text-center border border-blue-200 dark:border-blue-800 hover:shadow-lg transition-all duration-200 h-full">
              <div className="text-5xl mb-4">📋</div>
              <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-200">
                隊伍編輯
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                組建和調整你的寶可夢隊伍！
              </p>
              <Button className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600">
                編輯隊伍
              </Button>
            </div>
          </Link>

          <Link to="/stats" className="block">
            <div className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/30 dark:to-teal-900/30 rounded-xl p-8 text-center border border-green-200 dark:border-green-800 hover:shadow-lg transition-all duration-200 h-full">
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-200">
                戰績統計
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                查看你的對戰記錄和數據分析！
              </p>
              <Button className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600">
                查看統計
              </Button>
            </div>
          </Link>
        </div>

        {/* Quick Tips */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-8 border border-blue-200 dark:border-gray-600">
          <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200 flex items-center">
            <span className="mr-3">◇</span>
            訓練師小貼士
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300">
            <div className="flex items-start space-x-3">
              <span className="text-green-500">✓</span>
              <span>合理搭配寶可夢屬性，克制對手弱點</span>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-green-500">✓</span>
              <span>觀察對手行動模式，預判下一步</span>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-green-500">✓</span>
              <span>善用狀態技能和場地效果</span>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-green-500">✓</span>
              <span>適時切換寶可夢保存實力</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

