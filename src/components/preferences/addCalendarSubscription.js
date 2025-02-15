import React from 'react'
import AutoForm from '../form/form'
import useSWR from 'swr'

const AddCalendarSubscription = ({ create }) => {
  const { data, mutate } = useSWR('/booking/items/')

  const defaults = {
    include_bookings: true,
    include_events_attending: true,
    include_events_not_attending: true,
    include_bookable_items: data
  }
  return (
    <AutoForm
      endpoint="/account/calendar-subscriptions/"
      customFetcher={create}
      defaults={defaults}
    />
  )
}

export default AddCalendarSubscription
