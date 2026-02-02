import React from 'react'

import {
  itemDescription,
  bookingButtonContainer,
} from '../../scss/booking.module.scss'
import { Button } from '../ui/buttons'
import useModal from '../modal/useModal'
import EditBooking from './editBooking'
import BookingCalendar from './bookingCalendar'
import ImageHeader from '../ui/imageHeader'

const ItemPoolPanel = ({ pool, bookings, createBooking, loadAllBookings }) => {
  const [openModal] = useModal(EditBooking)

  return (
    <div>
      <ImageHeader
        title={pool.name}
        image={pool.image_processed ? pool.image_processed : null}
        TitleTag="h2"
      />
      {pool.count > 1 && (
        <>
          <h3>Antal</h3>
          <p className={itemDescription}>{pool.count}</p>
        </>
      )}
      <h3>Beskrivning</h3>
      <p className={itemDescription}>{pool.description}</p>
      <h3>Tillgänglighet</h3>
      <BookingCalendar bookings={bookings} />
      <h3>Boka</h3>
      {pool.terms && (
        <p>
          {`Genom att boka ${pool.name} godkänner du `}
          <a href={pool.terms} target="_blank" rel="noopener noreferrer">
            bokningsavtalet
          </a>
          {'.'}
        </p>
      )}
      <div className={bookingButtonContainer}>
        <Button
          onClick={() =>
            openModal(`Boka ${pool.name}`, { itemPool: pool, createBooking })
          }
        >
          {`Boka ${pool.name}`}
        </Button>
        <Button onClick={loadAllBookings}>Ladda in äldre bokningar</Button>
      </div>
    </div>
  )
}

export default ItemPoolPanel
