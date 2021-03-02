import React, { useState, useEffect } from 'react'
import { FiTrash2 } from 'react-icons/fi'

import { List, ListButton, ListItem } from '../ui/list'
import { Button, ButtonGroup } from '../ui/buttons'
import { del, post } from '../request'
import useSWR from 'swr'

const getGuestAttendants = attendants => {
  const guestAttendants = attendants.filter(
    attendant => !attendant.has_voting_rights
  )
  return guestAttendants
}

const GuestPanel = ({ currentMeeting }) => {
  const [input, setInput] = useState('')

  const { data: attendants, mutate } = useSWR(
    () => `/voting/attendants/?meeting_id=${currentMeeting.id}`,
    { refreshInterval: 4000 }
  )

  if (attendants === null) return <></>

  return (
    <div>
      <h2>Gäster/adjungerade</h2>
      <form
        onSubmit={async e => {
          e.preventDefault()
          setInput('')
          const { data: newAttendant } = await post('/voting/attendants/', {
            user_username: input,
            meeting_id: currentMeeting.id,
            has_voting_rights: false,
          })
          mutate([...attendants, newAttendant])
        }}
      >
        <input value={input} onChange={e => setInput(e.target.value)} />
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
          getGuestAttendants(attendants).map(attendant => (
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
