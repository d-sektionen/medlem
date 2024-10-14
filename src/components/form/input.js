import React, { useState, useEffect, useDeferredValue } from 'react'
import DateTimePicker from './dateTimePicker'

import { Label, Required, inputWrapper } from '../../scss/form.module.scss'

const AutoInput = ({
  value,
  onChange,
  type,
  label,
  required,
  min_value,
  max_value,
  min_length,
  max_length,
}) => {

  const [initialOptions, setInitialOptions] = useState([])

  // Set the initial options based on the first value received
  useEffect(() => {
    if (value) {
      setInitialOptions(value)
    }
  }, []) // Run only once, when the component mounts


  const change = e => {
    onChange(e.target.value)
  }
  
  const optionElementsCollection = initialOptions?.map((item) => (
    <option key={item.id} value={item.id}>
      {item.name}
    </option>
  ))

  const map = {
    datetime: <DateTimePicker value={value} onChange={onChange} />,
    date: <input type="date" value={value} onChange={change} />,
    boolean: (
      <input
        type="checkbox"
        checked={value}
        onChange={e => {
          onChange(e.target.checked)
        }}
      />
    ),
    integer: (
      <input
        type="number"
        value={value}
        onChange={change}
        max={max_value}
        min={min_value}
      />
    ),
    field: (
      <select
        multiple
        value={value}
        onChange={e =>
          onChange(Array.from(e.target.selectedOptions, option => option.value))
        }
      >
        {optionElementsCollection}
      </select>
    )
  }

  const component = Object.prototype.hasOwnProperty.call(map, type) ? (
    map[type]
  ) : (
    <input
      value={value}
      onChange={change}
      maxLength={max_length}
      minLength={min_length}
    />
  )

  return (
    <label className={Label}>
      {`${label}`}
      {required && <span className={Required}>*</span>}
      <div className={inputWrapper}>{component}</div>
    </label>
  )
}
export default AutoInput
