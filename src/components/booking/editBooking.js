import React, { useState, useContext } from 'react'

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

  const [restrictedTimeslot, setRestrictedTimeslot] = useState(
    booking ? booking.restricted_timeslot : false
  )

  const [errors, setErrors] = useState({})

  const name = booking ? booking.user.pretty_name : user.pretty_name

  const saveBooking = () => {
    const request = newBooking
      ? createBooking({
          item_id: item.id,
          description,
          start,
          end,
          restricted_timeslot: restrictedTimeslot,
        })
      : updateBooking(booking.id, {
          item_id: booking.item.id,
          description,
          start,
          end,
          restricted_timeslot: restrictedTimeslot,
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
      <div className={style.editForm}>
        <h3>Startdatum</h3>
        <div>{errors.start}</div>
        <DateTimePicker value={start} onChange={setStart} />

        <h3>Slutdatum</h3>
        <div>{errors.end}</div>
        <DateTimePicker value={end} onChange={setEnd} />

        <h3>Ändamål</h3>
        <div>{errors.description}</div>

        <textarea
          className={style.description}
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <h3>
          {'Begränsad tidsperiod '}
          <input
            type="checkbox"
            checked={restrictedTimeslot}
            onChange={e => setRestrictedTimeslot(e.target.checked)}
          />
        </h3>
        <p>
          En begränsad tidsperiod låter dig skapa en tidsperiod där du har
          prioritet att skapa bokningar. En begränsad tidsperiod måste bekräftas
          av en administratör.
        </p>
        <div>{errors.restricted_timeslot}</div>
      </div>
      <p>{errors.non_field_errors}</p>
      <Button onClick={saveBooking}>Save</Button>
    </>
  )
}

export default EditBooking
