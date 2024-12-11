import React, { useState, useEffect, useContext, Fragment } from 'react'
import { formatRelative } from 'date-fns'
import { sv } from 'date-fns/locale'

import { FiTrash2, FiInfo, FiEdit, FiCheck, FiXCircle } from 'react-icons/fi'

import { List, ListItem, ListButton } from '../ui/list'

import EditBooking from './editBooking'
import useModal from '../modal/useModal'
import ViewBooking from './viewBooking'
import DenyBooking from './denyBooking'
import { UserContext } from '../layout/layout'
import useConfirmModal from '../modal/useConfirmModal'


const BookingPanel = ({
  bookings: unfilteredBookings,
  updateBooking,
  destroyBooking,
  confirmBooking,
  denyBooking,
}) => {
  const [user] = useContext(UserContext)
  const [onlyMine, setOnlyMine] = useState(false)

  const [openEditBooking] = useModal(EditBooking)
  const [openViewBooking] = useModal(ViewBooking)
  const [openConfirmation] = useConfirmModal()
  const [openDenyBooking] = useModal(DenyBooking)

  const bookingList = unfilteredBookings
    // convert strings to date objects
    .map(b => ({
      ...b,
      start: new Date(b.start),
      end: new Date(b.end),
    }))
    // apply only mine filter
    .filter(b => {
      if (onlyMine) return user.id === b.user.id
      return true
    })
    // only future bookings
    .filter(b => b.end > new Date())
    // sort properly
    .sort((a, b) => a.start - b.start)

  const normalBookings = bookingList.filter(b => !b.restricted_timeslot)
  const restrictedTimeslots = bookingList.filter(b => b.restricted_timeslot)

  const partitions = [
   // { name: 'Begränsade tidsperioder', bookings: restrictedTimeslots },
    { name: 'Bokningar', bookings: normalBookings },
  ]

  return (
    <>
      {partitions.map(({ name, bookings }) => (
        <Fragment key={name}>
          <h3>{name}</h3>
          <List>
            {bookings &&
              bookings.map(booking => (
                <ListItem
                  // TODO: färger ska vara samma som i css!
                  color={booking.confirmed ? 'green' : 'orange'}
                  title={`${booking.user.pretty_name}`}
                  subtitle={`${
                    booking.confirmed ? '' : 'Obekräftad bokning - '
                  }${formatRelative(booking.start, new Date(), {
                    locale: sv,
                  })}`}
                  buttons={[
                    <ListButton
                      shown={
                        !booking.confirmed &&
                        // TODO: allow confirm if user has a restricted booking which overlaps.
                        user.privileges.booking_admin
                      }
                      iconComponent={FiCheck}
                      text="Bekräfta bokning"
                      onClick={() => {
                        confirmBooking(booking.id)
                      }}
                      key="confirm"
                    />,
                    <ListButton
                      shown={
                        user.privileges.booking_admin
                      }
                      iconComponent={FiXCircle}
                      text="Neka bokning"
                      onClick={() => {
                        openDenyBooking(
                          'Neka bokning',
                          { booking, denyBooking }
                        )
                      }}
                      key="deny"
                    />,
                    <ListButton
                      shown={
                        booking.user.username === user.username ||
                        user.privileges.booking_admin
                      }
                      iconComponent={FiTrash2}
                      text="Ta bort bokning"
                      onClick={() => {
                        openConfirmation(
                          'Är du säker på att du vill ta bort bokningen?',
                          () => destroyBooking(booking.id)
                        )
                      }}
                      key="delete"
                    />,
                    <ListButton
                      shown={
                        booking.user.username === user.username ||
                        user.privileges.booking_admin
                      }
                      iconComponent={FiEdit}
                      text="Redigera"
                      onClick={() => {
                        openEditBooking(
                          `Redigera bokning av ${booking.item.name}`,
                          { booking, item: booking.item, updateBooking }
                        )
                      }}
                      key="edit"
                    />,
                    <ListButton
                      iconComponent={FiInfo}
                      text="Mer information"
                      onClick={() => {
                        openViewBooking('Bokningsinformation', { booking })
                      }}
                      key="info"
                    />,
                  ]}
                  key={booking.id}
                />
              ))}
          </List>
        </Fragment>
      ))}

    </>
  )
}

export default BookingPanel
