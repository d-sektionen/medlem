import React, { useState, useEffect } from 'react'

import { FiTrash2 } from 'react-icons/fi'
import { List, ListItem, ListButton } from '../ui/list'
import useSWR from 'swr'
import { post, del } from '../request'

const DoorkeeperPanel = ({ event }) => {
  const [input, setInput] = useState('')

  const { data: doorkeepers, mutate } = useSWR(
    `/checkin/doorkeepers/?event_id=${event.id}`
  )

  const create = async data => {
    const { data: newDoorkeeper } = await post('/checkin/doorkeepers/', data)
    mutate([...doorkeepers, newDoorkeeper])
    return newDoorkeeper
  }

  const destroy = async id => {
    await del(`/checkin/doorkeepers/${id}/`)
    mutate(doorkeepers.filter(d => d.id !== id))
  }

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
        {doorkeepers &&
          doorkeepers.map(doorkeeper => (
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
