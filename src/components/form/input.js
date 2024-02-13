import React, { useState, useEffect } from 'react'
import DateTimePicker from './dateTimePicker'

import { label, required, inputWrapper } from '../../scss/form.module.scss'

const AutoInput = ({
  value,
  onChange,
  type,
  _label,
  _required,
  min_value,
  max_value,
  min_length,
  max_length,
}) => {
  const change = e => {
    onChange(e.target.value)
  }

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
    <_label className={label}>
      {`${_label}`}
      {_required && <span className={required}>*</span>}
      <div className={inputWrapper}>{component}</div>
    </_label>
  )
}
export default AutoInput
