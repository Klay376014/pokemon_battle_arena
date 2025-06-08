import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Pokemon } from 'vgc_data_wrapper'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { usePlayerStore } from '@/store/playerStore'
import { getAllDefaultPokemon } from '@/data/defaultPokemon'
import { PokemonCard } from '@/components/PokemonCard'
import { Pagination } from '@/components/Pagination'
import { PokemonType } from '@/components/TypeBadge'

export default function TeamEditor() {
  const { t } = useTranslation()
  const { playerTeam, replacePokemonAtIndex } = usePlayerStore()
  const [selectedPokemonIndex, setSelectedPokemonIndex] = useState<number | null>(null)
  
  const allPokemon = useMemo(() => getAllDefaultPokemon(), [])
  
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState<PokemonType | 'All'>('All')
  
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6
  
  const filteredPokemon = useMemo(() => {
    return allPokemon.filter(pokemon => {
      if (!pokemon.name) return false
    
      const nameMatch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t(`pokemon.${pokemon.name}`).toLowerCase().includes(searchTerm.toLowerCase())
      const typeMatch = typeFilter === 'All' || pokemon.types.includes(typeFilter as PokemonType)
      return nameMatch && typeMatch
    })
  }, [allPokemon, searchTerm, typeFilter, t])
  
  const totalPages = Math.ceil(filteredPokemon.length / itemsPerPage)
  const paginatedPokemon = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredPokemon.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredPokemon, currentPage, itemsPerPage])
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }
  
  const handleSelectTeamPokemon = (index: number) => {
    setSelectedPokemonIndex(index)
  }
  
  const handleReplacePokemon = (pokemon: Pokemon) => {
    if (selectedPokemonIndex === null) return
    
    if (replacePokemonAtIndex) {
      replacePokemonAtIndex(selectedPokemonIndex, pokemon)
      setSelectedPokemonIndex(null)
    }
  }
  
  const resetFilters = () => {
    setSearchTerm('')
    setTypeFilter('All')
    setCurrentPage(1)
  }
  
  const pokemonTypes = [
    'All', 'Fire', 'Water', 'Grass', 'Electric', 'Normal', 'Flying', 
    'Ice', 'Fighting', 'Poison', 'Ground', 'Rock', 'Bug', 
    'Ghost', 'Steel', 'Psychic', 'Dark', 'Dragon', 'Fairy'
  ]
  
  return (
    <div>
      <main className="container mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-4 text-gray-800 dark:text-gray-200">
            {t('nav.teamEditor')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            在這裡管理你的寶可夢隊伍配置！
          </p>
        </div>
        
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            當前隊伍
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {playerTeam.map((pokemon, index) => (
              <PokemonCard
                key={`team-${index}`}
                pokemon={pokemon}
                isSelected={selectedPokemonIndex === index}
                onClick={() => handleSelectTeamPokemon(index)}
              />
            ))}
          </div>
          
          {selectedPokemonIndex !== null && (
            <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
              <p className="text-amber-800 dark:text-amber-300">
                已選擇 {t(`pokemon.${playerTeam[selectedPokemonIndex].name}`)}，請從下方選擇要替換的寶可夢
              </p>
            </div>
          )}
        </div>
        
        <div className="mb-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            尋找寶可夢
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                名稱搜索
              </label>
              <Input
                type="text"
                placeholder="輸入寶可夢名稱..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setCurrentPage(1)
                }}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                類型過濾
              </label>
              <Select
                value={typeFilter}
                onValueChange={(value) => {
                  setTypeFilter(value as PokemonType | 'All')
                  setCurrentPage(1)
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="選擇類型" />
                </SelectTrigger>
                <SelectContent>
                  {pokemonTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type === 'All' ? '全部類型' : t(`type.${type}`)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="mt-4 flex justify-end">
            <Button variant="outline" onClick={resetFilters}>
              重置過濾器
            </Button>
          </div>
        </div>
        
        <div>
          <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            可用寶可夢
          </h3>
          
          {filteredPokemon.length === 0 ? (
            <div className="text-center p-8 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-gray-500 dark:text-gray-400">
                沒有找到符合條件的寶可夢
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {paginatedPokemon.map((pokemon) => (
                  <PokemonCard
                    key={`default-${pokemon.name}`}
                    pokemon={pokemon}
                    className={selectedPokemonIndex !== null 
                      ? 'hover:ring-2 hover:ring-green-500' 
                      : 'opacity-70'
                    }
                    onClick={() => selectedPokemonIndex !== null && handleReplacePokemon(pokemon)}
                  />
                ))}
              </div>
              
              {/* 使用 Pagination 組件 */}
              <div className="mt-8">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  maxPageButtons={5}
                />
              </div>
            </>
          )}
        </div>
        
        {/* 操作按鈕 */}
        <div className="mt-12 flex justify-center gap-4">
          <Button 
            variant="outline" 
            onClick={() => setSelectedPokemonIndex(null)}
            disabled={selectedPokemonIndex === null}
          >
            取消選擇
          </Button>
          <Link to="/">
            <Button variant="default">
              返回首頁
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}



