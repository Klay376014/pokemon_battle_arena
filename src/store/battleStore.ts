import { create } from 'zustand'
import { Pokemon, Battle } from 'vgc_data_wrapper'
// import { usePlayerStore } from './playerStore'

interface BattleState {
  battleState: Battle | null
  playerPokemon: Pokemon
  npcPokemon: Pokemon
  turn: number
  currentMover: 'Player' | 'Npc'
  isMoved: {
    player: boolean
    npc: boolean
  }
  statusCount: number
  setBattleState: (battle: Battle) => void
  setPlayerPokemon: (pokemon: Pokemon) => void
  setNpcPokemon: (pokemon: Pokemon) => void
  switchCurrentMover: () => void
  addStatusCount: (count: number) => void
  speedCheck: (playerSpeed: number, npcSpeed: number) => 'Player' | 'Npc'
  turnStart: () => void
  turnEnd: () => void
  resetBattleState: () => void
  endBattle: (result: 'win' | 'lose' | 'draw', duration: number) => Promise<void>
}

export const useBattleStore = create<BattleState>((set) => ({
  battleState: null,
  playerPokemon: new Pokemon,
  npcPokemon: new Pokemon,
  turn: 1,
  currentMover: 'Player',
  isMoved: {
    player: false,
    npc: false,
  },
  statusCount: 0,

  setBattleState: (battle) => set({ battleState: battle }),
  setPlayerPokemon: (pokemon) => set({ playerPokemon: pokemon }),
  setNpcPokemon: (pokemon) => set({ npcPokemon: pokemon }),

  switchCurrentMover: () =>
    set((state) => ({
      currentMover: state.currentMover === 'Player' ? 'Npc' : 'Player',
    })),

  addStatusCount: () => set((state) => ({ statusCount: state.statusCount + 1 })),

  speedCheck: (playerSpeed, npcSpeed) =>
    playerSpeed >= npcSpeed ? 'Player' : 'Npc',

  turnStart: () =>
    set(() => ({
      // TODO
    })),

  turnEnd: () =>
    set((state) => ({
      // TODO
      turn: state.turn + 1,
      isMoved: {
        player: false,
        npc: false,
      },
    })),

  resetBattleState: () =>
    set(() => ({
      // TODO
    })),

  endBattle: async () => {}

  // endBattle: async (result: 'win' | 'lose' | 'draw', duration: number) => {
  //   const battleState = get().battleState
  //   const { uid, playerName, playerTeam, savePlayerData } = usePlayerStore.getState()
    
  //   if (!uid || !battleState) return
    
    // 1. 保存戰鬥記錄
    // try {
      // await BattleService.saveBattleRecord({
      //   playerUid: uid,
      //   playerName,
      //   playerTeam: [...playerTeam],
      //   npcTeam: battleState.getNpcTeam(),
      //   result,
      //   battleDuration: duration,
      // })
      
      // // 2. 更新玩家統計數據
      // if (result === 'win') {
      //   usePlayerStore.setState(state => ({
      //     totalWins: state.totalWins + 1,
      //     winStreak: state.winStreak + 1,
      //     biggestWinStreak: Math.max(state.biggestWinStreak, state.winStreak + 1)
      //   }))
      // } else if (result === 'lose') {
      //   usePlayerStore.setState({ winStreak: 0 })
      // }
      
      // // 3. 保存更新後的玩家資料
      // await savePlayerData()
      
  //   } catch (error) {
  //     console.error('Failed to process battle end:', error)
  //   }
  // },
}))
