import React, { useState, useEffect } from 'react'

import { FiTrash2 } from 'react-icons/fi'
import useRestEndpoint from '../request/useRestEndpoint'

const AttendantPanel = ({ currentOccurrence }) => {
  if (!currentOccurrence) return <></>

  const { attendants, attendant_limit: attendantLimit } = currentOccurrence

  return (
    <div>
      <h2>Deltagare</h2>
      <p>Antal deltagare: {attendants.length}</p>
      {attendantLimit !== 0 && <p>Deltagargräns: {attendantLimit}</p>}
      <ul>
        {attendants.map(attendant => (
          <li key={attendant.id}>{attendant.username}</li>
        ))}
      </ul>
    </div>
  )
}

export default AttendantPanel
