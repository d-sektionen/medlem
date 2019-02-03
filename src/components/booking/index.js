import React, { Component } from 'react'
import { Get } from '../request/'

import style from '../../scss/booking.module.scss'
import BookingInstance from './bookingInstance'

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

class Booking extends Component {
  constructor(props) {
    super(props)
    this.state = {
      item: '',
      onlyMine: false,
    }
  }
  render() {
    const { setLoading } = this.props
    const { item, onlyMine } = this.state

    return (
      <div className={style.root}>
        <Get endpoint="/booking/items/">
          {items => (
            <>
              <select
                className={style.items}
                onChange={e => {
                  this.setState({ item: e.target.value })
                }}
                value={item}
              >
                <option value="">Alla</option>
                {items.map(i => (
                  <option key={i.id} value={i.id}>
                    {i.name}
                  </option>
                ))}
              </select>
            </>
          )}
        </Get>
        <p>
          <label>
            <input
              type="checkbox"
              onClick={e => {
                this.setState({ onlyMine: e.target.checked })
              }}
              value={onlyMine}
            />{' '}
            Visa endast mina bokningar.
          </label>
        </p>
        <Get
          endpoint={`/booking/bookings/?item=${item}&future${
            onlyMine ? '&user=me' : ''
          }`}
        >
          {bookings => (
            <ul className={style.bookings}>
              {bookings
                .map(b => ({
                  ...b,
                  start: new Date(b.start),
                  end: new Date(b.end),
                }))
                .sort((a, b) => a.start - b.start)
                .map(booking => (
                  <BookingInstance
                    booking={booking}
                    showItem={item === ''}
                    key={booking.id}
                  />
                ))}
            </ul>
          )}
        </Get>
      </div>
    )
  }
}

export default Booking
