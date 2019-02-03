import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import { FiChevronDown } from 'react-icons/fi'
import moment from 'moment'
import 'moment/locale/sv'

import 'react-datepicker/dist/react-datepicker.css'
import style from '../../scss/booking.module.scss'
import { put } from '../request/'

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

class BookingInstance extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      editing: false,
      description: props.booking.description,
      start: props.booking.start,
      end: props.booking.end,
    }
  }

  saveBooking = () => {
    const { booking } = this.props
    const { description, start, end } = this.state
    put(`/booking/bookings/${booking.id}/`, {
      item_id: booking.item_id,
      description,
      start,
      end,
    })
      .then(res => {
        console.log(res.data)
      })
      .catch(err => {
        console.log(err.response.data)
      })
  }

  render() {
    const { booking, showItem } = this.props
    const { open, editing, description, start, end } = this.state

    return (
      <li>
        <div
          className={style.bookingHeader}
          onClick={() => {
            this.setState(prev => ({ open: !prev.open }))
          }}
        >
          <strong>{getDisplayName(booking.user)}</strong>
          {showItem && `, ${booking.item.name}`}
          {`, ${moment(start).fromNow()}`}
          <FiChevronDown className={open ? style.flip : undefined} />
        </div>
        {open && (
          <>
            <div className={style.bookingBody}>
              <div>
                {editing ? (
                  <>
                    <DatePicker
                      className={style.datePicker}
                      selectsStart
                      selected={start}
                      startDate={start}
                      endDate={end}
                      onChange={date => {
                        this.setState({ start: date })
                      }}
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
                      onChange={date => {
                        this.setState({ end: date })
                      }}
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
                    onChange={e => {
                      this.setState({ description: e.target.value })
                    }}
                  />
                ) : (
                  description
                )}
              </p>
            </div>
            <div className={style.bookingButtons}>
              {!editing && (
                <button onClick={() => this.setState({ editing: true })}>
                  Edit
                </button>
              )}
              {!editing && <button>Delete</button>}
              {editing && (
                <button onClick={() => this.setState({ editing: false })}>
                  Cancel
                </button>
              )}
              {editing && <button onClick={this.saveBooking}>Save</button>}
            </div>
          </>
        )}
      </li>
    )
  }
}

export default BookingInstance
