import React from 'react'
import { formatDistance } from 'date-fns'
import { sv } from 'date-fns/locale'

const formatDate = (date) =>
  date.toLocaleDateString('sv-SE', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })

const ViewBooking = ({ booking }) => {
  const {
    pool,
    items,
    accessories,
    user: { pretty_name: user },
    start,
    end,
    description,
    confirmed,
  } = booking

  const bookingInfoText = booking.restricted_timeslot
    ? `Begränsad tidsperiod för bokningar av ${pool.name} utfärdad av ${user}.
    Under en begränsad tidsperiod måste alla bokningar godkännas manuellt.`
    : `Bokning av ${pool.name} för ${user}.`
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
      {pool.count > 1 && (
        <>
          <p>Bokade objekt:</p>
          <ul>
            {items.map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
          <ul>
            {accessories.map((accessory) => (
              <li key={accessory.id}>{accessory.name}</li>
            ))}
          </ul>
        </>
      )}
      <p>{description}</p>
    </>
  )
}

export default ViewBooking
