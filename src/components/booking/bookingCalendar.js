import React, { useState } from 'react'
import moment from 'moment'
import 'moment/locale/sv'

import { useEndpoint } from '../request'
import ViewBooking from './viewBooking'
import useModal from '../modal/useModal'

const getDateRangeDayCount = (start, end) => {
  const startOfStartDay = moment(start).startOf('day')
  const startDayOffset = moment.duration(start.diff(startOfStartDay))
  const rangeDuration = moment.duration(end.diff(start))
  return startDayOffset.add(rangeDuration).days()
}
const splitDateRangeByDay = (start, end) => {
  const dayCount = getDateRangeDayCount(start, end)
  const array = [[start, end]]
  for (let i = 1; i <= dayCount; i += 1) {
    array[i] = [
      moment(array[i - 1][0])
        .add(1, 'd')
        .startOf('day'),
      array[i - 1][1],
    ]
    array[i - 1][1] = moment(array[i - 1][0]).endOf('day')
  }

  return array
}

const calculateX = date => date.weekday() * 50
const calculateY = date => {
  return date.hour() * 10
}
const calculateHeight = (start, end) => {
  return end.diff(start, 'hours') * 10
}

const BookingCalendar = ({ itemId }) => {
  const [bookings] = useEndpoint({
    endpoint: `/booking/bookings/?item=${itemId}`,
  })
  const [openViewBooking] = useModal(ViewBooking)
  const [week, setWeek] = useState(moment().week())

  return (
    <div>
      <div>
        Vecka {week}
        <button type="button" onClick={() => setWeek(oldWeek => oldWeek - 1)}>
          -
        </button>
        <button type="button" onClick={() => setWeek(oldWeek => oldWeek + 1)}>
          +
        </button>
      </div>
      <svg
        version="1.1"
        viewBox="0 0 350 240"
        xmlns="http://www.w3.org/2000/svg"
      >
        {bookings &&
          bookings
            .filter(({ start, end }) => {
              const startWeek = moment(start).week()
              const endWeek = moment(end).week()
              return startWeek === week || endWeek === week
            })
            .map(booking => {
              const start = moment(booking.start)
              const end = moment(booking.end)

              const dayParts = splitDateRangeByDay(start, end)

              return (
                <>
                  {dayParts.map(([s, e]) => (
                    <rect
                      x={calculateX(s)}
                      y={calculateY(s)}
                      width="50"
                      height={calculateHeight(s, e)}
                      fill="tomato"
                      stroke="white"
                      onClick={() =>
                        openViewBooking('Bokningsinformation', {
                          booking: {
                            ...booking,
                            start: new Date(booking.start),
                            end: new Date(booking.end),
                          },
                        })
                      }
                    />
                  ))}
                </>
              )
            })}
        <line x1="0" y1="120" x2="350" y2="120" stroke="lightgray" />
      </svg>
    </div>
  )
}

export default BookingCalendar
