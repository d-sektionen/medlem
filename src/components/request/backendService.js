import axios from 'axios'
import { BASE_URL } from '../../config'
import createAuthRefreshInterceptor from 'axios-auth-refresh'

export const ACCESS_TOKEN_KEY = 'access'
export const REFRESH_TOKEN_KEY = 'refresh'

const backendService = axios.create({
  baseURL: `${BASE_URL}`,
  timeout: 10000,
})

const refreshAuthLogic = async (failedRequest) => {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY)

  if (!refreshToken) return Promise.reject()

  const response = await backendService.post('/oauth2/login/refresh', {
    "refresh": refreshToken,
  })
  const newAccessToken = response.data[ACCESS_TOKEN_KEY]
  const newRefreshToken = response.data[REFRESH_TOKEN_KEY]

  //set new access token
  localStorage.setItem(ACCESS_TOKEN_KEY, newAccessToken)
  localStorage.setItem(REFRESH_TOKEN_KEY, newRefreshToken)
  originalRequest.headers.Authorization = `Bearer ${newAccessToken}`

  return Promise.resolve()
}


createAuthRefreshInterceptor(backendService, refreshAuthLogic)

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

export default backendService
