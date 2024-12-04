import { HttpStatusCode } from 'axios'

import { AUTH_CHECK_ENDPOINT } from '../components/models/constants/urls'
import apiClient from './axiosSetup'

const checkAuth = async () => {
  try {
    const response = await apiClient.get(AUTH_CHECK_ENDPOINT)
    return response.status === HttpStatusCode.Ok
  } catch (error) {
    return false
  }
}

const initialiseAuth = async (
  setIsAuthenticated: (authState: boolean) => void,
  setIsLoading: (loading: boolean) => void
) => {
  try {
    const isAuthenticated = await checkAuth()
    setIsAuthenticated(isAuthenticated)
  } catch (error) {
    setIsAuthenticated(false)
    setIsLoading(false)
  } finally {
    setIsLoading(false)
  }
}

export { checkAuth, initialiseAuth }
