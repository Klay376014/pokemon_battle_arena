import { create } from 'zustand'
import { Pokemon } from 'vgc_data_wrapper'
import { PlayerService, PlayerData } from '@/lib/firebaseService'
import { getAuth } from 'firebase/auth'
import { createStarterTeam } from '@/data/pokemonFactory'

interface IBaseState {
  playerName: string
  playerTeam: [Pokemon, Pokemon, Pokemon]
  currentPokemonIndex: number
  isNpc: boolean
  useSpecialForm: boolean
  uid: string | null

  // Actions
  setPlayerName: (name: string) => void
  setTeam: (team: [Pokemon, Pokemon, Pokemon]) => void
  switchPokemon: (index: number) => void
  replacePokemonAtIndex?: (index: number, newPokemon: Pokemon) => void
  toggleSpecialForm: () => void
  resetState: () => void
}

interface IPlayerState extends IBaseState {
  winStreak: number
  biggestWinStreak: number
  totalWins: number

  // Actions
  setWinStreak: () => void
  setPlayerData: (playerData: Partial<PlayerData>) => void

  // Firebase actions
  savePlayerData: () => Promise<void>
  createNewPlayer: (uid: string, email: string, name: string) => Promise<void>
  loadPlayerData: (uid: string) => Promise<void>
}

export const usePlayerStore = create<IPlayerState>((set, get) => ({
  playerName: 'Player',
  playerTeam: createStarterTeam(),
  currentPokemonIndex: 0,
  isNpc: false,
  useSpecialForm: false,
  winStreak: 0,
  biggestWinStreak: 0,
  totalWins: 0,
  uid: null,

  setWinStreak: () => set((state) => ({ winStreak: state.winStreak + 1 })),
  setPlayerName: (name) => set({ playerName: name }),
  setTeam: (team) => set({ playerTeam: team }),
  switchPokemon: (index) => set({ currentPokemonIndex: index }),
  replacePokemonAtIndex: (index: number, newPokemon: Pokemon) =>
    set((state) => {
      const newTeam = [...state.playerTeam] as [Pokemon, Pokemon, Pokemon]
      newTeam[index] = newPokemon
      return { playerTeam: newTeam }
    }),
  toggleSpecialForm: () =>
    set((state) => ({ useSpecialForm: !state.useSpecialForm })),
  resetState: () =>
    set({
      currentPokemonIndex: 0,
      useSpecialForm: false,
    }),
  setPlayerData: (playerData: Partial<PlayerData>) => {
    set({
      ...playerData,
      uid: playerData.uid || get().uid,
    })
  },
  
  // Firebase actions
  loadPlayerData: async (uid: string) => {
    try {
      const playerData = await PlayerService.getPlayerData(uid)
      if (playerData) {
        get().setPlayerData(playerData)
      } else {
        // 如果玩家資料不存在，直接創建新玩家
        console.log('Player data not found, creating new player')
        
        // 從 auth 獲取用戶信息
        const auth = getAuth()
        const currentUser = auth.currentUser
        
        if (currentUser) {
          const displayName = currentUser.displayName || currentUser.email?.split('@')[0] || 'Trainer'
          const email = currentUser.email || ''
          
          // 創建新玩家
          await get().createNewPlayer(uid, email, displayName)
          console.log('New player created successfully')
        } else {
          console.error('Cannot create player: No authenticated user found')
        }
      }
    } catch (error) {
      console.error('Failed to load player data:', error)
    }
  },

  savePlayerData: async () => {
    const state = get()
    if (!state.uid) return

    try {
      await PlayerService.updatePlayerData(state.uid, {
        playerName: state.playerName,
        playerTeam: state.playerTeam,
        currentPokemonIndex: state.currentPokemonIndex,
        useSpecialForm: state.useSpecialForm,
        winStreak: state.winStreak,
        biggestWinStreak: state.biggestWinStreak,
        totalWins: state.totalWins,
      })
    } catch (error) {
      console.error('Failed to save player data:', error)
    }
  },

  createNewPlayer: async (uid: string, email: string, name: string) => {
    try {
      const state = get()
      const playerData: Omit<PlayerData, 'createdAt' | 'updatedAt'> = {
        uid,
        playerName: name,
        email,
        playerTeam: state.playerTeam,
        currentPokemonIndex: 0,
        useSpecialForm: false,
        winStreak: 0,
        biggestWinStreak: 0,
        totalWins: 0,
      }

      await PlayerService.createPlayerData(playerData)
      set({
        ...playerData,
      })
    } catch (error) {
      console.error('Failed to create player data:', error)
    }
  },
}))

// Simplified interface for NPC (no Firebase needed)
interface INpcState extends IBaseState {
  loadNpcData: (uid: string) => void
}

export const useNpcStore = create<INpcState>((set) => ({
  playerName: 'NPC',
  playerTeam: createStarterTeam(),
  currentPokemonIndex: 0,
  isNpc: true,
  useSpecialForm: false,
  uid: null,
  setPlayerName: (name) => set({ playerName: name }),
  setTeam: (team) => set({ playerTeam: team }),
  switchPokemon: (index) => set({ currentPokemonIndex: index }),
  toggleSpecialForm: () =>
    set((state) => ({ useSpecialForm: !state.useSpecialForm })),
  resetState: () =>
    set({
      currentPokemonIndex: 0,
      useSpecialForm: false,
    }),
  
  loadNpcData: () => {
    // get npc data from somewhere and set it
  },
}))
