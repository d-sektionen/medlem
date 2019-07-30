import React, { useState } from 'react'
import MeetingPanel from './meetingPanel'

import style from '../../scss/blipp.module.scss'
import { useEndpoint } from '../request'
import DoorkeeperPanel from './doorkeeperPanel'
import VotePanel from './votePanel'
import AttendantPanel from './attendantPanel'

const VotingAdmin = () => {
  const [currentMeeting, setCurrentMeeting] = useState(null)

  return (
    <div>
      <MeetingPanel
        currentMeeting={currentMeeting}
        setCurrentMeeting={setCurrentMeeting}
      />
      <VotePanel currentMeeting={currentMeeting} />
      <AttendantPanel currentMeeting={currentMeeting} />
      <DoorkeeperPanel currentMeeting={currentMeeting} />
    </div>
  )
}

export default VotingAdmin
