import React, { useState, useEffect } from 'react'
import DateTimePicker from './dateTimePicker'

import style from '../../scss/form.module.scss'

const Input = ({
  type,
  label,
  required,
  min_value,
  max_value,
  min_length,
  max_length,
}) => {
  const map = {
    datetime: <DateTimePicker />,
    date: <input type="date" />,
    boolean: <input type="checkbox" />,
    integer: <input type="number" max={max_value} min={min_value} />,
  }

  const component = Object.prototype.hasOwnProperty.call(map, type) ? (
    map[type]
  ) : (
    <input maxLength={max_length} minLength={min_length} />
  )

  return (
    <label className={style.label}>
      {`${label}`}
      {required && <span className={style.required}>*</span>}
      <div className={style.inputWrapper}>{component}</div>
    </label>
  )
}
export default Input
