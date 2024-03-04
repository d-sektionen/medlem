import React from 'react'
import useSWR from 'swr'
import Checkin from '.'

const CheckinPage = () => {
  const { data: events } = useSWR('/checkin/events/')

  return events ? <Checkin events={events.reverse()} /> : null
}

export default CheckinPage
