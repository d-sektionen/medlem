import React from 'react'
import useSWR from 'swr'

import style from '../../scss/booking.module.scss'
import { Button } from '../ui/buttons'
import useModal from '../modal/useModal'
import EditBooking from './editBooking'
import BookingCalendar from './bookingCalendar'

const ItemPanel = ({ item, bookings, createBooking }) => {
  const [openModal] = useModal(EditBooking)

  return (
    <div>
      <h2>Beskrivning</h2>
      <p className={style.itemDescription}>{item.description}</p>
      <h2>Tillgänglighet</h2>
      <BookingCalendar bookings={bookings} />
      <h2>Boka</h2>
      {item.terms && (
        <p>
          {`Genom att boka ${item.name} godkänner du `}
          <a href={item.terms} target="_blank" rel="noopener noreferrer">
            bokningsavtalet
          </a>
          {'.'}
        </p>
      )}
      <Button
        onClick={() => openModal(`Boka ${item.name}`, { item, createBooking })}
      >
        {`Boka ${item.name}`}
      </Button>
    </div>
  )
}

export default ItemPanel
