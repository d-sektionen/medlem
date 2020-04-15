import React, { useState, useEffect } from 'react'

import { FiTrash2 } from 'react-icons/fi'
import useRestEndpoint from '../request/useRestEndpoint'
import { List, ListButton, ListItem } from '../ui/list'
import { Button, ButtonGroup } from '../ui/buttons'
import { del, post } from '../request'
import useSWR from 'swr'

const AttendantPanel = ({ currentMeeting }) => {
  const [input, setInput] = useState('')

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
          })
          mutate([...attendants, newAttendant])
        }}
      >
        <input value={input} onChange={e => setInput(e.target.value)} />
      </form>
      <p>
        <ButtonGroup>
          <p>{`Röstlängd: ${attendants ? attendants.length : 0}`}</p>
          <Button
            onClick={async () => {
              // TODO: fix this ugly solution
              await del(
                `/voting/attendants/clear/?meeting_id=${currentMeeting.id}`
              )

              mutate([])
            }}
          >
            Återställ deltagarlista
          </Button>
        </ButtonGroup>
      </p>
      <List>
        {attendants &&
          attendants.map(attendant => (
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
