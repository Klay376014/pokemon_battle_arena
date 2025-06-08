import { create } from 'zustand'
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth'
import { auth } from '@/lib/firebase'

interface AuthState {
  user: User | null
  loading: boolean
  error: string | null
  
  // Actions
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  clearError: () => void
  initializeAuth: () => void
  signInWithGoogle: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  error: null,

  signIn: async (email: string, password: string) => {
    try {
      set({ loading: true, error: null })
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error: any) {
      set({ error: error.message, loading: false })
      throw error
    }
  },

  signUp: async (email: string, password: string) => {
    try {
      set({ loading: true, error: null })
      await createUserWithEmailAndPassword(auth, email, password)
      // User state will be updated by onAuthStateChanged listener
    } catch (error: any) {
      set({ error: error.message, loading: false })
      throw error
    }
  },

  logout: async () => {
    try {
      set({ loading: true, error: null })
      await signOut(auth)
      // User state will be updated by onAuthStateChanged listener
    } catch (error: any) {
      set({ error: error.message, loading: false })
      throw error
    }
  },

  clearError: () => set({ error: null }),

  initializeAuth: () => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      set({ user, loading: false })
    })
    
    // Return unsubscribe function for cleanup
    return unsubscribe
  },

  signInWithGoogle: async () => {
    try {
      set({ loading: true, error: null })
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
      // User state will be updated by onAuthStateChanged listener
    } catch (error: any) {
      set({ error: error.message, loading: false })
      throw error
    }
  },
}))

// Initialize auth listener when store is created
useAuthStore.getState().initializeAuth()

