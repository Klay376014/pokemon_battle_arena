import { Pokemon } from 'vgc_data_wrapper'
import { defaultPokemonCollection } from './defaultPokemon'

export function createPokemonFromDefault(pokemonName: string): Pokemon | null {
  const defaultPokemon = defaultPokemonCollection[pokemonName as keyof typeof defaultPokemonCollection]
  
  if (!defaultPokemon) {
    console.error(`No default pokemon found with name: ${pokemonName}`)
    return null
  }
  
  // 創建一個新的 Pokemon 實例，複製所有屬性
  return new Pokemon({
    name: defaultPokemon.name,
    level: defaultPokemon.level,
    types: [...defaultPokemon.types],
    teraType: defaultPokemon.teraType,
    weight: defaultPokemon.weight,
    gender: defaultPokemon.gender,
    status: defaultPokemon.status,
    specialForm: defaultPokemon.specialForm,
    takenDamage: 0,
    baseStat: { ...defaultPokemon.baseStat },
    effortValues: { ...defaultPokemon.effortValues },
    individualValues: { ...defaultPokemon.individualValues },
    statStage: { ...defaultPokemon.statStage },
    nature: { ...defaultPokemon.nature },
    flags: { ...defaultPokemon.flags },
    moves: [...defaultPokemon.moves],
    sprite: defaultPokemon.sprite,
  })
}

export function createStarterTeam(): [Pokemon, Pokemon, Pokemon] {
  return [
    createPokemonFromDefault('venusaur')!,
    createPokemonFromDefault('charizard')!,
    createPokemonFromDefault('blastoise')!,
  ]
}

export function createCustomTeam(pokemonNames: [string, string, string]): [Pokemon, Pokemon, Pokemon] | null {
  const team = pokemonNames.map(name => createPokemonFromDefault(name))
  
  // 確保所有寶可夢都成功創建
  if (team.some(pokemon => pokemon === null)) {
    return null
  }
  
  return team as [Pokemon, Pokemon, Pokemon]
}