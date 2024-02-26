import React from 'react'
import { formatDistance } from 'date-fns'
import { sv } from 'date-fns/locale'

const formatDate = date =>
  date.toLocaleDateString('sv-SE', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })

const ViewBooking = ({ booking }) => {
  const {
    item: { name: item },
    user: { pretty_name: user },
    start,
    end,
    description,
    confirmed,
  } = booking

  const bookingInfoText = booking.restricted_timeslot
    ? `Begränsad tidsperiod för bokningar av ${item} utfärdad av ${user}.
    Under en begränsad tidsperiod måste alla bokningar godkännas manuellt.`
    : `Bokning av ${item} för ${user}.`
  return (
    <>
      <p>{bookingInfoText}</p>
      <p>
        {confirmed
          ? 'Bokningen är bekräftad.'
          : 'Bokningen är inte bekräftad ännu.'}
      </p>
      <p>
        {`${formatDate(start)} - ${formatDate(end)}`}
        {` (${formatDistance(end, start, { locale: sv })})`}
      </p>
      <p>{description}</p>
    </>
  )
}

export default ViewBooking
