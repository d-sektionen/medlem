import React, { useState } from 'react'
import useSWR from 'swr'

import { GridContainer, GridItem } from '../ui/grid'
import BigPixels from '../layout/bigPixels'
import ItemPanel from './itemPanel'
import BookingPanel from './bookingPanel'
import TitleChooser from '../ui/titleChooser'
import { post, put, del } from '../request'

const BookingPage = ({ pageContext: { title } }) => {
  const [item, setItem] = useState(null)
  const { data: items } = useSWR('/booking/items/')

  // TODO: make this fetch a subset of bookings (for example remove very old bookings)
  const { data: bookings, mutate } = useSWR(
    () => item && `/booking/bookings/?item=${item.id}`
  )

  const create = async data => {
    const { data: newBooking } = await post('/booking/bookings/', data)
    mutate([...bookings, newBooking])
    return newBooking
  }

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

  return (
    <BigPixels>
      <GridContainer>
        <GridItem fullWidth>
          <TitleChooser
            title={title}
            choice={item}
            setChoice={setItem}
            choices={items}
            label="name"
          />
        </GridItem>
        {item && bookings && (
          <>
            <GridItem>
              <ItemPanel
                item={item}
                bookings={bookings}
                createBooking={create}
              />
            </GridItem>
            <GridItem>
              <BookingPanel
                bookings={bookings}
                updateBooking={update}
                destroyBooking={destroy}
                confirmBooking={confirm}
              />
            </GridItem>
          </>
        )}
      </GridContainer>
    </BigPixels>
  )
}

export default BookingPage
