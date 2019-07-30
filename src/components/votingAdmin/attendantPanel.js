import React, { useState, useEffect } from 'react'

import { FiTrash2 } from 'react-icons/fi'
import useRestEndpoint from '../request/useRestEndpoint'

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
            user_id: input,
            meeting_id: currentMeeting.id,
          })
        }}
      >
        <input value={input} onChange={e => setInput(e.target.value)} />
      </form>
      <p>Röstlängd: {attendants.length}</p>
      <ul>
        {attendants.map(attendant => (
          <li key={attendant.id}>
            {attendant.user.username}
            <FiTrash2
              onClick={() =>
                destroy(attendant.id, { meeting_id: currentMeeting.id })
              }
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AttendantPanel
