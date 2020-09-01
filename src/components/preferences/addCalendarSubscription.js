import React from 'react'
import AutoForm from '../form/form'

const AddCalendarSubscription = ({ create }) => (
  <AutoForm
    endpoint="/account/calendar-subscriptions/"
    customFetcher={create}
    defaults={{
      include_bookings: true,
      include_events_attending: true,
      include_events_not_attending: true,
    }}
  />
)

export default AddCalendarSubscription
