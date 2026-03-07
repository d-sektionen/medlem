import axios from 'axios'
import { BASE_URL } from '../../config'
import createAuthRefreshInterceptor from 'axios-auth-refresh'

export const ACCESS_TOKEN_KEY = 'access'
export const REFRESH_TOKEN_KEY = 'refresh'

const backendService = axios.create({
  baseURL: `${BASE_URL}`,
  timeout: 10000,
  withCredentials: true,
})

async function refreshAuth(failedRequest) {
  try {
    await backendService.post('/oauth2/login/refresh')
  } catch (err) {
    throw failedRequest
  }
}

createAuthRefreshInterceptor(backendService, refreshAuth, {
  pauseInstanceWhileRefreshing: true,
})

export default backendService
