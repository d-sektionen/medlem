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
      include_bookable_items: [1,2,3,4,5]
    }}
  />
)

export default AddCalendarSubscription
