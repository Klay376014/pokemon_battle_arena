import { Pokemon } from 'vgc_data_wrapper'
import { basePokemonSetting } from '../defaultPokemon'

export const blaziken = new Pokemon({
  ...basePokemonSetting,
  name: 'blaziken',
  types: ['Fire', 'Fighting'],
  teraType: 'Fire',
  weight: 52.0,
  gender: 'Male',
  specialForm: 'None',
  nature: { plus: 'attack', minus: 'specialDefense' },
  flags: {
    hasEvolution: false,
  },
  moves: ['Flare Blitz', 'Close Combat', 'Thunder Punch', 'Protect'],
  sprite:
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/257.png',
})

// 更多第三世代寶可夢...