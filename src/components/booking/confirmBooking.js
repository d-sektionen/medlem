import React, { useState } from 'react'
import { useCloseModal } from '../modal/useModal'
import { Button } from '../ui/buttons'
import { Checkbox } from '../ui/checkbox'

const ConfirmBooking = ({ booking, confirmBooking }) => {
  const close = useCloseModal()
  const {
    user: { pretty_name: user },
    description,
  } = booking

  const items = booking.pool.items
  const accessories = booking.pool.accessories
  const requiresAccessory = booking.pool.requires_accessory

  const [selectedItems, setSelectedItems] = useState([])
  const [selectedAccessories, setSelectedAccessories] = useState([])

  const toggleSelectedItem = (itemId) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId))
    } else {
      const newItems = [...selectedItems, itemId]
      if (newItems.length > booking.count) {
        newItems.shift()
      }
      setSelectedItems(newItems)
    }
  }

  return (
    <>
      <p>Bokad av {user}.</p>
      <i>{description}</i>

      {items.length > 1 && (
        <>
          <h3>Välj {booking.count} objekt</h3>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {items.map((item) => {
              return (
                <label key={item.id}>
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => toggleSelectedItem(item.id)}
                  />

                  {item.name}
                </label>
              )
            })}
          </div>

          {requiresAccessory && (
            <div style={{ marginTop: '0.5em' }}>
              {accessories.map((accessory) => {
                return (
                  <div key={accessory.id}>
                    <Checkbox text={accessory.name} value={accessory.id} />

                    <span>{accessory.name}</span>
                  </div>
                )
              })}
            </div>
          )}
        </>
      )}

      <Button
        onClick={() => {
          confirmBooking(booking.id)
          close()
        }}
      >
        Bekräfta
      </Button>
    </>
  )
}

export default ConfirmBooking
