import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import { FiChevronDown } from 'react-icons/fi'
import moment from 'moment'
import 'moment/locale/sv'

import 'react-datepicker/dist/react-datepicker.css'
import style from '../../scss/booking.module.scss'
import { put, del, Get, post } from '../request/'

moment.locale('sv')

const getDisplayName = user => {
  const fullName = [user.first_name, user.last_name].join(' ')
  return fullName === ' ' ? user.username : fullName
}

const formatDate = date =>
  date.toLocaleDateString('sv-SE', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })

const BookingInstance = ({ booking, showItem, item }) => {
  const newBooking = booking == undefined

  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState(newBooking)
  const [description, setDescription] = useState(
    booking ? booking.description : ''
  )
  const [start, setStart] = useState(booking ? booking.start : new Date())
  const [end, setEnd] = useState(booking ? booking.end : new Date())

  const saveBooking = () => {
    const request = newBooking
      ? post('/booking/bookings/', {
          item: item.id,
          description,
          start,
          end,
        })
      : put(`/booking/bookings/${booking.id}/`, {
          item: booking.item,
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
  const deleteBooking = () => {
    //if (confirm('Är du säker på att du vill ta bort den?'))
    del(`/booking/bookings/${booking.id}/`)
      .then(res => {
        console.log(res.data)
      })
      .catch(err => {
        console.log(err.response.data)
      })
  }

  return (
    <li>
      <div className={style.bookingHeader} onClick={() => setOpen(!open)}>
        {newBooking ? (
          'Ny bokning'
        ) : (
          <>
            <strong>{getDisplayName(booking.user)}</strong>
            {showItem && `, ${booking.item_obj.name}`}
            {`, ${moment(start).fromNow()}`}
          </>
        )}

        <FiChevronDown className={open ? style.flip : undefined} />
      </div>
      {open && (
        <>
          <div className={style.bookingBody}>
            {newBooking && editing && (
              <p>
                {item
                  ? `Bokning av ${item.name}.`
                  : 'Välj vad som ska bokas i menyn ovan.'}
              </p>
            )}
            <div>
              {editing ? (
                <>
                  <DatePicker
                    className={style.datePicker}
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
                    className={style.datePicker}
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
                </>
              ) : (
                `${formatDate(start)} - ${formatDate(end)}`
              )}
            </div>
            <p>
              {editing ? (
                <textarea
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
              ) : (
                description
              )}
            </p>
          </div>
          <div className={style.bookingButtons}>
            {!editing && <button onClick={() => setEditing(true)}>Edit</button>}
            {!editing && <button onClick={deleteBooking}>Delete</button>}
            {editing && (
              <button
                onClick={() =>
                  newBooking ? setOpen(false) : setEditing(false)
                }
              >
                Cancel
              </button>
            )}
            {editing && <button onClick={saveBooking}>Save</button>}
          </div>
        </>
      )}
    </li>
  )
}

export default BookingInstance
