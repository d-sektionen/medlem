import React, { useState } from "react"
import { useCloseModal } from "../modal/useModal"
import { Button } from "../ui/buttons"

const DenyBooking = ({ booking, denyBooking }) => {
  const close = useCloseModal()
  const {
    user: { pretty_name: user },
    description,
  } = booking

  const [reason, setReason] = useState("")

  return (
    <>
      <p>Bokad av {user}.</p>
      <i>{description}</i>
      <p>Anledning till nekning:</p>
      <textarea value={reason} onChange={(e) => setReason(e.target.value)}></textarea>
      <p>Användaren kommer att meddelas via mail.</p>
      <Button onClick={() => {
        denyBooking(booking.id, { reason })
        close()
      }
      }>Skicka</Button>
    </>
  )
}

export default DenyBooking
