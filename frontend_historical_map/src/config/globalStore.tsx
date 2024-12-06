import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface GlobalStore {
  isAuthenticated: boolean
  lastMenuKey: string

  setIsAuthenticated: (authState: boolean) => void
  setLastMenuKey: (key: string) => void
}

const useStore = create<GlobalStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      lastMenuKey: '1.1',

      setIsAuthenticated: (authState: boolean) =>
        set({ isAuthenticated: authState }),
      setLastMenuKey: (key: string) => set({ lastMenuKey: key })
    }),
    {
      name: 'global-store'
    }
  )
)

export default useStore
