import React from 'react'

import { itemDescription, bookingButtonContainer } from '../../scss/booking.module.scss'
import { Button } from '../ui/buttons'
import useModal from '../modal/useModal'
import EditBooking from './editBooking'


const BookingColumn = ({ item, createBooking, loadAllBookings }) => {
  const [openModal] = useModal(EditBooking)

  return (
    <div>
      
      <h3>Mina bokningar</h3>
      {item.terms && (
        <p>
          {`Genom att boka ${item.name} godkänner du `}
          <a href={item.terms} target="_blank" rel="noopener noreferrer">
            bokningsavtalet
          </a>
          {'.'}
        </p>
      )}
      <div className={bookingButtonContainer}>
        <Button
          onClick={() =>
            openModal(`Boka ${item.name}`, { item, createBooking })
          }
        >
          {`Boka ${item.name}`}
        </Button>
        <Button onClick={loadAllBookings}>Ladda in äldre bokningar</Button>
      </div>
    </div>
  )
}

export default BookingColumn