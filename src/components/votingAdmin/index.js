import React, { useState } from 'react'
import MeetingPanel from './meetingPanel'

import style from '../../scss/checkin.module.scss'
import { useEndpoint } from '../request'
import DoorkeeperPanel from '../checkin/doorkeeperPanel'
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
      <DoorkeeperPanel event={currentMeeting} />
    </div>
  )
}

export default VotingAdmin
