import React, { useState, useEffect } from 'react'

import style from '../../scss/checkin.module.scss'
import { useEndpoint, del, get } from '../request'
import { FiTrash2 } from 'react-icons/fi'
import useRestEndpoint from '../request/useRestEndpoint'
import AutoForm from '../form/form'

const MeetingPanel = ({ setCurrentMeeting, currentMeeting }) => {
  const [{ list, create }, unorderedMeetings] = useRestEndpoint({
    endpoint: '/voting/meetings/',
  })

  const meetings = unorderedMeetings ? [...unorderedMeetings].reverse() : null

  useEffect(() => {
    list()
    // TODO: handle errors
  }, [])

  useEffect(
    () => {
      if (!meetings || !meetings.length) setCurrentMeeting(null)
      else if (currentMeeting === null) setCurrentMeeting({ ...meetings[0] })
    },
    [meetings]
  )

  if (meetings === null) return <></>

  return (
    <div>
      <h2>Möten</h2>
      <h3>Nuvarande</h3>
      {meetings && meetings.length !== 0 && (
        <select
          value={currentMeeting ? currentMeeting.id : undefined}
          onChange={e =>
            setCurrentMeeting(
              meetings.find(meeting => `${meeting.id}` === e.target.value)
            )
          }
        >
          {meetings.map(meeting => (
            <option value={meeting.id} key={meeting.id}>
              {meeting.name}
            </option>
          ))}
        </select>
      )}
      <h3>Skapa nytt</h3>
      <AutoForm
        endpoint="/voting/meetings/" // onSubmit={() => {
        //   setNewMeetingName('')
        // }}
        customFetcher={create}
      />
    </div>
  )
}

export default MeetingPanel
