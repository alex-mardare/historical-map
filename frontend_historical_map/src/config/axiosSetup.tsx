import axios from 'axios'

import {
  AUTH_CHECK_ENDPOINT,
  DEV_BASE_URL,
  LOGIN_ENDPOINT
} from '../components/models/constants/urls'
import { checkAuth } from './auth'

const apiClient = axios.create({
  baseURL: DEV_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
})

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (originalRequest.url.includes(AUTH_CHECK_ENDPOINT)) {
      return Promise.reject(error)
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      const isAuthenticated = await checkAuth()

      if (!isAuthenticated) {
        window.location.href = LOGIN_ENDPOINT
        return Promise.reject(error)
      }

      return apiClient(originalRequest)
    }
  }
)

export default apiClient
