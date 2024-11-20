import React, { useState } from 'react'
import useSWR from 'swr'

import { GridContainer, GridItem } from '../ui/grid'
import BigPixels from '../layout/bigPixels'
import ItemPanel from './itemPanel'
import TitleChooser from '../ui/titleChooser'
import { post, put, del } from '../request'
import { startOfISOWeek, subWeeks } from 'date-fns'

import BookingCalendar from './bookingCalendar'
import CreateBooking from './createBooking'


/*
 * Get the date 4 weeks ago relative to the start of the current week.
 **/
const getDate4WeeksAgo = date => {
  return subWeeks(startOfISOWeek(date), 4).toISOString()
}

const BookingPage = ({ pageContext: { title } }) => {
  const [item, setItem] = useState(null)
  const [afterDate, setAfterDate] = useState(getDate4WeeksAgo(new Date()))
  const { data: items } = useSWR('/booking/items/')

  const { data: bookings, mutate } = useSWR(
    () =>
      item &&
      `/booking/bookings/?item=${item.id}${
        afterDate ? '&after=' + afterDate : ''
      }`
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

  const create = async data => {
    const { data: newBooking } = await post('/booking/bookings/', data)
    mutate([...bookings, newBooking])
    return newBooking
  }


  const loadAllBookings = async () => {
    // Removes the after parameter from the request, thus causing all bookings to load.
    setAfterDate(null)
  }

  return (
    <BigPixels>
      
      <GridContainer>
        <GridItem fullWidth>Bokningar</GridItem>
        {/*
        <GridItem fullWidth>
          <TitleChooser
            title={title}
            choice={item}
            setChoice={setItem}
            categorizedChoices={categorizedItems}
            label="name"
            onChange={() => setAfterDate(getDate4WeeksAgo(new Date()))}
          />
        </GridItem>
          */}
          
        <GridItem>
        <ItemPanel
                item={item}
                bookings={bookings}
                createBooking={create}  
                loadAllBookings={loadAllBookings}
              />

        </GridItem>
        <GridItem>
          <BookingCalendar bookings={bookings} />

        </GridItem>
        {item && bookings && (
          <>
        
            <GridItem>
              
            </GridItem>
          
            
          </>
        )}
      </GridContainer>
    </BigPixels>
  )
}

export default BookingPage
