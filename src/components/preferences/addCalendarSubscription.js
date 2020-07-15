import React from 'react'
import AutoForm from '../form/form'

const AddCalendarSubscription = ({ create }) => (
  <AutoForm
    endpoint="/account/calendar-subscriptions/"
    customFetcher={create}
  />
)

export default AddCalendarSubscription
