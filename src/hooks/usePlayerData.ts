import { useQuery } from '@tanstack/react-query'
import { PlayerService } from '@/lib/firebaseService'
import { useAuthStore } from '@/store/authStore'
import { usePlayerStore } from '@/store/playerStore'

export function usePlayerData() {
  const { user } = useAuthStore()
  const { setPlayerData } = usePlayerStore()

  return useQuery({
    queryKey: ['playerData', user?.uid],
    queryFn: async () => {
      if (!user) return null
      
      try {
        const playerData = await PlayerService.getPlayerData(user.uid)
        
        if (playerData) {
          // 更新 playerStore
          setPlayerData(playerData)
          return playerData
        }
        
        // 如果沒有找到玩家資料，創建新玩家
        const displayName = user.displayName || user.email?.split('@')[0] || 'Trainer'
        const newPlayerData = {
          uid: user.uid,
          playerName: displayName,
          email: user.email || '',
          totalWins: 0,
          winStreak: 0,
          biggestWinStreak: 0,
          // 其他默認值...
        }
        
        await PlayerService.createPlayerData({
          ...newPlayerData,
          playerTeam: usePlayerStore.getState().playerTeam,
          currentPokemonIndex: 0,
          useSpecialForm: false
        })
        setPlayerData(newPlayerData)
        return newPlayerData
      } catch (error) {
        console.error('Failed to load player data:', error)
        throw error
      }
    },
    enabled: !!user, // 只有當用戶登入時才執行查詢
    staleTime: 1000 * 60 * 5, // 5 分鐘內不重新獲取資料
  })
}
