import { create } from 'zustand'

interface ThemeState {
  isDarkMode: boolean
  toggleTheme: () => void
}

const getInitialTheme = (): boolean => {
  const stored = localStorage.getItem('theme')
  return stored === 'dark'
}

export const useThemeStore = create<ThemeState>((set) => ({
  isDarkMode: getInitialTheme(),
  toggleTheme: () => set((state) => {
    const newIsDark = !state.isDarkMode
      localStorage.setItem('theme', newIsDark ? 'dark' : 'light')
      return { isDarkMode: newIsDark }
  }),
}))