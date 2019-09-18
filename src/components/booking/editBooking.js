import React, { useState, useContext } from 'react'

import moment from 'moment'
import 'moment/locale/sv'

import { Button } from '../ui/buttons'
import DateTimePicker from '../form/dateTimePicker'
import { UserContext } from '../layout/layout'

import style from '../../scss/booking.module.scss'
import { useCloseModal } from '../modal/useModal'

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

  const [user] = useContext(UserContext)
  const close = useCloseModal()

  const [description, setDescription] = useState(
    booking ? booking.description : ''
  )
  const [start, setStart] = useState(booking ? booking.start : newNiceDate())
  const [end, setEnd] = useState(booking ? booking.end : newNiceDate(2))

  const [errors, setErrors] = useState({})

  const name = booking ? booking.user.pretty_name : user.pretty_name

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
      .then(() => {
        close()
      })
      .catch(err => {
        setErrors(err.response.data)
        // console.log(err.response.data)
      })
  }

  return (
    <>
      <p>{`Bokning av ${item.name} för ${name}.`}</p>
      <div>
        <div>{errors.start}</div>
        <DateTimePicker value={moment(start)} onChange={setStart} />
        <div>{errors.end}</div>
        <DateTimePicker value={moment(end)} onChange={setEnd} />
      </div>
      <div>
        <div>{errors.description}</div>
        <textarea
          className={style.description}
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </div>
      <div>{errors.non_field_errors}</div>
      <Button onClick={saveBooking}>Save</Button>
    </>
  )
}

export default EditBooking
