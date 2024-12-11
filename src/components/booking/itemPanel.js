import React from 'react'

import { itemDescription, bookingButtonContainer } from '../../scss/booking.module.scss'
import { Button } from '../ui/buttons'
import useModal from '../modal/useModal'
import EditBooking from './editBooking'
import BookingCalendar from './bookingCalendar'
import ImageHeader from '../ui/imageHeader'

const ItemPanel = ({ item }) => {
  const [openModal] = useModal(EditBooking)

  return (
    <div>
      <ImageHeader
        title={item.name}
        image={item.image_processed ? item.image_processed : null}
        TitleTag="h2"
      />
      <h3>Beskrivning</h3>
      <p className={itemDescription}>{item.description}</p>

    </div>
  )
}

export default ItemPanel