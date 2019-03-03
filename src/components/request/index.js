import React, { Component } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import { BASE_URL } from '../../js/config'
import { LoadingContext } from '../layout'

/**
 * A wrapper of axios which automatically handles JWT and base url
 * for our needs.
 * @param {*} config axios config
 */

const request = config => {
  const url = config.endpoint ? BASE_URL + config.endpoint : config.url

  const token = Cookies.get('token')
  const oldHeaders = config.headers ? config.headers : {}
  const headers = { ...oldHeaders, Authorization: 'JWT ' + token }

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

/**
 * A nice helper component for making get requests to internal endpoints.
 * Will automatically set the layout to the loading state using LoadingContext.
 */
class Get extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: null,
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.endpoint !== prevProps.endpoint ||
      this.props.url !== prevProps.url
    ) {
      this.fetchData(this.props)
    }
  }

  componentDidMount() {
    this.fetchData(this.props)
  }

  fetchData = ({ endpoint, url, onError, setLoading }) => {
    const config = endpoint ? { endpoint } : { url }
    request({ ...config, method: 'get' })
      .then(res => {
        setLoading(false)
        this.setState({ data: res.data })
      })
      .catch(error => {
        onError(error)
        setLoading(false)
      })
    setLoading(true)
  }

  render() {
    const { children, placeholder } = this.props
    const { data } = this.state

    const whileLoading = placeholder ? placeholder : null

    return data ? children(data) : whileLoading
  }
}
// Something stopped working with static contextType approach so I made this.
const GetWrapper = props => (
  <LoadingContext.Consumer>
    {loading => <Get {...props} setLoading={loading.set} />}
  </LoadingContext.Consumer>
)

export { GetWrapper as Get }

export default request
