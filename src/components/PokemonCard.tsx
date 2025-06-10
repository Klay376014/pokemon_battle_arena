import { Pokemon } from 'vgc_data_wrapper'
import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import TypeBadge from './TypeBadge'
import MoveBadge from './MoveBadge'

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
      className={
        `cursor-pointer bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-lg gap-4 p-4 text-center hover:shadow-md transition-all duration-200
        ${isSelected ? 'ring-2 ring-blue-500 dark:ring-blue-400' : ''}
        ${className}`
      }
      onClick={onClick}
    >
      <CardHeader className="px-2">
        <CardTitle className="flex justify-between items-center">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-xl font-bold">{t(`pokemon.${pokemon.name}`)}</h2>
            {pokemon.types.map(type => (<TypeBadge key={type} type={type} size="sm"/>))}
          </div>
          <p>{pokemon.item ? '@' + t(`item.${pokemon.item}`) : ''}</p>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col justify-center">
        <img 
          src={pokemon.sprite} 
          alt={pokemon.name} 
          className="w-32 h-32 object-contain mx-auto"
        />
        <div className="flex flex-wrap justify-between">
          {pokemon.moves.map((move, moveIndex) => (
            <MoveBadge
              key={moveIndex}
              move={move}
              size="md"
              className="basis-[48%] mt-2"
            />
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between px-4">
        <div className="text-sm text-left">
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
