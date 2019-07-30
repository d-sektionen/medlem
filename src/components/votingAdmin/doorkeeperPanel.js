import React, { useState, useEffect } from 'react'

import { FiTrash2 } from 'react-icons/fi'
import useRestEndpoint from '../request/useRestEndpoint'

const DoorkeeperPanel = ({ currentMeeting }) => {
  const [input, setInput] = useState('')

  const [{ list, destroy, create }, doorkeepers] = useRestEndpoint({
    endpoint: '/checkin/doorkeepers/',
  })

  useEffect(
    () => {
      if (currentMeeting) list({ event_id: currentMeeting.id })
      // TODO: handle errors
    },
    [currentMeeting]
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
            user_id: input,
            event_id: currentMeeting.id,
          })
        }}
      >
        <input value={input} onChange={e => setInput(e.target.value)} />
      </form>
      <ul>
        {doorkeepers.map(doorkeeper => (
          <li key={doorkeeper.id}>
            {doorkeeper.user.username}
            <FiTrash2 onClick={() => destroy(doorkeeper.id)} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default DoorkeeperPanel
