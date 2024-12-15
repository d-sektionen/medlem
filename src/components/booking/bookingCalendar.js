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
  arrowButton
} from '../../scss/bookingCalendar.module.scss'
import { Button, IconButton } from '../ui/buttons'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
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

const columnWidth = 50

const calculateX = date => getISODay(date) * columnWidth
const calculateY = date => differenceInMinutes(date, startOfDay(date)) / 3

const calculateHeight = (start, end) => differenceInMinutes(end, start) / 3

const colors = [
  { fill: '#7C2070', border: '#CB34B7' },
  { fill: '#20407C', border: '#3469CB' },
  { fill: '#207C3F', border: '#34CB66' },
  { fill: '#596885', border: '#8593AD' },
  { fill: '#AF7848', border: '#D2B093' }
]



const BookingCalendar = ({ bookings }) => {
  const [openViewBooking] = useModal(ViewBooking)
  const [page, setPage] = useState(startOfISOWeek(new Date())) // TODO: fix new year

  // Handles showing unique colors for each user in the calendar, and that adjacent shifts should be more likely to have different colors.
  const filteredBookings = bookings?.filter(booking => new Date(booking.start) <= endOfISOWeek(page) && new Date(booking.end) >= startOfISOWeek(page))
  const uniqueUsers = [...new Set(filteredBookings?.map(booking => booking.user.id))]
  const getColorForUser = (userId) => {
    const index = uniqueUsers.indexOf(userId) % colors.length
    return colors.at(index)
  }
  
  const now = new Date()

  const yearString =
    getISOWeekYear(page) === getISOWeekYear(now)
      ? ''
      : `, ${getISOWeekYear(page)}`

  return (
    <div>
      <div className={controls}>
        <button className={arrowButton} onClick={() => setPage(oldPage => subWeeks(oldPage, 1))}>
          <FaAngleLeft />
        </button>
        <p>{`Vecka ${getISOWeek(page)}${yearString}`}</p>
        <button className={arrowButton} onClick={() => setPage(oldPage => addWeeks(oldPage, 1))}>
          <FaAngleRight />
        </button>
      </div>

      <svg
        version="1.1"
        viewBox="0 -8 400 500"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g className={timeIndicators}></g>
        <g className={timeIndicators}>
            {[0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22].map(hour => (
            <g key={hour}>
              <text x="0" y={hour * 20 + 4}>
              {`0${hour}`.slice(-2)}
              :00
              </text>
              <line x1="0" y1={hour * 20} x2="400" y2={hour * 20} />
            </g>
            ))}
            {[1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23].map(hour => (
            <line key={hour} x1="0" y1={hour * 20} x2="400" y2={hour * 20} stroke="lightgray" />
            ))}
            <line key="24" x1="0" y1="480" x2="400" y2="480" />
          </g>
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
              const {fill, border} = getColorForUser(booking.user.id)

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
                  <g key={`${booking.id}-${getISODay(s)}`}>
                  <rect
                  x={calculateX(s)}
                  y={calculateY(s)}
                  width={columnWidth - 8} // booking slots
                  height={calculateHeight(s, e)}
                  fill={fill}
                  stroke={border}
                  strokeWidth="1"
                  onClick={() =>
                  openViewBooking('Bokningsinformation', {
                  booking,
                  })
                  }
                  />
                  <foreignObject
                  x={calculateX(s) + 4}
                  y={calculateY(s) + 4}
                  width="36"
                  height={calculateHeight(s, e) - 10}
                  >
                  <div
                  xmlns="http://www.w3.org/1999/xhtml"
                  style={{
                  color: 'white',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'normal',
                  wordWrap: 'break-word',
                  hyphens: 'auto',
                  }}
                  >
                  <p style={{
                  fontSize: '10px',
                  lineHeight: '1.2',
                  marginBottom: '0.1rem'
                  }}>{booking.user.first_name}</p>
                  <p style={{
                  fontSize: '6px',
                  marginTop: '0',
                  marginBottom: '0.25rem',
                  }}>{`${s.getHours()}:${`0${s.getMinutes()}`.slice(-2)} - ${e.getHours()}:${`0${e.getMinutes()}`.slice(-2)}`}</p>
                  <p style={{
                  fontSize: '8px',
                  marginTop: '0',
                  }}>{booking.description.length > 20 ? `${booking.description.slice(0, 20)}...` : booking.description}</p>
                  </div>
                  </foreignObject>
                  </g>
                  ))}
                </g>
                )
            })}
          
          {/* If current week show a current time marker. */}
        {isSameISOWeek(now, page) && (
          <line
            x1={calculateX(now)}
            x2={calculateX(now) + columnWidth}
            y1={calculateY(now)}
            y2={calculateY(now)}
            className={nowMarker}
          />
        )}
        <g className={timeIndicators}>
          {Array.from({ length: 7 }).map((_, i) => (
            <line
              key={i}
              x1={columnWidth * (i+1)}
              x2={columnWidth * (i+1)}
              y1="0"
              y2="488"
            />
          ))}
          <line x1="50" y1="0" x2="50" y2="488" stroke="lightgray"/>
        </g>
      </svg>
      <div className={bookingCheckbox}>
        <Checkbox
          text=" Visa endast mina bokningar."
          value="Only Mine"
          click={e => setOnlyMine(e.target.checked)}
        />
      </div>
    </div>
  )
}

export default BookingCalendar