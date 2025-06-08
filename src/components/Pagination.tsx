import { Button } from '@/components/ui/button'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  maxPageButtons?: number
}

export function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange,
  maxPageButtons = 5 
}: PaginationProps) {
  if (totalPages <= 1) return null
  
  let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2))
  const endPage = Math.min(totalPages, startPage + maxPageButtons - 1)
  
  if (endPage - startPage + 1 < maxPageButtons) {
    startPage = Math.max(1, endPage - maxPageButtons + 1)
  }
  
  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  )
  
  return (
    <div className="flex justify-center items-center space-x-2">
      {startPage > 1 && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(1)}
          className="hidden sm:flex"
        >
          首頁
        </Button>
      )}
      
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        上一頁
      </Button>
      
      {pages.map(page => (
        <Button
          key={page}
          variant={currentPage === page ? 'default' : 'outline'}
          size="sm"
          onClick={() => onPageChange(page)}
          className="hidden sm:flex"
        >
          {page}
        </Button>
      ))}
      
      <span className="text-sm text-gray-600 dark:text-gray-400 sm:hidden">
        {currentPage} / {totalPages}
      </span>
      
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        下一頁
      </Button>
      
      {endPage < totalPages && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(totalPages)}
          className="hidden sm:flex"
        >
          末頁
        </Button>
      )}
    </div>
  )
}