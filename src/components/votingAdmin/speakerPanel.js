import React, { useState, useEffect } from 'react'
import backendService from '../request/backendService'

import { FiTrash2 } from 'react-icons/fi'
import { List, ListButton, ListItem } from '../ui/list'

import socket from '../request/socket'

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

  useEffect(handleMeetingChange, [meeting])
  socket.emit('join', { room: `meeting_speker_${meeting.id}` })

  socket.on('new_speaker_request', (data) => {
    if (data.meeting_id === meeting.id) {
      speakers.push(data.speaker)
      setSpeakers([...speakers])
    }
  })

  socket.on('delete_speaker_request', (data) => {
    if (data.meeting_id === meeting.id) {
      const newSpeakers = speakers.filter(
        (s) => s.id !== data.speaker_request_id
      )
      setSpeakers(newSpeakers)
    }
  })

  async function deleteSpeaker(speakerId) {
    await backendService.delete(`/voting/speakers/${speakerId}`)
  }

  return (
    <div>
      <h2>Talarlista</h2>
      <List>
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
