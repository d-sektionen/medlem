import React from 'react'
import Blipp from '../components/blipp'
import useKeyPress from '../components/useKeyPress'
import { useEndpoint } from '../components/request'

const BlippPage = () => {
  const [events] = useEndpoint({ endpoint: '/checkin/events/' })
  const shiftDown = useKeyPress('Shift')

  return events ? (
    <Blipp events={events.reverse()} shiftDown={shiftDown} />
  ) : null
}

export default BlippPage
