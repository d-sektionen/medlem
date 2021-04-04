import React, { useState, useContext } from 'react'
import useSWR from 'swr'

import { GridContainer, GridItem } from '../ui/grid'
import BigPixels from '../layout/bigPixels'
import ItemPanel from './itemPanel'
import BookingPanel from './bookingPanel'
import TitleChooser from '../ui/titleChooser'
import { post, put, del } from '../request'
import { UserContext } from '../layout/layout'

const BookingPage = ({ pageContext: { title } }) => {
  const [user] = useContext(UserContext)
  const [item, setItem] = useState(null)
  const { data: items } = useSWR('/booking/items/')

  // TODO: make this fetch a subset of bookings (for example remove very old bookings)
  const { data: bookings, mutate } = useSWR(
    () => item && `/booking/bookings/?item=${item.id}`
  )
  const categorizedItems = items
    ? items.reduce((accumulator, itm) => {
        const cat = itm.category || 'Okategoriserat'
        if (Object.prototype.hasOwnProperty.call(accumulator, cat)) {
          return {
            ...accumulator,
            [cat]: [...accumulator[cat], itm],
          }
        }
        return { ...accumulator, [cat]: [itm] }
      }, {})
    : {}

  const { data: myBookings } = useSWR(
    () => `/booking/bookings/?user=${user.id}`
  )

  const threeDaysAgo = new Date().setDate(new Date().getDate() - 3)
  let activeBookings = []

  if (myBookings) {
    activeBookings = myBookings
      // convert strings to date objects
      .map(b => ({
        ...b,
        start: new Date(b.start),
        end: new Date(b.end),
      }))
      // apply only mine filter
      .filter(b => user.id === b.user.id)
      // only future bookings
      .filter(b => b.start > threeDaysAgo /* && !b.paid */)
      // sort properly
      .sort((a, b) => a.start - b.start)
  }

  const create = async data => {
    const { data: newBooking } = await post('/booking/bookings/', data)
    console.log(newBooking)
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
        {activeBookings.map(booking => (
          <GridItem fullWidth backgroundTest="red">
            {` ${booking.start}`}
          </GridItem>
        ))}

        <GridItem fullWidth>
          <TitleChooser
            title={title}
            choice={item}
            setChoice={setItem}
            categorizedChoices={categorizedItems}
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
