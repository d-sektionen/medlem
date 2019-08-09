import React, { useState, useEffect } from 'react'

import { FiTrash2 } from 'react-icons/fi'
import useRestEndpoint from '../request/useRestEndpoint'
import { List, ListItem, ListButton } from '../ui/list'

const DoorkeeperPanel = ({ event }) => {
  const [input, setInput] = useState('')

  const [{ list, destroy, create }, doorkeepers] = useRestEndpoint({
    endpoint: '/checkin/doorkeepers/',
  })

  useEffect(
    () => {
      if (event) list({ event_id: event.id })
      // TODO: handle errors
    },
    [event]
  )

  if (doorkeepers === null) return <></>

  return (
    <div>
      <h2>Dörrvakter</h2>
      <form
        onSubmit={e => {
          e.preventDefault()
          setInput('')

          create({
            user_username: input,
            event_id: event.id,
          })
        }}
      >
        <input value={input} onChange={e => setInput(e.target.value)} />
      </form>
      <List>
        {doorkeepers.map(doorkeeper => (
          <ListItem
            title={doorkeeper.user.pretty_name}
            key={doorkeeper.id}
            buttons={[
              <ListButton
                onClick={() => destroy(doorkeeper.id)}
                iconComponent={FiTrash2}
                text="Ta bort dörrvakt"
                key="remove"
              />,
            ]}
          />
        ))}
      </List>
    </div>
  )
}

export default DoorkeeperPanel
