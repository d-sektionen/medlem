import React, { useState } from 'react'
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'
import { Button } from '../ui/buttons'

function newNiceDate(hourOffset = 0) {
  const date = new Date()
  date.setHours(
    date.getHours() + 2 + hourOffset + Math.round(date.getMinutes() / 60)
  )
  date.setMinutes(0)

  return date
}

const EditBooking = ({ booking, item, createBooking, updateBooking }) => {
  const newBooking = booking === undefined

  const [description, setDescription] = useState(
    booking ? booking.description : ''
  )
  const [start, setStart] = useState(booking ? booking.start : newNiceDate())
  const [end, setEnd] = useState(booking ? booking.end : newNiceDate(2))

  const saveBooking = () => {
    const request = newBooking
      ? createBooking({
          item_id: item.id,
          description,
          start,
          end,
        })
      : updateBooking(booking.id, {
          item_id: booking.item.id,
          description,
          start,
          end,
        })

    request
      .then(res => {
        console.log(res.data)
      })
      .catch(err => {
        console.log(err.response.data)
      })
  }

  return (
    <>
      <p>Bokning av {item.name}.</p>
      <div>
        <DatePicker
          selectsStart
          selected={start}
          startDate={start}
          endDate={end}
          onChange={date => setStart(date)}
          minDate={new Date()}
          maxDate={end}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="MMMM d, yyyy h:mm aa"
          timeCaption="time"
        />
        <DatePicker
          selectsEnd
          selected={end}
          startDate={start}
          endDate={end}
          onChange={date => setEnd(date)}
          minDate={start}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="MMMM d, yyyy h:mm aa"
          timeCaption="time"
        />
      </div>
      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <Button onClick={saveBooking}>Save</Button>
    </>
  )
}

export default EditBooking
