import React from 'react'
import AutoForm from '../form/form'

const AddMeeting = ({ create }) => (
  <AutoForm
    endpoint="/voting/admin-meetings/" // onSubmit={() => {
    //   setNewMeetingName('')
    // }}
    customFetcher={create}
  />
)

export default AddMeeting
