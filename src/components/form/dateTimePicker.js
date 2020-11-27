import React, { useState } from 'react'
import { setYear, setMonth, setDate, setMinutes, setHours } from 'date-fns'

const DateTimePicker = ({ value, onChange }) => {
  return (
    <div>
      <input
        type="date"
        value={value ? value.format('YYYY-MM-DD') : ''}
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
        value={value ? value.format('HH:mm') : ''}
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
