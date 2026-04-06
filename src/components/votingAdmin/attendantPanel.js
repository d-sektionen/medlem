import React, { useState, useEffect } from 'react'
import { FiTrash2 } from 'react-icons/fi'

import { List, ListButton, ListItem } from '../ui/list'
import { Button, ButtonGroup } from '../ui/buttons'
import useConfirmModal from '../modal/useConfirmModal'
import { useCloseModal } from '../modal/useModal'
import backendService from '../request/backendService'
import socket, { joinRoom, leaveRoom } from '../request/socket'

const getMemberAttendants = (attendants) => {
  const memberAttendants = attendants.filter(
    (attendant) => attendant.has_voting_rights
  )
  return memberAttendants
}

function AttendantCreationErrorLabel() {
  return (
    <p style={{ color: 'red', fontSize: '14px' }}>
      Det gick inte att lägga till användaren till mötet.
    </p>
  )
}

const AttendantPanel = ({ currentMeeting }) => {
  const [input, setInput] = useState('')
  const [confirmModal] = useConfirmModal()
  const [showAttendantErrorLabel, setShowAttendantErroLabel] = useState(false)
  const closeModal = useCloseModal()

  async function handleFormSubmit(event) {
    event.preventDefault()
    setInput('')

    let newAttendant

    try {
      setShowAttendantErroLabel(false)
      newAttendant = await backendService.post('/voting/attendants/', {
        user_username: input,
        meeting_id: currentMeeting.id,
        has_voting_rights: true,
      })
    } catch (error) {
      setShowAttendantErroLabel(true)
    }
  }

  const [attendants, setAttendants] = useState([])

  async function handleMeetingChange() {
    if (currentMeeting) {
      const resp = await backendService.get(
        `/voting/attendants/?meeting_id=${currentMeeting.id}`,
        {
          meeting_id: currentMeeting.id,
        }
      )
      setAttendants(resp.data)
    }
  }

  useEffect(() => {
    handleMeetingChange()
    socket.on('connect', handleMeetingChange)

    joinRoom(`meeting_attendants_${currentMeeting.id}`)

    socket.on('new_attendant', (data) => {
      if (data.meeting_id !== currentMeeting.id) return

      setAttendants((prev) => {
        if (prev.find((a) => a.id === data.id)) return prev
        return [...prev, data]
      })
    })

    socket.on('delete_attendant', (data) => {
      if (data.meeting_id !== currentMeeting.id) return

      setAttendants((prev) => prev.filter((a) => a.id !== data.attendant_id))
    })

    return () => {
      socket.off('connect', handleMeetingChange)
      socket.off('new_attendant')
      socket.off('delete_attendant')
      leaveRoom(`meeting_attendants_${currentMeeting.id}`)
    }
  }, [currentMeeting.id])

  if (attendants === null) return <></>

  return (
    <div>
      <h2>Deltagare</h2>
      <form onSubmit={handleFormSubmit}>
        <input
          value={input}
          placeholder="LiU-ID"
          onChange={(e) => setInput(e.target.value)}
        />
        {showAttendantErrorLabel && <AttendantCreationErrorLabel />}
      </form>
      <div>
        <ButtonGroup>
          <p>{`Röstlängd: ${
            attendants ? getMemberAttendants(attendants).length : 0
          }`}</p>
          <Button
            onClick={() =>
              confirmModal(
                `Är du säker på att du vill ta bort alla deltagare?`,
                async () => {
                  await backendService.delete(
                    `/voting/attendants/clear/?meeting_id=${currentMeeting.id}`
                  )
                },
                closeModal
              )
            }
          >
            Återställ deltagarlista
          </Button>
        </ButtonGroup>
      </div>
      <List maxHeight="200px">
        {attendants &&
          getMemberAttendants(attendants).map((attendant) => (
            <ListItem
              title={attendant.user.pretty_name}
              key={attendant.id}
              buttons={[
                <ListButton
                  onClick={async () => {
                    await backendService.delete(
                      `/voting/attendants/${attendant.id}`,
                      {
                        meeting_id: currentMeeting.id,
                      }
                    )
                  }}
                  iconComponent={FiTrash2}
                  text="Ta bort deltagare"
                  key="remove"
                />,
              ]}
            />
          ))}
      </List>
    </div>
  )
}

export default AttendantPanel
