import React, { useState, useEffect } from 'react'
import { FiTrash2 } from 'react-icons/fi'

import { List, ListButton, ListItem } from '../ui/list'
import { Button, ButtonGroup } from '../ui/buttons'
import { del, post } from '../request'
import useConfirmModal from '../modal/useConfirmModal'
import { useCloseModal } from '../modal/useModal'
import useSWR from 'swr'

const getMemberAttendants = attendants => {
  const memberAttendants = attendants.filter(
    attendant => attendant.has_voting_rights
  )
  return memberAttendants
}

const AttendantPanel = ({ currentMeeting }) => {
  const [input, setInput] = useState('')
  const [confirmModal] = useConfirmModal()
  const closeModal = useCloseModal()

  const { data: attendants, mutate } = useSWR(
    () => `/voting/attendants/?meeting_id=${currentMeeting.id}`,
    { refreshInterval: 4000 }
  )

  if (attendants === null) return <></>

  return (
    <div>
      <h2>Deltagare</h2>
      <form
        onSubmit={async e => {
          e.preventDefault()
          setInput('')
          const { data: newAttendant } = await post('/voting/attendants/', {
            user_username: input,
            meeting_id: currentMeeting.id,
            has_voting_rights: true,
          })
          mutate([...attendants, newAttendant])
        }}
      >
        <input
          value={input}
          placeholder="LiU-ID"
          onChange={e => setInput(e.target.value)}
        />
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
                  await del(
                    `/voting/attendants/clear/?meeting_id=${currentMeeting.id}`
                  )

                  mutate([])
                },
                closeModal
              )
            }
          >
            Återställ deltagarlista
          </Button>
        </ButtonGroup>
      </div>
      <List>
        {attendants &&
          getMemberAttendants(attendants).map(attendant => (
            <ListItem
              title={attendant.user.pretty_name}
              key={attendant.id}
              buttons={[
                <ListButton
                  onClick={async () => {
                    await del(`/voting/attendants/${attendant.id}`, {
                      meeting_id: currentMeeting.id,
                    })
                    mutate(attendants.filter(x => x.id !== attendant.id))
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
