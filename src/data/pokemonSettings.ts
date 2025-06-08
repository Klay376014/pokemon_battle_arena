import { Pokemon } from 'vgc_data_wrapper'

export const basePokemonSetting: Partial<Pokemon> = {
  level: 50,
  status: 'Healthy',
  specialForm: 'None',
  takenDamage: 0,
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
  }
}