import React, { useState, useEffect } from 'react'
import { options } from '../request'
import Input from './input'

const AutoForm = ({ endpoint }) => {
  const [fields, setFields] = useState()
  useEffect(() => {
    options(endpoint)
      .then(res => {
        const raw = res.data.actions.POST

        // object to array
        const arrayified = Object.keys(raw).map(key => ({
          key,
          ...raw[key],
        }))
        const editable = arrayified.filter(f => !f.read_only)

        setFields(editable)
      })
      .catch(err => {})
  }, endpoint)

  return (
    <form>
      {fields && fields.map(field => <Input {...field} />)}
      {JSON.stringify(fields)}
    </form>
  )
}

export default AutoForm
