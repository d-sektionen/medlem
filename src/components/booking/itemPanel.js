import React from 'react'

import { itemDescription, bookingButtonContainer } from '../../scss/booking.module.scss'
import { Button } from '../ui/buttons'
import useModal from '../modal/useModal'
import EditBooking from './editBooking'
import ImageHeader from '../ui/imageHeader'


import BookingPanel from './bookingPanel'

/**
 * Moved the info-text and booking into one components
 * 
 * currently not working
 */

const ItemPanel = ({ item, bookings, createBooking, loadAllBookings }) => {
  const [openModal] = useModal(EditBooking)

  // Functions for bookingPanel
  const update = async (bookingId, data) => {
    const { data: updatedBooking } = await put(
      `/booking/bookings/${bookingId}/`,
      data
    )
    mutate([...bookings.filter(b => b.id !== bookingId), updatedBooking])
    return updatedBooking
  }

  const destroy = async bookingId => {
    await del(`/booking/bookings/${bookingId}/`)
    mutate(bookings.filter(b => b.id !== bookingId))
  }

  const confirm = async bookingId => {
    await put(`/booking/bookings/${bookingId}/confirm/`)
    mutate(
      bookings.map(b => {
        if (bookingId !== b.id) return b
        return { ...b, confirmed: true }
      })
    )
  }

  const deny = async (bookingId, data) => {
    await post(
      `/booking/bookings/${bookingId}/deny/`,
      data
    )
    mutate(
      bookings.filter(b => {
        return bookingId !== b.id
      })
    )
  }

  return (
    <div>
      <ImageHeader
        title={item.name}
        image={item.image_processed ? item.image_processed : null}
        TitleTag="h2"
      />
      <h3>Beskrivning</h3>
      <p className={itemDescription}>{item.description}</p>


      <BookingPanel
            bookings={bookings}
            updateBooking={update}
            destroyBooking={destroy}
            confirmBooking={confirm}
            denyBooking={deny}
          />
      

    </div>
  )
}

export default ItemPanel
