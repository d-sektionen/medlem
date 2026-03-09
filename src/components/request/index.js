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
  // if config.url is not a full path with the "https://" or "http://"
  // the request is a d-sektionen backend request.
  const isFullUrl = /^https?:\/\//
  if (!isFullUrl.test(config.url)) {
    return backendService({ ...config, headers })
  }

  // Send request using axios library
  return axios({ ...config, headers })
}

// Aliases for the different request methods
export const get = (url, config = {}) =>
  request({ ...config, method: 'get', url })
export const del = (url, config = {}) =>
  request({ ...config, method: 'delete', url })
export const head = (url, config = {}) =>
  request({ ...config, method: 'head', url })
export const options = (url, config = {}) =>
  request({ ...config, method: 'options', url })
export const post = (url, data = {}, config = {}) =>
  request({ ...config, data, method: 'post', url })
export const put = (url, data = {}, config = {}) =>
  request({ ...config, data, method: 'put', url })
export const patch = (url, data = {}, config = {}) =>
  request({ ...config, data, method: 'patch', url })

export default request
