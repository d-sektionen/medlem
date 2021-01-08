import React, { useState, useEffect } from 'react'
import { FiTrash2 } from 'react-icons/fi'

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

      <div>
        <ButtonGroup>
          <p>{`Röstlängd: ${attendants ? attendants.length : 0}`}</p>
        </ButtonGroup>
      </div>
    </div>
  )
}

export default AttendantPanel
