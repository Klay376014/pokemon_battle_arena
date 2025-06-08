import { Outlet } from 'react-router-dom'
import Header from './Header'

export default function Layout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 transition-all duration-300">
      <Header />
      <main className="container mx-auto px-6 py-8">
        <Outlet />
      </main>
    </div>
  )
}