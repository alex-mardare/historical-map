import { create } from 'zustand'

interface GlobalStore {
  accessToken: string | null
  isAuthenticated: boolean

  removeAccessToken: () => void
  setAccessToken: (token: string) => void
  setIsAuthenticated: () => void
}

const useStore = create<GlobalStore>((set) => ({
  accessToken: null,
  isAuthenticated: false,

  removeAccessToken: () => {
    set(() => ({ accessToken: null }))
  },
  setAccessToken: (token: string) => {
    set(() => ({ accessToken: token }))
  },
  setIsAuthenticated: () =>
    set(() => ({
      isAuthenticated: localStorage.getItem('access_token') !== null
    }))
}))

export default useStore
