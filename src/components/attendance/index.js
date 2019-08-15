import React, { useState } from 'react'
import OccurrencePanel from './occurrencePanel'
import AttendantPanel from './attendantPanel'

import DoorkeeperPanel from '../checkin/doorkeeperPanel'
import { GridContainer, GridItem } from '../ui/grid'
import BigPixels from '../layout/bigPixels'

const Attendance = () => {
  const [currentOccurrence, setCurrentOccurrence] = useState(null)

  return (
    <BigPixels>
      <GridContainer>
        <GridItem>
          <OccurrencePanel
            currentOccurrence={currentOccurrence}
            setCurrentOccurrence={setCurrentOccurrence}
          />
        </GridItem>
        <GridItem>
          <AttendantPanel currentOccurrence={currentOccurrence} />
        </GridItem>
        <GridItem>
          <DoorkeeperPanel event={currentOccurrence} />
        </GridItem>
      </GridContainer>
    </BigPixels>
  )
}

export default Attendance
