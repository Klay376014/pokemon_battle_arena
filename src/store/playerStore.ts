import { create } from 'zustand'
import { Pokemon } from 'vgc_data_wrapper'
import { PlayerService, PlayerData } from '@/lib/firebaseService'
import { getAuth } from 'firebase/auth'

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

const venusaur = new Pokemon({
  name: 'venusaur',
  level: 50,
  types: ['Grass', 'Poison'],
  teraType: 'Grass',
  weight: 100,
  gender: 'Male',
  status: 'Healthy',
  specialForm: 'None',
  takenDamage: 0,
  baseStat: {
    hp: 80,
    attack: 82,
    defense: 83,
    specialAttack: 100,
    specialDefense: 100,
    speed: 80,
  },
  effortValues: {
    hp: 0,
    attack: 0,
    defense: 0,
    specialAttack: 0,
    specialDefense: 0,
    speed: 0,
  },
  individualValues: {
    hp: 31,
    attack: 31,
    defense: 31,
    specialAttack: 31,
    specialDefense: 31,
    speed: 31,
  },
  statStage: {
    attack: 0,
    defense: 0,
    specialAttack: 0,
    specialDefense: 0,
    speed: 0,
  },
  nature: { plus: 'speed', minus: 'attack' },
  flags: {
    hasEvolution: false,
  },
  moves: ['Leaf Storm', 'Sludge Bomb', 'Earthquake', 'Giga Drain'],
  sprite:
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png',
})

const charizard = new Pokemon({
  name: 'charizard',
  level: 50,
  types: ['Fire', 'Flying'],
  teraType: 'Fire',
  weight: 90.5,
  gender: 'Male',
  status: 'Healthy',
  specialForm: 'None',
  takenDamage: 0,
  baseStat: {
    hp: 78,
    attack: 84,
    defense: 78,
    specialAttack: 109,
    specialDefense: 85,
    speed: 100,
  },
  effortValues: {
    hp: 0,
    attack: 0,
    defense: 0,
    specialAttack: 0,
    specialDefense: 0,
    speed: 0,
  },
  individualValues: {
    hp: 31,
    attack: 31,
    defense: 31,
    specialAttack: 31,
    specialDefense: 31,
    speed: 31,
  },
  statStage: {
    attack: 0,
    defense: 0,
    specialAttack: 0,
    specialDefense: 0,
    speed: 0,
  },
  nature: { plus: 'speed', minus: 'attack' },
  flags: {
    hasEvolution: false,
  },
  moves: ['Flamethrower', 'Dragon Claw', 'Air Slash', 'Solar Beam'],
  sprite:
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png',
})

const blastoise = new Pokemon({
  name: 'blastoise',
  level: 50,
  types: ['Water',],
  teraType: 'Water',
  weight: 85.5,
  gender: 'Male',
  status: 'Healthy',
  specialForm: 'None',
  takenDamage: 0,
  baseStat: {
    hp: 79,
    attack: 83,
    defense: 100,
    specialAttack: 85,
    specialDefense: 105,
    speed: 78,
  },
  effortValues: {
    hp: 0,
    attack: 0,
    defense: 0,
    specialAttack: 0,
    specialDefense: 0,
    speed: 0,
  },
  individualValues: {
    hp: 31,
    attack: 31,
    defense: 31,
    specialAttack: 31,
    specialDefense: 31,
    speed: 31,
  },
  statStage: {
    attack: 0,
    defense: 0,
    specialAttack: 0,
    specialDefense: 0,
    speed: 0,
  },
  nature: { plus: 'specialAttack', minus: 'attack' },
  flags: {
    hasEvolution: false,
  },
  moves: ['Hydro Pump', 'Ice Beam', 'Earthquake', 'Dark Pulse'],
  sprite:
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png',
})

export const usePlayerStore = create<IPlayerState>((set, get) => ({
  playerName: 'Player',
  playerTeam: [venusaur, charizard, blastoise],
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
  playerTeam: [venusaur, charizard, blastoise],
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
