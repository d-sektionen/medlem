import React, { useState, useEffect, useContext } from 'react'
import moment from 'moment'
import 'moment/locale/sv'

import { List, ListItem, ListButton } from '../ui/list'
import { FiTrash2, FiInfo, FiEdit } from 'react-icons/fi'

import EditBooking from './editBooking'
import useModal from '../modal/useModal'
import ViewBooking from './viewBooking'
import { UserContext } from '../layout/layout'

moment.locale('sv')

const BookingPanel = ({
  item,
  bookings,
  listBookings,
  updateBooking,
  destroyBooking,
}) => {
  const [user] = useContext(UserContext)

  const [onlyMine, setOnlyMine] = useState(false)

  const [openEditBooking] = useModal(EditBooking)
  const [openViewBooking] = useModal(ViewBooking)

  useEffect(
    () => {
      listBookings({
        item: item ? item.id : undefined,
        future: true,
        user: onlyMine ? 'me' : undefined,
      })
    },
    [item, onlyMine]
  )

  return (
    <>
      <p>
        <label>
          <input
            type="checkbox"
            onClick={e => {
              setOnlyMine(e.target.checked)
            }}
            value={onlyMine}
          />
          {' Visa endast mina bokningar.'}
        </label>
      </p>
      <List>
        {bookings &&
          bookings
            // convert strings to date objects
            .map(b => ({
              ...b,
              start: new Date(b.start),
              end: new Date(b.end),
            }))
            // sort properly
            .sort((a, b) => a.start - b.start)

            .map(booking => (
              <ListItem
                title={booking.user.pretty_name}
                subtitle={`${item ? '' : `${booking.item.name}, `}${moment(
                  booking.start
                ).calendar()}`}
                buttons={[
                  <ListButton
                    shown={
                      booking.user.username === user.username ||
                      user.privileges.booking_admin
                    }
                    iconComponent={FiTrash2}
                    text="Ta bort bokning"
                    onClick={() => {
                      destroyBooking(booking.id)
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
    </>
  )
}

export default BookingPanel