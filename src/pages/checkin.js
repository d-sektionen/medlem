import React from 'react'
import Checkin from '../components/checkin'
import useKeyPress from '../components/useKeyPress'
import { useEndpoint } from '../components/request'

const CheckinPage = () => {
  const [events] = useEndpoint({ endpoint: '/checkin/events/' })
  const shiftDown = useKeyPress('Shift')

  return events ? (
    <Checkin events={events.reverse()} shiftDown={shiftDown} />
  ) : null
}

export default CheckinPage
