import React from 'react'

import { itemDescription, bookingButtonContainer } from '../../scss/booking.module.scss'
import { Button } from '../ui/buttons'
import useModal from '../modal/useModal'
import EditBooking from './editBooking'
import ImageHeader from '../ui/imageHeader'

const ItemPanel = ({ item, bookings, createBooking, loadAllBookings }) => {
  const [openModal] = useModal(EditBooking)

  return (
    <div>
      {/* <ImageHeader
        title={item.name}
        image={item.image_processed ? item.image_processed : null}
        TitleTag="h2"
      />
      <h3>Beskrivning</h3>
      <p className={itemDescription}>{item.description}</p> */}
      <h3>Tillgänglighet</h3>
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

export default ItemPanel