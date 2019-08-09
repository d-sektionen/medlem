import React, { useState } from 'react'
import MeetingPanel from './meetingPanel'

import style from '../../scss/checkin.module.scss'
import { useEndpoint } from '../request'
import DoorkeeperPanel from '../checkin/doorkeeperPanel'
import VotePanel from './votePanel'
import AttendantPanel from './attendantPanel'
import { GridContainer, GridItem } from '../ui/grid'

const VotingAdmin = () => {
  const [currentMeeting, setCurrentMeeting] = useState(null)

  return (
    <GridContainer>
      <GridItem>
        <MeetingPanel
          currentMeeting={currentMeeting}
          setCurrentMeeting={setCurrentMeeting}
        />
      </GridItem>
      <GridItem>
        <VotePanel currentMeeting={currentMeeting} />
      </GridItem>
      <GridItem>
        <AttendantPanel currentMeeting={currentMeeting} />
      </GridItem>
      <GridItem>
        <DoorkeeperPanel event={currentMeeting} />
      </GridItem>
    </GridContainer>
  )
}

export default VotingAdmin
