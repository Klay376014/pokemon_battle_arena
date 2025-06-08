import { createBrowserRouter } from 'react-router-dom'
import ThemeProvider from '@/components/ThemeProvider'
import AuthGuard from '@/components/AuthGuard'
import Layout from '@/components/Layout'
import Home from '@/pages/Home'
import Battle from '@/pages/Battle'
import TeamEditor from '@/pages/TeamEditor'
import Stats from '@/pages/Stats'
import Auth from '@/pages/Auth'
import NotFound from '@/pages/NotFound'

const basename = import.meta.env.BASE_URL

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ThemeProvider>
        <AuthGuard>
          <Layout />
        </AuthGuard>
      </ThemeProvider>
    ),
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'battle',
        element: <Battle />
      },
      {
        path: 'team-editor',
        element: <TeamEditor />
      },
      {
        path: 'stats',
        element: <Stats />
      }
    ]
  },
  {
    path: '/auth',
    element: (
      <ThemeProvider>
        <Auth />
      </ThemeProvider>
    ),
  },
  {
    path: '*',
    element: (
      <ThemeProvider>
        <NotFound />
      </ThemeProvider>
    ),
  },
], {
  basename // 添加基本路徑
})



