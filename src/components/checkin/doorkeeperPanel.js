import React, { useState, useEffect } from 'react'

import { FiTrash2 } from 'react-icons/fi'
import { List, ListItem, ListButton } from '../ui/list'
import backendService from '../request/backendService'
import socket, { joinRoom } from '../request/socket'

const DoorkeeperPanel = ({ event }) => {
  const [input, setInput] = useState('')
  const [doorkeepers, setDoorkeepers] = useState([])

  async function handleEventChange() {
    if (event) {
      const resp = await backendService.get(
        `/checkin/doorkeepers/?event_id=${event.id}`,
        {
          event_id: event.id,
        }
      )
      setDoorkeepers(resp.data)
    }
  }

  useEffect(() => {
    handleEventChange()
  }, [event])

  joinRoom(`event_doorkeepers_${event.id}`)

  socket.on('new_doorkeeper', (data) => {
    if (data.event.id === event.id) {
      if (doorkeepers.find((d) => d.id === data.id)) {
        return
      }
      doorkeepers.push(data)
      setDoorkeepers([...doorkeepers])
    }
  })

  socket.on('delete_doorkeeper', (data) => {
    if (data.event_id === event.id) {
      const newDoorkeepers = doorkeepers.filter(
        (d) => d.id !== data.doorkeeper_id
      )
      setDoorkeepers(newDoorkeepers)
    }
  })

  async function create(data) {
    await backendService.post('/checkin/doorkeepers/', data)
  }

  async function destroy(id) {
    await backendService.delete(`/checkin/doorkeepers/${id}/`)
  }

  return (
    <div>
      <h2>Dörrvakter</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          setInput('')

          create({
            user_username: input,
            event_id: event.id,
          })
        }}
      >
        <input
          value={input}
          placeholder="LiU-ID"
          onChange={(e) => setInput(e.target.value)}
        />
      </form>
      <List>
        {doorkeepers &&
          doorkeepers.map((doorkeeper) => (
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
