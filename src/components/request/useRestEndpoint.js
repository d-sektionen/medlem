import { useContext, useState, useEffect } from 'react'

import { LoadingContext } from '../layout'
import request from '.'

const objHasProperty = (...args) =>
  Object.prototype.hasOwnProperty.call(...args)

const appendPK = (config, pk) => {
  let rv = { ...config }

  ;['endpoint', 'url'].forEach(key => {
    if (objHasProperty(rv, key)) rv = { ...rv, [key]: `${rv[key]}${pk}/` }
  })

  return rv
}

export default config => {
  const setLoading = useContext(LoadingContext)[1]
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  const list = (params = {}) => {
    setLoading(true)
    return request({
      ...config,
      params: {
        ...(objHasProperty(config, 'params') ? config.params : {}),
        ...params,
      },
      method: 'get',
    })
      .then(res => {
        setError(null)
        setData(res.data)
        setLoading(false)
        return Promise.resolve(res)
      })
      .catch(err => {
        setData(null)
        setError(err)
        setLoading(false)
        return Promise.reject(err)
      })
  }

  const create = (body = {}) => {
    setLoading(true)
    return request({ ...config, data: body, method: 'post' })
      .then(res => {
        setError(null)
        setData(prevData => [...prevData, res.data])
        setLoading(false)
        return Promise.resolve(res)
      })
      .catch(err => {
        setData(null)
        setError(err)
        setLoading(false)
        return Promise.reject(err)
      })
  }

  const update = (pk, body = {}) => {
    setLoading(true)
    return request({ ...appendPK(config, pk), data: body, method: 'put' })
      .then(res => {
        setError(null)
        setData(prevData => [
          ...prevData.filter(obj => obj.id !== pk),
          res.data,
        ])
        setLoading(false)
        return Promise.resolve(res)
      })
      .catch(err => {
        setData(null)
        setError(err)
        setLoading(false)
        return Promise.reject(err)
      })
  }

  const retrieve = (pk, params = {}) => {
    setLoading(true)
    return request({
      ...appendPK(config, pk),
      params: {
        ...(objHasProperty(config, 'params') ? config.params : {}),
        ...params,
      },
      method: 'get',
    })
      .then(res => {
        setError(null)
        setData(prevData => [
          ...prevData.filter(obj => obj.id !== pk),
          res.data,
        ])
        setLoading(false)
        return Promise.resolve(res)
      })
      .catch(err => {
        setData(null)
        setError(err)
        setLoading(false)
        return Promise.reject(err)
      })
  }

  const destroy = (pk, body = {}) => {
    setLoading(true)

    return request({ ...appendPK(config, pk), data: body, method: 'delete' })
      .then(res => {
        setError(null)
        setData(prevData => prevData.filter(obj => obj.id !== pk))
        setLoading(false)
        return Promise.resolve(res)
      })
      .catch(err => {
        setData(null)
        setError(err)
        setLoading(false)
        return Promise.reject(err)
      })
  }

  return [{ list, retrieve, update, create, destroy }, data, error]
}
