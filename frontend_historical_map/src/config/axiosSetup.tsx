import axios from 'axios'

import { DEV_BASE_URL } from '../components/models/constants/urls'
import { refreshToken } from '../components/utils/hooks/generalHooks'
import useStore from './globalStore'

const apiClient = axios.create({
  baseURL: DEV_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

apiClient.interceptors.request.use(
  (config) => {
    const { accessToken } = useStore.getState()
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    const { accessToken } = useStore()

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      await refreshToken()
      originalRequest.headers['Authorization'] = `Bearer ${accessToken}`
      return await axios(originalRequest)
    }

    return Promise.reject(error)
  }
)

export default apiClient
