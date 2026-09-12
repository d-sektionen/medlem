import axios from "axios";
import createAuthRefreshInterceptorModule from "axios-auth-refresh";
import { BASE_URL } from "../../config";

// axios-auth-refresh ships a CommonJS/UMD build. Depending on the bundler's
// CJS<->ESM interop, the default import is either the interceptor function
// itself or the module object ({ default: fn }). Normalize it so both cases
// work (under Vite/rolldown it is currently the module object).
const createAuthRefreshInterceptor =
  typeof createAuthRefreshInterceptorModule === "function"
    ? createAuthRefreshInterceptorModule
    : createAuthRefreshInterceptorModule.default;

const backendService = axios.create({
  baseURL: `${BASE_URL}`,
  timeout: 10000,
  withCredentials: true,
});

async function refreshAuth(failedRequest) {
  try {
    await backendService.post("/oauth2/login/refresh");
  } catch (err) {
    throw err;
  }
}

createAuthRefreshInterceptor(backendService, refreshAuth, {
  pauseInstanceWhileRefreshing: true,
});

export default backendService;
