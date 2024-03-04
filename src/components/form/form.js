import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import request, { options } from '../request'
import AutoInput from './input'
import { Button } from '../ui/buttons'

const AutoForm = ({ endpoint, method, customFetcher, onSubmit, defaults }) => {
  const [fields, setFields] = useState()
  const [values, setValues] = useState(defaults)
  const [errors, setErrors] = useState({})

  const setValue = (field, value) => {
    setValues(old => ({ ...old, [field]: value }))
  }

  const setError = (field, error) => {
    setErrors(old => ({ ...old, [field]: error }))
  }

  useEffect(() => {
    // request endpoint info from server
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
    <form
      onSubmit={e => {
        e.preventDefault()
        onSubmit()
        if (customFetcher) {
          customFetcher(values).catch(err => {
            if (err.response) {
              setErrors(err.response.data)
            }
          })
        } else {
          request({ endpoint, method, data: values })
        }
      }}
    >
      {fields &&
        fields.map(field => (
          <React.Fragment key={field.key}>
            <AutoInput
              {...field}
              onChange={newValue => {
                setValue(field.key, newValue)
              }}
              value={values[field.key]}
            />
            {Object.prototype.hasOwnProperty.call(errors, field.key) && (
              <div>{errors[field.key].join(', ')}</div>
            )}
          </React.Fragment>
        ))}
      <Button type="submit" onClick={() => {}}>
        Submit
      </Button>
    </form>
  )
}

AutoForm.defaultProps = {
  method: 'POST',
  customFetcher: null,
  onSubmit: () => {},
  defaults: {},
}

AutoForm.propTypes = {
  method: PropTypes.string,
  endpoint: PropTypes.string.isRequired,
  customFetcher: PropTypes.func,
  onSubmit: PropTypes.func,
  defaults: PropTypes.object,
}

export default AutoForm
