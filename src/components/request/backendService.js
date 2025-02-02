import axios from 'axios'
import { BASE_URL } from '../../config'

export const ACCESS_TOKEN_KEY = 'access'
export const REFRESH_TOKEN_KEY = 'refresh'

const backendService = axios.create({
  baseURL: `${BASE_URL}`,
  timeout: 10000,
})

// Request interceptor
backendService.interceptors.request.use(
  (config) => {
    // get stored access token
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY)
    if (accessToken) {
      // set in header
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
backendService.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY)

      if (refreshToken) {
        try {
          const response = await backendService.post('/oauth2/refresh', {
            refreshToken,
          })
          const newAccessToken = response.data.get(ACCESS_TOKEN_KEY)
          //set new access token
          localStorage.setItem(ACCESS_TOKEN_KEY, newAccessToken)
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`

          return backendService(originalRequest)
        } catch (error) {
          localStorage.removeItem(ACCESS_TOKEN_KEY)
          localStorage.removeItem(REFRESH_TOKEN_KEY)
        }
      }
    }
    return Promise.reject(error)
  }
)

export default backendService
