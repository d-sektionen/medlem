import React from 'react'
import moment from 'moment'
import 'moment/locale/sv'

moment.locale('sv')

const formatDate = date =>
  date.toLocaleDateString('sv-SE', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })

const ViewBooking = ({ booking }) => (
  <>
    <p>
      Bokning av {booking.item.name} för {booking.user.pretty_name}.
    </p>
    <p>
      {moment(booking.start).to(booking.end, true)}
      {', '}
      {`${formatDate(booking.start)} - ${formatDate(booking.end)}`}
    </p>
    <p>{booking.description}</p>
  </>
)

export default ViewBooking
