import React, { Component } from 'react'
import { Get } from '../request'

import style from '../../scss/booking.module.scss'
import BookingInstance from './bookingInstance'

class Booking extends Component {
  constructor(props) {
    super(props)
    this.state = {
      item: '',
      onlyMine: false,
    }
  }

  render() {
    const { item, onlyMine } = this.state

    return (
      <div className={style.root}>
        <Get endpoint="/booking/items/">
          {items => (
            <>
              <select
                className={style.items}
                onChange={e => {
                  this.setState({
                    item: items.filter(i => i.id == e.target.value)[0],
                  })
                }}
                value={item ? item.id : ''}
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
            />
            {' Visa endast mina bokningar.'}
          </label>
        </p>
        <Get
          endpoint={`/booking/bookings/?item=${item ? item.id : ''}&future${
            onlyMine ? '&user=me' : ''
          }`}
        >
          {bookings => (
            <ul className={style.bookings}>
              <BookingInstance item={item} />
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
                    showItem={item === undefined}
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
