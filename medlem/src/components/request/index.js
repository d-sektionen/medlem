import axios from 'axios'
import { BASE_URL } from '../../config'

/**
 * A wrapper of axios which automatically handles JWT and base url
 * for our needs.
 * @param {*} config axios config
 */

const request = config => {
  // if config.endpoint is not a full path with the "https://" or "http://"
  // prefix the BASE_URL is prepended to the endpoint
  const isFullUrl = /^https?:\/\//
  const url = isFullUrl.test(config.endpoint)
    ? config.endpoint
    : BASE_URL + config.endpoint

  // Add auth token to headers
  const token = window.localStorage.getItem('token')
  const oldHeaders = config.headers ? config.headers : {}
  const headers = { ...oldHeaders, Authorization: `Bearer ${token}` }

  // Send request using axios library
  return axios({ ...config, headers, url })
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
