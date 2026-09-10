import React from 'react'
import AutoForm from '../form/form'

const AddOccurrence = ({ create }) => (
  <AutoForm endpoint="/attendance/occurrences/" customFetcher={create} />
)

export default AddOccurrence
