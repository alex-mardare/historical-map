import { create } from 'zustand'

interface GlobalStore {
  isAuthenticated: boolean

  setIsAuthenticated: (authState: boolean) => void
}

const useStore = create<GlobalStore>((set) => ({
  isAuthenticated: false,

  setIsAuthenticated: (authState: boolean) =>
    set({ isAuthenticated: authState })
}))

export default useStore
