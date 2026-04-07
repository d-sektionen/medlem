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

  function handleNewSpeakerRequest(data) {
    if (data.meeting_id !== meeting.id) return

    setSpeakers((prev) => {
      if (prev.find((s) => s.id === data.speaker.id)) return prev
      return [...prev, data.speaker]
    })
  }

  function handleDeleteSpeakerRequest(data) {
    if (data.meeting_id !== meeting.id) return

    setSpeakers((prev) => prev.filter((s) => s.id !== data.speaker_request_id))
  }

  useEffect(() => {
    handleMeetingChange()
    socket.on('connect', handleMeetingChange)

    joinRoom(`meeting_speaker_${meeting.id}`)

    socket.on('new_speaker_request', handleNewSpeakerRequest)

    socket.on('delete_speaker_request', handleDeleteSpeakerRequest)

    return () => {
      socket.off('connect', handleMeetingChange)
      socket.off('new_speaker_request', handleNewSpeakerRequest)
      socket.off('delete_speaker_request', handleDeleteSpeakerRequest)

      leaveRoom(`meeting_speaker_${meeting.id}`)
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
