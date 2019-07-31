import React, { useState } from 'react'
import OccurrencePanel from './occurrencePanel'
import AttendantPanel from './attendantPanel'

import DoorkeeperPanel from '../checkin/doorkeeperPanel'

const Attendance = () => {
  const [currentOccurrence, setCurrentOccurrence] = useState(null)

  return (
    <div>
      <OccurrencePanel
        currentOccurrence={currentOccurrence}
        setCurrentOccurrence={setCurrentOccurrence}
      />
      <AttendantPanel currentOccurrence={currentOccurrence} />
      <DoorkeeperPanel event={currentOccurrence} />
    </div>
  )
}

export default Attendance
