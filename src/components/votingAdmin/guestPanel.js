import React, { useState, useEffect } from 'react'
import { FiTrash2 } from 'react-icons/fi'

import { List, ListButton, ListItem } from '../ui/list'
import { ButtonGroup } from '../ui/buttons'

import backendService from '../request/backendService'
import socket, { joinRoom } from '../request/socket'

const getGuestAttendants = (attendants) => {
  const guestAttendants = attendants.filter(
    (attendant) => !attendant.has_voting_rights
  )
  return guestAttendants
}

const GuestPanel = ({ currentMeeting }) => {
  const [input, setInput] = useState('')
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
  }, [currentMeeting])

  joinRoom(`meeting_attendants_${currentMeeting.id}`)

  socket.on('new_attendant', (data) => {
    if (data.meeting_id === currentMeeting.id) {
      if (attendants.find((a) => a.id === data.id)) {
        return
      }
      attendants.push(data)
      setAttendants([...attendants])
    }
  })

  socket.on('delete_attendant', (data) => {
    if (data.meeting_id === currentMeeting.id) {
      const newAttendants = attendants.filter((a) => a.id !== data.attendant_id)
      setAttendants(newAttendants)
    }
  })

  if (attendants === null) return <></>

  return (
    <div>
      <h2>Gäster/adjungerade</h2>
      <form
        onSubmit={async (e) => {
          e.preventDefault()
          setInput('')
          await backendService.post('/voting/attendants/', {
            user_username: input,
            meeting_id: currentMeeting.id,
            has_voting_rights: false,
          })
        }}
      >
        <input
          value={input}
          placeholder="LiU-ID"
          onChange={(e) => setInput(e.target.value)}
        />
      </form>
      <div>
        <ButtonGroup>
          <p>{`Antal gäster/adjungerade: ${
            attendants ? getGuestAttendants(attendants).length : 0
          }`}</p>
        </ButtonGroup>
      </div>
      <List>
        {attendants &&
          getGuestAttendants(attendants).map((attendant) => (
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
                  text="Ta bort gäst"
                  key="remove"
                />,
              ]}
            />
          ))}
      </List>
    </div>
  )
}

export default GuestPanel
