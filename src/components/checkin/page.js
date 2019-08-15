import React from 'react'
import Checkin from '.'
import useKeyPress from '../useKeyPress'
import { useEndpoint } from '../request'

const CheckinPage = () => {
  const [events] = useEndpoint({ endpoint: '/checkin/events/' })
  const shiftDown = useKeyPress('Shift')

  return events ? (
    <Checkin events={events.reverse()} shiftDown={shiftDown} />
  ) : null
}

export default CheckinPage
