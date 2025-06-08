import { cn } from '@/lib/utils'
import { Badge } from './ui/badge'

import { useTranslation } from 'react-i18next'
// 寶可夢18種屬性的顏色配置
const typeColors = {
  Normal: 'bg-gray-400 text-white dark:bg-gray-500',
  Fire: 'bg-red-500 text-white dark:bg-red-600',
  Water: 'bg-blue-500 text-white dark:bg-blue-600',
  Electric: 'bg-yellow-400 text-black dark:bg-yellow-500 dark:text-black',
  Grass: 'bg-green-500 text-white dark:bg-green-600',
  Ice: 'bg-cyan-300 text-black dark:bg-cyan-400 dark:text-black',
  Fighting: 'bg-red-700 text-white dark:bg-red-800',
  Poison: 'bg-purple-500 text-white dark:bg-purple-600',
  Ground: 'bg-yellow-600 text-white dark:bg-yellow-700',
  Flying: 'bg-indigo-400 text-white dark:bg-indigo-500',
  Psychic: 'bg-pink-500 text-white dark:bg-pink-600',
  Bug: 'bg-lime-500 text-white dark:bg-lime-600',
  Rock: 'bg-yellow-800 text-white dark:bg-yellow-900',
  Ghost: 'bg-purple-700 text-white dark:bg-purple-800',
  Dragon: 'bg-indigo-700 text-white dark:bg-indigo-800',
  Dark: 'bg-gray-800 text-white dark:bg-gray-900',
  Steel: 'bg-gray-500 text-white dark:bg-gray-600',
  Fairy: 'bg-pink-300 text-black dark:bg-pink-400 dark:text-black',
} as const

// 屬性類型定義
type PokemonType = keyof typeof typeColors

interface TypeBadgeProps {
  type: PokemonType
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function TypeBadge({ type, size = 'md', className }: TypeBadgeProps) {
    const { t } = useTranslation()
  const normalizedType = type.charAt(0).toUpperCase() + type.slice(1).toLowerCase() as PokemonType
  
  const colorClass = typeColors[normalizedType] || typeColors.Normal
  
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-xs',
    lg: 'px-4 py-1.5 text-sm'
  }
  
  return (
    <Badge
      variant="outline"
      className={cn(
        'rounded-full transition-all duration-200 hover:scale-105',
        colorClass,
        sizeClasses[size],
        className
      )}
    >
      {t(`type.${normalizedType}`) || normalizedType}
    </Badge>
  )
}

// 導出屬性顏色配置，供其他組件使用
export { typeColors }
export type { PokemonType }
