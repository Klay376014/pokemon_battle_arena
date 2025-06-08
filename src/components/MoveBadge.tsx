import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { Badge } from './ui/badge'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'
import { typeColors } from './TypeBadge'
import { getMoveByName } from '@/lib/moveData'

interface MoveBadgeProps {
  move: string
  size: 'sm' | 'md' | 'lg'
  className?: string
}

export default function MoveBadge({ move, size, className }: MoveBadgeProps) {
  const { t } = useTranslation()
  const moveInfo = getMoveByName(move)
  if (!moveInfo) return null
  const colorClass = typeColors[moveInfo.type] || typeColors.Normal
  
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-xs',
    lg: 'px-4 py-1.5 text-sm'
  }
  
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Badge
          variant="outline"
          className={cn(
            'rounded-full transition-all duration-200 hover:scale-105',
            colorClass,
            sizeClasses[size],
            className
          )}
        >
          {t(`move.${move}`)}
        </Badge>
      </TooltipTrigger>
      <TooltipContent className='text-sm'>
        <p>{
          <span className="flex gap-2">
            <span className="bg-red-100 dark:bg-red-900/30 px-2 py-0.5 rounded">
              Power: {moveInfo.basePower || 'N/A'}
            </span>
            <span className="bg-blue-100 dark:bg-blue-900/30 px-2 py-0.5 rounded">
              Accruacy: {moveInfo.accuracy === true ? '--' : moveInfo.accuracy}
            </span>
            <span className="bg-purple-100 dark:bg-purple-900/30 px-2 py-0.5 rounded">
              Category: {moveInfo.category}
            </span>
            <span className="bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded">
              PP: {moveInfo.pp}
            </span>
          </span>}
        </p>
        <p className='font-bold mt-1'>{moveInfo.shortDesc}</p>
      </TooltipContent>
    </Tooltip>
    
  )
}
