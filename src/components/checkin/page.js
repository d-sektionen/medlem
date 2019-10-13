import React from 'react'
import Checkin from '.'
import { useEndpoint } from '../request'

const CheckinPage = () => {
  const [events] = useEndpoint({ endpoint: '/checkin/events/' })

  return events ? <Checkin events={events.reverse()} /> : null
}

export default CheckinPage
