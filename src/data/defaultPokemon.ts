import { Pokemon } from 'vgc_data_wrapper'
import { basePokemonSetting } from './pokemonSettings'
import * as AllPokemon from './gen'

export { basePokemonSetting }

// 預設隊伍組合
export const defaultTeams = {
  // 御三家隊伍
  starters: [AllPokemon.venusaur, AllPokemon.charizard, AllPokemon.blastoise]
  
  // 未來可以添加更多預設隊伍
  // legendaries: [mewtwo, lugia, hoOh] as [Pokemon, Pokemon, Pokemon],
  // competitive: [tyranitar, excadrill, rotomWash] as [Pokemon, Pokemon, Pokemon],
}

// 所有預設寶可夢的集合，方便查詢
export const defaultPokemonCollection = {
  ...AllPokemon
  // 未來可以添加更多寶可夢
}

// 根據名稱獲取預設寶可夢
export function getDefaultPokemonByName(name: string): Pokemon | undefined {
  return Object.values(defaultPokemonCollection).find(
    pokemon => pokemon.name && pokemon.name.toLowerCase() === name.toLowerCase()
  )
}

// 獲取所有預設寶可夢
export function getAllDefaultPokemon(): Pokemon[] {
  return Object.values(defaultPokemonCollection)
}

