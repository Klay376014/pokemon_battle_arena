import { Pokemon } from 'vgc_data_wrapper'
import { basePokemonSetting } from '../defaultPokemon'

export const tyranitar = new Pokemon({
  ...basePokemonSetting,
  name: 'tyranitar',
  types: ['Rock', 'Dark'],
  teraType: 'Flying',
  weight: 202.0,
  gender: 'Male',
  specialForm: 'None',
  nature: { plus: 'attack', minus: 'specialAttack' },
  flags: {
    hasEvolution: false,
  },
  moves: ['Rock Slide', 'Crunch', 'Low Kick', 'Protect'],
  item: 'Assault Vest',
  sprite:
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/248.png',
})

export const ampharos = new Pokemon({
  ...basePokemonSetting,
  name: 'ampharos',
  types: ['Electric'],
  teraType: 'Electric',
  weight: 61.5,
  gender: 'Female',
  specialForm: 'None',
  nature: { plus: 'specialAttack', minus: 'speed' },
  flags: {
    hasEvolution: false,
  },
  moves: ['Thunderbolt', 'Dragon Pulse', 'Focus Blast', 'Volt Switch'],
  sprite:
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/181.png',
})

// 更多第二世代寶可夢...
