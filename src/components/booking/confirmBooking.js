import React, { useState } from 'react'
import { useCloseModal } from '../modal/useModal'
import { Button } from '../ui/buttons'
import { Checklist } from '../ui/checklist'
import { confirmBookingChecklists } from '../../scss/booking.module.scss'

const ConfirmBooking = ({ booking, confirmBooking }) => {
  const close = useCloseModal()
  const {
    user: { pretty_name: user },
    description,
  } = booking

  const items = booking.pool.items
  const accessories = booking.pool.accessories
  const requiresAccessory = booking.pool.requires_accessory

  const isSingleItem = items.length === 1 && !requiresAccessory

  const [selectedItems, setSelectedItems] = useState([])
  const [selectedAccessories, setSelectedAccessories] = useState([])

  const buttonDisabled =
    !isSingleItem &&
    (selectedItems.length !== booking.count ||
      (requiresAccessory && selectedAccessories.length !== booking.count))

  return (
    <>
      <p>Bokad av {user}.</p>
      <i>{description}</i>

      {!isSingleItem && (
        <>
          <h3>
            Välj {booking.count} objekt {requiresAccessory && 'och tillbehör'}
          </h3>

          <div className={confirmBookingChecklists}>
            <Checklist
              items={items.map((item) => ({
                ...item,
                name: item.status ? `${item.name} (${item.status})` : item.name,
              }))}
              selected={selectedItems}
              setSelected={setSelectedItems}
              maxSelected={booking.count}
            />

            {requiresAccessory && (
              <Checklist
                items={accessories}
                selected={selectedAccessories}
                setSelected={setSelectedAccessories}
                maxSelected={booking.count}
              />
            )}
          </div>
        </>
      )}

      <Button
        disabled={buttonDisabled}
        onClick={() => {
          const data = {
            items: isSingleItem ? [items[0].id] : selectedItems,
            accessories: requiresAccessory ? selectedAccessories : [],
          }

          confirmBooking(booking.id, data)
          close()
        }}
      >
        Bekräfta
      </Button>
    </>
  )
}

export default ConfirmBooking
