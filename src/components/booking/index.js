import React, { useState } from 'react'

import { GridContainer, GridItem } from '../ui/grid'
import BigPixels from '../layout/bigPixels'
import ItemPanel from './itemPanel'
import BookingPanel from './bookingPanel'
import useRestEndpoint from '../request/useRestEndpoint'

const Booking = () => {
  const [item, setItem] = useState(null)

  const [{ list, create, destroy, update }, bookings] = useRestEndpoint({
    endpoint: `/booking/bookings/`,
  })

  return (
    <BigPixels>
      <GridContainer>
        <GridItem>
          <ItemPanel setItem={setItem} item={item} createBooking={create} />
        </GridItem>
        <GridItem>
          <BookingPanel
            item={item}
            bookings={bookings}
            listBookings={list}
            updateBooking={update}
            destroyBooking={destroy}
          />
        </GridItem>
      </GridContainer>
    </BigPixels>
  )
}

export default Booking
