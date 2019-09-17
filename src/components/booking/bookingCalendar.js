import React, { useState } from 'react'
import moment from 'moment'
import 'moment/locale/sv'

import { useEndpoint } from '../request'
import ViewBooking from './viewBooking'
import useModal from '../modal/useModal'

import style from '../../scss/bookingCalendar.module.scss'

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

const calculateX = date => date.weekday() * 50 + 50
const calculateY = date => {
  const startOfDay = moment(date).startOf('day')
  return moment.duration(date.diff(startOfDay)).asHours() * 10
}
const calculateHeight = (start, end) =>
  moment.duration(end.diff(start)).asHours() * 10

const BookingCalendar = ({ itemId }) => {
  const [bookings] = useEndpoint({
    endpoint: `/booking/bookings/?item=${itemId}`,
  })
  const [openViewBooking] = useModal(ViewBooking)
  const [week, setWeek] = useState(moment().week()) // TODO: fix new year

  const now = moment()

  return (
    <div>
      <div>
        Vecka {week}
        <button type="button" onClick={() => setWeek(oldWeek => oldWeek - 1)}>
          -
        </button>
        <button type="button" onClick={() => setWeek(moment().week())}>
          nu
        </button>
        <button type="button" onClick={() => setWeek(oldWeek => oldWeek + 1)}>
          +
        </button>
      </div>
      <svg
        version="1.1"
        viewBox="0 0 400 240"
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
                <g className={style.booking} key={booking.id}>
                  {dayParts
                    .filter(([s]) => {
                      const startWeek = moment(s).week()
                      // TODO: fix bookings that belong to multiple weeks.
                      return startWeek === week
                    })
                    .map(([s, e]) => (
                      <rect
                        key={`${booking.id}, ${s.day()}`}
                        x={calculateX(s)}
                        y={calculateY(s)}
                        width="50"
                        height={calculateHeight(s, e)}
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
                </g>
              )
            })}
        <g className={style.timeIndicators}>
          {[6, 12, 18].map(hour => (
            <g key={hour}>
              <text x="0" y={hour * 10 - 2}>
                {`0${hour}`.slice(-2)}
                :00
              </text>
              <line x1="0" y1={hour * 10} x2="400" y2={hour * 10} />
            </g>
          ))}
        </g>
        {now.week() === week && (
          <line
            x1={calculateX(now)}
            x2={calculateX(now) + 50}
            y1={calculateY(now)}
            y2={calculateY(now)}
            className={style.nowMarker}
          />
        )}
        <line x1="50" y1="0" x2="50" y2="240" stroke="lightgray" />
      </svg>
    </div>
  )
}

export default BookingCalendar
