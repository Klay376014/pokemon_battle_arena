import { Pokemon } from 'vgc_data_wrapper'
import { basePokemonSetting } from '../defaultPokemon'

// 第一世代寶可夢
export const venusaur = new Pokemon({
  ...basePokemonSetting,
  name: 'venusaur',
  types: ['Grass', 'Poison'],
  teraType: 'Grass',
  weight: 100,
  gender: 'Male',
  specialForm: 'None',
  nature: { plus: 'speed', minus: 'attack' },
  moves: ['Leaf Storm', 'Sludge Bomb', 'Earthquake', 'Giga Drain'],
  flags: {
    hasEvolution: false,
  },
  sprite:
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png',
})

export const charizard = new Pokemon({
  ...basePokemonSetting,
  name: 'charizard',
  types: ['Fire', 'Flying'],
  teraType: 'Fire',
  weight: 90.5,
  gender: 'Male',
  specialForm: 'None',
  nature: { plus: 'speed', minus: 'attack' },
  moves: ['Flamethrower', 'Dragon Claw', 'Air Slash', 'Solar Beam'],
  flags: {
    hasEvolution: false,
  },
  sprite:
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png',
})

export const blastoise = new Pokemon({
  ...basePokemonSetting,
  name: 'blastoise',
  types: ['Water'],
  teraType: 'Water',
  weight: 85.5,
  gender: 'Male',
  specialForm: 'None',
  nature: { plus: 'specialAttack', minus: 'attack' },
  flags: {
    hasEvolution: false,
  },
  moves: ['Hydro Pump', 'Ice Beam', 'Earthquake', 'Dark Pulse'],
  sprite:
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png',
})

export const pikachu = new Pokemon({
  ...basePokemonSetting,
  name: 'pikachu',
  level: 50,
  types: ['Electric'],
  teraType: 'Electric',
  weight: 6.0,
  gender: 'Male',
  status: 'Healthy',
  specialForm: 'None',
  takenDamage: 0,
  nature: { plus: 'speed', minus: 'defense' },
  flags: {
    hasEvolution: true,
  },
  moves: ['Thunderbolt', 'Iron Tail', 'Quick Attack', 'Volt Tackle'],
  sprite:
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
})

