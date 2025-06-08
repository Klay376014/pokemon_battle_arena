import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  getDocs,
  serverTimestamp 
} from 'firebase/firestore'
import { db } from './firebase'
import { Pokemon } from 'vgc_data_wrapper'

// 玩家資料介面
export interface PlayerData {
  uid: string
  playerName: string
  email: string
  totalWins: number
  winStreak: number
  biggestWinStreak: number
  playerTeam: [Pokemon, Pokemon, Pokemon]
  currentPokemonIndex: number
  useSpecialForm: boolean
  createdAt: Date
  updatedAt: Date
}

// 戰鬥記錄介面
export interface BattleRecord {
  id?: string
  playerUid: string
  playerName: string
  playerTeam: Pokemon[]
  npcTeam: Pokemon[]
  result: 'win' | 'lose' | 'draw'
  battleDuration: number // 秒數
  createdAt: Date
}

// 玩家資料服務
export class PlayerService {
  static async getPlayerData(uid: string): Promise<PlayerData | null> {
    try {
      const docRef = doc(db, 'players', uid)
      const docSnap = await getDoc(docRef)
      
      if (docSnap.exists()) {
        return docSnap.data() as PlayerData
      }
      return null
    } catch (error) {
      console.error('Error getting player data:', error)
      throw error
    }
  }

  static async createPlayerData(playerData: Omit<PlayerData, 'createdAt' | 'updatedAt'>): Promise<void> {
    try {
      const docRef = doc(db, 'players', playerData.uid)
      
      // 將 Pokemon 對象轉換為純 JavaScript 對象
      const serializedTeam = playerData.playerTeam.map(pokemon => {
        if (pokemon && typeof pokemon === 'object') {
          return JSON.parse(JSON.stringify(pokemon))
        }
        return pokemon
      })
      
      // 創建一個新的對象，替換 playerTeam
      const serializedData = {
        ...playerData,
        playerTeam: serializedTeam,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      }
      
      await setDoc(docRef, serializedData)
    } catch (error) {
      console.error('Error creating player data:', error)
      throw error
    }
  }

  static async updatePlayerData(uid: string, updates: Partial<PlayerData>): Promise<void> {
    try {
      const docRef = doc(db, 'players', uid)
      
      // 處理 playerTeam 如果存在
      const serializedUpdates = { ...updates }
      if (updates.playerTeam) {
        const serializedTeam = updates.playerTeam.map(pokemon => {
          if (pokemon && typeof pokemon === 'object') {
            return JSON.parse(JSON.stringify(pokemon))
          }
          return pokemon
        })
        serializedUpdates.playerTeam = serializedTeam as [Pokemon, Pokemon, Pokemon]
      }
      
      await updateDoc(docRef, {
        ...serializedUpdates,
        updatedAt: serverTimestamp()
      })
    } catch (error) {
      console.error('Error updating player data:', error)
      throw error
    }
  }
}

// 戰鬥記錄服務
export class BattleService {
  static async saveBattleRecord(battleRecord: Omit<BattleRecord, 'id' | 'createdAt'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, 'battles'), {
        ...battleRecord,
        createdAt: serverTimestamp()
      })
      return docRef.id
    } catch (error) {
      console.error('Error saving battle record:', error)
      throw error
    }
  }

  static async getPlayerBattleHistory(playerUid: string, limit: number = 10): Promise<BattleRecord[]> {
    try {
      const q = query(
        collection(db, 'battles'),
        where('playerUid', '==', playerUid),
        orderBy('createdAt', 'desc')
      )
      
      const querySnapshot = await getDocs(q)
      const battles: BattleRecord[] = []
      
      querySnapshot.forEach((doc) => {
        battles.push({
          id: doc.id,
          ...doc.data()
        } as BattleRecord)
      })
      
      return battles.slice(0, limit)
    } catch (error) {
      console.error('Error getting battle history:', error)
      throw error
    }
  }

  static async getPlayerStats(playerUid: string): Promise<{
    totalBattles: number
    wins: number
    losses: number
    draws: number
    winRate: number
  }> {
    try {
      const battles = await this.getPlayerBattleHistory(playerUid, 1000) // 獲取更多記錄來計算統計
      
      const totalBattles = battles.length
      const wins = battles.filter(b => b.result === 'win').length
      const losses = battles.filter(b => b.result === 'lose').length
      const draws = battles.filter(b => b.result === 'draw').length
      const winRate = totalBattles > 0 ? (wins / totalBattles) * 100 : 0
      
      return {
        totalBattles,
        wins,
        losses,
        draws,
        winRate: Math.round(winRate * 100) / 100 // 保留兩位小數
      }
    } catch (error) {
      console.error('Error getting player stats:', error)
      throw error
    }
  }
}


