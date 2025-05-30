import React, { useState } from 'react'
import {
  setYear,
  setMonth,
  setDate,
  setMinutes,
  setHours,
  format,
} from 'date-fns'

const DateTimePicker = ({ value, onChange, required=false }) => {
  return (
    <div>
      <input
        type="date"
        required={required}
        value={value ? format(value, 'yyyy-MM-dd') : ''}
        onChange={e => {
          const timeString = e.target.value
          const year = parseInt(timeString.slice(0, 4), 10)
          const month = parseInt(timeString.slice(5, 7), 10)
          const date = parseInt(timeString.slice(8, 10), 10)
          if (date && month && year) {
            const newValue = setYear(
              setMonth(setDate(value, date), month - 1),
              year
            )
            onChange(newValue)
          }
        }}
      />
      <input
        type="time"
        required={required}
        value={value ? format(value, 'HH:mm') : ''}
        onChange={e => {
          const timeString = e.target.value
          const hour = parseInt(timeString.slice(0, 2), 10)
          const minute = parseInt(timeString.slice(3, 5), 10)
          if (!Number.isNaN(hour) && !Number.isNaN(minute)) {
            const newValue = setHours(setMinutes(value, minute), hour)
            onChange(newValue)
          }
        }}
      />
    </div>
  )
}

export default DateTimePicker
