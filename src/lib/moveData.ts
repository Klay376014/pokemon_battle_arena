import { PokemonType } from '@/components/TypeBadge' // 導入 PokemonType 類型

// 招式類別
export type MoveCategory = 'Physical' | 'Special' | 'Status'

// 招式介面
export interface Move {
  name: string
  type: PokemonType
  category: MoveCategory
  basePower: number // 0 表示無傷害招式
  accuracy: number | boolean // 0-100
  pp: number
  shortDesc: string
  effect?: string
  secondaryEffect?: {
    chance: number // 0-100
    effect: string
  }
}

export let moveDatabase: Record<string, Move> = {}

export async function loadMoveData() {
  try {
    const response = await fetch('/moves.json')
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    moveDatabase = await response.json()
    console.log('Move data loaded successfully')
  } catch (error) {
    console.error('Failed to load move data:', error)
  }
}

export function getMoveByName(name: string): Move | undefined {
  const normalizedName = name.toLowerCase().replace(/-/g, '').replace(/\s+/g, '')

  if (moveDatabase[normalizedName]) {
    return moveDatabase[normalizedName]
  }
  
  const moveEntry = Object.entries(moveDatabase).find(([, value]) => {
    const dbMoveName = value.name
    return dbMoveName === normalizedName
  })
  
  return moveEntry ? moveEntry[1] : undefined
}



