import React, { useState, useEffect } from 'react'
import useSWR from 'swr'

import MeetingPanel from './meetingPanel'
import VotePanel from './votePanel'
import AttendantPanel from './attendantPanel'
import { GridContainer, GridItem } from '../ui/grid'
import TitleChooser from '../ui/titleChooser'
import { patch } from '../request'
import BigPixels from '../layout/bigPixels'

const VotingGuestPage = ({ pageContext: { title } }) => {
  const [currentMeeting, setCurrentMeeting] = useState(null)
  const { data: unorderedMeetings, mutate } = useSWR('/voting/admin-meetings/')

  const updatePatch = async data => {
    const { data: updatedMeeting } = await patch(
      `/voting/admin-meetings/${currentMeeting.id}/`,
      data
    )
    mutate([
      ...unorderedMeetings.filter(meeting => meeting.id !== currentMeeting.id),
      updatedMeeting,
    ])
  }

  const meetings = unorderedMeetings ? [...unorderedMeetings].reverse() : null

  // sync currentMeeting with updated meetings
  useEffect(
    () => {
      if (currentMeeting)
        setCurrentMeeting(meetings.find(m => m.id === currentMeeting.id))
    },
    [meetings]
  )

  return (
    <BigPixels>
      <GridContainer>
        <GridItem fullWidth>
          <TitleChooser
            title={title}
            choice={currentMeeting}
            setChoice={setCurrentMeeting}
            choices={meetings}
            label="name"
            noChoicesLabel="Det finns inga möten just nu."
          />
        </GridItem>
        {currentMeeting && (
          <>
            <GridItem>
              <MeetingPanel
                currentMeeting={currentMeeting}
                updatePatch={updatePatch}
              />
            </GridItem>
            <GridItem>
              <VotePanel currentMeeting={currentMeeting} />
            </GridItem>
            <GridItem>
              <AttendantPanel currentMeeting={currentMeeting} />
            </GridItem>
          </>
        )}
      </GridContainer>
    </BigPixels>
  )
}

export default VotingGuestPage
