import React, { useState, useEffect } from 'react'
import backendService from '../request/backendService'

import { FiTrash2 } from 'react-icons/fi'
import { List, ListButton, ListItem } from '../ui/list'

import socket, { joinRoom, leaveRoom } from '../request/socket'

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

    joinRoom(`meeting_speker_${meeting.id}`)

    socket.on('new_speaker_request', (data) => {
      if (data.meeting_id !== meeting.id) return
      if (speakers.find((s) => s.id === data.speaker.id)) return

      setSpeakers((prev) => [...prev, data.speaker])
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
  }, [meeting])

  async function deleteSpeaker(speakerId) {
    await backendService.delete(`/voting/speakers/${speakerId}`)
  }

  return (
    <div>
      <h2>Talarlista</h2>
      <List maxHeight="260px">
        {speakers &&
          speakers.map((s) => (
            <ListItem
              title={s.user.pretty_name}
              subtitle={s.prioritized ? 'Replik' : null}
              key={s.id}
              buttons={[
                <ListButton
                  onClick={() => deleteSpeaker(s.id)}
                  iconComponent={FiTrash2}
                  text="Ta bort från talarlista"
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
