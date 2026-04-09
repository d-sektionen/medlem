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

  const [error, setError] = useState(null)

  const buttonDisabled =
    selectedItems.length !== booking.count ||
    (requiresAccessory && selectedAccessories.length !== booking.count)

  const confirm = (data) =>
    confirmBooking(booking.id, data)
      .then(() => close())
      .catch((err) => {
        console.error(err.response.data)
        setError(
          err.response.data?.detail ?? 'Ett fel inträffade, försök igen senare.'
        )
      })

  return (
    <>
      <p>Bokad av {user}.</p>
      <i>{description}</i>
      {error && <p style={{ color: 'red' }}>{error}</p>}

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
      <Button
        disabled={buttonDisabled}
        onClick={() => {
          const data = {
            items: selectedItems,
            accessories: requiresAccessory ? selectedAccessories : [],
          }

          confirm(data)
        }}
      >
        Bekräfta
      </Button>

      <p>eller</p>

      <Button
        onClick={() => {
          confirm({ auto_assign: true })
        }}
      >
        Välj automatiskt
      </Button>
    </>
  )
}

export default ConfirmBooking
