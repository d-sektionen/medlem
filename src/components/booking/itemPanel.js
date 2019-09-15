import React, { useState } from 'react'
import { useEndpoint } from '../request'

import style from '../../scss/booking.module.scss'
import { Button } from '../ui/buttons'
import useModal from '../modal/useModal'
import EditBooking from './editBooking'
import BookingCalendar from './bookingCalendar'

const ItemPanel = ({ item, setItem, createBooking }) => {
  const [items] = useEndpoint({ endpoint: '/booking/items/' })
  const [openModal] = useModal(EditBooking)

  return (
    <>
      <select
        className={style.items}
        onChange={e => {
          const selectedValue = e.target.value
          if (selectedValue === '') setItem(null)
          else setItem(items.filter(i => `${i.id}` === selectedValue)[0])
        }}
        value={item ? item.id : ''}
      >
        <option value="">Alla</option>
        {items &&
          items.map(i => (
            <option key={i.id} value={i.id}>
              {i.name}
            </option>
          ))}
      </select>

      {item && (
        <div>
          <p>{item.description}</p>
          <BookingCalendar itemId={item.id} />
        </div>
      )}

      {item ? (
        <Button
          onClick={() =>
            openModal(`Boka ${item.name}`, { item, createBooking })
          }
        >
          Boka {item.name}
        </Button>
      ) : (
        <p>Välj ett objekt för att kunna boka.</p>
      )}
    </>
  )
}

export default ItemPanel
