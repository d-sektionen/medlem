import backendService from './backendService'

/**
 * A wrapper of axios which automatically redirects to login
 * if unauthorized is detected.
 * @param {*} config axios config
 */

// Old request function left as a backward compatability,
// to be removed and replaced by axios services.
const request = (config) => {
  const headers = config.headers ? config.headers : {}
  const endpoint = config.endpoint
  // if config.endpoint is not a full path with the "https://" or "http://"
  // the request is a d-sektionen backend request.
  const isFullUrl = /^https?:\/\//
  if (!isFullUrl.test(endpoint)) {
    return backendService({ ...config, headers, endpoint })
  }

  // Send request using axios library
  return axios({ ...config, headers, endpoint })
}

// Aliases for the different request methods
export const get = (endpoint, config = {}) =>
  request({ ...config, method: 'get', endpoint })
export const del = (endpoint, config = {}) =>
  request({ ...config, method: 'delete', endpoint })
export const head = (endpoint, config = {}) =>
  request({ ...config, method: 'head', endpoint })
export const options = (endpoint, config = {}) =>
  request({ ...config, method: 'options', endpoint })
export const post = (endpoint, data = {}, config = {}) =>
  request({ ...config, data, method: 'post', endpoint })
export const put = (endpoint, data = {}, config = {}) =>
  request({ ...config, data, method: 'put', endpoint })
export const patch = (endpoint, data = {}, config = {}) =>
  request({ ...config, data, method: 'patch', endpoint })

export default request
