import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import TypeBadge from '@/components/TypeBadge'
import { usePlayerStore } from '@/store/playerStore'
import { Button } from '@/components/ui/button'
import MoveBadge from '@/components/MoveBadge'

export default function Home() {
  const { t } = useTranslation()
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
              <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-lg p-6 text-center hover:shadow-md transition-all duration-200">
                <img
                  src={pokemon.sprite}
                  alt={pokemon.name}
                  className="w-24 h-24 mx-auto mb-2 hover:scale-110 transition-transform duration-200"
                />
                <h4 className="text-lg font-semibold capitalize text-gray-800 dark:text-gray-200 mb-2">
                  {t(`pokemon.${pokemon.name ?? ''}`)}
                </h4>
                <div className="flex justify-center space-x-2 mb-2">
                  {pokemon.types.map((type, typeIndex) => (
                    <TypeBadge
                      key={typeIndex}
                      type={type}
                      size="md"
                    />
                  ))}
                </div>
                <div className="flex flex-wrap justify-between">
                  {pokemon.moves.map((move, moveIndex) => (
                    <MoveBadge
                      key={moveIndex}
                      move={move}
                      size="md"
                      className='basis-[48%] mt-2'
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/battle">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold px-8 py-3 text-lg shadow-lg"
            >
              ▶ 開始戰鬥
            </Button>
          </Link>

          <Link to="/team-editor">
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto font-semibold px-8 py-3 text-lg"
            >
              ◉ 編輯隊伍
            </Button>
          </Link>

          <Link to="/stats">
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto font-semibold px-8 py-3 text-lg"
            >
              ■ 查看戰績
            </Button>
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
