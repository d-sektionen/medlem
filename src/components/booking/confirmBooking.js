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

  const [selectedItems, setSelectedItems] = useState([])
  const [selectedAccessories, setSelectedAccessories] = useState([])

  return (
    <>
      <p>Bokad av {user}.</p>
      <i>{description}</i>

      {items.length > 1 && (
        <>
          <h3>Välj {booking.count} objekt</h3>

          <div className={confirmBookingChecklists}>
            <Checklist
              items={items}
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
        onClick={() => {
          confirmBooking(booking.id, {
            items: selectedItems,
            accessories: selectedAccessories,
          })
          close()
        }}
      >
        Bekräfta
      </Button>
    </>
  )
}

export default ConfirmBooking
