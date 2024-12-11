import React, { useState } from 'react'

import { Checkbox } from '../ui/checkbox'


import {
  differenceInCalendarDays,
  startOfDay,
  addDays,
  endOfDay,
  getISODay,
  differenceInMinutes,
  startOfISOWeek,
  getISOWeekYear,
  getISOWeek,
  subWeeks,
  addWeeks,
  endOfISOWeek,
  isSameISOWeek,
} from 'date-fns'

import ViewBooking from './viewBooking'
import useModal from '../modal/useModal'

import {
  controls,
  Booking,
  restrictedTimeslot,
  timeIndicators,
  nowMarker,
  bookingCheckbox,
} from '../../scss/bookingCalendar.module.scss'
import { Button } from '../ui/buttons'

const splitDateRangeByDay = (start, end) => {
  const dayCount = differenceInCalendarDays(end, start)
  const array = [[start, end]]
  // When multiple days, split it up.
  for (let i = 1; i <= dayCount; i += 1) {
    const [prevStart, prevEnd] = array[i - 1]
    array[i] = [startOfDay(addDays(prevStart, 1)), prevEnd]
    // update the end of the previous day.
    array[i - 1][1] = endOfDay(prevStart)
  }

  return array
}

// the y axis uses one pixel per six minutes (hence division by 6) this is 10 px per hour.
// const calculateX = date => getISODay(date) * 100
// const calculateY = date => differenceInMinutes(date, startOfDay(date)) / 12

// const calculateHeight = (start, end) => differenceInMinutes(end, start) / 12

const calculateX = date => getISODay(date) * 50
const calculateY = date => differenceInMinutes(date, startOfDay(date)) / 6

const calculateHeight = (start, end) => differenceInMinutes(end, start) / 6


const BookingCalendar = ({ bookings }) => {
  const [openViewBooking] = useModal(ViewBooking)
  const [page, setPage] = useState(startOfISOWeek(new Date())) // TODO: fix new year

  const now = new Date()

  const yearString =
    getISOWeekYear(page) === getISOWeekYear(now)
      ? ''
      : `, ${getISOWeekYear(page)}`

  return (
    <div>
      <div className={controls}>

        <Button
          type="button"
          onClick={() => setPage(oldPage => subWeeks(oldPage, 1))}
        >
          -
        </Button>
        <Button
          type="button"
        >
          {`Vecka ${getISOWeek(page)}${yearString}`}
        </Button>
        <Button
          type="button"
          onClick={() => setPage(oldPage => addWeeks(oldPage, 1))}
        >
          +
        </Button>
      </div>

      <div className={bookingCheckbox}>
        <Checkbox
          text=" Visa endast mina bokningar."
          value="Only Mine"
          click={e => setOnlyMine(e.target.checked)}
        />
      </div>
      <svg
        version="1.1"
        viewBox="0 0 400 600"
        xmlns="http://www.w3.org/2000/svg"
      >
        {bookings &&
          bookings
            // convert dates from string to date types.
            .map(({ start, end, ...booking }) => ({
              ...booking,
              start: new Date(start),
              end: new Date(end),
            }))
            // show only those in this week
            .filter(
              ({ start, end }) =>
                start <= endOfISOWeek(page) && end >= startOfISOWeek(page)
            )
            .sort((a, b) => b.restricted_timeslot - a.restricted_timeslot)
            .map(booking => {
              const dayParts = splitDateRangeByDay(booking.start, booking.end)

              return (
                <g
                  className={`${Booking} ${
                    booking.restricted_timeslot ? restrictedTimeslot : ''
                  }`}
                  key={booking.id}
                >
                  {dayParts
                    // Remove dayParts that are not in the visible week.
                    .filter(([s]) => isSameISOWeek(s, page))
                    .map(([s, e]) => (
                      <rect
                        key={`${booking.id}, ${getISODay(s)}`}
                        x={calculateX(s)}
                        y={calculateY(s)}
                        width="40" // booking slots
                        height={calculateHeight(s, e)}
                        onClick={() =>
                          openViewBooking('Bokningsinformation', {
                            booking,
                          })
                        }
                      />
                    ))}
                </g>
              )
            })}
        <g className={timeIndicators}>
          {[2, 4, 6, 8, 10, 12, 16, 18, 20, 22, 24].map(hour => (
            <g key={hour}>
              <text x="0" y={hour * 20 - 2}>
                {`0${hour}`.slice(-2)}
                :00
              </text>
              <line x1="0" y1={hour * 20} x2="400" y2={hour * 20} />
              <line x1={hour * 25} y1="0" x2={hour * 25} y2="480" />
            </g>
          ))}
        </g>
        {/* If current week show a current time marker. */}
        {isSameISOWeek(now, page) && (
          <line
            x1={calculateX(now)}
            x2={calculateX(now) + 50}
            y1={calculateY(now)}
            y2={calculateY(now)}
            className={nowMarker}
          />
        )}
        <line x1="50" y1="0" x2="50" y2="480" stroke="lightgray" />
      </svg>
    </div>
  )
}

export default BookingCalendar