import React, { useContext, useState, useEffect } from 'react'
import useSWR from 'swr'

import Vote from '.'
import BigPixels from '../layout/bigPixels'
import { GridContainer, GridItem } from '../ui/grid'
import TitleChooser from '../ui/titleChooser'
import SpeakerPanel from './speakerPanel'
import MeetingInfoPanel from './meetingInfoPanel'

const VotePage = () => {
  const [currentMeeting, setCurrentMeeting] = useState(null)
  const { data: meetings, revalidate } = useSWR('/voting/meetings/')

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
            title="D-cide"
            choice={currentMeeting}
            setChoice={setCurrentMeeting}
            choices={meetings}
            label="name"
          />
        </GridItem>
        {currentMeeting && (
          <>
            <GridItem>
              <MeetingInfoPanel
                currentMeeting={currentMeeting}
                revalidate={revalidate}
              />
            </GridItem>
            <GridItem>
              <Vote />
            </GridItem>
            {currentMeeting.enable_speaker_requests && (
              <GridItem>
                <SpeakerPanel meeting={currentMeeting} />
              </GridItem>
            )}
          </>
        )}
      </GridContainer>
    </BigPixels>
  )
}
export default VotePage