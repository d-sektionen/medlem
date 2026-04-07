import React, { useState, useEffect, useContext } from 'react'

import { FiTrash2 } from 'react-icons/fi'
import { List, ListButton, ListItem } from '../ui/list'
import { Button, ButtonGroup } from '../ui/buttons'
import { UserContext } from '../layout/layout'

import socket, { joinRoom, leaveRoom } from '../request/socket'
import backendService from '../request/backendService'

const SpeakerPanel = ({ meeting }) => {
  const [speakers, setSpeakers] = useState([])
  async function handleMeetingChange() {
    if (meeting) {
      const resp = await backendService.get(
        `/voting/speakers/?meeting_id=${meeting.id}`
      )
      setSpeakers(resp.data)
    }
  }

  useEffect(() => {
    handleMeetingChange()

    socket.on('connect', handleMeetingChange)

    joinRoom(`meeting_speaker_${meeting.id}`)

    socket.on('new_speaker_request', (data) => {
      if (data.meeting_id !== meeting.id) return

      setSpeakers((prev) =>
        prev.some((s) => s.id === data.speaker.id)
          ? prev
          : [...prev, data.speaker]
      )
    })

    socket.on('delete_speaker_request', (data) => {
      if (data.meeting_id !== meeting.id) return

      setSpeakers((prev) =>
        prev.filter((s) => s.id !== data.speaker_request_id)
      )
    })

    return () => {
      socket.off('connect', handleMeetingChange)
      socket.off('new_speaker_request')
      socket.off('delete_speaker_request')
      leaveRoom(`meeting_speker_${meeting.id}`)
    }
  }, [meeting.id])

  async function deleteSpeakerRequest(meetingId, prioritized) {
    const prioQS = prioritized ? '&prioritized' : ''
    await backendService.delete(
      `/voting/speakers/?meeting_id=${meetingId}${prioQS}`
    )
  }

  const [user] = useContext(UserContext)

  const errorMessage = meeting.attending
    ? 'Talarlista är inaktiverad för mötet.'
    : 'Du måste vara registrerad på mötet för att kunna skriva upp dig på talarlistan.'

  return (
    <div>
      <h2>Talarlista</h2>
      {meeting.attending && meeting.enable_speaker_requests ? (
        <ButtonGroup>
          <Button
            onClick={async () => {
              await backendService.post('/voting/speakers/', {
                meeting_id: meeting.id,
              })
            }}
          >
            Jag vill tala!
          </Button>
          <Button
            onClick={async () => {
              await backendService.post('/voting/speakers/', {
                meeting_id: meeting.id,
                prioritized: true,
              })
            }}
          >
            Replik!
          </Button>
        </ButtonGroup>
      ) : (
        <p>{errorMessage}</p>
      )}
      <List maxHeight="260px">
        {speakers &&
          speakers.map((s) => (
            <ListItem
              title={s.user.pretty_name}
              subtitle={s.prioritized ? 'Replik' : null}
              key={s.id}
              buttons={[
                <ListButton
                  shown={user.id === s.user.id}
                  onClick={() =>
                    deleteSpeakerRequest(meeting.id, s.prioritized)
                  }
                  iconComponent={FiTrash2}
                  text="Lämna talarlista"
                  key="remove"
                />,
              ]}
            />
          ))}
      </List>
    </div>
  )
}

export default SpeakerPanel
