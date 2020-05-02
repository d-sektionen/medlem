import React from 'react'
import useSWR from 'swr'

import style from '../../scss/booking.module.scss'
import { Button } from '../ui/buttons'
import useModal from '../modal/useModal'
import EditBooking from './editBooking'
import BookingCalendar from './bookingCalendar'
import Pattern from '../ui/pattern'
import ImageHeader from '../ui/imageHeader'

const ItemPanel = ({ item, bookings, createBooking }) => {
  const [openModal] = useModal(EditBooking)

  return (
    <div>
      <ImageHeader
        title={item.name}
        image={item.image_processed ? item.image_processed : null}
        TitleTag="h2"
      />
      <h3>Beskrivning</h3>
      <p className={style.itemDescription}>{item.description}</p>
      <h3>Tillgänglighet</h3>
      <BookingCalendar bookings={bookings} />
      <h3>Boka</h3>
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
