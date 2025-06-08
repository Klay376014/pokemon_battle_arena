import { Pokemon } from 'vgc_data_wrapper'
import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import TypeBadge from './TypeBadge'

interface PokemonCardProps {
  pokemon: Pokemon
  isSelected?: boolean
  onClick?: () => void
  className?: string
}

export function PokemonCard({ pokemon, isSelected, onClick, className = '' }: PokemonCardProps) {
  const { t } = useTranslation()
  
  return (
    <Card 
      className={`cursor-pointer transition-all ${
        isSelected ? 'ring-2 ring-blue-500 dark:ring-blue-400' : ''
      } ${className}`}
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <CardTitle className='flex flex-wrap items-center gap-2'>
          <h3>{t(`pokemon.${pokemon.name}`)}</h3>
          {pokemon.types.map(type => (<TypeBadge key={type} type={type} size="sm"/>))}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center">
        <img 
          src={pokemon.sprite} 
          alt={pokemon.name} 
          className="w-32 h-32 object-contain"
        />
      </CardContent>
      <CardFooter className="pt-2 flex justify-between">
        <div className="text-sm">
          <div>Lv. {pokemon.level}</div>
          <div>{t('tera')}: {t(`type.${pokemon.teraType}`)}</div>
        </div>
        <div className="text-sm text-right">
          <div>{pokemon.nature.plus} ↑</div>
          <div>{pokemon.nature.minus} ↓</div>
        </div>
      </CardFooter>
    </Card>
  )
}