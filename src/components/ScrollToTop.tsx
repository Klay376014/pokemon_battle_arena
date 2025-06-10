import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    // 當路徑變化時，滾動到頁面頂部
    const mainContent = document.querySelector('main')
    if (mainContent) {
      mainContent.scrollTop = 0
    }
  }, [pathname])

  return null
}