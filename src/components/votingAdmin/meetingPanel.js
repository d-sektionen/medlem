import React, { useState, useEffect } from 'react'

import style from '../../scss/blipp.module.scss'
import { useEndpoint, del, get } from '../request'
import { FiTrash2 } from 'react-icons/fi'
import useRestEndpoint from '../request/useRestEndpoint'

const MeetingPanel = ({ setCurrentMeeting, currentMeeting }) => {
  const [newMeetingName, setNewMeetingName] = useState('')

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
      {meetings && meetings.length && (
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
      <form
        onSubmit={e => {
          e.preventDefault()
          setNewMeetingName('')
          // setCurrentMeeting(null)

          create({
            name: newMeetingName,
          }).then(res => {
            setCurrentMeeting(res.data)
          })
        }}
      >
        <input
          value={newMeetingName}
          onChange={e => {
            setNewMeetingName(e.target.value)
          }}
        />
      </form>
    </div>
  )
}

export default MeetingPanel
