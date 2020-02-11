import React, { useState, useEffect } from 'react'

import { FiTrash2 } from 'react-icons/fi'
import useRestEndpoint from '../request/useRestEndpoint'
import { List, ListButton, ListItem } from '../ui/list'
import { Button } from '../ui/buttons'
import { del } from '../request'

const AttendantPanel = ({ currentMeeting }) => {
  const [input, setInput] = useState('')

  const [{ list, destroy, create }, attendants] = useRestEndpoint({
    endpoint: '/voting/attendants/',
  })

  useEffect(
    () => {
      if (currentMeeting) list({ meeting_id: currentMeeting.id })
      // TODO: handle errors
    },
    [currentMeeting]
  )

  if (attendants === null) return <></>

  return (
    <div>
      <h2>Deltagare</h2>
      <form
        onSubmit={e => {
          e.preventDefault()
          setInput('')

          create({
            user_username: input,
            meeting_id: currentMeeting.id,
          })
        }}
      >
        <input value={input} onChange={e => setInput(e.target.value)} />
      </form>
      <p>
        {`Röstlängd: ${attendants.length} `}
        <Button
          onClick={() => {
            // TODO: fix this ugly solution
            del(`/voting/attendants/clear/?meeting_id=${currentMeeting.id}`)
              .then(() => {
                window.location.reload()
              })
              .catch(() => {
                window.location.reload()
              })
          }}
        >
          Återställ deltagarlista
        </Button>
      </p>
      <List>
        {attendants.map(attendant => (
          <ListItem
            title={attendant.user.pretty_name}
            key={attendant.id}
            buttons={[
              <ListButton
                onClick={() =>
                  destroy(attendant.id, { meeting_id: currentMeeting.id })
                }
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
